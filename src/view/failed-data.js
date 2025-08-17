import AbstractView from '../framework/view/abstract-view.js';
import { NoPointsTextType } from '../util.js';


const createFailedDataTemplate = (filterType, fetchError) => (
  fetchError ?
    `<p class="trip-events__msg">
      ${NoPointsTextType.fetchError}
  </p>` : `<p class="trip-events__msg">
      ${NoPointsTextType[filterType]}
  </p>`
);

export default class FailedDataView extends AbstractView {
  #filterType = null;
  #isfetchError = null;
  constructor({filterType, fetchError}) {
    super();
    this.#filterType = filterType;
    this.#isfetchError = fetchError;
  }

  get template() {
    return createFailedDataTemplate(this.#filterType, this.#isfetchError);
  }
}

