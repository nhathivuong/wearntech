import React, { createContext, useState, useEffect, useContext } from 'react';
import {UserContext} from './UserContext';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const { currentUser } = useContext(UserContext);


    useEffect(() => {
        if (!currentUser) return;
        const url = `/cart/${currentUser.cartId}`; 

        const fetchCart = async () => {
            try {
                const response = await fetch(url);
                const { data } = await response.json();
                setCart(data);
            } catch (error) {
                console.error("Error fetching cart:", error)
            }
        };
        fetchCart();
    }, [currentUser]);
    const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <CartContext.Provider value={{cart, totalItems}}>
            {children}
        </CartContext.Provider>
    );
};

// Export the context and provider
export default CartProvider;

//Need to add under UsersContext in index.js