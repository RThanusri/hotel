import React from "react";
import "./About.css"; // Import any styles you may want to apply

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p className="about-description">
        Welcome to Cozy Haven Stay, where your comfort is our priority! At Cozy
        Haven Stay, we believe that a great stay is not just about a place to
        sleep; it's about creating unforgettable memories. Our hotel is designed
        to provide you with a warm and inviting atmosphere that feels just like
        home.
      </p>

      <h2>Our Mission</h2>
      <p className="about-description">
        Our mission is to provide exceptional hospitality and personalized
        service to every guest. We aim to exceed your expectations and ensure
        your stay is as enjoyable as possible. Whether you're traveling for
        business or leisure, we have the perfect accommodations and amenities to
        meet your needs.
      </p>

      <h2>Why Choose Us?</h2>
      <ul className="about-list">
        <li>
          ✨ **Comfortable Accommodations**: Choose from a range of stylish and
          cozy rooms equipped with modern amenities.
        </li>
        <li>
          🍽️ **Delicious Dining**: Enjoy a variety of culinary delights at our
          in-house restaurant, serving both local and international cuisine.
        </li>
        <li>
          🌐 **Free Wi-Fi**: Stay connected with complimentary high-speed
          internet throughout the hotel.
        </li>
        <li>
          🏊 **Relaxation Facilities**: Unwind in our spa or take a dip in our
          swimming pool after a long day of exploration.
        </li>
        <li>
          🛎️ **24/7 Customer Service**: Our friendly staff is available around
          the clock to assist you with any requests or inquiries.
        </li>
      </ul>

      <h2>Join Us</h2>
      <p className="about-description">
        We invite you to experience the Cozy Haven Stay difference. Book your
        stay with us today and discover a world of comfort and luxury. Let us be
        your home away from home, where every moment is a cherished memory.
      </p>
    </div>
  );
};

export default About;
