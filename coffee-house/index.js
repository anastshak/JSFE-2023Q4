'use strict'
/* burger-menu */
const burgerMenu = document.querySelector('.burger-menu');
const popup = document.querySelector(".popup");
const body = document.body;
const menu = document.querySelector("nav").cloneNode(1);

burgerMenu.addEventListener("click", burgerHandler);

function burgerHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  burgerMenu.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  burgerMenu.classList.remove("active");
  body.classList.remove("noscroll");
}



/* slider */

window.addEventListener('load', () => {
  initSlider();
});

const initSlider = () => {
  const carousel = document.querySelector('.carousel');
  const sliderLine = document.querySelector('.slider-line');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const switchBtn = document.querySelectorAll('.btn');
  
  let position = 0;
  let btnIndex = 0;
  let currantWidth;
  
  function updateSliderWidth () {
    if (window.innerWidth <= 380) {
      currantWidth = 348;
    } else {
      currantWidth = 480;
    }
  }
  
  window.dispatchEvent(new Event('resize'));
  
  const nextSlide = () => {
    if (position < (switchBtn.length - 1) * currantWidth) {
      position += currantWidth;
      btnIndex++;
    } else {
      position = 0;
      btnIndex = 0;
    }
    sliderLine.style.left = -position + 'px';
    currantSlide(btnIndex);
  };
  
  const prevSlide = () => {
    if (position > 0) {
      position -= currantWidth;
      btnIndex--;
    } else {
      position = (switchBtn.length - 1) * currantWidth;
      btnIndex = (switchBtn.length - 1);
    }
    sliderLine.style.left = -position + 'px';
    currantSlide(btnIndex);
  };
  
  const currantSlide = (index) => {
    for (let btn of switchBtn) {
      btn.classList.remove('btn-active');
    }
    switchBtn[index].classList.add('btn-active')
  }

  let x1 = null;
  let y1 = null;

  const handleTouchStart = (e) => {
    clearTimeout(timerId);
    const firstTouch = e.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  }

  const handleTouchMove = (e) => {
    if (!x1 || !y1) {
      false
    }
    const lastTouch = e.touches[0];
    let x2 = lastTouch.clientX;
    let y2 = lastTouch.clientY;
    let xDiff = x2 -x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    x1 = null;
    y1 = null;
  }
  
  window.addEventListener('resize', function () {
    updateSliderWidth();
  });
  
  updateSliderWidth();
  
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  carousel.addEventListener('touchstart', handleTouchStart, false);
  carousel.addEventListener('touchmove', handleTouchMove, false);
  
  switchBtn.forEach((btn, index) => {
    btn.addEventListener('load', () => {
      position = currantWidth * index;
      sliderLine.style.left = -position + 'px';
      btnIndex = index;
      currantSlide(btnIndex);
    }
    )
  })

  // setInterval( () => {
  //   nextSlide()
  // }, 7000);
  
  let timerId = setTimeout(function tick() {
    nextSlide();
    timerId = setTimeout(tick, 7000); 
  }, 7000);
  
  //sliderLine.addEventListener('mouseenter', clearTimeout(timerId));
}




/* switching categories */

window.dispatchEvent(new Event('resize'));
// switching buttons-sections

const coffeeButton = document.querySelector('.btn-coffee');
const teaButton = document.querySelector('.btn-tea');
const dessertButton = document.querySelector('.btn-dessert');

const coffeeSection = document.querySelector('.menu-coffee-block');
const teaSection = document.querySelector('.menu-tea-block');
const dessertSection = document.querySelector('.menu-dessert-block');


function handleButtonClick(button, section) {
  coffeeButton.classList.remove('active');
  teaButton.classList.remove('active');
  dessertButton.classList.remove('active');

  coffeeSection.classList.remove('active');
  teaSection.classList.remove('active');
  dessertSection.classList.remove('active');

  button.classList.add('active');
  section.classList.add('active');
}

// refresh button
const refreshButton = document.querySelector('.refresh-btn');

const halfCoffeeSection = document.querySelectorAll('.half-coffee');
const arrayHalfCoffeeSection = Array.from(halfCoffeeSection);

const halfDessertSection = document.querySelectorAll('.half-dessert');
const arrayHalfDessertSection = Array.from(halfDessertSection);

let currantSection = 'coffee';

refreshButton?.addEventListener('click', function () {
  if (window.innerWidth <= 768 && currantSection === 'coffee') {
    refreshButton.style.display = 'none';
    for (let i = 0; i < arrayHalfCoffeeSection.length; i++) {
      arrayHalfCoffeeSection[i].style.display = 'flex';
    }
  } else if (window.innerWidth <= 768 && currantSection === 'dessert') {
    refreshButton.style.display = 'none';
    for (let i = 0; i < arrayHalfDessertSection.length; i++) {
      arrayHalfDessertSection[i].style.display = 'flex';
    }
  }
})

function updateMenuWidth() {
 if (window.innerWidth > 768) {
  refreshButton.style.display = 'none';
  for (let i = 0; i < arrayHalfCoffeeSection.length; i++) {
    arrayHalfCoffeeSection[i].style.display = 'flex';    
  }
  for (let i = 0; i < arrayHalfDessertSection.length; i++) {
    arrayHalfDessertSection[i].style.display = 'flex';
  }
 } else {
  refreshButton.style.display = 'flex';
  for (let i = 0; i < arrayHalfCoffeeSection.length; i++) {
    arrayHalfCoffeeSection[i].style.display = 'none';    
  }
  for (let i = 0; i < arrayHalfDessertSection.length; i++) {
    arrayHalfDessertSection[i].style.display = 'none';
  }
 }
}

window.addEventListener('resize', function () {
  updateMenuWidth();
});

coffeeButton.addEventListener('click', function () {
  currantSection = 'coffee';
  handleButtonClick(coffeeButton, coffeeSection);

  if (window.innerWidth <= 768) {
    refreshButton.style.display = 'flex';    
    for (let i = 0; i < arrayHalfCoffeeSection.length; i++) {
      arrayHalfCoffeeSection[i].style.display = 'none';
    }
  }
});

teaButton.addEventListener('click', function () {
  currantSection = 'tea';
  handleButtonClick(teaButton, teaSection);
  refreshButton.style.display = 'none';
});

dessertButton.addEventListener('click', function () {
  currantSection = 'dessert';
  handleButtonClick(dessertButton, dessertSection);

  if (window.innerWidth <= 768) {    
    refreshButton.style.display = 'flex';
    for (let i = 0; i < arrayHalfDessertSection.length; i++) {
      arrayHalfDessertSection[i].style.display = 'none';
    }
  }
});