import React from "react";
import '../assets/styles/HowItWorks.scss';

const steps = [
  "A free 20-minute call to understand the problem.",
  "A fixed-price proposal within 48 hours.",
  "Weekly demos until launch, then 30 days of free fixes.",
];

function HowItWorks() {
  return (
    <div className="container" id="how-it-works">
      <div className="skills-container how-it-works-container">
        <h1>How it works</h1>
        <div className="skills-grid how-it-works-grid">
          {steps.map((step, index) => (
            <div className="skill how-step" key={step}>
              <span className="how-step-number">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
