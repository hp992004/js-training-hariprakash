import "./BookCall.css";
import {
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";
import { useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";

interface CallForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  agree: boolean;
}

function BookCall() {
  const [formData, setFormData] = useState<CallForm>({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/call",
        formData
      );

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        date: "",
        timeSlot: "",
        agree: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-call" id="book">
      <div className="book-container">
        <div className="book-left">
          <span className="section-tag">
            Free Consultation
          </span>

          <h2>Book a Discovery Call</h2>

          <p>
            Not sure which package is right for you?
            Schedule a free consultation and we'll help
            you choose the best solution.
          </p>

          <div className="book-benefits">
            <div>
              <FaPhoneAlt />
              <span>30 Minute Consultation</span>
            </div>

            <div>
              <FaCalendarAlt />
              <span>Flexible Scheduling</span>
            </div>

            <div>
              <FaClock />
              <span>Quick Response</span>
            </div>
          </div>
        </div>

        <div className="book-right">
          <form
            onSubmit={handleSubmit}
            className="book-form"
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
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
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
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter contact number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preferred Date *</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="time-section">
              <label>
                Available Time Slots *
              </label>

              <div className="time-slots">
                {[
                  "10:00 AM",
                  "11:30 AM",
                  "02:00 PM",
                  "03:30 PM",
                  "05:00 PM",
                ].map((slot) => (
                  <label
                    key={slot}
                    className="slot"
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={
                        formData.timeSlot === slot
                      }
                      onChange={handleChange}
                      required
                    />

                    {slot}
                  </label>
                ))}
              </div>
            </div>

            <label className="agree-box">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />

              I agree to be contacted regarding
              this enquiry and accept the privacy
              terms.
            </label>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Booking..."
                : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookCall;