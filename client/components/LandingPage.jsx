import React from 'react';
import './styles/LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div id="LandingPage">
      <Link to="/products">
        <section className="carousel" aria-label="Gallery">
          <ol className="carousel__viewport">
            <li id="carousel__slide1" className="carousel__slide">
              <div className="carousel__snapper" />
            </li>
            <li id="carousel__slide2" className="carousel__slide">
              <div className="carousel__snapper" />
            </li>
            <li id="carousel__slide3" className="carousel__slide">
              <div className="carousel__snapper" />
            </li>
            <li id="carousel__slide4" className="carousel__slide">
              <div className="carousel__snapper" />
            </li>
          </ol>
        </section>
      </Link>
    </div>
  );
};

export default LandingPage;
