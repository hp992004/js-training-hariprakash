import "./Templates.css";

import businessImg from "./business.jpg";
import restaurantImg from "./restaurant.jpg";
import portfolioImg from "./portfolio.jpg";
import productsImg from "./products-grid.jpg";
import healthcareImg from "./healthcare.png";
import educationImg from "./education.jpg";

const templates = [
  {
    title: "Business Website",
    description: "Perfect for startups and growing businesses.",
    image: businessImg,
  },
  {
    title: "Restaurant Website",
    description: "Online menu, reservations and gallery.",
    image: restaurantImg,
  },
  {
    title: "Portfolio Website",
    description: "Showcase your work beautifully.",
    image: portfolioImg,
  },
  {
    title: "E-Commerce Store",
    description: "Sell products with ease.",
    image: productsImg,
  },
  {
    title: "Healthcare Website",
    description: "Professional websites for clinics.",
    image: healthcareImg,
  },
  {
    title: "Education Website",
    description: "Courses, admissions and events.",
    image: educationImg,
  },
];

function Templates() {
  return (
    <section className="templates" id="templates">
      <div className="templates-header">
        <h2>Website Templates</h2>

        <p>
          Explore some of our website styles. Every design is fully
          customizable to match your business.
        </p>
      </div>

      <div className="template-grid">
        {templates.map((template) => (
          <div className="template-card" key={template.title}>
            <div className="browser-header">
              <span className="red"></span>
              <span className="yellow"></span>
              <span className="green"></span>
            </div>

            <div className="preview">
              <img
                src={template.image}
                alt={template.title}
              />
            </div>

            <div className="card-content">
              <h3>{template.title}</h3>

              <p>{template.description}</p>

              <button>View Demo</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Templates;