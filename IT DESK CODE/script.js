// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Basic Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay element for the mobile menu
    if (!document.querySelector('.nav-overlay')) {
        const navOverlay = document.createElement('div');
        navOverlay.classList.add('nav-overlay');
        document.body.appendChild(navOverlay);
        
        // Close menu when overlay is clicked
        navOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    }
    
    // Create close button if it doesn't exist and only if on mobile
    function createCloseButton() {
        // Only create close button for mobile view
        if (window.innerWidth <= 780) {
            if (!document.querySelector('.close-menu') && navMenu) {
                const closeMenu = document.createElement('button');
                closeMenu.classList.add('close-menu');
                closeMenu.innerHTML = '<i class="fas fa-times"></i>';
                navMenu.prepend(closeMenu);
                
                // Add event listener to the newly created close button
                closeMenu.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    document.querySelector('.nav-overlay').classList.remove('active');
                    body.style.overflow = '';
                });
            }
        }
    }
    
    // Run on page load
    createCloseButton();
    
    // Run on resize
    window.addEventListener('resize', function() {
        createCloseButton();
    });
    
    // Add event listener to existing close button
    const closeMenu = document.querySelector('.close-menu');
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.querySelector('.nav-overlay').classList.remove('active');
            body.style.overflow = '';
        });
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.querySelector('.nav-overlay').classList.toggle('active');
            
            // Toggle body scroll
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.nav-menu li a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 780) {
                navMenu.classList.remove('active');
                document.querySelector('.nav-overlay').classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
    
    // Setup submenus
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    hasSubmenuItems.forEach(item => {
        const link = item.querySelector('a');
        
        // Mobile submenu toggle
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                if (item.querySelector('.submenu')) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        heroDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide and dot
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to show the next slide
    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= heroSlides.length) {
            index = 0;
        }
        showSlide(index);
    }
    
    // Function to show the previous slide
    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) {
            index = heroSlides.length - 1;
        }
        showSlide(index);
    }
    
    // Set up click events for next/prev buttons
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function() {
            clearInterval(slideInterval); // Stop auto-slide when user interacts
            nextSlide();
            startAutoSlide(); // Restart auto-slide
        });
    }
    
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            startAutoSlide();
        });
    }
    
    // Set up click events for dots
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Function to start automatic sliding
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 6000); // Change slide every 6 seconds
    }
    
    // Start the automatic slide show if there are slides
    if (heroSlides.length > 0) {
        startAutoSlide();
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // Enhanced Testimonial Slider Functionality
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.testimonial-controls .prev-btn');
        const nextBtn = document.querySelector('.testimonial-controls .next-btn');
        
        if (testimonials.length === 0) return;
        
        let currentTestimonial = 0;
        let testimonialInterval;
        
        // Initialize slider
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateX(50px)';
                testimonial.style.display = 'none';
            });
            
            // Show the current testimonial
            testimonials[index].style.display = 'block';
            setTimeout(() => {
                testimonials[index].style.opacity = '1';
                testimonials[index].style.transform = 'translateX(0)';
            }, 50);
            
            // Update current index
            currentTestimonial = index;
        }
        
        // Set up event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                let prevIndex = currentTestimonial - 1;
                if (prevIndex < 0) prevIndex = testimonials.length - 1;
                showTestimonial(prevIndex);
                startAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                let nextIndex = currentTestimonial + 1;
                if (nextIndex >= testimonials.length) nextIndex = 0;
                showTestimonial(nextIndex);
                startAutoSlide();
            });
        }
        
        // Auto-slide functionality
        function startAutoSlide() {
            testimonialInterval = setInterval(() => {
                let nextIndex = currentTestimonial + 1;
                if (nextIndex >= testimonials.length) nextIndex = 0;
                showTestimonial(nextIndex);
            }, 5000); // Change testimonial every 5 seconds
        }
        
        // Initialize testimonial slider
        showTestimonial(0);
        startAutoSlide();
        
        // Add CSS transitions to testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .logo a, .hero-buttons a, .read-more, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Check if the href is a section ID (starts with #) and exists on the page
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        body.style.overflow = '';
                    }
                    
                    // Get header height for offset
                    const header = document.querySelector('.navbar');
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    // Smooth scroll to target section
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight - 10, // Account for fixed header with a little extra padding
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation to cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const reasonCards = document.querySelectorAll('.reason-card');
    const animatableElements = [...serviceCards, ...reasonCards];
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function handleScrollAnimation() {
        animatableElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Check on page load
    handleScrollAnimation();
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const currentlyActive = document.querySelector('.faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                }
                item.classList.toggle('active');
                
                const icon = question.querySelector('.faq-toggle i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        }
    });
    
    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Reset errors
            const errorElements = contactForm.querySelectorAll('.error-message');
            errorElements.forEach(error => error.remove());
            
            // Validate name
            if (nameInput && !nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            }
            
            // Validate email
            if (emailInput && !validateEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            }
            
            // Validate message
            if (messageInput && !messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // For demo purposes - would be replaced with actual form submission
                e.preventDefault();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerText = 'Thank you! Your message has been sent successfully.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    function validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
    
    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        input.parentNode.appendChild(errorElement);
        input.classList.add('error');
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const counterSection = document.querySelector('.counter-section');
    
    if (counterSection && counters.length > 0) {
        let counted = false;
        
        function animateCounter(counter, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                
                // Remove any "+" sign for the calculation
                const displayValue = counter.textContent.includes('+') 
                    ? value + '+' 
                    : value;
                    
                counter.textContent = displayValue;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        function startCounters() {
            if (!counted) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const text = counter.textContent;
                    const hasPlus = text.includes('+');
                    
                    // Set initial value to 0
                    counter.textContent = hasPlus ? '0+' : '0';
                    
                    // Animate to target
                    animateCounter(counter, 0, target, 2000);
                });
                counted = true;
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', function() {
            if (isInViewport(counterSection)) {
                startCounters();
            }
        });
        
        // Check on page load (in case counters are already in view)
        if (isInViewport(counterSection)) {
            startCounters();
        }
    }
    
    // Course Card Hover Effect
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature, .service-card, .reason-card, .mission-card, .vision-card');
    
    function animateOnScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Check on page load
    animateOnScroll();
    
    // CSS animation helper classes
    const addAnimationClasses = () => {
        const addClassToElements = (selector, className) => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add(className);
            });
        };
        
        addClassToElements('.about-text', 'animate-slide-in-left');
        addClassToElements('.about-image', 'animate-slide-in-right');
        addClassToElements('.mission-card, .vision-card', 'animate-fade-in');
    };
    
    // Add animation classes
    addAnimationClasses();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize counter animation for the home page
    initCounterAnimation();
    
    // Hero Slider functionality
    initHeroSlider();
});

// Hero Slider functionality
function initHeroSlider() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    
    if (heroSlides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        heroDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide and dot
        heroSlides[index].classList.add('active');
        if (heroDots[index]) {
            heroDots[index].classList.add('active');
        }
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to show the next slide
    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= heroSlides.length) {
            index = 0;
        }
        showSlide(index);
    }
    
    // Function to show the previous slide
    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) {
            index = heroSlides.length - 1;
        }
        showSlide(index);
    }
    
    // Set up click events for next/prev buttons
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function() {
            clearInterval(slideInterval); // Stop auto-slide when user interacts
            nextSlide();
            startAutoSlide(); // Restart auto-slide
        });
    }
    
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            startAutoSlide();
        });
    }
    
    // Set up click events for dots
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Function to start automatic sliding
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 6000); // Change slide every 6 seconds
    }
    
    // Start the automatic slide show
    showSlide(0);
    startAutoSlide();
}

// Counter Animation functionality
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-number');
    const counterSection = document.querySelector('.counter-section');
    
    if (!counterSection || counters.length === 0) return;
    
    let counted = false;
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function animateCounter(counter, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Check if the counter has a + or % suffix
            const text = counter.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            
            // Set the counter text with appropriate suffix
            if (hasPlus) {
                counter.textContent = value + '+';
            } else if (hasPercent) {
                counter.textContent = value + '%';
            } else {
                counter.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    function startCounters() {
        if (!counted) {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const text = counter.textContent;
                
                // Start animation from 0 to target
                animateCounter(counter, 0, target, 2000);
            });
            counted = true;
        }
    }
    
    // Check if counter section is in view on scroll
    window.addEventListener('scroll', function() {
        if (isInViewport(counterSection) && !counted) {
            startCounters();
        }
    });
    
    // Check on page load (in case counters are already in view)
    if (isInViewport(counterSection)) {
        startCounters();
    }
} 