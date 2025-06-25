import { replace, render, remove } from '../framework/render';
import EventView from '../view/point-view';
import FormEditView from '../view/form-edit-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, pointsModel, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (point, offerByType) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventView({
      point: this.#point,
      offers: offerByType ? offerByType : [],
      destination: this.#pointsModel.getDestinationById(this.#point.destination),
      onClick: () => this.#handleClickFormEdit(),
      onClickFavorite: () => this.#handleClickFavorite()
    });

    this.#pointEditComponent = new FormEditView({
      points: this.#point,
      offers: offerByType ? offerByType : [],
      destination: this.#pointsModel.getDestinationById(this.#point.destination),
      onFormSubmit: () => this.#handleClickFormSubmit(),
    });

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  reset () {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm () {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint () {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleClickFormSubmit();
    }
  };

  #handleClickFormEdit = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClickFormSubmit = () => {
    this.#handleDataChange(this.#point);
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClickFavorite = () => {
    this.#handleDataChange({
      ...this.#point,
      'is_favorite': !this.#point.is_favorite
    });
  };

}
