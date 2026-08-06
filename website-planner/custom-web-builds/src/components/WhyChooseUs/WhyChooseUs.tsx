import "./WhyChooseUs.css";
import {
  FaRocket,
  FaMobileAlt,
  FaBolt,
  FaHeadset,
} from "react-icons/fa";

function WhyChooseUs() {
  return (
    <section className="why" id="why">
      <h2>Why Choose Us</h2>

      <p className="subtitle">
        We don't just build websites—we create digital experiences
        that help businesses grow.
      </p>

      <div className="why-grid">

        <div className="why-card">
          <FaRocket className="icon" />
          <h3>Fast Delivery</h3>
          <p>
            Launch your website in as little as one week without
            compromising quality.
          </p>
        </div>

        <div className="why-card">
          <FaMobileAlt className="icon" />
          <h3>Mobile First</h3>
          <p>
            Every website looks perfect on phones, tablets,
            and desktops.
          </p>
        </div>

        <div className="why-card">
          <FaBolt className="icon" />
          <h3>High Performance</h3>
          <p>
            Optimized for speed, SEO, and user experience.
          </p>
        </div>

        <div className="why-card">
          <FaHeadset className="icon" />
          <h3>Ongoing Support</h3>
          <p>
            Need updates or maintenance? We've got you covered.
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;