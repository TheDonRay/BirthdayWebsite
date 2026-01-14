import React, { useState, useRef, useEffect } from "react";
import "../styles/homepage.css";

export default function Homepage() {
  const [clickCount, setClickCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const confettiContainerRef = useRef(null);
  const canvasRef = useRef(null);

  // Floating particles background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function triggerBirthdayEffect() {
    setClickCount((prev) => prev + 1);

    const colors = [
      "#FFD700",
      "#FFA500", 
      "#FF69B4",
      "#FF1493",
      "#00CED1",
      "#9370DB",
      "#FF6347",
      "#32CD32",
    ];
    
    const confettiContainer = confettiContainerRef.current;
    if (!confettiContainer) return;

    // Create burst of confetti
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        
        const startX = 50 + (Math.random() - 0.5) * 20;
        confetti.style.left = startX + "%";
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 12 + 6 + "px";
        confetti.style.height = Math.random() * 12 + 6 + "px";
        confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
        confetti.style.animationDelay = Math.random() * 0.3 + "s";
        confetti.style.setProperty('--rotate-end', Math.random() * 720 - 360 + 'deg');

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
      }, i * 15);
    }
  }

  function letter() {
    window.open("/letter.pdf", "_blank");
  }

  return (
    <div className="homepage-wrapper">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      
      {/* Confetti container */}
      <div ref={confettiContainerRef} className="confetti-container"></div>

      {/* Main content */}
      <div className="content-container">
        {/* Decorative elements */}
        <div className="decorative-orb orb-1"></div>
        <div className="decorative-orb orb-2"></div>
        
        {/* Title section */}
        <div className="title-section">
          <div className="title-ornament top"></div>
          <h1 className="main-title">
            <span className="title-line-1">Happy Birthday</span>
            <span className="title-name">Deep!</span>
          </h1>
          <div className="title-ornament bottom"></div>
          <p className="subtitle">A celebration of another amazing year</p>
        </div>

        {/* Interactive buttons */}
        <div className="button-group">
          <button 
            className="celebration-btn primary-btn"
            onClick={triggerBirthdayEffect}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="btn-bg"></span>
            <span className="btn-text">
              <span className="btn-icon">✨</span>
              Click for Magic
              <span className="btn-icon">✨</span>
            </span>
            {clickCount > 0 && (
              <span className="click-counter">{clickCount} celebrations!</span>
            )}
          </button>

          <button className="celebration-btn secondary-btn" onClick={letter}>
            <span className="btn-bg"></span>
            <span className="btn-text">
              <span className="btn-icon">'📨'</span>
              Letter from Ray
            </span>
          </button>
        </div>

        {/* Quote section */}
        {clickCount > 0 && (
          <div className="quote-reveal">
            <p className="birthday-quote">
              "Sometimes you need to fail just to see a bit of success"
            </p>
            <p className="quote-author">— Ray</p>
          </div>
        )}
      </div>
    </div>
  );
}