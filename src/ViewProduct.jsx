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

export const ViewProduct = (props) =>{
    return (
        <h1>
            Welcome to product view
        </h1>
    )
}