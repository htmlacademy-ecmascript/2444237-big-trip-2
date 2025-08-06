import { render, RenderPosition, remove} from '../framework/render.js';
import LoadingView from '../view/loading-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NewPointPresenter from './new-point-presenter.js';
import NewPointView from '../view/new-point.js';
import FailedDataView from '../view/failed-data.js';
import PointPresenter from './point-presenter.js';
import { SortType, sortByDay, sortByPrice, sortByTime, filter, UpdateType, UserAction} from '../util.js';
import { FilterType } from '../const.js';


export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #fieldComponent = null;
  #pointPresenters = new Map();
  #loadingComponent = new LoadingView();
  eventListView = new EventListView();
  #sortView = null;
  #currentSortType = SortType.DAY;
  #isLoading = true;
  #filterModel = null;
  #filterType = null;
  #newPointPresenter = null;
  #tripMainContainer = null;
  #newPointComponent = null;

  constructor({container, pointsModel, filterModel, tripMainContainer}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#tripMainContainer = tripMainContainer;

    this.#newPointComponent = new NewPointView({
      onClick: this.handleNewPointClick
    });

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.eventListView.element,
      onDataChange: this.#handleViewAction,
      onDataDestroy: this.#handleNewPointDestroy,
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

    this.#pointsModel.init().finally(() => {
      render(this.#newPointComponent, this.#tripMainContainer);
    });

  }

  handleNewPointClick = () => {
    this.createNewPoint();
    this.#newPointComponent.toggleState(true);
  };

  #handleNewPointDestroy = () => {
    this.#newPointComponent.toggleState(false);
  };

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
    });
  }

  #renderLoading () {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    render(this.eventListView, this.#container);
    remove(this.#fieldComponent);

    const points = this.points;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (points.length === 0) {
      this.#renderFailedData();
      return;
    }

    this.#renderPoints();
  }
}
