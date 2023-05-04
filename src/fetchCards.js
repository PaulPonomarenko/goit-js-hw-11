import axios from 'axios';

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

export default class NewApiServise {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '35873317-71e90e79160d51a7ec8f77390';
  static searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  constructor() {
    this.name = '';
    this.page = 1;
  }

  async fetchPhotos() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '35873317-71e90e79160d51a7ec8f77390';
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: this.name,
        page: this.page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        key: API_KEY,
      },
    });

    return response.data;
  }
  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
}
