import AbstractView from '../framework/view/abstract-view.js';

class NewPointView extends AbstractView {
  #handleClick = null;
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return (`
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `);
  }


  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  toggleState(newState) {
    this.element.disabled = newState;
  }
}

export default NewPointView;
