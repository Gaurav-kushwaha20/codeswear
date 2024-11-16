import product from "@/models/product";
import connectDb from "@/middleware/mongoose";

// Add products to the database
export async function POST(req) {
  await connectDb();  // Ensure the database is connected
  
  try {
    // Parse the request body
    const body = await req.json();
    
    // Loop through the products and save each to the database
    for (let i = 0; i < body.length; i++) {
      let p = new product({
        title: body[i].title,
        slug: body[i].slug,
        desc: body[i].desc,
        img: body[i].img,
        category: body[i].category,
        size: body[i].size,
        color: body[i].color,
        price: body[i].price,
        availableQty: body[i].availableQty,
      });
      await p.save();
    }

    return new Response(JSON.stringify({ success: true, message: "Products added successfully!" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Failed to add products!" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
