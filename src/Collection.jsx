import React, { useState, useEffect } from "react";
import { firestore } from "./firebase/firebase";
import Slider from "./slider";
import ProductCard from "./productCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from './SearchBar';
import "./Navigation.css";

import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export const Collection = (props) =>{

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(props.formName);

    const filteredProducts = products.filter((product) => {
        return (
          product.productCategory === selectedCategory
        );
      });

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


// Collection.js

return (
    <h1 className="collection-title">
      {props.formName === "litter" ? (
        <>
          Purr-rescue Litter and Litter Boxes Collection
          <SearchBar formName = "litter" formTitle = "litter and litter Boxes" />
          <div className="product-container">
            {filteredProducts.map((product) => (
              <ProductCard onFormSwitch={props.onFormSwitch} key={product.id} {...product} />
            ))}
          </div>

        </>
      ) : (
        <>
          Purr-rescue {props.formName} Collection
          <SearchBar formName={props.formName} formTitle = {props.formName} />
          <div className="product-container">
            {filteredProducts.map((product) => (
              <ProductCard onFormSwitch={props.onFormSwitch} key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </h1>
  );
}