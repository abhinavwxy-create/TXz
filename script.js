// Initialize Particles.js
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#af40ff", "#00fbff"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
        "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Stats Counter Animation
const stats = document.querySelectorAll('.count');
const statsSection = document.querySelector('.stats');
let started = false;

function startCounter() {
    stats.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(startCounter, 20);
        } else {
            counter.innerText = target + '+';
        }
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        startCounter();
        started = true;
    }
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

// Custom Cursor Glow
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.display = 'block';
});

// Cursor style in CSS needed for this effect
const style = document.createElement('style');
style.textContent = `
    .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(175, 64, 255, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        display: none;
    }
`;
document.head.appendChild(style);

// Form Submission
const form = document.getElementById('applyForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Application Sent!';
        btn.style.background = '#00fbff';
        btn.style.boxShadow = '0 0 20px #00fbff';

        form.reset();

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
        }, 3000);
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(10, 10, 12, 0.95)';
            navLinks.style.width = '200px';
            navLinks.style.padding = '20px';
            navLinks.style.borderRadius = '15px';
            navLinks.style.border = '1px solid var(--glass-border)';
        }
    });
}

// Smooth Header Hide/Show on Scroll
let lastScroll = 0;
const header = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        header.style.transform = 'translateX(-50%) translateY(0)';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scroll Down
        header.style.transform = 'translateX(-50%) translateY(-150%)';
    } else {
        // Scroll Up
        header.style.transform = 'translateX(-50%) translateY(0)';
    }
    lastScroll = currentScroll;
});

// FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});
