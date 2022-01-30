
import TripPresenter from './presenter/trip-presenter.js';
import { generatePoint } from './mock/point.js';
import PointModel from './model/points-model.js';
import FilterModel from './model/filter-model.js'
import FilterPresenter from './presenter/filter-presenter.js';


const POINT_COUNT = 16;
const points = Array.from({length: POINT_COUNT}, (item, index) => generatePoint(index));

const pointModel = new PointModel();
pointModel.points = points;
const filterModel = new FilterModel();

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(mainContainer, navigationContainer, contentContainer, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointModel);
tripPresenter.init();
filterPresenter.init();
