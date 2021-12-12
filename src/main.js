import {renderTemplate, RenderPosition} from './render.js';

import { tripInfoTemplate } from './view/tripInfoTemplate';
import { navigationTemplate } from './view/navigationTemplate';
import { filtersTemplate } from './view/filtersTemplate';
import { sortTemplate } from './view/sortTemplate';
import { editCardTemplate } from './view/addEditCard/editCardTemplate.js';
import { renderAddCardTemplate } from './view/addEditCard/addCardTemplate.js';
import { eventItemTemplate } from './view/eventItemTemplate';
import { eventsListTemplate } from './view/eventsListTemplate';

import { generatePoint } from './mock/point';

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

renderTemplate(mainContainer, tripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(navigationContainer, navigationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filtersContainer, filtersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(contentContainer, sortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(contentContainer, eventsListTemplate(), RenderPosition.BEFOREEND);

const eventListContainer = document.querySelector('.trip-events__list');

for(let i = 0; i < 10; i++) {
  if (i === 0) {
    renderTemplate(eventListContainer, renderAddCardTemplate(generatePoint(i), i), RenderPosition.BEFOREEND);
  } else if (i === 1) {
    renderTemplate(eventListContainer, editCardTemplate(generatePoint(i), i), RenderPosition.BEFOREEND);
  } else {
    renderTemplate(eventListContainer, eventItemTemplate(generatePoint(i), i), RenderPosition.BEFOREEND);
  }
}
