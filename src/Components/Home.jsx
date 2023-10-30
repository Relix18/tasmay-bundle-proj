import React from "react";
import "../styles/Home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner from "../assets/banner.jpg";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import Products from "./Products.jsx";

const Home = () => {
  return (
    <div id="home">
      <Carousel
        className="carousel"
        autoPlay={true}
        interval={2000}
        showArrows={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={banner} alt="banner" />
        </div>
        <div>
          <img src={banner1} alt="banner" />
        </div>
        <div>
          <img src={banner2} alt="banner" />
        </div>
        <div>
          <img src={banner3} alt="banner" />
        </div>
      </Carousel>
      <div>
        <Products />
      </div>
    </div>
  );
};

export default Home;
