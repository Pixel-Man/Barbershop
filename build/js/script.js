var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var popUp = document.querySelector('.popup-entry');
var popUp__entry = document.querySelector('.main-nav__user-login');
var popUp__closed = document.querySelector('.popup-entry__form-btn--closed');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed') && navMain.classList.contains('main-nav')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    popUp.classList.remove('popup-entry--opened');
    popUp.classList.add('popup-entry--closed');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

popUp__entry.addEventListener('click', function(event) {
  if (popUp.classList.contains('popup-entry') && navMain.classList.contains('main-nav')) {
    event.preventDefault();
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
    popUp.classList.remove('popup-entry--closed');
    popUp.classList.add('popup-entry--opened');
  } else {
    popUp.classList.add('popup-entry--closed');
    popUp.classList.remove('popup-entry--opened');
  }
});

popUp__closed.addEventListener('click', function(event) {
  if (popUp.classList.contains('popup-entry')) {
    event.preventDefault();
    popUp.classList.remove('popup-entry--opened');
    popUp.classList.add('popup-entry--closed');
  }
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popUp.classList.contains("popup-entry")) {
      popUp.classList.remove("popup-entry--opened");
      popUp.classList.add('popup-entry--closed');
    }
  }
});
