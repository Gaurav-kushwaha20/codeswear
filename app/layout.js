"use client"; // Ensures that this is a client-side component

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, cloneElement } from "react";
import { CartProvider } from "@/components/Context";

export default function RootLayout({ children }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  // Save cart to localStorage
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // Clear the cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // Add item to cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // Remove item from cart
  const removeFromCart = (itemCode, qty) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // Calculate subtotal whenever the cart changes
  useEffect(() => {
    let subt = 0;
    Object.keys(cart).forEach((itemCode) => {
      subt += cart[itemCode].price * cart[itemCode].qty;
    });
    setSubTotal(subt);
  }, []);

  // Pass the props to the children using cloneElement
  const childrenWithProps = cloneElement(children, {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subTotal,
  });

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>

        {/* <CartProvider>
        <Navbar
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          />
        {childrenWithProps}
        <Footer />
          </CartProvider> */}
      </body>
    </html>
  );
}
