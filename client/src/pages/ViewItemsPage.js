import { useContext, useState } from "react";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";
import { useLocation } from "react-router-dom";

const ViewItemsPage = () => {
  const {allItems}  = useContext(AllItemsContext);
  const location = useLocation()
  const noFilter = (item) => true
  const [filter, setFilter] = useState(noFilter)
  //extracts information from the query
  const filters = new URLSearchParams(location.search)
  const category = filters.get("category")
  const bodyLocation = filters.get("body")
  
  //sets the filters for the array.filter() for the display of items
  if(category){
    const categoryfilter = (item)=> item.category === category
    setFilter(categoryfilter)
  }
  if(bodyLocation){
    const bodyfilter = (item)=> item.body_location === bodyLocation
    setFilter(bodyfilter)
  }

  return (
    <div>
      <h1>Items</h1>
      <div className="item-grid">
        { allItems? (
          allItems.length > 0? (
            allItems.filter(filter).map((item) => (
              <ItemCard key={item._id} item={item}/>
              ))
          ) : (
            <p>No items available.</p>
          )
        ) : (
          <p>Loading items...</p>
        )}
        
        
        
        
      </div>
    </div>
  );
};

export default ViewItemsPage;