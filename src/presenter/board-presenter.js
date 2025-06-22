import { render} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import FailedDataView from '../view/failed-data.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../util.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #fieldComponent = null;
  #pointPresenters = new Map();
  #boardPoints = null
  eventListView = new EventListView();

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#boardPoints = [...this.#pointsModel.getPoint()];
    if(this.#boardPoints.length === 0) {
      this.#renderFailedData();
      return;
    }
    render(new SortView(), this.#container);
    render(this.eventListView, this.#container);

    for(let i = 0; i < this.#boardPoints.length; i++) {
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

  #handlePointChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint)
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
