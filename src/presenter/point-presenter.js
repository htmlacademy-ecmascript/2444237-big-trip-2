import { replace, render, remove } from '../framework/render';
import EventView from '../view/point-view';
import FormEditView from '../view/form-edit-view';
import { UserAction, UpdateType } from '../util';

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

  init (point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventView({
      point: this.#point,
      offers: this.#pointsModel.getOfferByType(this.#point.type),
      destination: this.#pointsModel.getDestinationById(this.#point.destination),
      onClick: () => this.#handleClickFormEdit(),
      onClickDelete: () => this.#handleDeleteClick()
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      offers: this.#pointsModel.getOfferByType(this.#point.type),
      destination: this.#pointsModel.getDestinationById(this.#point.destination),
      destinations: this.#pointsModel.getDestination(),
      onFormSubmit: () => this.#handleClickFormSubmit(),
      getOfferByType: (type) => this.#pointsModel.getOfferByType(type),
      onFormDelete: () => this.#handleClickFormEdit()
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
      this.#pointEditComponent.reset(this.#point);
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
      this.#pointEditComponent.reset(this.#point);
      this.#handleClickFormSubmit();
    }
  };

  #handleClickFormEdit = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClickFormSubmit = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      this.#point
    );
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (task) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      task,
    );
  };

  #handleClickFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {
        ...this.#point,
        'is_favorite': !this.#point.is_favorite
      });
  };

}
