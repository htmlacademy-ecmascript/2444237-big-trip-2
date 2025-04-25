import BoardPresenter from './presenter/board-presenter.js';
import FiltersView from './view/filters.js';
import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripMainContainer);

const boardPresenter = new BoardPresenter(tripEventsContainer);
boardPresenter.init();
