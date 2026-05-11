const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.btn-right');
const prevBtn = document.querySelector('.btn-left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

let currentIdx = 0;

function moveSlide(idx) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * idx}px)`;
    
    document.querySelector('.active-dot').classList.remove('active-dot');
    dots[idx].classList.add('active-dot');
    currentIdx = idx;
}

nextBtn.addEventListener('click', () => {
    let index = (currentIdx + 1) % slides.length;
    moveSlide(index);
});

prevBtn.addEventListener('click', () => {
    let index = (currentIdx - 1 + slides.length) % slides.length;
    moveSlide(index);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => moveSlide(i));
});

setInterval(() => {
    nextBtn.click();
}, 4000);

window.addEventListener('resize', () => moveSlide(currentIdx));
