import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

//confirmation page, upon clicking on checkout from the cart

const Confirmation = () => {
  const location = useLocation();
  const { purchaseInfo } = location.state;
  const [showContent, setShowContent] = useState(false);

  // Set a timer to show the content after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    // Clean up the timer when the component unmounts or when the dependency changes
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      {showContent ? (
        <>
          <h2>Receipt Details</h2>
          <PurchaseInfo>
            {purchaseInfo.map((item, index) => (
              <div key={index}>
                <img src={item.details.imageSrc} alt={item.details.name} />
                <h3>{item.details.name}</h3>
                <p>Price: ${item.details.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </PurchaseInfo>
          <ReturnSection>
            <ReturnText>
              <h1>Thank you!</h1>
              <h3> Go back to the Homepage if you want to keep on shopping! </h3>
            </ReturnText>
            <ReturnButton to="/">Homepage</ReturnButton>
          </ReturnSection>
        </>
      ) : (
        // Show loading message

        <LoadingBox>
          <StyledHeading>Thank you for shopping with us!</StyledHeading>
          <Loading />
        </LoadingBox>
      )}
    </Container>
  );
};
