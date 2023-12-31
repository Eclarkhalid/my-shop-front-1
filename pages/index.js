import { mongooseConnect } from "@/lib/mongoose";
import Hero from "./components/Hero";
import { Product } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";

export default function Home({ featuredProduct, newProducts, collectionProduct1 }) {
  return (
    <main
      className={`min-h-screen p-4 bg-background `}
    >

      <Hero product={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
      <Collection product={collectionProduct1} />
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = '65389e25ec67ab0bf02bece1';
  const collectionId = '653fe50e35b8c406f3c51f9f';

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct1 = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 10})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct1: JSON.parse(JSON.stringify(collectionProduct1)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  }
}
