document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const icon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Intersection Observer for scroll animations
    const scrollElements = document.querySelectorAll('.scroll-fade');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }

    // Trigger once on load
    handleScrollAnimation();

    // Trigger on scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-num');
    let hasCounted = false;

    const runCounter = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    // Check if there was a '+' or '%' in the original text
                    if (stat.innerText.includes('+')) {
                        stat.innerText = Math.ceil(current) + '+';
                    } else if (stat.innerText.includes('%')) {
                        stat.innerText = Math.ceil(current) + '%';
                    } else {
                        stat.innerText = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target + (stat.innerText.includes('+') ? '+' : (stat.innerText.includes('%') ? '%' : ''));
                }
            };
            updateCount();
        });
    };

    // Run counter when about section is in view
    const aboutSection = document.querySelector('#about');
    
    window.addEventListener('scroll', () => {
        if (elementInView(aboutSection, 1.5) && !hasCounted) {
            runCounter();
            hasCounted = true;
        }
    });
});
