// Main JavaScript for CADDesk Website

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if(navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if(question) {
      question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle the current FAQ item
        item.classList.toggle('active');
      });
    }
  });
  
  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Get error elements
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      
      // Reset error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      
      // Validation flags
      let isValid = true;
      
      // Validate name
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Validate message
      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Your message should be at least 10 characters';
        isValid = false;
      }
      
      // If validation passes
      if (isValid) {
        // Hide the form and show success message
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'flex';
        }
        
        // In a real application, you would send the form data to a server here
        // For demo purposes, we're just showing the success message
        
        // Reset form after 5 seconds (in a real app, this might be different)
        setTimeout(function() {
          contactForm.reset();
          contactForm.style.display = 'block';
          if (formSuccess) {
            formSuccess.style.display = 'none';
          }
        }, 5000);
      }
    });
  }
  
  // Testimonial Slider
  let currentSlide = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if(testimonials.length > 0) {
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if(index !== 0) {
        testimonial.style.display = 'none';
      }
    });
    
    // Previous button functionality
    if(prevBtn) {
      prevBtn.addEventListener('click', () => {
        testimonials[currentSlide].style.display = 'none';
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        testimonials[currentSlide].style.display = 'block';
      });
    }
    
    // Next button functionality
    if(nextBtn) {
      nextBtn.addEventListener('click', () => {
        testimonials[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % testimonials.length;
        testimonials[currentSlide].style.display = 'block';
      });
    }
  }
  
  // Animate on scroll effect for about page sections
  const animatedSections = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animatedSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if(sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  }
  
  // Check on initial load
  if(animatedSections.length > 0) {
    checkScroll();
    window.addEventListener('scroll', checkScroll);
  }
}); 