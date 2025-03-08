document.addEventListener('DOMContentLoaded', function() {
    // Create particles for background
    createParticles();
    
    // Create falling flowers and hearts
    createFallingElements();
    
    // Animate the title text - but make sure it's visible first
    const titleElement = document.getElementById('title');
    titleElement.style.opacity = '1'; // Ensure title is visible
    
    // Only run animation if GSAP is properly loaded
    if (typeof gsap !== 'undefined') {
      animateTitle();
    } else {
      console.warn("GSAP is not loaded. Title animation will not run.");
    }
  });
  
  // Create particles for the background
  function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const colors = ['#ff3a7c', '#7928ca', '#4361ee', '#ffffff'];
    
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 5 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      const duration = 3 + Math.random() * 7;
      const delay = Math.random() * 5;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Create falling flowers and hearts
  function createFallingElements() {
    const flowersContainer = document.getElementById('flowers-container');
    const symbols = ["🌸", "🌹", "🌷", "💐", "🌺", "💮", "💕", "💖", "💗", "💓"];
    const totalElements = 20;
    
    // Create initial elements
    for (let i = 0; i < totalElements; i++) {
      createFlowerElement();
    }
    
    // Continuously create new elements
    setInterval(createFlowerElement, 2000);
    
    function createFlowerElement() {
      const flower = document.createElement('div');
      flower.className = 'flower';
      
      // Random properties
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const left = Math.random() * 100;
      const duration = 5 + Math.random() * 10;
      const delay = Math.random() * 5;
      const rotation = Math.random() * 360;
      
      // Set content and styles
      flower.textContent = symbol;
      flower.style.left = `${left}%`;
      flower.style.animationDuration = `${duration}s`;
      flower.style.animationDelay = `${delay}s`;
      flower.style.transform = `rotate(${rotation}deg)`;
      
      flowersContainer.appendChild(flower);
      
      // Remove element after animation completes
      setTimeout(() => {
        if (flower.parentNode) {
          flower.parentNode.removeChild(flower);
        }
      }, (duration + delay) * 1000);
    }
  }
  
  // Animate the title text
  function animateTitle() {
    try {
      const titleElement = document.getElementById('title');
      const originalText = titleElement.textContent;
      
      // Store original text for fallback
      titleElement.setAttribute('data-original-text', originalText);
      
      // Clear the title
      titleElement.innerHTML = '';
      
      // Create spans for each character
      const chars = originalText.split('');
      chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
        span.style.display = 'inline-block';
        // Don't set opacity to 0 initially to ensure text is visible
        span.style.opacity = '1';
        titleElement.appendChild(span);
      });
      
      // Simple animation that won't hide the text
      gsap.from(titleElement.children, {
        y: -30,
        scale: 0.5,
        rotation: -10,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
        onStart: function() {
          // Make sure all spans are visible
          Array.from(titleElement.children).forEach(span => {
            span.style.opacity = '1';
          });
        }
      });
    } catch (error) {
      console.error("Animation error:", error);
      // Restore original text if animation fails
      const titleElement = document.getElementById('title');
      const originalText = titleElement.getAttribute('data-original-text');
      if (originalText) {
        titleElement.textContent = originalText;
      }
    }
  }