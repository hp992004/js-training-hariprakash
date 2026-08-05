import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>Custom Web Builds</h2>

          <p>
            We design and develop modern websites that help
            businesses establish a strong online presence.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#templates">Templates</a>
          <a href="#pricing">Pricing</a>
          <a href="#portfolio">Portfolio</a>

        </div>

        <div className="footer-services">

          <h3>Services</h3>

          <p>Business Websites</p>
          <p>E-Commerce</p>
          <p>Landing Pages</p>
          <p>Website Maintenance</p>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>
            <FaEnvelope />
            Developer@customwebbuilds.com
          </p>

          <p>
            <FaPhoneAlt />
            +91 98765 43210
          </p>

          <p>
            <FaMapMarkerAlt />
            Coimbatore, India
          </p>

        </div>

      </div>

      <div className="footer-social">

        <a href="#">
          <FaGithub />
        </a>

        <a href="#">
          <FaLinkedin />
        </a>

        <a href="#">
          <FaInstagram />
        </a>

      </div>

      <div className="footer-bottom">
        © 2026 Custom Web Builds.
      </div>

    </footer>
  );
}

export default Footer;