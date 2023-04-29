import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhotos } from './fetchCards';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  const input = form.firstElementChild.value.trim();
  fetchPhotos(input).then(({ hits }) => {
    console.log(hits);
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      addMarkup(hits);
    }
  });

  event.preventDefault();
}

function addMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        views,
        comments,
        downloads,
        likes,
      }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  gallery.innerHTML = markup;
}
