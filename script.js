// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading state for images
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    img.addEventListener('error', function() {
        this.src = `https://via.placeholder.com/${this.width}x${this.height}.png?text=Image+Not+Found`;
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-open');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('mobile-menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && document.body.classList.contains('mobile-menu-open')) {
        document.body.classList.remove('mobile-menu-open');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-item, .timeline-item, .skill-tag').forEach((el) => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation for skills
const skills = ['Flutter Development', 'UI/UX Design', 'Mobile Apps'];
let currentSkillIndex = 0;
const skillElement = document.querySelector('.typing-text');

function typeSkill() {
    const currentSkill = skills[currentSkillIndex];
    let charIndex = 0;
    
    function type() {
        if (charIndex < currentSkill.length) {
            skillElement.textContent += currentSkill.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            skillElement.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            currentSkillIndex = (currentSkillIndex + 1) % skills.length;
            setTimeout(typeSkill, 500);
        }
    }
    
    type();
}

// Start typing animation
typeSkill();

// Add tilt effect to profile card
const profileCard = document.querySelector('.profile-card');

profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    profileCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}); 