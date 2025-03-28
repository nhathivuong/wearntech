import React, { createContext, useState, useEffect, useContext } from 'react';
import {UserContext} from './UserContext';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { currentUser } = useContext(UserContext);

    if (currentUser) {
        const url = `/cart/${currentUser.cartId}`; 

        useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch(url);
            const { data } = await response.json();
            setCart(data);
        };
        fetchCart();
        }, []);
    }
    

    return (
        <CartContext.Provider value={{cart}}>
            {children}
        </CartContext.Provider>
    );
};

// Export the context and provider
export default CartProvider;

//Need to add under UsersContext in index.js