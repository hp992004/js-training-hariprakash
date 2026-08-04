import "./PlanWebsite.css";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  websiteType: string;
  pages: string;
  budget: string;
  features: string[];
  description: string;
}

const featureOptions = [
  "Contact Form",
  "WhatsApp Chat",
  "Google Maps",
  "Booking System",
  "Blog",
  "Online Store",
  "Payment Gateway",
  "Admin Panel",
  "SEO Optimization",
];

function PlanWebsite() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    business: "",
    websiteType: "",
    pages: "",
    budget: "",
    features: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/plan",
        formData
      );

      
      setFormData({
        name: "",
        email: "",
        phone: "",
        business: "",
        websiteType: "",
        pages: "",
        budget: "",
        features: [],
        description: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

return (
  <section className="plan" id="plan">
    <div className="plan-container">
      <div className="plan-left">
        <span className="section-tag">
          Start Your Project
        </span>

        <h2>
          Let's Build Your
          <br />
          Dream Website
        </h2>

        <p>
          Tell us about your business and we'll prepare
          a customized proposal based on your
          requirements.
        </p>

        <div className="benefits">
          <div>
            <FaCheckCircle />
            <span>100% Custom Design</span>
          </div>

          <div>
            <FaCheckCircle />
            <span>Mobile Responsive</span>
          </div>

          <div>
            <FaCheckCircle />
            <span>SEO Optimized</span>
          </div>

          <div>
            <FaCheckCircle />
            <span>Fast Delivery</span>
          </div>

          <div>
            <FaCheckCircle />
            <span>Lifetime Support</span>
          </div>
        </div>
      </div>

      <div className="plan-right">
        <form
          onSubmit={handleSubmit}
          className="plan-form"
        >
          <div className="form-grid">

            <div className="form-group">
              <label>Full Name *</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Business Name *</label>

              <input
                type="text"
                name="business"
                placeholder="Business Name"
                value={formData.business}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Website Type *</label>

              <select
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Website Type
                </option>

                <option>Business</option>

                <option>Restaurant</option>

                <option>Portfolio</option>

                <option>E-Commerce</option>

                <option>Healthcare</option>

                <option>Education</option>

                <option>Real Estate</option>
              </select>
            </div>

            <div className="form-group">
              <label>Number of Pages *</label>

              <select
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Pages
                </option>

                <option>1 - 5</option>

                <option>6 - 10</option>

                <option>11 - 20</option>

                <option>20+</option>
              </select>
            </div>

            <div className="form-group">
              <label>Budget *</label>

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Budget
                </option>

                <option>
                  Below ₹10,000
                </option>

                <option>
                  ₹10,000 - ₹25,000
                </option>

                <option>
                  ₹25,000 - ₹50,000
                </option>

                <option>
                  ₹50,000 - ₹1,00,000
                </option>

                <option>
                  Above ₹1,00,000
                </option>
              </select>
            </div>

          </div>

          <div className="features-section">

            <label>
              Required Features
            </label>

            <div className="feature-grid">

              {featureOptions.map((feature) => (
                <label
                  key={feature}
                  className="feature-item"
                >
                  <input
                    type="checkbox"
                    checked={formData.features.includes(
                      feature
                    )}
                    onChange={() =>
                      handleFeature(feature)
                    }
                  />

                  {feature}

                </label>
              ))}

            </div>

          </div>

          <div className="form-group">
            <label>
              Project Description
            </label>

            <textarea
              rows={5}
              name="description"
              placeholder="Describe your website requirements..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Submit Requirements"}
          </button>
        </form>
      </div>
    </div>
  </section>
);
}

export default PlanWebsite;