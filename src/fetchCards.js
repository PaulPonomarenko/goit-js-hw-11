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

// fetchPhotos();
// export { fetchPhotos };
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
  // fetchPhotos() {
  //   return fetch(
  //     `${NewApiServise.BASE_URL}?key=${NewApiServise.API_KEY}&q=${this.name}&${NewApiServise.searchParams}&per_page=40&page=${this.page}`
  //   ).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     this.incrementPage();
  //     return response.json();
  //   });
  // }
  // async fetchPics() {
  //   const URL = 'https://pixabay.com/api/';
  //   const KEY = '35668157-dc7e121b764e10d5e5d6ef031';

  //   const response = await axios.get(`${URL}`, {
  //     params: {
  //       q: this.topic,
  //       page: this.page,
  //       per_page: 40,
  //       image_type: 'photo',
  //       orientation: 'horizontal',
  //       safesearch: 'true',
  //       key: KEY,
  //     },
  //   });
  //   return response.data;
  // }
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
