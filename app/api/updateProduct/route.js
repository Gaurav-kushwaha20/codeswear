import product from "@/models/product";
import connectDb from "@/middleware/mongoose";

// Update products in the database
export async function POST(req) {
  await connectDb(); // Ensure the database is connected
  
  try {
    // Parse the request body
    const body = await req.json();
    
    // Loop through the products and update each by its slug
    for (let i = 0; i < body.length; i++) {
      await product.findOneAndUpdate(
        { slug: body[i].slug },  // Find the product by slug
        body[i],                 // Update the product with new data
        { new: true }            // Return the updated product
      );
    }

    return new Response(JSON.stringify({ success: true, message: "Products updated successfully!" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Failed to update products!" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
