// https://unsplash.com/documentation#search-photos
// https://www.npmjs.com/package/tui-pagination

import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '36838949-c6733ba7cda813dd9dfa43f4c';
  #query = '';

  constructor(perPage = 10) {
    this.per_page = perPage;
  }

  getPhotosByQuery(page) {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.#query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: this.per_page,
      },
    });
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
