document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Smooth Scrolling and Active Link
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Observe sections for active link update
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        // Toggle icon
        this.querySelector('i').classList.toggle('fa-moon');
        this.querySelector('i').classList.toggle('fa-sun');
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submission is simulated. Implement backend for real submission.');
    });

    // Animated Stats Counter
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        const targetValue = parseInt(item.dataset.value);
        let currentValue = 0;
        const increment = targetValue / 200;

        const updateCounter = () => {
            if (currentValue < targetValue) {
                currentValue += increment;
                item.querySelector('.counter').textContent = Math.ceil(currentValue);
                requestAnimationFrame(updateCounter);
            } else {
                item.querySelector('.counter').textContent = targetValue;
            }
        };

        updateCounter();
    });

    // Tilt Effect (Vanilla Tilt)
    VanillaTilt.init(document.querySelectorAll(".about-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // Skill Progress Animation
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const progress = item.querySelector('.skill-progress::after');
        progress.style.width = item.dataset.progress + '%';
    });
});