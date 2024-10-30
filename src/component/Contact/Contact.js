import React, { useState } from "react";
import "./Contact.css";
import { Alert } from "@mui/material";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [msg ,setMsg] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg(true); // Show the alert on form submission

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setMsg(false);
    }, 3000);
    // Add logic to handle form submission like sending the form data to a server.
  };

  return (
    <div className="contact-page">
      {msg && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            height:'70px',
            width:'320px'
          }}
        >
          <Alert severity="success">Thank you for contacting us!</Alert>
        </div>
      )}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us!</p>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name.."
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email.."
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write something.."
              required
            />

            <button style={{backgroundColor:'#cc0000'}}className='submit'type="submit">Submit</button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Our Office</h3>
          <p>123 Cozy Street, Haven City, CH 10101</p>
          <p>Email: support@cozyhavenstay.com</p>
          <p>Phone: +123 456 7890</p>

          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.755105373393!2d80.24315251523941!3d13.082680590784698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677ab56fba2d%3A0xc946cb9358b28a0!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1605250534042!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>

          <div className="social-links">
            <h3>Connect With Us</h3>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;