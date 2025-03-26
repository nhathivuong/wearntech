import { useContext } from "react";
import { AllItemsContext } from "../contexts/AllItemsContext"

const ViewItemsPage = () => {
  const {allItems}  = useContext(AllItemsContext);

  return (
    <div>
      <h1>Items</h1>
      <div className="item-grid">
        {allItems.length === 0 ? (
          <p>No items available.</p>
        ) : (
          allItems.map((item) => (

            <ItemCard key={item._id}/>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewItemsPage;