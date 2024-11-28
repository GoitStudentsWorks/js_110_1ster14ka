`use strict`;

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    document.getElementById('slider').checked = true;
  } else {
    setTheme('theme-light');
    document.getElementById('slider').checked = false;
  }
})();

const slider = document.getElementById('slider');
console.log(slider);
console.log(document.querySelectorAll('#slider').length);

// document.addEventListener('DOMContentLoaded', function () {
//   const slider = document.getElementById('slider');

//   const currentTheme = localStorage.getItem('theme') || 'theme-light';
//   setTheme(currentTheme);
//   slider.checked = currentTheme === 'theme-dark';

//   slider.addEventListener('change', toggleTheme);
// });
