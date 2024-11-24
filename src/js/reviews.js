document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.querySelector('.coments-list');
    const prevButton = document.querySelector('.btn-prev');
    const nextButton = document.querySelector('.btn-next');
    const resultsContainer = document.querySelector('.results-container');
  
    let reviews = [];
    let currentIndex = 0;
  
    // Функція для створення розмітки
    const createMarkup = (reviews) => {
      return reviews.map(review => `
        <li class="coments-text">
          <p class="author-text">${review.text}</p>
          <div class="coments-author">
            <img src="${review.avatar}" alt="${review.author}" class="author-icon">
            <p class="author-name">${review.author}</p>
          </div>
        </li>
      `).join('');
    };
  
    // Функція для завантаження відгуків
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://portfolio-js.b.goit.study/api/reviews');
        reviews = response.data;
  
        if (!Array.isArray(reviews) || reviews.length === 0) {
          throw new Error('No reviews found');
        }
  
        // Додаємо перші два відгуки на сторінку
        reviewsList.innerHTML = createMarkup(reviews.slice(currentIndex, currentIndex + 2));
        updateButtons();
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
        resultsContainer.innerHTML = '<p class="error-message">Not found</p>';
      }
    };
  
    // Функція для оновлення кнопок
    const updateButtons = () => {
      prevButton.classList.toggle('btn-prev-hidden', currentIndex === 0);
      nextButton.classList.toggle('btn-next-hidden', currentIndex >= reviews.length - 2);
    };
  
    // Функція для перемикання слайдів
    const slide = (direction) => {
      if (direction === 'next' && currentIndex < reviews.length - 2) {
        currentIndex++;
      } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
      }
      reviewsList.innerHTML = createMarkup(reviews.slice(currentIndex, currentIndex + 2));
      updateButtons();
    };
  
    // Додавання обробників подій
    prevButton.addEventListener('click', () => slide('prev'));
    nextButton.addEventListener('click', () => slide('next'));
  
    // Ініціалізація
    fetchReviews();
  });
  