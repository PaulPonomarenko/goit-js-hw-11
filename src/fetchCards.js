const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35873317-71e90e79160d51a7ec8f77390';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});
function fetchPhotos(name) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&${searchParams}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

fetchPhotos();
export { fetchPhotos };
