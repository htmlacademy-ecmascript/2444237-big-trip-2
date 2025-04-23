import { render } from '../render.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter {
  eventListView = new EventListView();
  constructor(container) {
    this.container = container;
  }

  init () {
    render(new SortView(), this.container);
    render(this.eventListView, this.container);
    render(new FormEditView(), this.eventListView.getElement());

    for(let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListView.getElement());
    }
  }
}
