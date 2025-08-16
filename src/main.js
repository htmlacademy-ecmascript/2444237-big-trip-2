import BoardPresenter from './presenter/board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TripInfoView from './view/trip-info.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointApiService from './point-api-service.js';
import { END_POINT, AUTHORIZATION } from './const.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const filterControlsContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filtersContainer: filterControlsContainer,
  filtersModel: filterModel,
  pointsModel: pointsModel,
});

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel: pointsModel,
  filterModel: filterModel,
  tripMainContainer: tripMainContainer,
});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);

boardPresenter.init();
filterPresenter.init();


