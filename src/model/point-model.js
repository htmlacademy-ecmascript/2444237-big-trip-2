
import Observable from '../framework/observable.js';
import { UpdateType } from '../util.js';


export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destination = [];
  constructor({pointApiService}) {
    super();
    this.#pointsApiService = pointApiService;
  }

  async init() {
    try {
      this.#points = await this.#pointsApiService.points;
      this.#offers = await this.#pointsApiService.offers;
      this.#destination = await this.#pointsApiService.destinations;
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destination = [];
      this._notify(UpdateType.INIT_ERROR);
    }
  }

  get points() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.updatePoint(update);
      this.#points = this.#points.map((point) => point.id === update.id ? response : point);
    } catch(err) {
      throw new Error('Can\'t update task');
    }

    this._notify(updateType, update);
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      this.#points = [...this.#points, response];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deletePoint(updateType, update) {
    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  }

  getOffers() {
    return this.#offers;
  }

  getDestination() {
    return this.#destination;
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
