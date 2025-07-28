import {remove, render, RenderPosition} from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../util.js';

export default class NewPointPresenter {
  #taskListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointsModel = null;
  #point = null;

  #taskEditComponent = null;

  constructor({taskListContainer, onDataChange, onDataDestroy, pointsModel}) {
    this.#taskListContainer = taskListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDataDestroy;
    this.#pointsModel = pointsModel;
  }

  init(point) {
    this.#point = point;
    if(this.#taskEditComponent !== null) {
      return;
    }

    this.#taskEditComponent = new FormEditView({
      point: this.#point,
      destinations: this.#pointsModel.getDestination(),
      onFormSubmit: this.#handleFormSubmit,
      onClickFormClose: this.#handleDeleteClick,
      onPointDelete: this.#handleDeleteClick,
      getOfferByType: (type) => this.#pointsModel.getOfferByType(type),
      isFormEdit: false
    });

    render(this.#taskEditComponent, this.#taskListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (newPoint) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {
        id: nanoid(),
        ...newPoint
      }
    )
  }

  #handleDeleteClick = () => {
    this.destroy();
  };

  destroy() {
    if(this.#taskEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#taskEditComponent);
    this.#taskEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
