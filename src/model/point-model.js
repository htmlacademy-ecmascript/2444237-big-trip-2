import { POINT_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/points.js';
import { offersMock } from '../mock/offers.js';
import { destinationMock } from '../mock/destination.js';
import Observable from '../framework/observable.js';


export class PointModel extends Observable {
  #point = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offersMock;
  #destination = destinationMock;

  get points() {
    return this.#point;
  }

  updatePoint(updateType, update) {
    const index = this.#point.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#point = [
      ...this.#point.slice(0, index),
      update,
      ...this.#point.slice(index + 1)];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#point = [
      update,
      ...this.#point
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#point = [
      ...this.#point.slice(0, index),
      ...this.#point.slice(index + 1)
    ];

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
