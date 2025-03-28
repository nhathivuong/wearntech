import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  // State for showing a message after adding an item to the cart
  const [added, setAdded] = useState(false);

  // Handle add to cart action
  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(item);  // Add item to cart (this will come from parent component)
    setAdded(true);  // Show confirmation message
    setTimeout(() => setAdded(false), 2000);  // Hide confirmation after 2 seconds
  };

  return (
    <NavLink className="item-card" onClick={() => navigate(`/item/${item._id}`)}>
      <div className="item-card-header">
        {/* Item Image */}
        <img src={item.imageSrc} alt={item.name} className="item-image" />
      </div>

      <div className="item-card-body">
        {/* Item Name */}
        <h3 className="item-name">{item.name}</h3>
        
        {/* Item Price */}
        <p className="item-price">{item.price}</p>

        {/* Item Description (optional) */}
        <p className="item-category">Category: {item.category}</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={item.numInStock === 0}>
          {item.numInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Confirmation Message */}
        {added && <p className="added-message">Added to Cart!</p>}
      </div>
    </NavLink>
  );
};

export default ItemCard;