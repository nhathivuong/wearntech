import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext"

const ViewItemPage = () => {
  const { _id: itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);  //confirm that item was added to cart

  const { _id: cartId } = useContext(CartContext); 

  //Fetches
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        //Fetch item's data from database
        const itemResponse = await fetch(`/item/${itemId}`);
        if (!itemResponse.ok) throw new Error("Could not fetch item");
        const { itemData } = await itemResponse.json();
        setProduct(itemData);

        //Using item's data, fetch company data from database
        const companyResponse = await fetch(`/company/${itemData.companyId}`);
        if (!companyResponse.ok) throw new Error ("Could not fetch company");
        const { companyData } = await companyResponse.json();
        setCompany(companyData);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchItemData();
  },[itemId]);
  

  const handleAddToCart = async (ev) => {
    try {
      ev.preventDefault();
      setStatus("processing")
      const orderData = {
        _id: itemId,
        quantity
      }
      const body = JSON.stringify( orderData );
      const options = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body
      };
      const addToCartResponse = await fetch(`/cart/${cartId}/${itemId}`, options); 
      const { addToCartData } = await addToCartResponse.json();
      if (addToCartData.status !== 201) {
        setStatus("");
        console.log(addToCartData.message);
      } else {
        setAddedToCart(true);
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!product || !company) {
    return <p>Loading Information...</p>;
  }

  return (
    <>
      {/* General Item Data */}
      <section>
        <img src={product.imageSrc} alt={product.name} />
        <p>{product.category}</p>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>Designed By:</p>
        <Link to={`/company/${company._id}`}>{company.name}</Link>
        <p>Used on: {product.body_location}</p>
      </section>

      {/* Stock and Quantity */}
      <section>
      {
        product.numInStock === 0 ? (
          <button disabled>OUT OF STOCK</button>
        ) : (
          <>
            {/* Subtract quantity button */}
            <button onClick={() => setQuantity(Math.max(quantity - 1, 1))} disabled={quantity === 1}> - </button>
            {/* Displays desired amount*/}
            <span>{quantity}</span>
            {/* Increase quantity button */}
            <button onClick={() => setQuantity(Math.min(quantity + 1, product.numInStock))} disabled={quantity === product.numInStock}> + </button>

            {/* When max quantity is met, user is informed that they cannot purchase more*/}
            { 
              quantity === product.numInStock ? (
                <p>Maximum quantity available. No more stock for sale...</p>
              ) : (
                <p>Please purchase as many as you'd like!</p>
              )
            }
            <button onClick={handleAddToCart} disabled={status === "processing"}>Add to Cart</button>
          </>
        )}
      </section>

      {/* Confirmation message that item was added to cart*/}
      <section>
        {
          addedToCart && <p>{quantity}x {product.name}: Successfully added to Cart!</p>
        }
      </section>
    </>
  )
};

export default ViewItemPage;
//kev