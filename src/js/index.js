import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * globa state of app
 * Search object
 * Current recipe objact
 * Shopping list object
 * Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    searchView.clearIntput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    await state.search.getResult();

    searchView.renderResults(state.search.result);
    clearLoader();
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});


/**
 * RECIPE CONTROLLER
 */
 const r = new Recipe(35478);
 r.getRecipe()