import { humanizeDate, getDuration } from '../util.js';
import { TIME_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const renderListOffers = (checkOffers) => {
  if (checkOffers.length === 0) {
    return '';
  }

  return (
    `<ul class="event__selected-offers">
      ${checkOffers.map((offer) => `
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('\n')}
    </ul>
  `);
};

function createEventTemplate(point, allOffers, destination) {
  const { name } = destination;
  const checkOffers = point.offers.map((offer) => allOffers.find((offerAll) => offerAll.id === offer));

  return (
    `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${humanizeDate(point.date_from)}">${humanizeDate(point.date_from)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">
                ${point.type} ${name}
              </h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime=${humanizeDate(point.date_from, TIME_FORMAT)}>${humanizeDate(point.date_from, TIME_FORMAT)}</time>
                  &mdash;
                  <time class="event__end-time" datetime=${humanizeDate(point.date_to, TIME_FORMAT)}>${humanizeDate(point.date_to, TIME_FORMAT)}</time>
                </p>
                <p class="event__duration">${getDuration(point.date_from, point.date_to)}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              ${renderListOffers(checkOffers)}
                <button class="event__favorite-btn ${point.is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
                <span class="visually-hidden">${point.is_favorite ? 'Remove from favorite' : 'Add to favorite'}</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
      </li>`
  );
}

export default class EventView extends AbstractView {
  #point = null;
  #offers = null;
  #destination = null;
  #onClick = null;
  #onClickFavorite = null;

  constructor({point, offers, destination, onClick, onClickFavorite}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#onClick = onClick;
    this.#onClickFavorite = onClickFavorite;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#handleClickFavorite);
  }

  get template() {
    return createEventTemplate(this.#point, this.#offers, this.#destination);
  }

  #handleClick = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };

  #handleClickFavorite = (evt) => {
    evt.preventDefault();
    this.#onClickFavorite();
  };
}
