import "./Portfolio.css";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import restaurantImg from "./restaurant.jpg";
import gymImg from "./gym.jpg";
import medicalImg from "./medicalclinic.jpg";

interface Project {
  title: string;
  category: string;
  tech: string;
  description: string;
  image: string;
  live: string;
}

const projects: Project[] = [
  {
    title: "Restaurant Website",
    category: "Restaurant",
    tech: "React • Node • PostgreSQL",
    description:
      "A complete restaurant website with online ordering, reservations, responsive design and menu management.",
    image: restaurantImg,
    live: "https://indiarestaurant.co.in/",
  },
  {
    title: "Fitness Studio",
    category: "Gym",
    tech: "React • Express",
    description:
      "Modern fitness landing page with membership plans, trainer profiles and class booking.",
    image: gymImg,
    live: "https://www.rockfitmi.com/",
  },
  {
    title: "Medical Clinic",
    category: "Healthcare",
    tech: "Next.js • MongoDB",
    description:
      "Professional healthcare website with online appointment booking and patient information.",
    image: medicalImg,
    live: "http://northernhealth.ca/",
  },
];

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-header">
        <h2>Featured Projects</h2>

        <p>
          A few examples of websites we've designed and developed for our
          clients.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="browser">
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="red"></span>
                  <span className="yellow"></span>
                  <span className="green"></span>
                </div>

              </div>

              <div
                className="browser-preview"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
            </div>

            <div className="project-info">
              <span>{project.category}</span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <small>{project.tech}</small>

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn"
              >
                Visit Website
                <FaArrowUpRightFromSquare />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;