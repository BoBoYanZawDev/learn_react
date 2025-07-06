import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../components/contexts/AuthContextProvider";

function SignIn() {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  let { verifyToken } = useContext(AuthContext);
  let signInHandle = async (e) => {
    try{
        e.preventDefault();
        let res = await axios.post('http://react-ecommerce-api-main.test/api/login',formData);
            if(res.status == 200){
                localStorage.setItem('token',res.data.token);
                await verifyToken(res.data.token);
                 navigate('/');
            }
    }catch(e){
        if(e.status == 422 ){
            setError(e.response.data.errors);
        }
        if(e.status == 401 ){
            setError(e.response.data.errors);
            setFormData( {
                ...formData,
               password : ''
            });
        }
    }
  };
  let handleChange = (e) => {
    setFormData( {
        ...formData,
        [e.target.name] : e.target.value
    });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-pink-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-8 mt-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
          Sign In
        </h2>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a2 2 0 01-2 2H10a2 2 0 01-2-2v-1"
                  />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {error?.["email"] && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error?.["email"]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-gray-700"
            >
              Password{" "}
              <span className="text-xs text-gray-400">(6-30 chars)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v2m0 4h.01"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter  Password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition"
                value={formData.password}
                minLength={6}
                maxLength={30}
                onChange={handleChange}
              />
            </div>
            {error?.["password"] && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error?.["password"]}
              </p>
            )}
          </div>
          {error?.["message"] && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error?.["message"]}
              </p>
            )}
          <button
            type="button"
            onClick={signInHandle}
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-pink-200 transition-all duration-200 disabled:opacity-60"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
