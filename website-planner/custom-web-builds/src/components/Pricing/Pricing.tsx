import "./Pricing.css";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    description: "Perfect for individuals and small businesses.",
    delivery: "5-7 Days",
    popular: false,
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "WhatsApp Integration",
      "1 Month Support",
    ],
  },
  {
    name: "Professional",
    price: "₹30,000",
    description: "Ideal for growing businesses.",
    delivery: "7-10 Days",
    popular: true,
    features: [
      "Up to 10 Pages",
      "Everything in Starter",
      "Appointment Booking",
      "Blog",
      "Advanced SEO",
      "3 Months Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For businesses with advanced requirements.",
    delivery: "2-4 Weeks",
    popular: false,
    features: [
      "Unlimited Pages",
      "E-Commerce",
      "Admin Dashboard",
      "Custom Integrations",
      "Automation",
      "Priority Support",
    ],
  },
];

function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-header">
        <h2>Simple Pricing</h2>

        <p>
          Choose the package that best fits your business. Need something
          unique? We'll create a custom solution.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && (
              <div className="popular-badge">Most Popular</div>
            )}

            <h3>{plan.name}</h3>

            <h1>{plan.price}</h1>

            <p className="description">{plan.description}</p>

            <div className="delivery">
              <strong>Delivery:</strong> {plan.delivery}
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <FaCheck />
                  {feature}
                </li>
              ))}
            </ul>

            <button>Get Started</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;