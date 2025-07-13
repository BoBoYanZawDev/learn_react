import React from 'react';
import cart  from '../assets/cart.svg';
import { Link } from 'react-router';

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 h-full ">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <img src={cart} alt="cart" className="w-full h-full" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h2>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
      </p>
      
      <Link to={'/'} 
       className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Continue Shopping
        {/* <ArrowRight className="w-4 h-4" /> */}
      </Link>
    </div>
  );
};

export default CartEmpty;
