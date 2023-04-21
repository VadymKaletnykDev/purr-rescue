import Swal from "sweetalert";
import React, { useState, useEffect } from "react";
import { firestore } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateRegistred, setDateRegistred] = useState("");
  const [setError] = useState("");
  const { register } = useAuth();

  const navigate = useNavigate();

  const showError = (errorTitle, errorMessage) => {
    Swal({
      title: errorTitle,
      text: errorMessage,
      icon: "error",
      button: "OK",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDate = date.toLocaleString();
      setDateRegistred(formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    let registeredUser;
    e.preventDefault();
    try {
      registeredUser = await register(email, password);
    } catch (error) {
      setError(error.message);
    }

    console.log("Registered user ID:", registeredUser.uid);

    // Validate the input fields
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!name || !nameRegex.test(name)) {
      showError("Name", "Please enter a valid name", "error");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      showError("Email", "Please enter a valid email", "error");
      return;
    }

    if (!password || !strongPasswordRegex.test(password)) {
      showError(
        "Password",
        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
        "error"
      );
      return;
    }

    // If validation passes, submit the form
    await firestore
      .collection("users")
      .add({ name, email, password, dateRegistred });
    console.log(
      "FROM Register: User registered successfully into Firestore database!"
    );

    navigate("/login");
  };

  const handleRegisterLinkClick = () => {
    // switch to the registration form and change background image
    navigate("/login");
  };

  return (
    <div className="register-page-container">
      <div className="register-form-container">
        <h2 className="login-title">REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <label className="register-label" htmlFor="name">
            Enter your NAME
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Name and last name"
            id="name"
            name="name"
          />

          <label className="register-label" htmlFor="email">
            Enter your EMAIL
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />

          <label className="register-label" htmlFor="password">
            Enter your PASSWORD
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />

          <button type="submit">Register</button>
        </form>
        <div className="register-link" onClick={handleRegisterLinkClick}>
          Already have an account? LOGIN here
        </div>
      </div>
    </div>
  );
};
