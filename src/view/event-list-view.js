import AbstractView from '../framework/view/abstract-view.js';

/**
 * Функция для создания разметки списка событий
 * @returns {string} Разметка списка событий
 */
function createEventListTemplate () {
  return (`
    <ul class="trip-events__list"></ul>
    `
  );
}
/**
 * Класс представления списка событий
 */
export default class EventListView extends AbstractView {
  get template() {
    return createEventListTemplate();
  }
}
