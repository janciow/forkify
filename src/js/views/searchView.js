import { elements } from './base';

export const getInput = () => {
  return elements.searchInput.value;
};

export const clearIntput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return (acc = cur.length);
    }, 0);

    return `${newTitle.join(' ')} ...`
  }

  return title;
};

const renderReciepie = receipe => {
  const markup = `
    <li>
      <a class="results__link results__link--active" href="#${
        receipe.recipe_id
      }">
          <figure class="results__fig">
              <img src="${receipe.image_url}" alt="${receipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(receipe.title)}</h4>
              <p class="results__author">${receipe.publisher}</p>
          </div>
      </a>
    </li>
`;

  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
    <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
`;

const renderButtons = (page, numResoults, resPerPage) => {
  const pages = Math.ceil(numResoults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipies, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipies.slice(start, end).forEach(renderReciepie);

  renderButtons(page, recipies.length, resPerPage);
};
