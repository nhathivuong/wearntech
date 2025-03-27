import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { LoadingSpinner, ErrorBoundary } from "../components"; // Assuming these components exist

const ViewItemPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // Fetch item and company data in one function
  const fetchItemData = useCallback(async (itemId) => {
    try {
      const productRes = await fetch(`/item/${itemId}`);
      if (!productRes.ok) throw new Error("Failed to fetch product data");
      const productData = await productRes.json();

      setProduct(productData.data);

      const companyRes = await fetch(`/company/${productData.data.companyId}`);
      if (!companyRes.ok) throw new Error("Failed to fetch company data");
      const companyData = await companyRes.json();

      setCompany(companyData.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchItemData(params.itemId);
  }, [params.itemId, fetchItemData]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("/add-item-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: product._id,
          quantity,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setStatus("Item added to cart!");
    } catch (error) {
      setError(error.message);
    }
  };

  // Return a loading spinner or skeleton if product or company is still loading
  if (!product || !company) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="product-details-container">
        <div className="status-box">
          {error && <div className="error-message">{error}</div>}
          {status && <div className="status-message">{status}</div>}
        </div>

        <div className="product-box">
          <img src={product.imageSrc} alt={product.name} className="product-image" />
          <div className="details-box">
            <div className="product-category">{product.category}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price}</div>

            <div className="product-info">
              <div className="product-details">
                <div>
                  Designed by{" "}
                  <Link to={`/company/${company._id}`} className="company-link">
                    {company.name}
                  </Link>
                </div>
                <div>Used on: {product.body_location}</div>
              </div>
            </div>

            {/* Stock and Quantity */}
            {product.numInStock === 0 ? (
              <button disabled className="out-of-stock-btn">
                OUT OF STOCK
              </button>
            ) : (
              <div className="quantity-section">
                <div className="quantity-container">
                  <button
                    onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                    disabled={quantity === 1}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(quantity + 1, product.numInStock))}
                    disabled={quantity === product.numInStock}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                {quantity >= product.numInStock && (
                  <div className="max-quantity-message">Maximum quantity in stock!</div>
                )}
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ViewItemPage;