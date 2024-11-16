/**
import Product from "@/models/product";
import connectDb from "@/middleware/mongoose";

// API route to get product data
export async function GET(req) {
  try {
    // Connect to the database
    await connectDb();

    // Fetch products from MongoDB
    const products = await Product.find();

    // Return the response with products data
    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle any errors
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
 


import Product from "@/models/product";
import connectDb from "@/middleware/mongoose";

export async function GET(req) {
  // Ensure the database is connected before running the query
  await connectDb();

  try {
    // Fetch products from the 'codeswear' database
    let products = await Product.find();
    
    // Return the fetched products
    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
*/


import product from "@/models/product";
import connectDb from "@/middleware/mongoose";



export async function GET(req) {
  await connectDb(); // Connect to the database
  
  // Fetch the most products
    const Products = await product.find()
    
    let tshirts = {}
    // for(let item of Products){
    //   if(item.title in tshirts){
    //     if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
    //       tshirts[item.title].color.push(item.color)
    //     }
    //     if(!tshirts[item.title].size.includes(item.size)){
    //       tshirts[item.title].size.push(item.size)
    //     }
    //   }else{
    //     tshirts[item.title] = JSON.parse(JSON.stringify(item))
    //     if(item.availableQty > 0){
    //       tshirts[item.title].color = [item.color];
    //       tshirts[item.title].size = [item.size];

    //     }
    //   }
    // }


    for(let item of Products){
      if(item.title in tshirts){
        if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
          tshirts[item.title].color.push(item.color)
        }
        if(!tshirts[item.title].size.includes(item.size)){
          tshirts[item.title].size.push(item.size)
        }
      }else{
        tshirts[item.title] = JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
          tshirts[item.title].color = [item.color];
          tshirts[item.title].size = [item.size];

        }
      }
    }
  
  return new Response((JSON.stringify(tshirts)), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// chat gpt code here
// import product from "@/models/product";
// import connectDb from "@/middleware/mongoose";

// export async function GET(req) {
//   await connectDb(); // Connect to the database
  
//   // Fetch all products
//   const Products = await product.find();
  
//   let tshirts = {};
//   for (let item of Products) {
//     if (item.title in tshirts) {
//       // Add color if it's not already present and availableQty > 0
//       if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
//         tshirts[item.title].color.push(item.color);
//       }
//       // Add size if it's not already present
//       if (!tshirts[item.title].size.includes(item.size)) {
//         tshirts[item.title].size.push(item.size);
//       }
//     } else {
//       // Initialize a new product entry
//       tshirts[item.title] = {
//         ...JSON.parse(JSON.stringify(item)), // Clone the item object
//         color: item.availableQty > 0 ? [item.color] : [],
//         size: [item.size]
//       };
//     }
//   }

//   // Return the tshirts object with all available sizes and colors
//   return new Response(JSON.stringify(tshirts), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }
