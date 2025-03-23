// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize the slider
    function initSlider() {
        if (!heroSlides.length) return;
        
        // Set the first slide as active
        heroSlides[0].classList.add('active');
        
        // Start the automatic slideshow
        startSlideshow();
        
        // Event listeners for controls
        if (prevSlideBtn && nextSlideBtn) {
            prevSlideBtn.addEventListener('click', prevSlide);
            nextSlideBtn.addEventListener('click', nextSlide);
        }
        
        // Event listeners for dots
        if (heroDots.length) {
            heroDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
        }
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        if (index < 0) index = heroSlides.length - 1;
        if (index >= heroSlides.length) index = 0;
        
        heroSlides[currentSlide].classList.remove('active');
        heroDots[currentSlide]?.classList.remove('active');
        
        heroSlides[index].classList.add('active');
        heroDots[index]?.classList.add('active');
        
        currentSlide = index;
        
        // Reset the interval
        clearInterval(slideInterval);
        startSlideshow();
    }
    
    // Go to the next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Go to the previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start the automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    function initTestimonialSlider() {
        if (!testimonials.length) return;
        
        // Event listeners for controls
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevTestimonial);
            nextBtn.addEventListener('click', nextTestimonial);
        }
        
        // Set initial active testimonial
        showTestimonial(currentTestimonial);
    }
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        if (testimonials[index]) {
            testimonials[index].style.display = 'block';
        }
    }
    
    function nextTestimonial() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            
            // Check if the href is a section ID (starts with #)
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to target section
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Account for fixed header
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Update active class
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Scroll event to update active navigation link
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update active navigation link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add animation to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
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
        serviceCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Check on page load
    handleScrollAnimation();
    
    // FAQ Accordion
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (!faqQuestions.length) return;
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
                
                const icon = question.querySelector('.faq-toggle i');
                if (icon) {
                    if (faqItem.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }
    
    // Initialize all components
    initSlider();
    initTestimonialSlider();
    initFaqAccordion();
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically add AJAX code to submit the form
            alert('Thank you for your inquiry! Our admissions team will contact you shortly.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); 