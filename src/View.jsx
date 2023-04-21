import React, { useState, useEffect } from "react";
import { firestore, auth } from "./firebase/firebase";
import Slider from "./slider";
import ProductCard from "./productCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
import "./View.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert";

import {
  faCartPlus,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const ViewProduct = (props) => {
  const showError = (errorTitle, errorMessage) => {
    Swal({
      title: errorTitle,
      text: errorMessage,
      icon: "error",
      button: "OK",
    });
  };

  const showConfirm = (confirmTitle, confirmMessage) => {
    Swal({
      title: confirmTitle,
      text: confirmMessage,
      icon: "success",
      button: "OK",
    });
  };

  const addToCart = async () => {
    const user = auth.currentUser;
    console.log("USer id = " + auth.currentUser);

    if (!user) {
      showError("Please sign in to add items to the cart.");
      return;
    }

    const userId = user.uid;
    const cartRef = firestore.collection("carts").doc(userId);
    const cartSnapshot = await cartRef.get();

    let cartData;

    if (!cartSnapshot.exists) {
      cartData = [];
      await cartRef.set({ products: cartData });
    } else {
      cartData = cartSnapshot.data().products;
    }

    const existingProductIndex = cartData.findIndex((p) => p.id === productId);

    if (existingProductIndex >= 0) {
      cartData[existingProductIndex].quantity += quantity;
    } else {
      cartData.push({
        id: productId,
        name: product.productName,
        price: product.productPrice,
        quantity: quantity,
        imageUrl: product.productImage, // Add this line to save the image URL
      });
    }

    await cartRef.update({ products: cartData });
    showConfirm("Congratulation", "Product added to cart!");
  };

  const navigate = useNavigate();

  const handleNavigate = (destination) => {
    navigate(destination);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const productId = queryParams.get("pId");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      if (productId) {
        const docRef = firestore.collection("products").doc(productId);
        const doc = await docRef.get();
        if (doc.exists) {
          setProduct(doc.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchProductData();
  }, [productId]);

  return (
    <div>
      <div className="logoView">
        <img src={require("./Images/logo.png")} alt="logo" />
      </div>
      <div className="header-view">
        <div className="header__top-view">
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__item">
                <button
                  className="link-button"
                  onClick={() => handleNavigate("/shop")}
                >
                  Home
                </button>
              </li>
              <li className="menu__item">
                <button className="link-button">Collections</button>
                <ul className="menu__sublist">
                  <li className="menu__subitem">
                    <button
                      className="link-button-sub"
                      onClick={() => handleNavigate("/toys")}
                    >
                      Toys
                    </button>
                  </li>
                  <li className="menu__subitem">
                    <button
                      className="link-button-sub"
                      onClick={() => handleNavigate("/food")}
                    >
                      Food
                    </button>
                  </li>
                  <li className="menu__subitem">
                    <button
                      className="link-button-sub"
                      onClick={() => handleNavigate("/litter")}
                    >
                      Litter and Litter Boxes
                    </button>
                  </li>
                  <li className="menu__subitem">
                    <button
                      className="link-button-sub"
                      onClick={() => handleNavigate("/clothes")}
                    >
                      Clothes
                    </button>
                  </li>
                </ul>
              </li>
              <li className="menu__item">
                <a
                  className="link-button"
                  href="https://vadymkaletnykdev.github.io/Responsive-Portfolio/"
                >
                  About Me
                </a>
              </li>
              <li className="menu__item">
                <button
                  className="link-button"
                  onClick={() => handleNavigate("/checkout")}
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="view-product">
        <div className="image-container">
          <img src={product.productImage} alt={product.name} />
        </div>
        <div className="details-container">
          <h1>{product.productName}</h1>
          <h2>DESCRIPTION</h2>
          <p>{product.productDescription}</p>
          <p className="price">Price: ${product.productPrice}</p>
          <button className="add-to-cart" onClick={addToCart}>
            <FontAwesomeIcon icon={faCartPlus} />
            Add to cart
          </button>
          <div className="quantity-container">
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
