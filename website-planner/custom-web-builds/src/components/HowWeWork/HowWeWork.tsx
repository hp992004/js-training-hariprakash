import "./HowWeWork.css";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We understand your business, audience, and website goals before writing a single line of code.",
  },
  {
    id: "02",
    title: "Design",
    description:
      "We create clean wireframes and modern UI designs that match your brand identity.",
  },
  {
    id: "03",
    title: "Development",
    description:
      "We build a fast, responsive, SEO-friendly website using modern technologies.",
  },
  {
    id: "04",
    title: "Launch",
    description:
      "After testing and your approval, we launch your website and provide ongoing support.",
  },
];

function HowWeWork() {
  return (
    <section className="process-section" id="process">
      <div className="process-header">
        <h2>Our Process</h2>
        <p>
          A simple four-step process that takes your idea from concept to a
          fully launched website.
        </p>
      </div>

      <div className="timeline">
        {steps.map((step, index) => (
          <div
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            key={step.id}
          >
            <div className="timeline-card">
              <span>{step.id}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowWeWork;