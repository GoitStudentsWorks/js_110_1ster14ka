function duplicateContent(containerId) {
  const container = document.getElementById(containerId);
  const originalContent = container.querySelector('.skills__inner');

  for (let i = 0; i < 4; i++) {
    const clone = originalContent.cloneNode(true);
    container.appendChild(clone);
  }

  const setContentWidth = () => {
    const itemsWidth = originalContent.offsetWidth;

    container.style.width = `${itemsWidth * 5}px`;
  };

  if (document.readyState === 'complete') {
    setContentWidth();
  } else {
    window.addEventListener('load', setContentWidth);
  }

  window.addEventListener('resize', setContentWidth);
}

document.addEventListener('DOMContentLoaded', () => {
  duplicateContent('top-skills');
  duplicateContent('bottom-skills');
});
