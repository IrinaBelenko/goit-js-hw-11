import { UnsplashAPI } from './js/UnsplashAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupList } from './js/cardTemplate';
import refs from './js/refs';

const NUMBER_OF_OBJECTS = 40;
const unsplashApi = new UnsplashAPI(NUMBER_OF_OBJECTS);
let page = 1;

refs.formEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreEl.addEventListener('click', handlerPagination);

async function onSearchFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreEl.classList.add('is-hidden');
  page = 1;
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  unsplashApi.query = searchQuery;

  if (!searchQuery) {
    Notify.failure('Enter your request');
  }

  try {
    const response = await unsplashApi.getPhotosByQuery(page);

    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    refs.galleryEl.innerHTML = createMarkupList(response.data.hits);

    refs.loadMoreEl.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

async function handlerPagination() {
  page += 1;
  console.log(page);
  console.log(page * NUMBER_OF_OBJECTS);
  unsplashApi.query = refs.formEl.elements.searchQuery.value;
  try {
    const response = await unsplashApi.getPhotosByQuery(page);
    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      createMarkupList(response.data.hits)
    );

    if (response.data.totalHits <= page * NUMBER_OF_OBJECTS) {
      refs.loadMoreEl.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}

// async function createByQueryPagination(event) {
//   const currentPage = event.page;
//   try {
//     const response = await unsplashApi.getPhotosByQuery(currentPage);

//     refs.galleryEl.innerHTML = createGalleryCard(response.data.results);
//   } catch (error) {
//     console.log(error);
//   }
// }
