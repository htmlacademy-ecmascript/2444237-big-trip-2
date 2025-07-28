import BoardPresenter from './presenter/board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TripInfoView from './view/trip-info.js';
import { PointModel } from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointView from './view/new-point.js';


const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filtersContainer: tripMainContainer,
  filtersModel: filterModel,
  pointsModel: pointModel
});

const newPointComponent = new NewPointView({
  onClick: handleNewPointButtonClick
});


const boardPresenter = new BoardPresenter(
  tripEventsContainer,
  pointModel,
  filterModel,
  handleNewPointFormClose
);


render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(newPointComponent, tripMainContainer);

boardPresenter.init();
filterPresenter.init();

function handleNewPointButtonClick() {
  boardPresenter.createNewPoint();
  newPointComponent.element.disabled = true;
}
function handleNewPointFormClose() {
  newPointComponent.element.disabled = false;
}
