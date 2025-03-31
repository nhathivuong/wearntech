import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { CartContext } from "../contexts/CartContext"

const ViewCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { _id: cartId } = cart; // Access the cart._id here  
  const { _id: itemId } = useParams();

  // Fetching cart items and their details (e.g., price)
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from the backend
  const fetchCartItems = () => {
    if (!cartId) {
      console.error("Cart ID is missing.");
      return;
    }
  
    const url = `/cart/${cartId}/`;  // Updated URL without itemId
    console.log("Fetching cart items from URL:", url);
  
    fetch(url)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`Error fetching cart items: ${response.statusText}`);
        }
        return response.json();
      })
      .then((parsed) => {
        console.log("Fetched cart response:", parsed);
        const items = parsed.data.items;
        if (!items || items.length === 0) {
          console.error("No items found in the cart data:", parsed);
          return [];  // Return empty array if no items exist
        }
        
        // Log the items data to inspect
        console.log("Cart items data:", items);
  
        return fetchItemsDetails(items);  // Continue with fetching item details
      })
      .then((itemsWithDetails) => {
        setCartItems(itemsWithDetails);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetchCartItems:", error);
      });
  };

  // Fetching item details such as price, numInStock
  const fetchItemsDetails = (items) => {
    // Log items to inspect the data
    console.log("Items in the cart:", items);
  
    if (!Array.isArray(items)) {
      // If items is not an array, return an empty array or handle it accordingly
      console.error("Items is not an array:", items);
      return [];
    }
  
    const itemDetailsPromises = items.map((item) => {
      return fetch(`/item/${item._id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(`Error fetching details for item ID: ${item._id}`);
            return null;
          }
        })
        .then((parsed) => {
          if (parsed) {
            // Converting price from string to number for calculation purposes
            const priceWithoutSymbol = parsed.data.price.replace("$", "");
            item.details = {
              ...parsed.data,
              price: parseFloat(priceWithoutSymbol),
            };
            return item;
          } else {
            return item;
          }
        })
        .catch((error) => {
          console.error(error);
          return item;
        });
    });
  
    return Promise.all(itemDetailsPromises)
      .then((itemDetails) => itemDetails.filter((item) => item !== null))
      .catch((error) => {
        console.error(error);
        return items;
      });
  };

  // Decrease quantity of an item
  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  // Increase quantity of an item, the limit is the number of items in stock
  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (
      updatedCartItems[index].quantity <
      updatedCartItems[index].details.numInStock
    ) {
      updatedCartItems[index].quantity++;
      setCartItems(updatedCartItems);
    }
  };

  // Calculate the total price of the items in the cart
  const calculateOrderTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.details.price * item.quantity;
    });
    return total;
  };

  // Handle checkout
  const handleCheckout = () => {
    fetch(`/cart/${cartId}`, {
      method: "POST",
      body: JSON.stringify(cartItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to confirmation page after successful checkout
          navigate("/confirmation", {
            state: { purchaseInfo: cartItems },
          });
        } else {
          throw new Error("Error during checkout");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle deletion of a single item from the cart
  const handleDeleteItem = (itemId) => {
    console.log("Deleting item with ID:", itemId);
    console.log("From cart with ID:", cartId);
    const itemExists = cartItems.find(item => item._id === itemId);
    if (!itemExists) {
        console.error("Item not found in cart!");
        return;
      }
    fetch(`/cart/${cartId}/${itemId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
          setCartItems(updatedCartItems);
        } else {
          console.error("Error deleting item from cart:", response.statusText);
          throw new Error("Error deleting item from cart");
        }
      })
      .catch((error) => {
        console.error("Error deleting item from cart:", error);
      });
  };
    

  // Handle deletion of all items from the cart
  const handleEmptyCart = () => {
    fetch(`/cart/${cartId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCartItems([]);  // Empty the cart state
        } else {
          throw new Error("Error deleting all items from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      {isLoading ? (
        <Loading />  
      ) : cartItems.length > 0 ? (
        <>
          <div>
            {cartItems.map((item, index) => (
              <div key={index}>
                <img src={item.details.imageSrc} alt={item.details.name} />
                <div>
                  <h3>{item.details.name}</h3>
                  <p>{item.details.category}</p>
                  <p>Price: ${item.details.price.toFixed(2)}</p>
                  <div>
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                    {item.quantity >= item.details.numInStock && (
                      <span>Maximum amount in stock!</span>
                    )}
                    <button onClick={() => handleDeleteItem(item._id)}>
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p>ORDER TOTAL: ${calculateOrderTotal().toFixed(2)}</p>
            <div>
              <button onClick={handleCheckout}>Proceed to Checkout</button>
              <button onClick={handleEmptyCart}>Empty Cart</button>
            </div>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ViewCartPage;