import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

//cart logic that receives the cart items from backend , deletes them , or post them using the checkout button
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  //fetching cart items
  const fetchCartItems = () => {
    fetch("/api/cart")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching cart items");
        }
      })
      .then((parsed) => {
        return fetchItemsDetails(parsed.data);
      })
      .then((itemsWithDetails) => {
        setCartItems(itemsWithDetails);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //fetching cart items details such as price 
  const fetchItemsDetails = (items) => {
    const itemDetailsPromises = items.map((item) => {
      return fetch(`/api/item/${item._id}`)
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
            //converting price from string to a number so we do calculations
            const priceWithoutSymbol = parsed.data.price.replace("$", ""); 
            item.details = {
              ...parsed.data,
              price: parseFloat(priceWithoutSymbol),
            }; // we pushed the items in the cart into item.details to use it later in our return
            return item; // Return the modified item object
          } else {
            return item;
          }
        })
        .catch((error) => {
          console.error(error);
          return item;
        });
    });

    //store all promises and execute them when they are met
    return Promise.all(itemDetailsPromises)
      .then((itemDetails) => itemDetails.filter((item) => item !== null))
      .catch((error) => {
        console.error(error);
        return items;
      });
  };

  //decrease quant logic
  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  //increase quant logic , the limit is the number of articles in stock
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

  //logic for calculating the total order price
  const calculateOrderTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.details.price * item.quantity;
    });
    return total;
  };

  const handleCheckout = () => {
    // Perform post request to submit the cartItems for checkout
    fetch("/api/purchase-item", {
      method: "POST",
      body: JSON.stringify(cartItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Do something after successful checkout, e.g., show confirmation message
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

  const handleDeleteItem = (itemId) => {
    // Perform delete request to remove a single item from the cart
    fetch(`/api/delete-item/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update the cartItems state to reflect the deletion
          const updatedCartItems = cartItems.filter(
            (item) => item._id !== itemId
          );
          setCartItems(updatedCartItems);
        } else {
          throw new Error("Error deleting item from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmptyCart = () => {
    // Perform delete request to remove all items from the cart
    fetch("/api/delete-AllItems", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update the cartItems state to reflect the deletion of all items
          setCartItems([]);
        } else {
          throw new Error("Error deleting all items from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingBox>
          <Loading/>
        </LoadingBox>
        
      ) : cartItems.length > 0 ? (
        <>
          <ItemList>
            {cartItems.map((item, index) => (
              <Item key={index}>
                <ItemImage
                  src={item.details.imageSrc}
                  alt={item.details.name}
                />
                <ItemDetails>
                  <ProductName>{item.details.name}</ProductName>
                  <Category>{item.details.category}</Category>
                  <Price>
                    Price: $<span>{(item.details.price * item.quantity).toFixed(2)}</span>
                  </Price>
                  <Quantity>
                    <Button onClick={() => decreaseQuantity(index)}>-</Button>
                    <QuantityValue>{item.quantity}</QuantityValue>
                    <Button onClick={() => increaseQuantity(index)}>+</Button>
                    {/* it shows a message upon reaching max quantity in stock */}
                    {item.quantity >= item.details.numInStock && (
                      <MessageQuant>Maximum amount in stock!</MessageQuant>
                    )}
                    <DeleteButton onClick={() => handleDeleteItem(item._id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </DeleteButton>
                  </Quantity>
                </ItemDetails>
              </Item>
            ))}
          </ItemList>
          <BottomSection>
            <OrderTotal>
              ORDER TOTAL: ${calculateOrderTotal().toFixed(2)}
            </OrderTotal>

            {/* redirect user to confirmation page */}

            <BtnBox>
              <CheckoutButton onClick={handleCheckout}>
                Proceed to Checkout
              </CheckoutButton>

              <EmptyCartButton onClick={handleEmptyCart}>
                Empty Cart
              </EmptyCartButton>
            </BtnBox>
          </BottomSection>

          {/* Delete all items from the cart */}
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
};
