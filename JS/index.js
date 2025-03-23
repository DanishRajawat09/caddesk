// slider code start
let slides = document.querySelector('.slides');
let totalSlides = document.querySelectorAll('.slide').length;

let currentIndex = 0

function showSlides(slideIndex) {
if ( slideIndex >= totalSlides){
    currentIndex = 0
}else if(slideIndex < 0){
    currentIndex = totalSlides -1
}else{
    currentIndex = slideIndex
}
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
}
function nextSlide() {
    showSlides(currentIndex + 1);
}
setInterval(nextSlide, 3000);
// slider code end

// inquiry panel  start
let CancelInquiry = document.querySelector(".inquiryPanelX")
let InquiryLogo = document.querySelector(".inquiryLogo")
let sectionInquiry = document.querySelector(".sectionInquiry")
InquiryLogo.addEventListener("click" , (e) => {
  sectionInquiry.style.transform = "translate(0%)"
}
)
CancelInquiry.addEventListener("click" , () => {
    sectionInquiry.style.transform = "translate(-100%)"
}
)

// Inquiry panel end


// Side Navbar start
const navBarCancel = document.querySelector(".sideNavBarX")
const sectionSideNav = document.querySelector(".sectionSideNavBar")
const menuBar = document.querySelector(".fa-bars")
menuBar.addEventListener("click" , () => {
  sectionSideNav.style.transform = "translate(0%)"
}
)
navBarCancel.addEventListener("click" , () => {
    sectionSideNav.style.transform = "translate(-100%)"
}
)

// Side Navbar end

// Slider functionality for courses and reviews

// DOM elements
const coursesSlider = document.querySelector('.CoursesCardSlides');
const coursesPrevBtn = document.querySelector('.courses-prev');
const coursesNextBtn = document.querySelector('.courses-next');

const reviewsSlider = document.querySelector('.cardContainer');
const reviewsPrevBtn = document.querySelector('.reviews-prev');
const reviewsNextBtn = document.querySelector('.reviews-next');

// Sidebar and inquiry panel elements
const sidebarBtn = document.querySelector('.fa-bars');
const sidebarPanel = document.querySelector('.sectionSideNavBar');
const sidebarCloseBtn = document.querySelector('.sideNavBarX');

const inquiryBtn = document.querySelector('.inquiryLogo');
const inquiryPanel = document.querySelector('.sectionInquiry');
const inquiryCloseBtn = document.querySelector('.inquiryPanelX');

// Back to top button
const backToTopBtn = document.querySelector('.backToTop');

// Scroll behavior for courses slider
function scrollCourses(direction) {
  if (!coursesSlider) return;
  
  const cardWidth = document.querySelector('.coursesCard')?.offsetWidth || 300;
  const gap = 20;
  const visibleWidth = coursesSlider.clientWidth;
  const scrollAmount = direction === 'prev' ? -(cardWidth + gap) : (cardWidth + gap);
  
  // For small screens, just scroll one card
  if (window.innerWidth < 768) {
    coursesSlider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    return;
  }
  
  // For larger screens, calculate how many cards to scroll
  const cardsToScroll = Math.floor(visibleWidth / (cardWidth + gap));
  const scrollAmountTotal = scrollAmount * (cardsToScroll > 0 ? cardsToScroll : 1);
  
  coursesSlider.scrollBy({
    left: scrollAmountTotal,
    behavior: 'smooth'
  });
}

// Scroll behavior for reviews slider
function scrollReviews(direction) {
  if (!reviewsSlider) return;
  
  const cardWidth = document.querySelector('.reviewCard')?.offsetWidth || 350;
  const gap = 30;
  const visibleWidth = reviewsSlider.clientWidth;
  const scrollAmount = direction === 'prev' ? -(cardWidth + gap) : (cardWidth + gap);
  
  // For small screens, just scroll one card
  if (window.innerWidth < 768) {
    reviewsSlider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    return;
  }
  
  // For larger screens, calculate how many cards to scroll
  const cardsToScroll = Math.floor(visibleWidth / (cardWidth + gap));
  const scrollAmountTotal = scrollAmount * (cardsToScroll > 0 ? cardsToScroll : 1);
  
  reviewsSlider.scrollBy({
    left: scrollAmountTotal,
    behavior: 'smooth'
  });
}

