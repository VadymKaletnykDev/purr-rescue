import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";
import { firestore } from "./firebase/firebase";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsRef = firestore.collection("products");
      productsRef.onSnapshot((querySnapshot) => {
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push(doc.data());
        });
        setProducts(productsArray);
        console.log("SearchBar:", productsArray);
      });
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const searchWord = e.target.value.toLowerCase(); // Convert search word to lowercase
    if (searchWord === "") {
      setFilteredData([]); // If search word is empty, set filtered data to an empty array
    } else {
      const firstLetterFilter = products.filter((product) => {
        return product.productName.charAt(0).toLowerCase() === searchWord.charAt(0); // Filter products by first letter of product name
      });
      const stringMatchFilter = firstLetterFilter.filter((product) => {
        return product.productName.toLowerCase().includes(searchWord); // Filter products by search word
      });
      setFilteredData(stringMatchFilter); // Set filtered data
    }
    setSearchQuery(searchWord); // Update search query state
  };
  
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your search logic here
  };

  const handleProductClick = (productName) => {
    setSearchQuery(productName);
    setFilteredData([]); // Clear filtered data to hide the product list
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {filteredData.length !== 0 && (
          <div className="dataresult">
            {filteredData.map((product, index) => (
              <div 
              key={index} 
              className="product-item"
              onClick={() => handleProductClick(product.productName)}>
                {product.productName}
              </div>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default SearchBar;

