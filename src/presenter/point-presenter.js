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
      onClick: this.#handleClickFormEdit,
      onClickFavorite: this.#handleClickFavorite
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      destinations: this.#pointsModel.getDestination(),
      onFormSubmit: this.#handleClickFormSubmit,
      onClickFormClose: this.#handleClickFormClose,
      onPointDelete: this.#handleDeleteClick,
      getOfferByType: (type) => this.#pointsModel.getOfferByType(type),
      isFormEdit: true,
    });

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevFormEditComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving() {
    if(this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        'is_disabled': true,
        'is_saving': true,
      });
    }
  }

  setDeleting() {
    if(this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        'is_disabled': true,
        'is_deleting': true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        'is_disabled': false,
        'is_saving': false,
        'is_deleting': false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleClickFormEdit = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClickFormClose = () => {
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClickFormSubmit = (newPoint) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      newPoint
    );
    // this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (deletePoint) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      deletePoint,
    );
  };

  #handleClickFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        'is_favorite': !this.#point.is_favorite
      });
  };

}
