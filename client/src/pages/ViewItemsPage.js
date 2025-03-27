import { useContext } from "react";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";

const ViewItemsPage = () => {
  const {allItems}  = useContext(AllItemsContext);

  return (
    <div>
      <h1>Items</h1>
      <div className="item-grid">
        { allItems? (
          allItems.length > 0? (
            allItems.map((item) => (
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