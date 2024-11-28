const burgerBtn = document.querySelector('.burger-btn'); // Кнопка бургер
const modalOverlay = document.querySelector('.modal-overlay'); // Модалка
const closeModalBtn = modalOverlay.querySelector('.icon-close'); // Крестик в модалке

// Открыть модалку
burgerBtn.addEventListener('click', () => {
  modalOverlay.classList.add('active'); // Добавляем класс для отображения модалки
  document.body.style.overflow = 'hidden';
  // burgerBtn.style.display = 'none';
});

// Закрыть модалку
closeModalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('active'); // Убираем класс для скрытия модалки
  document.body.style.overflow = 'auto';
  // burgerBtn.style.display = 'flex';
});
console.log('Hello');

// Закрытие модалки по клику вне её области
modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
