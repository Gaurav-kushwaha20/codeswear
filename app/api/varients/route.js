import product from "@/models/product";
import connectDb from "@/middleware/mongoose";

export async function GET(req) {
  await connectDb(); // Ensure database connection

  // Extract title from query parameters
  const { searchParams } = new URL(req.url);
  console.log(searchParams)
  const title = searchParams.get('title');

  // Fetch multiple products based on title
  const products = await product.find({ title });
  let colorSizeSlug = {};
  
  for(let items of products){
    if(Object.keys(colorSizeSlug).includes(items.color)){
        colorSizeSlug[items.color][items.size] = {slug: items.slug}
    }
    else{
        colorSizeSlug[items.color] = {}
        colorSizeSlug[items.color][items.size] = {slug: items.slug}
    }
  }

  return new Response(JSON.stringify(colorSizeSlug ), {
    headers: { 'Content-Type': 'application/json' },
  });
}
