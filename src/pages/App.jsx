import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

export default function App() {
  let [products,setProducts] = useState([]);
  useEffect(() => {
    fetch('http://react-ecommerce-api-main.test/api/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data.products)});
  },[]);

  let productBySearch = (search)=>{
    setTimeout(() => {
      if(!search){
        fetch('http://react-ecommerce-api-main.test/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        return;
      }
      let filteredProduct = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
      setProducts(filteredProduct);
    }, 200);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => 
              <ProductCard key={product.id} product={product} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
