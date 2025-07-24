import BoardPresenter from './presenter/board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TripInfoView from './view/trip-info.js';
import { PointModel } from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const pointModel = new PointModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filtersContainer: tripMainContainer,
  filtersModel: filterModel,
  pointsModel: pointModel
});

const boardPresenter = new BoardPresenter(
  tripEventsContainer,
  pointModel,
  filterModel
);


render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);


boardPresenter.init();
filterPresenter.init();
