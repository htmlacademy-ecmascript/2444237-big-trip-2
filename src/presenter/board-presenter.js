import { render, RenderPosition} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NewPointPresenter from './new-point-presenter.js';
import FailedDataView from '../view/failed-data.js';
import PointPresenter from './point-presenter.js';
import { SortType, sortByDay, sortByPrice, sortByTime, filter, UpdateType, UserAction} from '../util.js';
import { FilterType } from '../const.js';


export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #fieldComponent = null;
  #pointPresenters = new Map();
  eventListView = new EventListView();
  #sortView = null;
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = null;
  #newPointPresenter = null;

  constructor(container, pointsModel, filterModel, onNewPointDestroy) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      taskListContainer: this.eventListView.element,
      onDataChange: this.#handleViewAction,
      onDataDestroy: onNewPointDestroy,
      pointsModel: this.#pointsModel
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch(this.#currentSortType) {
      case SortType.DAY:
        filteredPoints.sort(sortByDay);
        break;
      case SortType.TIME:
        filteredPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortByPrice);
        break;
    }
    return filteredPoints;
  }

  init () {

    this.#renderBoard();

    this.#renderSort();

  }

  #renderFailedData() {
    this.#fieldComponent = new FailedDataView({
      filterType: this.#filterType
    });
    render(this.#fieldComponent, this.#container);
  }

  #renderEvent (event) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.eventListView.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(event);
    this.#pointPresenters.set(event.id, pointPresenter);
  }

  createNewPoint (event) {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(event);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderPoints () {
    this.points.forEach((point) => {
      this.#renderEvent(point);
      this.createNewPoint(point);
    });
  }

  #renderSort () {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #clearPointList({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    render(this.eventListView, this.#container);

    const points = this.points;
    if (points.length === 0) {
      this.#renderFailedData();
      return;
    }

    this.#renderPoints();
  }
}
