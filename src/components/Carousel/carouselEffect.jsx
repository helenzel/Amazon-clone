import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./carousel.module.css";

import {img} from "./Img/Data"
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((src, index) => (
          <div className={classes.hero_img} key={index}>
            <img src={src} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
