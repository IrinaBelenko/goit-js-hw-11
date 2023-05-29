export function createMarkupList(cards) {
  return cards
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class='photo-card'>
        <a href="${largeImageURL}">
         <img src="${webformatURL}" alt="${tags}" loading='lazy' />
        </a>
         <div class='info'>
            <p class='info-item'>
               <b>Likes</b>
               <i>${likes}</i>
            </p>
            <p class='info-item'>
               <b>Views</b>
               <i>${views}</i>
            </p>
            <p class='info-item'>
               <b>Comments</b>
               <i>${comments}</i>
            </p>
            <p class='info-item'>
               <b>Downloads</b>
               <i>${downloads}</i>
            </p>
         </div>
      </div>`
    )
    .join('');
}
