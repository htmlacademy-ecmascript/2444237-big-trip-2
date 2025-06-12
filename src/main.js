import BoardPresenter from './presenter/board-presenter.js';
import FiltersView from './view/filters.js';
import { render, RenderPosition } from './framework/render.js';
import TripInfoView from './view/trip-info.js';
import { PointModel } from './model/point-model.js';
import { generateFilter } from './mock/filter.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const pointModel = new PointModel();

const filters = generateFilter(pointModel.getPoint());

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), tripMainContainer);

const boardPresenter = new BoardPresenter(tripEventsContainer, pointModel);
boardPresenter.init();
