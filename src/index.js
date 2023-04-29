import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhotos } from './fetchCards';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const input = form.firstElementChild.value.trim();
  gallery.innerHTML = '';
  form.reset();
  fetchPhotos(input)
    .then(({ hits }) => {
      console.log(hits);

      if (hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        return;
      } else {
        addMarkup(hits);
      }
    })
    .then(addLightbox);
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
  <a class = "gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  gallery.innerHTML = markup;
}

function addLightbox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
