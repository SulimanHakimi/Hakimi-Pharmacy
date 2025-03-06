const express = require("express");
const Order = require("../models/Order");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware");
const router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getEmailTemplate = async (order, user, templateType) => {
  const templatePath = path.join(
    __dirname,
    templateType === "order" ? "../emails/order.html" : "../emails/status.html"
  );

  let html = fs.readFileSync(templatePath, "utf8");

  html = html
    .replace(/{{name}}/g, user.name || "عزیز")
    .replace(/{{orderNumber}}/g, order._id)
    .replace(
      /{{orderDate}}/g,
      new Date(order.createdAt).toLocaleDateString("fa-IR")
    )
    .replace(/{{orderStatus}}/g, order.status)
    .replace(/{{totalPrice}}/g, order.totalPrice.toLocaleString() + " افغانی");

  if (templateType === "order") {
    const orderItemsHtml = order.items
      .map(
        (item) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toLocaleString()} افغانی</td>
          <td>${(item.price * item.quantity).toLocaleString()} افغانی</td>
        </tr>
      `
      )
      .join("");

    html = html.replace(
      "{{#each orderItems}}",
      `
      <h3>جزئیات سفارش</h3>
      <table class="order-items">
        <thead>
          <tr>
            <th>نام محصول</th>
            <th>تعداد</th>
            <th>قیمت یکدانه</th>
            <th>قیمت کل</th>
          </tr>
        </thead>
        <tbody>
          ${orderItemsHtml}
        </tbody>
      </table>
    `
    );
  }

  return html;
};
router.post("/", async (req, res) => {
  try {
    const { cart, orderAddress, user } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid" });
    }

    if (!orderAddress || typeof orderAddress !== "object") {
      return res
        .status(400)
        .json({ message: "Order address is missing or invalid" });
    }

    const newOrder = new Order({
      items: cart.map((item) => ({
        product: item.product,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: orderAddress,
      user: user,
    });

    newOrder.totalPrice = newOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const savedOrder = await newOrder.save();
    const userEmail = orderAddress.email;

    const emailHtml = await getEmailTemplate(
      savedOrder,
      savedOrder.shippingAddress,
      "order"
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "سفارش شما ثبت شد",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json(savedOrder._id);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No order found" });
    }
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
});
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const userEmail = req.body.email;

    const emailHtml = await getEmailTemplate(
      updatedOrder,
      updatedOrder.shippingAddress,
      "status"
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "وضعیت سفارش شما به‌روزرسانی شد",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Error updating order", error: err });
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", error: err });
  }
});

module.exports = router;
