import { POINT_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/points.js';
import { offersMock } from '../mock/offers.js';
import { destinationMock } from '../mock/destination.js';
import Observable from '../framework/observable.js';


export class PointModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offersMock;
  #destination = destinationMock;

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    this.#points = this.#points.map((point) => point.id === update.id ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }

  getOffers() {
    return this.#offers;
  }

  getOffersById(id) {
    const offers = this.getOffers();

    return offers.find((offer) => offer.id === id);
  }

  getDestination() {
    return this.#destination;
  }

  getPointById(id) {
    const points = this.points;

    return points.find((point) => point.id === id);
  }

  getOfferByType(type) {
    const offers = this.getOffers();
    const offerByType = offers.find((offer) => offer.type === type);
    return offerByType ? offerByType.offers : [];
  }

  getDestinationById(id) {
    const destinations = this.getDestination();

    return destinations.find((destination) => destination.id === id);
  }
}
