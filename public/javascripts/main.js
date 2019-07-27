'use strict';

const main = () => {
  const img = document.querySelector('#profile-nav');
  const elements = document.querySelectorAll('.hidden-nav');
  img.addEventListener('click', () => {
    elements.forEach((e) => {
      e.classList.toggle('hidden-nav');
    });
  });
};

window.addEventListener('load', main);
