import React, { useState, useEffect } from "react";
import { firestore } from "./firebase/firebase";
import Slider from "./slider";
import ProductCard from "./productCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from './SearchBar';
import "./View.css";

import {
  faCartPlus,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const ViewProduct = (props) =>{
    return (
        <div className="my-class">
      <h1>Hello World</h1>
      <p>This is some text.</p>
    </div>
    )
}