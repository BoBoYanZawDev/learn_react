import { useContext, useEffect, useState } from 'react';
import { cartContext } from '../components/contexts/CartContextProvider';

function CheckOut() {
  let {cartItems,setCartItems} = useContext(cartContext);
  useEffect(() => {
    let items = localStorage.getItem('cartItems');
    setCartItems(JSON.parse(items));
},[])
    // Add more items as needed
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    let newCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <span className="text-xs text-blue-800 bg-blue-100 font-semibold rounded px-2 py-1">
                          {item.category.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-800 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        $ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$ {subtotal.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>$ {tax.toFixed(2)}</span>
                </div> */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span>$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
