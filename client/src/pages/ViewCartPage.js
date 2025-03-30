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
       if (!cartId || !itemId) return; // Don't run the fetch if cartId or itemId is not defined
    fetch(`/cart/${cartId}/${itemId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching cart items");
        }
      })
      .then((parsed) => {
        return fetchItemsDetails(parsed.data);  // Fetching additional details of the items
      })
      .then((itemsWithDetails) => {
        setCartItems(itemsWithDetails);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetching item details such as price, numInStock
  const fetchItemsDetails = (items) => {
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
    fetch("/purchase-item", {
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
    fetch(`/delete-item/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
          setCartItems(updatedCartItems);
        } else {
          throw new Error("Error deleting item from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle deletion of all items from the cart
  const handleEmptyCart = () => {
    fetch("/delete-AllItems", {
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