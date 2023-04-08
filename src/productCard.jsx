import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  id,
  productName,
  productCategory,
  productDescription,
  productPrice,
  productImage,
  productQuantity,
  onFormSwitch, // Destructure onFormSwitch directly
}) {
  // Create an inline style object for the background image
  const backgroundImageStyle = {
    backgroundImage: `url(${productImage})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  const handleViewProductClick = (destination, productId) => {
    // switch to the registration form and change background image
    navigate(destination + "?pId=" + productId + "&pName=" + productName) // Use onFormSwitch directly
  };

  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="services">
          <span className="single-img" style={backgroundImageStyle}>
            {/* Add the inline style here */}
            <span className="img-text">
              <h4>{productName}</h4>
              <p>&nbsp;</p>
              <p>{productPrice}$</p>
              <p>&nbsp;</p>
              <button onClick={() => handleViewProductClick("/view" , id, productName)}>View product</button>
            </span>
          </span>
      </div>
    </div>
  );
}

export default ProductCard;
