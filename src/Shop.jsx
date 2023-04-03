import React, {useState, useEffect} from "react";
import { firestore } from './firebase/firebase';
import Slider from "./slider";
import ProductCard from "./productCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faSearch,faUser } from '@fortawesome/free-solid-svg-icons';

export const Shop = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for: ${searchQuery}`);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const productsRef = firestore.collection('products');
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
                <img src={require('./Images/logo.png')} />
            </div>
            <div className="header">
                <div className="header__top">
                    <form onSubmit={handleSubmit}>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input"
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className="search-button">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>
                    <nav className="menu">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <a href="#">Home</a>
                            </li>
                            <li className="menu__item">
                                <a href="#">Shop</a>
                                <ul className="menu__sublist">
                                    <li className="menu__subitem">
                                        <a href="#">Games</a>
                                    </li>
                                    <li className="menu__subitem">
                                        <a href="#">Food</a>
                                    </li>
                                    <li className="menu__subitem">
                                        <a href="#">Litter & L. Boxes</a>
                                    </li>
                                    <li className="menu__subitem">
                                        <a href="#">Clothes</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu__item">
                                <a href="#">About Us</a>
                            </li>
                            <li className="menu__item">
                                <a href="#">Contact Us</a>
                            </li>
                            <li className="menu__item">
                                <a href="#"><FontAwesomeIcon icon={faCartPlus}/></a>
                            </li>
                            <li className="menu__item">
                                <a href="#"><FontAwesomeIcon icon={faUser} /></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="divSlider">
                <Slider  className="my-slider"/>
            </div>
            <div className="best-seller">
                <h1>Our Products</h1>
                    <ul>
                        <li><a href="#">All Products</a></li>
                        <li><a href="#">Games</a></li>
                        <li><a href="#">Food</a></li>
                        <li><a href="#">Litter and Litter Boxes</a></li>
                        <li><a href="#">Clothes & Accessories</a></li>
                    </ul>
            </div>
            <div className="product-container">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        <div class="promotion-container">
  <div class="left-column">
    <h2>50% OFF on CLOTHING</h2>
    <p>50% off all cat clothing for a limited time. Dress your furry friend in style and comfort at unbeatable prices. Use code MEOW50 at checkout to redeem your discount.</p>
    <button>GO TO CLOTHES COLLECTION</button>
  </div>
  <div class="right-column">
    <img src="https://example.com/promotion-image.jpg" alt="Promotion Image"></img>
  </div>
</div>

        </div>          
    );
}


