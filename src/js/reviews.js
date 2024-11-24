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
          <p class="author-text">${review.review}</p>
          <div class="coments-author">
            <img src="${review.avatar_url}" alt="${review.author}" class="author-icon">
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
        if(currentIndex===0){
            prevButton.classList.replace("btn-prev","btn-prev-hidden");   
        }else{
            prevButton.classList.replace("btn-prev-hidden","btn-prev");
        }

        if(currentIndex>= reviews.length-2){
            nextButton.classList.replace("btn-next","btn-next-hidden");
        }else{
            nextButton.classList.replace("btn-next-hidden","btn-next");
        }
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

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowLeft'){
            slide('prev');
        }else if(event.key === 'ArrowRight'){
            slide('next');
        }
    });

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'Tab'){
            event.preventDefault(); 
        }

        if(event.shiftKey){
            slide('prev');
        }else{
            slide('next');
        }
    });
    
    reviewsList.addEventListener('touchstart', (event) => {
        if (!isSwipeEnabled) return; // Якщо свайп не дозволено, не обробляємо події
        startX = event.touches[0].clientX; // отримуємо координати початку жесту
      });
      
      reviewsList.addEventListener('touchend', (event) => {
        if (!isSwipeEnabled) return; // Якщо свайп не дозволено, не обробляємо події
        endX = event.changedTouches[0].clientX; // отримуємо координати кінця жесту
      
        // Якщо свайп праворуч, перемикаємо в наступний коментар
        if (startX > endX) {
          slide('next');
        }
        // Якщо свайп ліворуч, перемикаємо в попередній коментар
        if (startX < endX) {
          slide('prev');
        }
        isSwipeEnabled = false; // Відключаємо свайп після завершення
      });
      
  
    // Додавання обробників подій
    prevButton.addEventListener('click', () => slide('prev'));
    nextButton.addEventListener('click', () => slide('next'));
  
    // Ініціалізація
    fetchReviews();
  
  