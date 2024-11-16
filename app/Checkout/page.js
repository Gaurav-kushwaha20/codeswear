"use client"
import React from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useCart } from '@/components/Context';
import { IoBagCheckOutline } from "react-icons/io5";
import Link from 'next/link';

const Page = () => {
    const { cart, addToCart, removeFromCart, clearCart, subTotal } = useCart();

    return (
        <div className='container m-auto'>
            <p className='text-center text-4xl font-bold'>Checkout</p>
            <p className=' text-2xl font-semibold'>1. Delivery Details</p>

            <div className="mx-auto flex my-4 ">
                <div className=" px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className=" px-2 w-1/2">

                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="mx-auto">
                <div className=" px-2 w-full">
                    <div className="relative mb-4">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex my-4 ">
                <div className=" px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className=" px-2 w-1/2">

                    <div className=" mb-4">
                        <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="City" name="City" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex my-4 ">
                <div className=" px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="State" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" id="State" name="State" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className=" px-2 w-1/2">

                    <div className=" mb-4">
                        <label htmlFor="Pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="text" id="Pincode" name="Pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            {/* Check the cart item here   */}
            <p className=' text-2xl font-semibold'>2. Delivery Details</p>


            <div

                className="sidecart w-80 h-full px-10 py-5   transition-transform duration-1000 ease-in-out  "
            >
                {/* <h2 className="font-bold text-center">SHOPING CART</h2> */}
                <span

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
                                        className="cursor-pointer text-5xl"
                                        onClick={() => {
                                            addToCart(k, 1, k.price, k.name, k.size, k.varient);
                                        }}
                                    />
                                </span>
                                <span className='mx-2'>{subTotal}</span>
                            </li>
                        );
                    })}
                </ol>

                <div className="flex justify-around">
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
        </div>
    )
}

export default Page