import React from "react";
import business1 from "../assets/business1.jpg";
import business2 from "../assets/business2.jpg";
import business3 from "../assets/business3.jpg";

export default function BusinessOwned() {
  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="business-owned-ad">
      <h2>Empower Your Choices: Support Women-Owned Businesses Today!</h2>
      <div className="services-container">
        <div className="services">
          <img src={business1} alt="Women-owned Business 1" />
          <button
            className="visit-website-button"
            onClick={() => handleClick("https://hellotushy.com/")}
          >
            Visit Website
          </button>
        </div>
        <div className="services">
          <img src={business2} alt="Women-owned Business 2" />
          <button
            className="visit-website-button"
            onClick={() => handleClick("https://iliabeauty.com/")}
          >
            Visit Website
          </button>
        </div>
        <div className="services">
          <img src={business3} alt="Women-owned Business 3" />
          <button
            className="visit-website-button"
            onClick={() => handleClick("https://www.shopsomebody.com/")}
          >
            Visit Website
          </button>
        </div>
      </div>
    </div>
  );
}
