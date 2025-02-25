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