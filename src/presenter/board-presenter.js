import { render } from '../render.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter {
  eventListView = new EventListView();
  constructor(container, pointsModel) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init () {
    this.boardPoints = [...this.pointsModel.getPoint()];
    render(new SortView(), this.container);
    render(this.eventListView, this.container);
    render(new FormEditView(
      {
        points: this.boardPoints[0],
        checkOffers: this.pointsModel.getOffersById(this.boardPoints[0].type, this.boardPoints[0].offers),
        offers: this.pointsModel.getOfferByType(this.boardPoints[0].type),
        destination: this.pointsModel.getDestinationById(this.boardPoints[0].destination)
      }
    ), this.eventListView.getElement());

    for(let i = 0; i < this.boardPoints.length; i++) {
      const offerByType = this.pointsModel.getOfferByType(this.boardPoints[i].type);
      render(new EventView(
        {
          point: this.boardPoints[i],
          offers: offerByType ? offerByType.offers : [],
          destination: this.pointsModel.getDestinationById(this.boardPoints[i].destination)
        }
      ), this.eventListView.getElement());
    }
  }
}
