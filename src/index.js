import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiServise from './fetchCards.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './LoadMoreBtn.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const btnLoadMoreRef = document.querySelector('.load-more');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
const newApiServise = new NewApiServise();

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', onClick);
loadMoreBtn.hide();
function onSubmit(event) {
  event.preventDefault();
  newApiServise.resetPage();
  const input = form.firstElementChild.value.trim();
  newApiServise.name = input;
  gallery.innerHTML = '';
  form.reset();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  newApiServise
    .fetchPhotos(input)
    .then(({ hits }) => {
      if (hits.length === 0) {
        loadMoreBtn.hide();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        addMarkup(hits);
      }
    })
    .then(addLightbox)
    .catch(error => console.log(error));
  loadMoreBtn.enable();
}

async function addMarkup(hits) {
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

  gallery.insertAdjacentHTML('beforeend', markup);
}

function addLightbox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
function onClick(event) {
  loadMoreBtn.disable();
  newApiServise.incrementPage();
  newApiServise
    .fetchPhotos()
    .then(({ hits, totalHits }) => {
      addMarkup(hits);
      if (100 * newApiServise.page > totalHits) {
        loadMoreBtn.hide();
        return Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }

      loadMoreBtn.enable();
    })
    .then(addLightbox)
    .catch(error => console.log(error));
}
