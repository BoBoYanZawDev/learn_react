import { useContext, useEffect, useState } from "react"
import { Link } from "react-router";
import { AuthContext } from "./contexts/AuthContextProvider";
import { cartContext } from "./contexts/CartContextProvider";

function Navbar({productBySearch}) {
    const [search , setSearch] = useState("");
    let {user, logout} = useContext(AuthContext);
    let{cartItems} = useContext(cartContext);
  return (
        <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to={'/'} className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">ShopNow</span>
            </Link>
            
            <div className="flex items-center">
            <div className="relative flex items-center">
                <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                  type="text"
                  name='search'
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                
                <button className="absolute right-3 text-gray-700 hover:text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              {/* <Link to={"/"} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Products</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Categories</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">About</a> */}
            </div>

            <div className="flex items-center space-x-4">
        

          {!!user && <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <Link to={'/checkout'} className="relative text-gray-700 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {cartItems.length}
                </span>
              </Link>
              <Link to={'/profile'} className="text-gray-700 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button onClick={logout} className="border  border-red-400 hover:border-red-700 text-red-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
              </div>}
          {!user && 
              <div className="flex items-center space-x-4">
              <Link to={'/login'} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              <Link to={'/register'} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              </div>
          }
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
