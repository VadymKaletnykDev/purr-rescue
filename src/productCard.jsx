import React from 'react';

function ProductCard({ id, productName, productCategory, productDescription, productPrice, productImage, productQuantity }) {
  // Create an inline style object for the background image
  const backgroundImageStyle = {
    backgroundImage: `url(${productImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center center',
  };

  return (
    <div className="wrapper">
      <div className="services">
        <a href="#">
          <span className="single-img" style={backgroundImageStyle}> {/* Add the inline style here */}
            <span className="img-text">
              <h4>{productName}</h4>
              <p>&nbsp;</p>
              <p>{productPrice}$</p>
              <p>&nbsp;</p>
              <button>View product</button>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default ProductCard;