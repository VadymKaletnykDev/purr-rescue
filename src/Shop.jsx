/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { firestore } from "./firebase/firebase";
import Slider from "./slider";
import ProductCard from "./productCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from './SearchBar';
import "./Navigation.css";


import {
  faCartPlus,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Shop = (props) => {

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const handleCategoryClick = (category) => {
    if (selectedCategory === "All Products" || category !== selectedCategory) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All Products");
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      selectedCategory === "All Products" ||
      product.productCategory === selectedCategory
    );
  });


  const handleNavigate = (destination) => {
    props.onFormSwitch(destination);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsRef = firestore.collection("products");
      productsRef.onSnapshot((querySnapshot) => {
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
        console.log("SHOP (ProductList):", productList);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="shopContainer">
      <div className="logo">
        <img src={require("./Images/logo.png")} alt="logo" />
      </div>
      {/* <SearchBar /> */}
      <div className="header">
        <div className="header__top">
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__item">
              <button className="link-button" onClick={() => handleNavigate("shop")}>Home</button>
              </li>
              <li className="menu__item">
    <button className="link-button">
      Collections
    </button>
    <ul className="menu__sublist">
      <li className="menu__subitem">
        <button className="link-button-sub" onClick={() => handleNavigate("toys")}>
          Toys
        </button>
      </li>
      <li className="menu__subitem">
        <button className="link-button-sub" onClick={() => handleNavigate("food")}>
          Food
        </button>
      </li>
      <li className="menu__subitem">
        <button className="link-button-sub" onClick={() => handleNavigate("litter")}>
          Litter and Litter Boxes
        </button>
      </li>
      <li className="menu__subitem">
        <button className="link-button-sub" onClick={() => handleNavigate("clothes")}>
          Clothes
        </button>
      </li>
    </ul>
  </li>
  <li className="menu__item">
    <button className="link-button" onClick={() => handleNavigate("about")}>
      About Us
    </button>
  </li>
  <li className="menu__item">
    <button className="link-button" onClick={() => handleNavigate("contact")}>
      Contact Us
    </button>
  </li>
  <li className="menu__item">
    <button className="link-button" onClick={() => handleNavigate("checkout")}>
      <FontAwesomeIcon icon={faCartPlus} />
    </button>
  </li>
  <li className="menu__item">
    <button className="link-button" onClick={() => handleNavigate("account")}>
      <FontAwesomeIcon icon={faUser} />
    </button>
  </li>
</ul>
          </nav>
        </div>
      </div>
      <div className="divSlider">
        <Slider className="my-slider" />
      </div>
      <div className="best-seller">
        <h1>OUR PRODUCTS</h1>
        <ul>
          <li>
            <a
              className={selectedCategory === "All Products" ? "selected" : ""}
              onClick={() => handleCategoryClick("All Products")}
            >
              {" "}
              All Products{" "}
            </a>
          </li>
          <li>
            <a
              className={selectedCategory === "toys" ? "selected" : ""}
              onClick={() => handleCategoryClick("toys")}
            >
              {" "}
              Toys{" "}
            </a>
          </li>
          <li>
            <a
              className={selectedCategory === "food" ? "selected" : ""}
              onClick={() => handleCategoryClick("food")}
            >
              {" "}
              Food{" "}
            </a>
          </li>
          <li>
            <a
              className={selectedCategory === "litter" ? "selected" : ""}
              onClick={() => handleCategoryClick("litter")}
            >
              {" "}
              Litter and Litter Boxes{" "}
            </a>
          </li>
          <li>
            <a
              className={selectedCategory === "clothes" ? "selected" : ""}
              onClick={() => handleCategoryClick("clothes")}
            >
              {" "}
              Clothes & Accessories{" "}
            </a>
          </li>
        </ul>
      </div>
      <div className="product-container">
        {filteredProducts.map((product) => (
          <ProductCard onFormSwitch={props.onFormSwitch} key={product.id} {...product} />
        ))}
      </div>
      <div class="promotion-container">
        <div class="left-column">
          <h2>50% OFF on CLOTHING</h2>
          <p>
            50% off all cat clothing for a limited time. Dress your furry friend
            in style and comfort at unbeatable prices. Use code MEOW50 at
            checkout to redeem your discount.
          </p>
          <button>GO TO CLOTHES COLLECTION</button>
        </div>
        <div class="right-column">
          <img
            src="https://example.com/promotion-image.jpg"
            alt="Promotion Image"
          ></img>
        </div>
      </div>
    </div>
  );
};
