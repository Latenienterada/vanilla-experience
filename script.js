// ===== VANILLA EXPERIENCE - Pure JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAnimatedText();
  initScrollReveal();
  initMouseFollower();
  initAmbientParticles();
  initParallax();
  initCardInteractions();
});

// ===== THEME MANAGEMENT =====
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('vanilla-theme');
  
  // Apply saved theme or default to dark
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('vanilla-theme', 'dark');
  }
  
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('vanilla-theme', isDark ? 'dark' : 'light');
  });
}

// ===== ANIMATED TEXT =====
function initAnimatedText() {
  const animatedTextElements = document.querySelectorAll('[data-animate-text]');
  
  animatedTextElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'animate-letter';
      span.style.animationDelay = `${i * 0.05}s`;
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    });
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
  });
}

// ===== MOUSE FOLLOWER GRADIENT =====
function initMouseFollower() {
  const follower = document.getElementById('mouse-follower');
  if (!follower) return;
  
  let targetX = 50, targetY = 50;
  let currentX = 50, currentY = 50;
  
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  });
  
  function animate() {
    // Smooth easing
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    
    follower.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, var(--evergreen-subtle) 0%, transparent 50%)`;
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ===== AMBIENT PARTICLES =====
function initAmbientParticles() {
  const container = document.getElementById('ambient-particles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'ambient-particle';
    
    const size = 2 + Math.random() * 4;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 10 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      animation: ambientFloat ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
  }
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// ===== CARD INTERACTIONS =====
function initCardInteractions() {
  const cards = document.querySelectorAll('.card-interactive');
  
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      // Animate neighboring cards
      cards.forEach((otherCard, otherIndex) => {
        if (otherIndex !== index) {
          const distance = Math.abs(otherIndex - index);
          if (distance === 1) {
            otherCard.style.transform = 'scale(0.98) translateY(2px)';
            otherCard.style.opacity = '0.9';
          }
        }
      });
    });
    
    card.addEventListener('mouseleave', () => {
      cards.forEach((otherCard) => {
        otherCard.style.transform = '';
        otherCard.style.opacity = '';
      });
    });
  });
}

// ===== REQUEST ANIMATION FRAME POLYFILL =====
window.requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000 / 60); };
