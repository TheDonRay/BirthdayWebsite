import React from "react";
import "../styles/homepage.css";
import { useState, useRef } from "react";

export default function Homepage() {
  const [clickCount, setClickCount] = useState(0);
  const confettiContainerRef = useRef(null);

  function triggerBirthdayEffect() {
    // Update click count
    setClickCount((prev) => prev + 1);

    // Create confetti
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E2",
    ];
    const confettiContainer = confettiContainerRef.current;

    if (!confettiContainer) return;

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + "px";
        confetti.style.height = Math.random() * 10 + 5 + "px";
        confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
        confetti.style.animationDelay = Math.random() * 0.5 + "s";

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, 4000);
      }, i * 20);
    } 
  } 

  function letter() { 
    window.open('/deepletter.pdf', '_blank'); 
  }

  return (
    <>
      <div ref={confettiContainerRef} className="confetti-container"></div>

      <div className="title-div">
        <h1 className="title-text">Happy Birthday Deep!</h1>
      </div>

      <div className="button-container">
        <button className="btn-design" onClick={triggerBirthdayEffect}>
          Click for a surprise
        </button>

        <button onClick={letter}>Letter from Ray</button>
      </div> 

      <div className="highlighted-quote"> 
            
      </div>
    </>
  );
}
