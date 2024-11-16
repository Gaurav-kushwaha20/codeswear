"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BiCart } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { useCart } from "./Context";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal, toggleCart, cartVisible } = useCart();

  const ref = useRef();


  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start sticky top-0 z-10 bg-white">
      <div className="image">
        <Image src={"/logo.webp"} height={20} width={200} alt="logo" />
      </div>

      <div className="navbar">
        <ul className="flex gap-3  ">
          <Link href={"/"}>
            <li className="hover:font-bold">Home</li>
          </Link>
          <Link href={"/Tshirt"}>
            <li className="hover:font-bold">TShirt</li>
          </Link>
          <Link href={"/Hoodies"}>
            <li className="hover:font-bold">Hoodies</li>
          </Link>
          <Link href={"/Sticker"}>
            <li className="hover:font-bold">Sticker</li>
          </Link>
          <Link href={"/Mugs"}>
            <li className="hover:font-bold">Mugs</li>
          </Link>
        </ul>
      </div>

      <div className="cart flex items-center justify-center absolute right-4 top-2">
        <div className="mx-4">
          <button className="font-medium">
            <Link href={"/Login"}>
            <MdAccountCircle size={30} />
            </Link>
          </button>
        </div>

        <div onClick={toggleCart} className="">
          <button className="font-medium">
            <BiCart size={30} />
          </button>
        </div>

      </div>
      {/* sidebar */}
      {cartVisible && (
        <div
          ref={ref}
          className="sidecart w-80 h-full px-10 py-5 absolute top-10 right-4  transition-transform duration-1000 ease-in-out  "
        >
          <h2 className="font-bold text-center">SHOPING CART</h2>
          <span
            onClick={toggleCart}
            className="absolute top-2 right-4 cursor-pointer text-2xl text-pink-500"
          >
            {/* <IoMdCloseCircle /> */}
          </span>

          <ol className="list-decimal py-2">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold">No items in the cart</div>
            )}
            {Object.keys(cart).map((k, index) => {
              // console.log("k is "+k)
              return (
                <li key={k} className="flex items-center justify-center  px-3">
                  <span className="w-1/4 flex items-center justify-center">
                    {index + 1}.
                  </span>
                  <span className="w-2/4 p-1">{cart[k].name}</span>

                  <span className="w-1/4 p-1 flex items-center justify-center">
                    <FaMinus
                      className="cursor-pointer text-5xl"
                      onClick={() => {
                        removeFromCart(k, 1);
                      }}
                    />
                    <span className="mx-3">{cart[k].qty}</span>
                    <FaPlus
                      className="cursor-pointer text-5xl font-extrabold"
                      onClick={() => {
                        addToCart(k, 1, k.price, k.name, k.size, k.varient);
                      }}
                    />
                  </span>
                </li>
              );
            })}
          </ol>



          <div className="flex justify-around relative">
            <div className="my-2 font-bold absolute">
              <div>Total Price: {subTotal}</div>
            </div>
            <Link href={"/Checkout"}>
              <button className="flex  mt-16 text-white bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg  justify-center items-center gap-1">
                <IoBagCheckOutline /> Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex  mt-16 text-white bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg  justify-center items-center gap-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>



  );
};

export default Navbar;
