import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Loading from "./Loading";

const Confirmation = () => {
  const location = useLocation();
  const { purchaseInfo } = location.state || {}; // Make sure purchaseInfo exists
  const [showContent, setShowContent] = useState(false);

  // Set a timer to show the content after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {showContent ? (
        <>
          <h2>Receipt Details</h2>
          <div>
            {Array.isArray(purchaseInfo) && purchaseInfo.length > 0 ? (
              purchaseInfo.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.details.imageSrc}
                    alt={item.details.name}
                    width="100"
                    height="100"
                  />
                  <h3>{item.details.name}</h3>
                  <p>Price: ${item.details.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))
            ) : (
              <p>No items found in your purchase.</p>
            )}
          </div>

          <div>
            <h1>Thank you for your purchase!</h1>
            <h3>Go back to the Homepage if you want to keep on shopping!</h3>
            <Link to="/">Homepage</Link>
          </div>
        </>
      ) : (
        // Show loading message
        <div>
          <h2>Thank you for shopping with us!</h2>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Confirmation;