import React from "react";
import { useState, useEffect } from "react";

export const AllItemsContext = React.createContext();

const AllItemsProvider = ({ children }) => {
    const [allItems, setAllItems] = useState(null)
    const [refetch , setRefetch] = useState(0)

    useEffect(() => {
        const getAllItems = async () => {
            const response = await fetch("https://wearntech.onrender.com/items");
            const {data} = await response.json();
            setAllItems(data);
        };
        getAllItems();
    }, [refetch])

    return (
        <AllItemsContext.Provider value={{allItems, setAllItems, setRefetch}} >
            {children}
        </AllItemsContext.Provider>
    )
}

export default AllItemsProvider