import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  let [user,setUser] = useState(null);
  let verifyToken = async (token) =>{
      let res = await axios.get('http://react-ecommerce-api-main.test/api/user',{
         headers : {
            'Authorization' : `Bearer ${token}`
         }
      });
      if(res.status == 200){
        if(res.data[0]?.errors.message == 'Unauthenticated.'){
          console.log('not login');
          return;
        }else{
          setUser(res.data);
        }
      }else{
        localStorage.removeItem('token')
      }
    }

    let logout = () =>{
    localStorage.removeItem('token');
    setUser(null);
    }
  useEffect(()=>{
    let token = localStorage.getItem('token');
    if(token){
      verifyToken(token);
    }
  },[]);
  return <AuthContext.Provider value={{user,verifyToken,logout}}>{children}</AuthContext.Provider>;
};

export  {AuthContext ,AuthContextProvider};
