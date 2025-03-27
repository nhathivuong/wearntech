import { useContext, useEffect, useState } from "react";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";
import { useLocation } from "react-router-dom";

const ViewItemsPage = () => {
  const {allItems}  = useContext(AllItemsContext);
  const location = useLocation()
  const [filter, setFilter] = useState(()=> (item) => true)
  //extracts information from the query
  const filters = new URLSearchParams(location.search)
  const category = filters.get("category")
  const bodyLocation = filters.get("body")

  //sets the filters for the array.filter() for the display of items
  useEffect(()=> {
      setFilter(()=>(item)=> {
        // checks if the filter is applied
        const categoryFilter = !category || item.category.toLowerCase() === category
        const bodyFilter = !bodyLocation || item.body_location.toLowerCase() === bodyLocation
        return categoryFilter && bodyFilter
      })
    },[category, bodyLocation])
  
  // checks if the array is loaded 
  if(!allItems){
    return <p>Loading items...</p>
  }
  return (
    <div>
      <h1>Items</h1>
      <div className="item-grid">
        {(allItems.length > 0) ? (
            allItems.filter(filter).map((item) => (
              <ItemCard key={item._id} item={item}/>
              ))
          ) : (
            <p>No items available</p>
          )
        }
      </div>
    </div>
  );
};

export default ViewItemsPage;