import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Logo from "../../assets/logo.jpeg";
import Rating from "../../components/Rating";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import Toast from "../../components/Toast";
import ProductHorizontalCard from "../../components/ProductHorizontalCard";
import Loading from "../../components/loading/Loading"; // import the Loading component

function CategoryProducts({ type }) {
  const navigate = useNavigate();
  let endpoint = null;
  if (type === "category") {
    const { categoryId } = useParams();
    endpoint = `/categories/products?category_id=${categoryId}`;
  } else if (type === "subcategory") {
    const { subcategoryId } = useParams();
    endpoint = `/categories/products?subcategory_id=${subcategoryId}`;
  } else {
    navigate("error");
  }

  const [isLoading, setIsLoading] = useState(true); // add a state variable to track the loading status
  const [showToast, setShowToast] = useState(false);
  const [toastProperties, setToastProperties] = useState({});

  useEffect(() => {
    if (showToast) {
      const timeoutId = setTimeout(() => {
        setShowToast(false);
        setToastProperties({});
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showToast]);

  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    if (endpoint) {
      api
        .get(endpoint)
        .then((response) => {
          setCategoryProducts(response.data === null ? [] : response.data);
          console.log(response.data);
          setIsLoading(false); // set isLoading to false when the data has been fetched
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false); // set isLoading to false even if there is an error
        });
    }
  }, []);

  const handleAddToCart = (productItemId, minOrderQuantity) => {
    api
      .post("/carts", {
        product_item_id: productItemId,
        quantity: minOrderQuantity,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("item added to cart successfully");
          setShowToast(true);
          setToastProperties({
            toastType: "success",
            toastMessage: "Item added to Cart successfully",
          });
        } else if (response.status === 200) {
          console.log("item already exists. Quantity increased +1");
          setShowToast(true);
          setToastProperties({
            toastType: "success",
            toastMessage: "Item already exists. Quantity increased +1",
          });
        }
      })
      .catch((error) => {
        console.error("some error occured in adding to cart");
        console.error(error);
        setShowToast(true);
        setToastProperties({
          toastType: "error",
          toastMessage: "some error occured in adding to cart",
        });
      });
  };

  return (
    <>
      {showToast && (
        <Toast
          toastType={toastProperties.toastType}
          message={toastProperties.toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      {isLoading ? ( // display the Loading component while the data is being fetched
        <Loading />
      ) : (
        <>
          <NavBar />
          <h1>Products</h1>
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-left">
              {categoryProducts && categoryProducts.length > 0 ? (
                categoryProducts.map((product) => {
                  return (
                    <ProductHorizontalCard
                      key={product.id}
                      productId={product.id}
                      productItemId={product.base_product_item.id}
                      imgSrc={product.base_product_item.media.path}
                      cardTitle={product.product_name}
                      sellerName={product.seller.seller_name}
                      originalPrice={product.base_product_item.original_price}
                      offerPrice={product.base_product_item.offer_price}
                      average_rating={product.average_rating}
                      ratingCount={product.rating_count}
                      minOrderQuantity={product.min_order_quantity}
                      maxOrderQuantity={product.max_order_quantity}
                      quantityInStock={
                        product.base_product_item.quantity_in_stock
                      }
                      productVariantName={
                        product.base_product_item.product_variant_name
                      }
                      variant={product.base_product_item.variant}
                      variantValue={product.base_product_item.variant_value}
                      onAddToCart={() =>
                        handleAddToCart(product.base_product_item.id, 1)
                      }
                    />
                  );
                })
              ) : (
                <h1>No Products</h1>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default CategoryProducts;
