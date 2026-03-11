import { useState } from "react";
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Navbar */}
      <nav className="contact-navbar">
        <div className="nav-logo">
          🛵 Swi<span>ggy</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="contact-hero">
        <div className="hero-badge">💬 Support</div>
        <h1>We're Here to Help!</h1>
        <p>
          Have a question about your order or feedback for us? Our support team
          is just a message away — always ready to make things right.
        </p>
      </div>

      {/* Content Grid */}
      <div className="contact-content">
        {/* Left: Info Cards */}
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h3>Email Us</h3>
              <p>
                Reach out anytime at{" "}
                <a href="mailto:support@swiggy.in">support@swiggy.in</a>
              </p>
              <span className="info-badge">Reply within 2 hrs</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <div className="info-text">
              <h3>Call Support</h3>
              <p>
                Talk to our team at{" "}
                <a href="tel:18001234567">1800-123-4567</a>
              </p>
              <span className="info-badge">24/7 Available</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">💬</div>
            <div className="info-text">
              <h3>Live Chat</h3>
              <p>Chat with us live through the Swiggy app for fastest help.</p>
              <span className="info-badge">Avg. wait: 2 min</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-card">
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Fill in the details below and we'll get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Full Name <span>*</span>
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. rahul@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Your Message <span>*</span>
              </label>
              <textarea
                className="form-input form-textarea"
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your issue or feedback..."
                required
              />
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? (
                <>Sending... ⏳</>
              ) : (
                <>
                  Send Message
                  <span className="btn-icon">🚀</span>
                </>
              )}
            </button>
          </form>

          {submitted && (
            <div className="success-msg">
              ✅ Message sent! We'll reach out to you soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;