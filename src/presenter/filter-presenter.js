import FilterView from '../view/filters.js';
import { render, remove, replace} from '../framework/render.js';
import { FilterType} from '../const.js';
import { filter, UpdateType } from '../util.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #filtersModel = null;
  #pointsModel = null;
  #filterComponent = null;


  constructor({filtersContainer , filtersModel, pointsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters () {
    const points = this.#pointsModel.points;
    return (Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](points).length
    })));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if(prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }


  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };

}
