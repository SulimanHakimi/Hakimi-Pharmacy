import React, { useState } from "react";
import logo from "../assets/logo.png"; // Ensure that the logo path is correct
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { ShoppingCart, AccountCircle, Menu } from "@mui/icons-material"; // MUI Icons

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <header className="bg-white shadow-md">
      <Box className="flex justify-between items-center max-w-screen-xl mx-auto px-6">
        <div className="text-2xl font-bold text-green-600">
          <img
            src={logo}
            alt="Pharmacy Logo"
            className="h-8 w-auto scale-160"
          />
        </div>

        <IconButton
          color="black"
          onClick={() => toggleDrawer(true)}
        >
          <Menu />
        </IconButton>

        <Box className="hidden md:flex space-x-6">
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
                <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md rounded-lg p-4 space-y-4 mt-2">
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
        </Box>

        <Box className="hidden md:flex space-x-6">
          <IconButton className="text-gray-700 hover:text-green-600">
            <ShoppingCart />
          </IconButton>
          <IconButton
            onClick={toggleLoginStatus}
            className="text-gray-700 hover:text-green-600"
          >
            {isLoggedIn ? <AccountCircle /> : "ورود"}
          </IconButton>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        className="md:hidden" 
      >
        <List className="w-64">
          <ListItem button>
            <ListItemText>
              <a href="/" className="text-gray-700 hover:text-green-600">
                خانه
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a href="/shop" className="text-gray-700 hover:text-green-600">
                خرید
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a href="/blog" className="text-gray-700 hover:text-green-600">
                بلاگ
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a href="/contact" className="text-gray-700 hover:text-green-600">
                تماس
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a href="/about" className="text-gray-700 hover:text-green-600">
                درباره ما
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a href="/login" className="text-gray-700 hover:text-green-600">
                ورود
              </a>
            </ListItemText>
          </ListItem>
        </List>
        <Box className="flex flex-col items-end self-end">
          <IconButton className="text-gray-700">
            <ShoppingCart />
          </IconButton>
          <IconButton
            onClick={toggleLoginStatus}
            className="text-gray-700"
          >
            {isLoggedIn ? <AccountCircle /> : "ورود"}
          </IconButton>
        </Box>
      </Drawer>
    </header>
  );
}

export default Header;
