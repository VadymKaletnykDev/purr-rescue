import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";

export const Payment = (props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [billingInfo, setBillingInfo] = useState({});
  const navigate = useNavigate();


  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const { discountedPrice } = props;

  const location = useLocation();
  const [amountPaid, setAmountPaid] = useState(0); // Initialize amountPaid to 0
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

  const handlePayment = (e) => {
    e.preventDefault();
    // Generate a random confirmation number
      if (!validateForm()) {
        return;
      }
    const confirmation = Math.floor(Math.random() * 1000000);
    setConfirmationNumber(confirmation);

    // Set payment completed state to true
    setPaymentCompleted(true);
  };

  const handleNavigate = (destination) => {
    navigate(destination);
  };

  const validateForm = () => {
    // Example: Card number must be 16 digits
    if (cardNumber.length !== 16) {
      showError("Card number","Card number must be 16 digits");
      return false;
    }
  
    // Example: Expiry date must be in MM/YY format
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(cardExpiry)) {
      showError("Expiration date","Expiry date must be in MM/YY format");
      return false;
    }
  
    // Example: CVV must be 3 digits
    if (cardCvv.length !== 3) {
      showError("CVV","CVV must be 3 digits");
      return false;
    }
  
    // Example: Billing name must not be empty
    if (billingInfo.name.trim() === "") {
      showError("Billing info","Billing name is required");
      return false;
    }
  
    // Example: Billing address must not be empty
    if (billingInfo.address.trim() === "") {
      showError("Billing info","Billing address is required");
      return false;
    }
  
    // Add more validation rules as needed
  
    return true;
  };


  if (paymentCompleted) {
    return (
      <div>
        <h1 className="paymnet-successfull-h1">Payment Successful</h1>
        <p>Confirmation Number: {confirmationNumber}</p>
        <button className="proceed-to-payment"  onClick={() => handleNavigate("/shop")}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="logoView">
      <img src={require("./Images/logo.png")} alt="logo" />
      </div>
      <form className="payment-form" onSubmit={handlePayment}>
        <div>
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="card-expiry">Expiry Date:</label>
          <input
            type="text"
            id="card-expiry"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="card-cvv">CVV:</label>
          <input
            type="text"
            id="card-cvv"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="billing-name">Billing Name:</label>
          <input
            type="text"
            id="billing-name"
            value={billingInfo.name}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="billing-address">Billing Address:</label>
          <input
            type="text"
            id="billing-address"
            value={billingInfo.address}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, address: e.target.value })
            }
            required
          />
        </div>
        {/* Add more billing information fields as needed */}
        <button type="submit" className="payment-button">
          PAY
        </button>
      </form>
      <div className="disclaimer">
        <p>
          Disclaimer: This is not a real payment. It is for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};