import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";


// display one product and its details
const ViewItemPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  // fetching the product details and the company details
  useEffect(() => {
    let mounted = true;

    const fetchItemData = async () => {
      const response = await fetch(`/item/${params.itemId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setProduct(data.data);
          await fetchCompanyData(data.data.companyId);
        }
      }
    };

    const fetchCompanyData = async (companyId) => {
      const response = await fetch(`/company/${companyId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setCompany(data.data);
        }
      }
    };

    fetchItemData();

    return () => {
      mounted = false;
    };
  }, [params.itemId]);

  const handleAddToCart = () => {
    setFetched(true);
    setStatus(null);
    setError(null);

    fetch("/add-item-to-cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: product._id,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          setError(data.message);

          throw new Error(data.message);
        } else {
          setStatus("Added to cart!");
        }
      })
      .catch((error) => {
        console.error(error);
        setFetched(false);
      });
  };

  return (
    <>
      {!product || !company ? (
        <Loading>Loading...</Loading>
      ) : (
        <Container>
          <StatusBox>
            {error && <Error>{error}</Error>}
            {status && <Status>{status}</Status>}
          </StatusBox>
          <ProductBox>
            <Image src={product.imageSrc} alt="productImg" />
            <DetailsBox>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              <div>
                <Price>{product.price}</Price>
                <Info>
                  <div>
                    <Details>Details</Details>
                    <DetailsList>
                      Designed by{" "}
                      <StyledLink to={`/company/${company._id}`}>
                        {company.name}
                      </StyledLink>
                      <Location>Used on: {product.body_location}</Location>
                    </DetailsList>
                  </div>
                </Info>

                {product.numInStock === 0 ? (
                  <DisabledButton>OUT OF STOCK</DisabledButton>
                ) : (
                  <Flex>
                    <Quantity>
                      <QuantButtonContainer>
                        <QuantButton
                          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                          disabled={quantity === 1}
                        >
                          -
                        </QuantButton>
                        <QuantityValue>{quantity}</QuantityValue>
                        <QuantButton
                          onClick={() =>
                            setQuantity(
                              Math.min(quantity + 1, product.numInStock)
                            )
                          }
                          disabled={quantity === product.numInStock}
                        >
                          +
                        </QuantButton>
                      </QuantButtonContainer>
                      {quantity >= product.numInStock && (
                        <MessageQuant>Maximum amount in stock!</MessageQuant>
                      )}
                    </Quantity>

                    <Button onClick={handleAddToCart}>ADD TO CART</Button>
                  </Flex>
                )}
              </div>
            </DetailsBox>
          </ProductBox>
        </Container>
      )}
    </>
  );
};

export default ViewItemPage;
