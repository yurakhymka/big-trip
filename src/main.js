import {RenderPosition, render} from './render.js';

import TripInfoView from './view/tripInfo-view';
import NavigationView from './view/navigation-view';
import FiltersView from './view/filters-view';
import SortView from './view/sort-view';
import EditCardView from './view/addEditCard/editCard-view.js';
import EventItemView from './view/eventItem-view';
import EventListView from './view/eventsList-view';
import NoPointsView from './view/emptyList-view';

import { generatePoint } from './mock/point';

const POINT_COUNT = 16;
const points = Array.from({length: POINT_COUNT});

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const eventListContainer = new EventListView();

render(mainContainer, new TripInfoView().element, RenderPosition.AFTERBEGIN);
render(navigationContainer, new NavigationView().element, RenderPosition.BEFOREEND);
render(filtersContainer, new FiltersView().element, RenderPosition.BEFOREEND);
render(contentContainer, eventListContainer.element, RenderPosition.BEFOREEND);


const renderPoint = (pointsContainer, point) => {
  const eventComponent = new EventItemView(point);
  const editEventComponent = new EditCardView(point);


  const replacePointToForm = () => {
    pointsContainer.replaceChild(editEventComponent.element, eventComponent.element);
  };

  const replaceFormToPoint = () => {
    pointsContainer.replaceChild(eventComponent.element, editEventComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editEventComponent.setSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointsContainer, eventComponent.element, RenderPosition.BEFOREEND);
};

if (points.length) {
  render(contentContainer, new SortView().element, RenderPosition.AFTERBEGIN);

  for(let i = 0; i < points.length; i++) {
    renderPoint(eventListContainer.element, generatePoint(i));
  }

} else {
  render(contentContainer, new NoPointsView().element, RenderPosition.BEFOREEND);
}
