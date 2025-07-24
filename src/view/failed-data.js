import AbstractView from '../framework/view/abstract-view.js';
import { NoPointsTextType } from '../util.js';


const createFailedDataTemplate = (filterType) => (
  `<p class="trip-events__msg">
      ${NoPointsTextType[filterType]}
  </p>`
);

class FailedDataView extends AbstractView {
  #filterType = null;
  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createFailedDataTemplate();
  }
}

export default FailedDataView;
