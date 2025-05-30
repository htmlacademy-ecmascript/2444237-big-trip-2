import { humanizeDate } from '../util.js';
import { FORM_EDIT_DATE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

/**
 * Рендерит список событий
 * @return {string} Разметка списка событий
 */
const renderTypes = () => (
  `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>
            <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>
            <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>
            <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>
            <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
            <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>
            <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>
            <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
        </fieldset>
      </div>
    </div>`
);
/**
 * Рендерит список офферов
 * @param {Object[]} allOffers - массив всех офферов
 * @param {number[]} pointOffers - массив офферов текущей точки
 * @param {number} pointId - id текущей точки
 * @return {string} Разметка списка офферов
 */

const renderPointOffers = (allOffers, pointOffers, pointId) => {
  if(allOffers.length === 0) {
    return '';
  }

  return `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${allOffers.map((offer) => {
        
    const isChecked = pointOffers.includes(offer.id);

    return `<div class="event__offer-selector">
            <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${offer.id}-${pointId}"
            type="checkbox"
            name="event-offer-${offer.id}"
            ${isChecked ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.id}-${pointId}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
        </div>`;
  }).join('\n')}
    </div>
  </section>`;
};

/**
 * Создает разметку формы редактирования
 * @param {Object} point Объект точки
 * @param {Object[]} allOffers Массив всех офферов
 * @param {Object} destination Объект место назначения
 * @return {string} Разметка формы редактирования
 */

function createFormEditTemplate(point, allOffers, destination) {
  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${renderTypes()}
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${point.type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
              <datalist id="destination-list-1">
                <option value="${destination.name}"></option>
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(point.date_from, FORM_EDIT_DATE)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(point.date_to, FORM_EDIT_DATE)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.base_price}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
        </header>
        <section class="event__details">
            ${renderPointOffers(allOffers, point.offers, point.id)}
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>
            </section>
        </section>
    </form>`
  );
}

/**
 * @type {FormEditView} Форма редктирования
 * @param {Object} point Объект точки
 * @param {Object} offers Объект офферов
 * @param {Object} destination Объект место назначения
 * @param {function} onFormSubmit Обработчик отправки формы
 */

export default class FormEditView extends AbstractView {
  #point = null;
  #offers = null;
  #destination = null;
  #onFormSubmit = null;

  constructor({points, offers, destination, onFormSubmit}) {
    super();
    this.#point = points;
    this.#offers = offers;
    this.#destination = destination;
    this.#onFormSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#handleFormSubmit);
  }

  get template() {
    return createFormEditTemplate(this.#point, this.#offers, this.#destination);
  }

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit();
  }
}
