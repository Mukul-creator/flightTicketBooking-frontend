import React from "react";
import "./LandingPage.css";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to Flight Booking App</h1>
        <p>Book your flights with ease and convenience.</p>
        <button onClick={submitHandler} className="cta-button">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
