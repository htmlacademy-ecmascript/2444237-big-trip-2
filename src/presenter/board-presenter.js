import {render, replace} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  eventListView = new EventListView();

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init () {
    this.boardPoints = [...this.#pointsModel.getPoint()];
    render(new SortView(), this.#container);
    render(this.eventListView, this.#container);

    for(let i = 0; i < this.boardPoints.length; i++) {
      const offerByType = this.#pointsModel.getOfferByType(this.boardPoints[i].type);
      this.#renderEvent(this.boardPoints[i], offerByType);
    }
  }
  #renderEvent (event, offerByType) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    } 
    const point = new EventView({
      point: event,
      offers: offerByType ? offerByType : [],
      destination: this.#pointsModel.getDestinationById(event.destination),
      onClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    })

    const editForm = new FormEditView({
      points: event,
      offers: offerByType ? offerByType : [],
      destination: this.#pointsModel.getDestinationById(event.destination),
      onFormSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    })
    function replacePointToEditForm() {
      replace(editForm, point);
    }
    function replaceEditFormToPoint() {
      replace(point, editForm);
    }
    render(point, this.eventListView.element);
  }
}
