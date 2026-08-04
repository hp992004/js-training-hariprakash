import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    company: "Restaurant Owner",
    review:
      "The entire process was smooth from start to finish. Our new website looks amazing and helped us attract more customers.",
  },
  {
    name: "Priya Nair",
    company: "Fitness Studio",
    review:
      "Professional team, modern design, and excellent communication throughout the project.",
  },
  {
    name: "John David",
    company: "Medical Clinic",
    review:
      "They delivered exactly what we wanted. The website is fast, responsive, and easy for our patients to use.",
  },
  {
    name: "Aisha Khan",
    company: "Fashion Boutique",
    review:
      "Our online presence has completely changed. We started receiving more inquiries within weeks.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials" id="reviews">
      <div className="testimonials-header">
        <h2>What Our Clients Say</h2>

        <p>
          We're proud to build websites that help businesses grow and leave a
          lasting impression.
        </p>
      </div>

      <div className="testimonial-slider">
        <div className="testimonial-track">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="review">
                "{testimonial.review}"
              </p>

              <div className="client">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;