import { createContext, useState } from "react";

const cartContext = createContext();

const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    return (
        <cartContext.Provider value={{cartItems,setCartItems}}>
            {children}
        </cartContext.Provider>
    );
}

export {cartContext,CartContextProvider};