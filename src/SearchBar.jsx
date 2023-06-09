import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";
import { firestore } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const productsRef = firestore.collection("products");
      productsRef.onSnapshot((querySnapshot) => {
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
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
      const stringMatchFilter = products.filter((product) => {
        return (
          product.productName.toLowerCase().includes(searchWord) &&
          product.productCategory === props.formName
        ); // Filter products by search word
      });
      setFilteredData(stringMatchFilter); // Set filtered data
    }
    setSearchQuery(searchWord); // Update search query state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your search logic here
  };

  const handleProductClick = (productId, productName, destination) => {
    setSearchQuery(productName);
    setFilteredData([]); // Clear filtered data to hide the product list
    navigate(destination + "?pId=" + productId + "&pName=" + productName);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search for products in ${props.formTitle}`}
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
                key={product.id}
                className="product-item"
                onClick={() =>
                  handleProductClick(product.id, product.productName, "/view")
                }
              >
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