// Initialize slider functionality with touch support
function initSliders() {
  // Courses slider navigation
  if (coursesPrevBtn && coursesNextBtn && coursesSlider) {
    coursesPrevBtn.addEventListener('click', () => scrollCourses('prev'));
    coursesNextBtn.addEventListener('click', () => scrollCourses('next'));
    
    // Add touch support for mobile
    let startX, startScrollLeft;
    
    coursesSlider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      startScrollLeft = coursesSlider.scrollLeft;
    }, { passive: true });
    
    coursesSlider.addEventListener('touchmove', (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 2; // Scroll speed multiplier
      coursesSlider.scrollLeft = startScrollLeft + walk;
    }, { passive: true });
    
    coursesSlider.addEventListener('touchend', () => {
      startX = null;
    });
  }

  // Reviews slider navigation
  if (reviewsPrevBtn && reviewsNextBtn && reviewsSlider) {
    reviewsPrevBtn.addEventListener('click', () => scrollReviews('prev'));
    reviewsNextBtn.addEventListener('click', () => scrollReviews('next'));
    
    // Add touch support for mobile
    let startX, startScrollLeft;
    
    reviewsSlider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      startScrollLeft = reviewsSlider.scrollLeft;
    }, { passive: true });
    
    reviewsSlider.addEventListener('touchmove', (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 2; // Scroll speed multiplier
      reviewsSlider.scrollLeft = startScrollLeft + walk;
    }, { passive: true });
    
    reviewsSlider.addEventListener('touchend', () => {
      startX = null;
    });
  }
}

// Sidebar toggle functionality
function initSidebar() {
  if (sidebarBtn && sidebarPanel && sidebarCloseBtn) {
    sidebarBtn.addEventListener('click', () => {
      sidebarPanel.style.transform = 'translateX(0)';
    });

    sidebarCloseBtn.addEventListener('click', () => {
      sidebarPanel.style.transform = 'translateX(-100%)';
    });
    
    // Add dropdown functionality for side navbar
    const dropdownToggles = document.querySelectorAll('.sideNavDropdownToggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        // Prevent click from propagating to parent elements
        e.stopPropagation();
        
        // Toggle active class on the clicked dropdown toggle
        this.classList.toggle('active');
        
        // Get the dropdown content (next sibling of the toggle)
        const dropdownContent = this.nextElementSibling;
        
        // Toggle the 'show' class on the dropdown content
        if (dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
        } else {
          // Close any open dropdowns
          document.querySelectorAll('.sideNavDropdown.show').forEach(openDropdown => {
            if (openDropdown !== dropdownContent) {
              openDropdown.classList.remove('show');
              openDropdown.previousElementSibling.classList.remove('active');
            }
          });
          
          dropdownContent.classList.add('show');
        }
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.sideNavDropdownToggle') && !e.target.closest('.sideNavDropdown')) {
        document.querySelectorAll('.sideNavDropdown.show').forEach(dropdown => {
          dropdown.classList.remove('show');
          dropdown.previousElementSibling.classList.remove('active');
        });
      }
    });
  }
}

// Inquiry panel toggle functionality
function initInquiryPanel() {
  if (inquiryBtn && inquiryPanel && inquiryCloseBtn) {
    inquiryBtn.addEventListener('click', () => {
      inquiryPanel.style.transform = 'translateX(0)';
    });

    inquiryCloseBtn.addEventListener('click', () => {
      inquiryPanel.style.transform = 'translateX(-200%)';
    });
  }
}

// Back to top functionality
function initBackToTop() {
  if (backToTopBtn) {
    // Initially hide the button
    backToTopBtn.style.display = 'none';
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// FAQ accordion functionality
function initFAQ() {
  const faqItems = document.querySelectorAll('.faqItem');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faqQuestion');
      
      question.addEventListener('click', () => {
        // Close all other open items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSliders();
  initSidebar();
  initInquiryPanel();
  initBackToTop();
  initFAQ();
});

