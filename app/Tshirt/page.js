/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const tshirt = async () => {
  // fetch the tshirt from the database
  let product = await fetch("http://localhost:3000/api/getProduct");
  let products = await product.json();

  console.log("product is: ");

  return (
    <>
      <div className="text-gray-600 body-font">
        <div className=" px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-4">
              {Object.keys(products).map((items) => {
                return (
                  <Link
                    key={items._id}
                    href={`/Product/${products[items].slug}`}
                    className="min-w-6 bg-slate-300 mx-3"
                  >
                    <div className=" p-4 w-full  ">
                      <div className="block relative h-48 rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="m-auto h-full"
                          src={products[items].img}
                        />
                      </div>
                      <div className="mt-4 flex flex-col items-center ">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {products[items].category}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {products[items].title}
                        </h2>
                        <div className="mt-1">
                        {products[items].size.includes('S') && <span className="border border-black px-1 mx-1">S</span> }
                        {products[items].size.includes('M') && <span className="border border-black px-1 mx-1"> M</span> }
                        {products[items].size.includes('L') && <span className="border border-black px-1 mx-1">L</span> }
                        {products[items].size.includes('XL') && <span className="border border-black px-1 mx-1">XL</span> }
                        {products[items].size.includes('XXL') && <span className="border border-black px-1 mx-1">XXL</span> }
                        </div>

                        <div className="mt-1">
                        {products[items].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button> }
                        {products[items].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button> }
                        {products[items].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button> }
                        {products[items].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button> }
                        {products[items].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button> }
                        {products[items].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button> }
                        {products[items].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button> }
                        </div>

                        <p className="mt-1">₹{products[items].price}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          
        </div>
      
    </>
  );
};

export default tshirt;
