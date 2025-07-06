import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { cartContext } from '../components/contexts/CartContextProvider';
import ProductDetailSke from './ProductDetailSke';

function ProductDetail() {
  let navigate = useNavigate();
  let {id} = useParams();
  let [product,setProduct] = useState(null);
  let [loading, setLoading] = useState(true);
  let [count,setCount] = useState(1);
  let {cartItems,setCartItems} = useContext(cartContext);
  let  incressment = () => {
      setCount(count +1 );
  }
  let  descrement = () => {
    if(count <= 1) return ;
      setCount(count -1 );
  }
  
  let addToCart = () => {
    let newItem = {
      ...product,
      quantity:count
    }
    let exitingItem = cartItems.find(item => item.id === newItem.id);
    let items = [...cartItems];
    if(exitingItem){
      exitingItem.quantity += count;
      items = [...cartItems.filter(item => item.id !== newItem.id),exitingItem];
      setCartItems(items);
      localStorage.setItem('cartItems',JSON.stringify(items));
      navigate('/checkout');
      return;
    }
    items.push(newItem);
    localStorage.setItem('cartItems',JSON.stringify(items));
    setCartItems(items);
    navigate('/checkout');
  }

  useEffect(()=>{
    setLoading(true);
    fetch('http://react-ecommerce-api-main.test/api/products/'+id)
    .then(response => response.json())
    .then(data => {
      setProduct(data.product);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching product:', error);
      setLoading(false);
    });
  },[]);

  // Loading UI
  if(loading) {
    return (
      <ProductDetailSke/>
    );
  }

  if(!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg bg-gray-100"
                />
              </div>
              {/* <div className="grid grid-cols-4 gap-2">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Thumbnail 1"
                  className="w-full h-20 object-contain rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500 bg-gray-50"
                />
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Thumbnail 2"
                  className="w-full h-20 object-contain rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500 bg-gray-50"
                />
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Thumbnail 3"
                  className="w-full h-20 object-contain rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500 bg-gray-50"
                />
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Thumbnail 4"
                  className="w-full h-20 object-contain rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500 bg-gray-50"
                />
              </div> */}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-blue-600 font-medium mb-2 block">{product.category.name}</span>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating?.rate || 0) ? 'text-yellow-400' : i === Math.floor(product.rating?.rate || 0) && (product.rating?.rate || 0) % 1 > 0 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* <span className="text-gray-600">{product.rating?.rate} ({product.rating?.count} reviews)</span> */}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">$ {product.price}</span>
                  {/* <span className="text-lg text-gray-500 line-through">$129.95</span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    15% OFF
                  </span> */}
                </div>
                <p className="text-green-600 text-sm font-medium">
                  ✓ In stock and ready to ship
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex space-x-3">
                    <button className="w-8 h-8 bg-green-600 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
                    <button className="w-8 h-8 bg-blue-600 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
                    <button className="w-8 h-8 bg-red-600 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
                    <button className="w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button onClick={descrement} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-lg font-medium">{count}</span>
                    <button onClick={incressment} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button onClick={addToCart} className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                    Buy Now
                  </button>
                </div>

                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                <div className="prose prose-sm text-gray-600 space-y-3">
                  <p>
                    {product.description}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>High-quality materials</li>
                    <li>Durable construction</li>
                    <li>Excellent value for money</li>
                    <li>Customer satisfaction guaranteed</li>
                    <li>Fast shipping available</li>
                    <li>Easy returns and exchanges</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Free shipping on orders over $50</span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
