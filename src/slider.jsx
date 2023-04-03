import React from "react";
import HeroSliderProvider, {Slide} from 'hero-slider';

//Images
import games from './Images/kittenGames.jpg';
import litter from './Images/kittenServices.png';
import food from './Images/kittenFood.png';
import clothes from './Images/kittenClothes.jpg'

const App = () => {
    return(
        <HeroSliderProvider
            slidingAnimation="left_to_right"
            orientation="horizontal"
            initialSlide={1}
            style={{
                background: "rgba(0, 0, 0, 0)",
            }}
            settings={{
                shouldDisplayButtons: true,
            }}
        >
            <Slide
                background={{
                backgroundImage: `url(${games})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />

            <Slide
                background={{
                backgroundImage: `url(${food})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />

            <Slide
                background={{
                backgroundImage: `url(${litter})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />

            <Slide
                background={{
                backgroundImage: `url(${clothes})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />
        </HeroSliderProvider>
    )
}
export default App;