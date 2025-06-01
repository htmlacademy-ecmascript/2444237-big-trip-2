import { POINT_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/points.js';
import { offersMock } from '../mock/offers.js';
import { destinationMock } from '../mock/destination.js';

export class PointModel {
  point = Array.from({length: POINT_COUNT}, getRandomPoint);
  offers = offersMock;
  destination = destinationMock;

  getPoint() {
    return this.point;
  }

  getOffers() {
    return this.offers;
  }

  getOffersById(id) {
    const offers = this.getOffers();

    return offers.find((offer) => offer.id === id);
  }

  getDestination() {
    return this.destination;
  }

  getPointById(id) {
    const points = this.getPoint();

    return points.find((point) => point === id);
  }

  getOfferByType(type) {
    const offers = this.getOffers();

    return offers.find((offer) => offer.type === type).offers;
  }

  getDestinationById(id) {
    const destinations = this.getDestination();

    return destinations.find((destination) => destination.id === id);
  }
}
