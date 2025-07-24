import { remove, render, RenderPosition} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import FailedDataView from '../view/failed-data.js';
import PointPresenter from './point-presenter.js';
import { SortType, sortByDay, sortByPrice, sortByTime, filter, UpdateType, UserAction } from '../util.js';


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

  constructor(container, pointsModel, filterModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

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

  #handlePointChange = (updatePoint) => {
    const offerByType = this.#pointsModel.getOfferByType(updatePoint.type);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint, offerByType);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #clearPointList({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.eventListView.element.innerHTML = '';
    remove(this.#fieldComponent);
    remove(this.eventListView);

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
