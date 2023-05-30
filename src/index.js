import { PixabayAPI } from './js/PixabayAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupList } from './js/cardTemplate';
import refs from './js/refs';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const NUMBER_OF_OBJECTS = 40;
const pixabayAPI = new PixabayAPI(NUMBER_OF_OBJECTS);
const gallery = new SimpleLightbox('.photo-card a');
let page = 1;

refs.formEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreEl.addEventListener('click', handlerPagination);

async function onSearchFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreEl.classList.add('is-hidden');
  page = 1;
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  pixabayAPI.query = searchQuery;

  if (!searchQuery) {
    Notify.failure('Enter your request');
    return;
  }

  try {
    const response = await pixabayAPI.getPhotosByQuery(page);

    if (response.data.hits.length === 0) {
      refs.galleryEl.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    refs.galleryEl.innerHTML = createMarkupList(response.data.hits);
    gallery.refresh();
    Notify.info(`"Hooray! We found ${response.data.totalHits} images."`);

    if (!(response.data.totalHits <= NUMBER_OF_OBJECTS)) {
      refs.loadMoreEl.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function handlerPagination() {
  page += 1;
  console.log(page);
  console.log(page * NUMBER_OF_OBJECTS);
  pixabayAPI.query = refs.formEl.elements.searchQuery.value;
  try {
    const response = await pixabayAPI.getPhotosByQuery(page);
    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      createMarkupList(response.data.hits)
    );

    gallery.refresh();

    if (response.data.totalHits <= page * NUMBER_OF_OBJECTS) {
      refs.loadMoreEl.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}
