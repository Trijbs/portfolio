// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.setAttribute('data-theme',
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress, .about-card, .project-card').forEach((el) => {
    observer.observe(el);
});

// Skill Progress Animation
document.querySelectorAll('.skill-progress').forEach(progress => {
    const value = progress.getAttribute('data-progress');
    progress.style.transform = `scaleX(${value / 100})`;
});

// Counter Animation
const counterAnimation = (el) => {
    const target = parseInt(el.getAttribute('data-value'));
    let count = 0;
    const speed = 2000 / target;
    
    const updateCount = () => {
        if (count < target) {
            count++;
            el.textContent = count;
            setTimeout(updateCount, speed);
        }
    };
    
    updateCount();
};

document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
    counter.addEventListener('intersect', () => counterAnimation(counter));
});

// Project Card Tilt Effect
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    const formData = new FormData(contactForm);
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }, 3000);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * -0.005);
    const moveY = (e.clientY * -0.005);
    document.documentElement.style.setProperty('--mouse-x', `${moveX}deg`);
    document.documentElement.style.setProperty('--mouse-y', `${moveY}deg`);
});

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});