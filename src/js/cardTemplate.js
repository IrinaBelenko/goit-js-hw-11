export function createMarkupList(cards) {
  return cards
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class='photo-card'>
         <img src="${webformatURL}" alt="${tags}" loading='lazy' />
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
