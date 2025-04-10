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

// inquiry panel - moved to initInquiryPanel function
let CancelInquiry = document.querySelector(".inquiryPanelX")
let sectionInquiry = document.querySelector(".sectionInquiry")

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
    
    // Improved touch support with better handling
    let startX, startScrollLeft, isDragging = false;
    
    coursesSlider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      startScrollLeft = coursesSlider.scrollLeft;
      isDragging = true;
    }, { passive: true });
    
    coursesSlider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 1.5; // Adjust scroll speed for better mobile feel
      coursesSlider.scrollLeft = startScrollLeft + walk;
      
      // Prevent page scrolling when slider is being swiped
      if (Math.abs(walk) > 10) {
        e.preventDefault();
      }
    }, { passive: false });
    
    coursesSlider.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Add mouse support for desktop drag
    coursesSlider.addEventListener('mousedown', (e) => {
      startX = e.pageX;
      startScrollLeft = coursesSlider.scrollLeft;
      isDragging = true;
      coursesSlider.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (startX - x) * 1.5;
      coursesSlider.scrollLeft = startScrollLeft + walk;
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      coursesSlider.style.cursor = 'grab';
    });
  }

  // Reviews slider - similar improvements
  if (reviewsPrevBtn && reviewsNextBtn && reviewsSlider) {
    reviewsPrevBtn.addEventListener('click', () => scrollReviews('prev'));
    reviewsNextBtn.addEventListener('click', () => scrollReviews('next'));
    
    let startX, startScrollLeft, isDragging = false;
    
    reviewsSlider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      startScrollLeft = reviewsSlider.scrollLeft;
      isDragging = true;
    }, { passive: true });
    
    reviewsSlider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 1.5;
      reviewsSlider.scrollLeft = startScrollLeft + walk;
      
      if (Math.abs(walk) > 10) {
        e.preventDefault();
      }
    }, { passive: false });
    
    reviewsSlider.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Add mouse support for desktop drag
    reviewsSlider.addEventListener('mousedown', (e) => {
      startX = e.pageX;
      startScrollLeft = reviewsSlider.scrollLeft;
      isDragging = true;
      reviewsSlider.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (startX - x) * 1.5;
      reviewsSlider.scrollLeft = startScrollLeft + walk;
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      reviewsSlider.style.cursor = 'grab';
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
  const inquiryNavLink = document.querySelector('#inquiryNavLink');
  const inquirySideLink = document.querySelector('#inquirySideLink');
  const inquiryPanel = document.querySelector('.sectionInquiry');
  const inquiryCloseBtn = document.querySelector('.inquiryPanelX');
  
  if (inquiryPanel && inquiryCloseBtn) {
    // Main navbar inquiry link
    if (inquiryNavLink) {
      inquiryNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Check window width to determine appropriate transform
        if (window.innerWidth < 768) {
          inquiryPanel.style.transform = 'translate(0%)';
        } else {
          inquiryPanel.style.transform = 'translateX(0)';
        }
      });
    }
    
    // Side navbar inquiry link
    if (inquirySideLink) {
      inquirySideLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Check window width to determine appropriate transform
        if (window.innerWidth < 768) {
          inquiryPanel.style.transform = 'translate(0%)';
        } else {
          inquiryPanel.style.transform = 'translateX(0)';
        }
        
        // Close side navbar when clicking inquiry link
        if (sidebarPanel) {
          sidebarPanel.style.transform = 'translateX(-100%)';
        }
      });
    }

    inquiryCloseBtn.addEventListener('click', () => {
      // Check window width to determine appropriate transform
      if (window.innerWidth < 768) {
        inquiryPanel.style.transform = 'translate(-100%)';
      } else {
        inquiryPanel.style.transform = 'translateX(-200%)';
      }
    });
    
    // Handle orientation change and resize events
    window.addEventListener('resize', () => {
      // Reset transform to avoid display issues on device rotation or resize
      if (window.innerWidth < 768) {
        inquiryPanel.style.transform = 'translate(-100%)';
      } else {
        inquiryPanel.style.transform = 'translateX(-200%)';
      }
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

// Handle viewport size changes
function handleViewportChanges() {
  const viewportHandler = () => {
    // Adjust elements based on current viewport size
    if (sidebarPanel) {
      if (window.innerWidth >= 992) {
        sidebarPanel.style.transform = 'translateX(-100%)';
      }
    }
    
    // Adjust slider display based on viewport
    if (coursesSlider) {
      const cards = coursesSlider.querySelectorAll('.coursesCard');
      if (cards.length > 0) {
        if (window.innerWidth <= 576) {
          cards.forEach(card => {
            card.style.minWidth = 'calc(100% - 20px)';
          });
        } else if (window.innerWidth <= 768) {
          cards.forEach(card => {
            card.style.minWidth = 'calc(80% - 20px)';
          });
        } else {
          cards.forEach(card => {
            card.style.minWidth = '280px';
          });
        }
      }
    }
    
    if (reviewsSlider) {
      const cards = reviewsSlider.querySelectorAll('.reviewCard');
      if (cards.length > 0) {
        if (window.innerWidth <= 576) {
          cards.forEach(card => {
            card.style.minWidth = 'calc(100% - 20px)';
          });
        } else if (window.innerWidth <= 768) {
          cards.forEach(card => {
            card.style.minWidth = 'calc(80% - 20px)';
          });
        } else {
          cards.forEach(card => {
            card.style.minWidth = '350px';
          });
        }
      }
    }
  };
  
  // Run on page load
  viewportHandler();
  
  // Throttled resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(viewportHandler, 100);
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSliders();
  initSidebar();
  initInquiryPanel();
  initBackToTop();
  initFAQ();
  handleViewportChanges();
});

