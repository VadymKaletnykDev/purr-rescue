import React, {useState, useEffect} from "react";
import { firestore } from './firebase/firebase';
import Slider from "./slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Shop = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for: ${searchQuery}`);
    };

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
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="divSlider">
                <Slider  className="my-slider"/>
            </div>          
        </div>
    );
}


