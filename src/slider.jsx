import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the required CSS

// Images
import games from "./Images/kittenGames.jpg";
import litter from "./Images/kittenServices.png";
import food from "./Images/kittenFood.png";
import clothes from "./Images/kittenClothes.jpg";

const Slider = () => {
  console.log("Inside Slider");
  return (
    <Carousel
      showArrows
      showThumbs={false}
      showStatus={false}
      autoPlay
      interval={5000}
      infiniteLoop
      transitionTime={500}
    >
      <div>
        <img src={games} alt="Kitten Games" />
      </div>
      <div>
        <img src={food} alt="Kitten Food" />
      </div>
      <div>
        <img src={litter} alt="Kitten Litter" />
      </div>
      <div>
        <img src={clothes} alt="Kitten Clothes" />
      </div>
    </Carousel>
  );
};

export default Slider;
