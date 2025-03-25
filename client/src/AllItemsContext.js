import React from "react";
import { useState, useEffect } from "react";

export const AllItemsContext = React.createContext();

const AllItemsProvider = ({children}) => {
    const [allItems, setAllItems] = useState(null)

    useEffect(() => {
        const getItems = async () => {
            try{
                const res = await fetch("/items");
                const {allItems} = await res.json();
                setAllItems(allItems)
            } catch (err) {
                console.error(err)
            }
        }
        getItems();
    }, [])
    return (
        <AllItemsContext.Provider value={{allItems, setAllItems}} >
            {children}
        </AllItemsContext.Provider>
    )
}

export default AllItemsProvider