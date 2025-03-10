// IT DESK SLIDER START

let slidesIT = document.querySelector('.slidesIt');
let totalSlidesIT = document.querySelectorAll('.slideIt').length;

let currentIndexIT = 0

function showSlidesIT(slideIndex) {
if ( slideIndex >= totalSlidesIT){
    currentIndexIT = 0
}else if(slideIndex < 0){
    currentIndexIT = totalSlidesIT -1
}else{
    currentIndexIT = slideIndex
}
    slidesIT.style.transform = `translateX(${-currentIndexIT * 100}%)`;
}
function nextSlideIT() {
    showSlidesIT(currentIndexIT + 1);
}
setInterval(nextSlideIT, 3000);

// IT DESK SLIDER END