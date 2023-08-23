import React from 'react';
import custumer from '../image/custumer.jpg';
const About = () => {
  return (
    <div className="about-page">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="about-heading">About Our Food Delivery Service</h2>
          <p className="about-text">
            At FoodHub, we are passionate about delivering delicious meals right to your doorstep. With our wide selection of cuisines and carefully curated menu, we aim to satisfy your cravings and provide a convenient dining experience.
          </p>
          <p className="about-text">
            Our team of talented chefs and delivery personnel work tirelessly to ensure that each meal is prepared with the freshest ingredients and delivered to you in a timely manner. We prioritize quality, taste, and customer satisfaction above all else.
          </p>
        </div>
        <div className="col-md-6">
          <img src={custumer} alt="About" className="about-image"/>
          {/* <img src = "https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NjA0MzQ5OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" alt="about" className='about-image'></img> */}
        </div>
      </div>
    </div>
  </div>
  );
};

export default About;

