import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';

const URL = 'https://portfolio-js.b.goit.study/api/reviews';

const swiperList = document.querySelector('.reviews-swiper-list');

const swiper = new Swiper('.reviews-swiper', {
  modules: [Navigation, Keyboard],
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
  speed: 400,
  spaceBetween: 32,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    1280: {
      slidesPerView: 2,
      centerInsufficientSlides: true,
    },
  },
});

async function getReviews() {
  const { data } = await axios(URL);
  return data;
}

function createMarkup(arr) {
  return arr
    .map(
      ({ author, avatar_url, review }) =>
        `<li class="swiper-slide">
            <div class="reviews-text">
              <p class="review-p">${review}</p>
            </div>
          <div class="reviews-info">
            <div class="reviews-wrapper-img">
              <img src="${avatar_url}" alt="client" class="reviews-img">
            </div>
            <h3 class="reviews-name">${author}</h3>
          </div>
        </li>`
    )
    .join('');
}

getReviews()
  .then(data => {
    swiperList.innerHTML = createMarkup(data);
    swiper.update();
  })
  .catch(error => {
    document.querySelector(
      '.reviews-swiper'
    ).innerHTML = `<p class="error">Not found</p>`;
  });
