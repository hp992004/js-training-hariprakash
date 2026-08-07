import "./Hero.css";
import { FaArrowRight } from "react-icons/fa6";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="badge">Custom Website Design Agency</span>

        <h1>
          We Design Websites
          <br />
          That People Remember.
        </h1>

        <p>
          Modern websites crafted for startups, businesses, and creators.
          Fast, responsive, and built to convert visitors into customers.
        </p>

        <div className="hero-buttons">
          <a href="#plan" className="primary-btn">
            Place Order
            <FaArrowRight />
          </a>

          <a href="#portfolio" className="secondary-btn">
            View Portfolio
          </a>
        </div>
      </div>

      <div className="hero-preview">
        <div className="browser">
          <div className="browser-top">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>

          <div className="browser-body">
            <div className="sidebar"></div>

            <div className="content">
              <div className="card large"></div>

              <div className="row">
                <div className="card"></div>
                <div className="card"></div>
              </div>

              <div className="card"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;