import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ShoppingCart, AccountCircle, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.cartItems.length);
  const user = useSelector((state) => state.user.user)

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <header className="bg-white shadow-md py-2">
      <Box className="flex justify-between items-center max-w-screen-xl mx-auto px-4">
        <div className="text-2xl font-bold text-green-600">
          <img
            src={logo}
            alt="Pharmacy Logo"
            className="h-8 w-auto scale-160"
          />
        </div>

        <IconButton
          onClick={() => toggleDrawer(true)}
          sx={{
            display: { sm: "flex", sx: "none", md: "none" },
            color: "black",
            "&:hover": {
              color: "green.600",
            },
          }}
        >
          <Menu />
        </IconButton>
        <Box className="hidden md:flex">
          <List className="flex space-x-6">
            <ListItem>
              <ListItemText>
                <a href="/" className="text-gray-700 hover:text-green-600">
                  خانه
                </a>
              </ListItemText>
            </ListItem>
            <ListItem className="relative group">
              <ListItemText>
                <a href="/shop" className="text-gray-700 hover:text-green-600">
                  خرید
                </a>
                <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md rounded-lg py-4 px-6 space-y-4 mt-2">
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-600">
                      داروهای عمومی
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-600">
                      داروهای گیاهی
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-600">
                      محصولات پوستی
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-600">
                      مکمل‌های غذایی
                    </a>
                  </li>
                </ul>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <a href="/blog" className="text-gray-700 hover:text-green-600">
                  بلاگ
                </a>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-green-600"
                >
                  تماس
                </a>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <a href="/about" className="text-gray-700 hover:text-green-600">
                  درباره
                </a>
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box className="hidden md:flex space-x-4 items-center">
          <a href="/cart" className="relative text-gray-700">
            <ShoppingCart />
            {cartQuantity > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white rounded-full px-1 text-xs font-bold">
                {cartQuantity}
              </span>
            )}
          </a>
          <ListItemText className="text-gray-700 cursor-pointer">
            {user ? (
              <a href="/account">
                <img className="w-10 h-10 rounded-full" src={user.picture} />
              </a>
            ) : (
              <a href="/login">ورود</a>
            )}
          </ListItemText>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        className="md:hidden flex"
      >
        <List className="w-64">
          <ListItem>
            <ListItemText>
              <a href="/" className="text-gray-700 hover:text-green-600">
                خانه
              </a>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <a href="/shop" className="text-gray-700 hover:text-green-600">
                خرید
              </a>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <a href="/blog" className="text-gray-700 hover:text-green-600">
                بلاگ
              </a>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <a href="/contact" className="text-gray-700 hover:text-green-600">
                تماس
              </a>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <a href="/about" className="text-gray-700 hover:text-green-600">
                درباره ما
              </a>
            </ListItemText>
          </ListItem>
        </List>
        <Box className="flex flex-col items-end px-4">
          <a href="/cart" className="relative text-gray-700">
            <ShoppingCart />
            {cartQuantity > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white rounded-full px-1 text-xs font-bold">
                {cartQuantity}
              </span>
            )}
          </a>
          <ListItemText className="text-gray-700 cursor-pointer">
            {user ? (
              <a href="/account">
                <img className="w-10 h-10 rounded-full" src={user.picture} />
                </a>
            ) : (
              <a href="/login">ورود</a>
            )}
          </ListItemText>
        </Box>
      </Drawer>
    </header>
  );
}

export default Header;
