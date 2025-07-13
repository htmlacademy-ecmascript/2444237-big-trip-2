import { render, RenderPosition} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import FailedDataView from '../view/failed-data.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../util.js';
import { SortType, sortByDay, sortByPrice, sortByTime } from '../util.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #fieldComponent = null;
  #pointPresenters = new Map();
  #boardPoints = null;
  eventListView = new EventListView();
  #sortView = null;
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#boardPoints = [...this.#pointsModel.getPoint()];
    this.#sourcedBoardPoints = [...this.#pointsModel.getPoint()];
    this.#sortPoints(this.#currentSortType);


    if (this.#boardPoints.length === 0) {
      this.#renderFailedData();
      return;
    }
    render(this.eventListView, this.#container);
    this.#renderSort();


    for (let i = 0; i < this.#boardPoints.length; i++) {
      const offerByType = this.#pointsModel.getOfferByType(this.#boardPoints[i].type);
      this.#renderEvent(this.#boardPoints[i], offerByType);
    }
  }

  #renderFailedData() {
    this.#fieldComponent = new FailedDataView();
    render(this.#fieldComponent, this.#container);
  }

  #renderEvent (event, offerByType) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.eventListView.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(event, offerByType);
    this.#pointPresenters.set(event.id, pointPresenter);
  }

  #sortPoints (sortType) {
    switch(sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortByPrice);
        break;
      default:
        throw new Error(`Unknown sort type: ${sortType}`);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    for (let i = 0; i < this.#boardPoints.length; i++) {
      const offerByType = this.#pointsModel.getOfferByType(this.#boardPoints[i].type);
      this.#renderEvent(this.#boardPoints[i], offerByType);
    }

  };

  #renderSort () {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handlePointChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatePoint);
    const offerByType = this.#pointsModel.getOfferByType(updatePoint.type);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint, offerByType);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.eventListView.element.innerHTML = '';
  }
}
