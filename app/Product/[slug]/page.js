/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/components/Context";
import product from "@/models/product";


const Page = ({ params }) => {
  const { addToCart } = useCart();
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const querry = params.slug;
  const [tshirt, settshirt] = useState(null)
  const [varients, setVarients] = useState(null)
  const [color, setcolor] = useState("red")
  const [size, setsize] = useState("M")
  


  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  // Code to check the delivery facility
  const handleCheck = async () => {
    const pins = await fetch("http://localhost:3000/api/checkservice");
    const data = await pins.json();
    if (data.includes(parseInt(pin))) {
      setService(true);
      setTimeout(() => {
        setService(null);
      }, 3000);
    } else {
      setService(false);
      setTimeout(() => {
        setService(null);
      }, 3000);
    }
  };



  // fetch the tshirts from the database 
  useEffect(() => {
    const fetchProduct = async () => {

      const res = await fetch(`/api/product/${querry}`);
      const data = await res.json();
      settshirt(data);

    };
    fetchProduct();
  }, [querry]);


  // fetch varients of the products
  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const res = await fetch(`/api/varients?title=${tshirt.title}`);
          if (!res.ok) {
            throw new Error("Failed to fetch related products");
          }
          const data = await res.json();
          setcolor(Object.keys(data)[0]);
          // console.log(Object.keys(Object.keys(data)[0])[0])
          setVarients(data);

        } catch (err) {

        }
      };
      fetchRelatedProducts();
    }
  }, [tshirt, color, size]);



  

  const refreshVarients = (newcolor, newsize) => {

    let url = `http://localhost:3000/Product/${varients[newcolor][newsize]['slug']}`
    window.location = url;
  }





  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-top rounded"
            src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/q/6/o/-original-imagydw4vcgzffhw.jpeg?q=70"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

              <div className="flex">
                <span className="mr-3">Color</span>
                <button  className={`border-2 ${color === 'red' ? 'border-black' : 'border-gray-300'} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>
                <button  className={`border-2 ${color === 'blue' ? 'border-black' : 'border-gray-300'} ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>
                <button  className={`border-2 ${color === 'green' ? 'border-black' : 'border-gray-300'} ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>
                
              </div>

              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                    <option value={'S'}>S</option>
                    <option value={'M'}>M</option>
                    <option value={'L'}>L</option>
                    <option value={'XL'}>XL</option>
                    <option value={'XXL'}>XXL</option>
                  </select>



                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Buttons */}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹599
              </span>
              <button className="flex ml-3 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Buy
              </button>

              {/* Fixing onClick for Add to Cart */}
              <button
                onClick={() => addToCart(slug, 1, 599, "T-Shirt", "M", "Red")}
                className="flex ml-3 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
              >
                Add To Cart
              </button>

              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>

            {/* Pin Code Check */}
            <div className="flex mt-3">
              <input
                type="text"
                value={pin}
                onChange={onChangePin}
                className="border-pink-500 border-solid border-2 rounded-xl w-1/3"
                placeholder="Enter Your Area Pincode"
              />
              <button
                className="flex ml-3 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                onClick={handleCheck}
              >
                Check
              </button>
            </div>
            {/* Service Message */}
            <div className="message mt-3 font-semibold text-pink-500">
              {service === true && <p>Yay! We deliver to your area.</p>}
              {service === false && (
                <p>Sorry! We don't deliver to your area.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;