import { humanizeDate, TypePoint } from '../util.js';
import { FORM_EDIT_DATE } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const EMPTY_POINT = {
  'base_price': 0,
  'is_favorite': false,
  'offers': [],
  'date_from': undefined,
  'date_to': undefined,
  'type': 'flight'
};

const renderTypes = (pointType, isDisabled) => (
  `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${TypePoint.map((type) => `
            <div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === pointType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
            </div>`).join('\n')}
        </fieldset>
      </div>
    </div>`
);
const renderButtonsFormEdit = (isEditForm, isDisabled, isSaving, isDeleting) => {
  if (isEditForm) {
    return (
      `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
          <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
          </button>
      `);
  }

  return (
    `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
     <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
    `);
};
const renderPointOffers = (allOffers, pointOffers, pointId, isDisabled) => {
  if(allOffers.length === 0) {
    return '';
  }

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${allOffers.map((offer) => {

      const isChecked = pointOffers.includes(offer.id);

      return (
        `<div class="event__offer-selector">
              <input
                class="event__offer-checkbox visually-hidden"
                id="event_offer_${offer.id}_${pointId}"
                type="checkbox"
                name="event_offer_${offer.id}"
                  ${isChecked ? 'checked' : ''}
                  ${isDisabled ? 'disabled' : ''}
                >
                <label class="event__offer-label" for="event_offer_${offer.id}_${pointId}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                </label>
          </div>`);
    }).join('\n')}
      </div>
  </section>`);
};

function createFormEditTemplate(point, destinations, getOfferByType, isFormEdit) {
  const offerByType = getOfferByType(point.type) || [];
  const pointDestination = destinations.find((element) => element.id === point.destination);
  return (
    `<li class="trip-events__item"> <form class="event event--edit" action="#" method="post"}>
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${renderTypes(point.type, point.is_disabled)}
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${point.type}
              </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination?.name || '' }" ${point.is_disabled ? 'disabled' : ''} list="destination-list-1">
              <datalist id="destination-list-1">
                ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(point.date_from, FORM_EDIT_DATE)}" ${point.is_disabled ? 'disabled' : ''}>
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(point.date_to, FORM_EDIT_DATE)}" ${point.is_disabled ? 'disabled' : ''}>
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.base_price}">
            </div>
              ${renderButtonsFormEdit(isFormEdit, point.is_disabled, point.is_saving, point.is_deleting)}
        </header>
        <section class="event__details">
            ${renderPointOffers(offerByType, point.offers, point.id, point.is_disabled)}
            ${pointDestination && pointDestination.description ? `
            <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination?.description || ''}</p>
            ${pointDestination.pictures?.length > 0 ? ` <div class="event__photos-container">
                      <div class="event__photos-tape">
                          ${pointDestination?.pictures.map((picture) => `<img class="event__photo"
                                src="${picture.src}"
                                alt="${picture.description}">`).join('') || ''}
                      </div>
                    </div>` : ''}
            </section>` : ''}
        </section>
    </form><li`
  );
}

export default class FormEditView extends AbstractStatefulView {
  #destinations = null;
  #onFormSubmit = null;
  #getOfferByType = null;
  #flatpickr = null;
  #onClickFormClose = null;
  #onPointDelete = null;
  #isFormEdit = null;

  constructor({
    point = EMPTY_POINT,
    destinations,
    onFormSubmit,
    onClickFormClose,
    onPointDelete,
    getOfferByType,
    isFormEdit = true
  }) {
    super();
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#getOfferByType = getOfferByType;
    this.#onClickFormClose = onClickFormClose;
    this.#onPointDelete = onPointDelete;
    this.#isFormEdit = isFormEdit;


    this._setState(FormEditView.parsePointToState(point));

    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#destinations, this.#getOfferByType, this.#isFormEdit);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#handleFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);


    const availableOffers = this.element.querySelector('.event__available-offers');
    if (availableOffers) {
      availableOffers.addEventListener('change', this.#offerChangeHandler);
    }

    this.element.querySelector('.event__input--time').addEventListener('change', this.#dateChangeHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleClickFormClose);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handleClickPointDelete);
    this.#setFlatpicker();
  }

  #typeClickHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers:[]
    });
  };

  #priceChangeHandler = (evt) => {
    const intValue = parseInt(evt.target.value, 10);

    this._setState({
      'base_price': intValue
    });
  };

  #validateForm = () => this._state.base_price >= 0 &&
  this._state.destination !== null &&
  this._state.date_from <= this._state.date_to;

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    const isValid = this.#validateForm();
    if (!isValid) {
      this.shake();
      return;
    }
    this.#onFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #handleClickPointDelete = (evt) => {
    evt.preventDefault();
    this.#onPointDelete(this._state);
  };

  #handleClickFormClose = () => {
    this.reset(this._state);
    this.#onClickFormClose();
  };

  #offerChangeHandler = (evt) => {
    const [, , offerId] = evt.target.id.split('_');
    const newCheckBoxes = evt.target.checked
      ? [...this._state.offers, offerId]
      : this._state.offers.filter((id) => id !== offerId);
    this._setState({
      offers: newCheckBoxes
    });
  };

  #dateChangeHandler = (userDate) => {
    this.updateElement({
      'date_from': userDate[0],
      'date_to': userDate[1]
    });
  };

  #destinationChangeHandler = (evt) => {
    if (evt.target.value === '') {
      return;
    }
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    const selectedDestinationId = selectedDestination?.id || null;
    this.updateElement({
      destination: selectedDestinationId
    });
  };


  #setFlatpicker = () => {
    const defaultDate = (this._state.date_from !== this._state.date_to)
      ? [this._state.date_from, this._state.date_to]
      : [this._state.date_from];
    this.#flatpickr = flatpickr(
      this.element.querySelector('.event__field-group--time'),
      {
        mode: 'range',
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: defaultDate,
        onChange: this.#dateChangeHandler
      }
    );
  };

  reset(point) {
    this.updateElement(
      FormEditView.parsePointToState(point)
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#flatpickr) {
      this.#flatpickr.destroy();
      this.#flatpickr = null;
    }
  }

  static parsePointToState(point) {
    return {...point,
      'is_disabled': false,
      'is_deleting': false,
      'is_saving': false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point['is_disabled'];
    delete point['is_deleting'];
    delete point['is_saving'];
    return point;
  }
}
