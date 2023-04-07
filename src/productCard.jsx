import React, { useState, useEffect } from "react";

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

  const handleViewProductClick = () => {
    // switch to the registration form and change background image
    onFormSwitch("view"); // Use onFormSwitch directly
  };

  return (
    <div className="wrapper">
      <div className="services">
        <a href="#">
          <span className="single-img" style={backgroundImageStyle}>
            {/* Add the inline style here */}
            <span className="img-text">
              <h4>{productName}</h4>
              <p>&nbsp;</p>
              <p>{productPrice}$</p>
              <p>&nbsp;</p>
              <button onClick={handleViewProductClick}>View product</button>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
