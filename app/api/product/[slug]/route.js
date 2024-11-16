// /app/api/product/[slug]/route.js
import product from "@/models/product";
import connectDb from "@/middleware/mongoose";

export async function GET(req, { params }) {
  await connectDb();  // Connect to MongoDB

  const { slug } = params;  // Get the slug from the request params
  try {
    // Fetch the product based on the slug
    const singleProduct = await product.findOne({ slug: slug });

    if (!singleProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(singleProduct), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
      status: 500,
    });
  }
}
