import React, { useState, useEffect } from "react";
import { firestore, auth } from "./firebase/firebase";
import Swal from "sweetalert";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartPlus,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";

export const Checkout = (props) => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const showError = (errorTitle, errorMessage) => {
    Swal({
      title: errorTitle,
      text: errorMessage,
      icon: "error",
      button: "OK",
    });
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePayment = () => {
    setFinalAmount(discountedPrice);
    handleNavigate("/payment", { amount: discountedPrice });
  };

  const showConfirm = (confirmTitle, confirmMessage) => {
    Swal({
      title: confirmTitle,
      text: confirmMessage,
      icon: "success",
      button: "OK",
    });
  };

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discountedPrice = totalPrice * (1 - discount);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "meow50") {
      setDiscount(0.5);
      showConfirm("Promo code", "Promo code applied! You get a 50% discount.");
    } else {
      setDiscount(0);
      showError("Promo code", "Invalid promo code.");
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const user = auth.currentUser;

      if (!user) {
        showError("Sign in", "Please sign in before prociding to payment");
        return;
      }

      const userId = user.uid;
      const cartRef = firestore.collection("carts").doc(userId);
      const cartSnapshot = await cartRef.get();

      if (cartSnapshot.exists) {
        const fetchedCartData = cartSnapshot.data().products;
        setCart(fetchedCartData);
      } else {
        console.log("No cart data found!");
      }
    };

    fetchCartData();
  }, []);

  const handleRemove = async (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);

    const user = auth.currentUser;
    if (!user) {
      showError("Sign in", "Please sign in to remove items from the cart.");
      return;
    }

    const userId = user.uid;
    const cartRef = firestore.collection("carts").doc(userId);
    await cartRef.update({ products: newCart });
  };

  const navigate = useNavigate();

  const handleNavigate = (destination, state) => {
    navigate(destination, { state });
  };

  return (
    <div>
      <div className="logoView">
        <img src={require("./Images/logo.png")} alt="logo" />
      </div>
      <div className="header-checkout">
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
                  <FontAwesomeIcon
                    icon={totalItems > 0 ? faCartArrowDown : faCartPlus}
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="checkout">
        <ul className="product-list">
          {cart.map((product) => (
            <li key={product.id} className="product-row">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <div className="product-quantity">Qty: {product.quantity}</div>
              <button
                className="remove-button"
                onClick={() => handleRemove(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-summary">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          {discount > 0 && (
            <p>Discounted Price: ${discountedPrice.toFixed(2)}</p>
          )}
          <div className="promo-code-container">
            <label htmlFor="promo-code">Promo Code</label>
            <input
              type="text"
              id="promo-code"
              name="promo-code"
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            <button onClick={applyPromoCode}>Apply</button>
          </div>
          <button
            className="proceed-to-payment"
            onClick={() => handlePayment()}
            disabled={discountedPrice === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};
