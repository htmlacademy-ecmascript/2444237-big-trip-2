import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filters, currentFilterType) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter) =>
      `<div class="trip-filters__filter">
           <input
           id="filter-${filter.type}"
           class="trip-filters__filter-input visually-hidden"
           type="radio"
           name="trip-filter"
           value="${filter.type}"
           ${currentFilterType === filter.type ? 'checked' : ''}
           ${filter.count === 0 ? 'disabled' : ''}>
           <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
         </div>`
    ).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
