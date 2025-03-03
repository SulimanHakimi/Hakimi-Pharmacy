const express = require("express");
const Prescription = require("../models/Prescription");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware");
const router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const getEmailTemplate = async (order, user, templateType) => {
//   const templatePath = path.join(
//     __dirname,
//     templateType === "order" ? "../emails/order.html" : "../emails/status.html"
//   );

//   let html = fs.readFileSync(templatePath, "utf8");

//   html = html
//     .replace(/{{name}}/g, user.name || "عزیز")
//     .replace(/{{orderNumber}}/g, order._id)
//     .replace(
//       /{{orderDate}}/g,
//       new Date(order.createdAt).toLocaleDateString("fa-IR")
//     )
//     .replace(/{{orderStatus}}/g, order.status)
//     .replace(/{{totalPrice}}/g, order.totalPrice.toLocaleString() + " افغانی");

//   if (templateType === "order") {
//     const orderItemsHtml = order.items
//       .map(
//         (item) => `
//         <tr>
//           <td>${item.title}</td>
//           <td>${item.quantity}</td>
//           <td>${item.price.toLocaleString()} افغانی</td>
//           <td>${(item.price * item.quantity).toLocaleString()} افغانی</td>
//         </tr>
//       `
//       )
//       .join("");

//     html = html.replace(
//       "{{#each orderItems}}",
//       `
//       <h3>جزئیات سفارش</h3>
//       <table class="order-items">
//         <thead>
//           <tr>
//             <th>نام محصول</th>
//             <th>تعداد</th>
//             <th>قیمت یکدانه</th>
//             <th>قیمت کل</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${orderItemsHtml}
//         </tbody>
//       </table>
//     `
//     );
//   }

//   return html;
// };

router.post("/upload", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { file, userId } = req.body;

    const newPrescription = new Prescription({
      user: userId,
      file: file,
    });
    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ error: "order not saved" });
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const prescription = await Prescription.find({ user: req.params.id });

    if (!prescription) {
      return res.status(404).json({ message: "prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving prescription", error: err });
  }
});
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting prescription", error: err });
  }
});
router.put("/:id/status", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { status } = req.body;
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    // const userEmail = orderAddress.email;

    // const emailHtml = await getEmailTemplate(
    //   prescription,
    //   savedOrder.shippingAddress,
    // );

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: userEmail,
    //   subject: "وضعیت نسخه شما به‌روزرسانی شد",
    //   html: emailHtml,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //   } else {
    //     console.log("Email sent:", info.response);
    //   }
    // });
    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});
module.exports = router;
