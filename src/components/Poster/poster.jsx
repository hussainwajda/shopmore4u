import React from 'react';
import { Carousel } from 'react-bootstrap';
import './poster.css';
import Topcat from '../Topcat/topcat';
import one from '../Assets/Posterhero/one.png';
import two from '../Assets/Posterhero/two.jpg';
import three from '../Assets/Posterhero/three.jpg';

const PosterCarousel = () => {
  return (
    <div className="poster-carousel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={one}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={two}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={three}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="overlay-component">
        <Topcat />
      </div>
    </div>
  );
};

export default PosterCarousel;
