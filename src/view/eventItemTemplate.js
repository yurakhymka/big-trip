import { renderEventOfferTemplate } from './eventOfferTemplate';
import dayjs from 'dayjs';

const renderEventOffers = (items) => {
  if (!items.length) {
    return '';
  } else {
    let eventOfferTempl = '';
    const offers = items[0].offers;
    for (let index = 0; index < offers.length; index++) {
      eventOfferTempl += renderEventOfferTemplate(offers[index]);
    }
    return eventOfferTempl;
  }
};

export const eventItemTemplate = (point) => {
  const template = `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dayjs(point.date_from).format('MMM DD') }</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(point.date_from).format() }">${dayjs(point.date_from).format('hh:mm') }</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(point.date_to).format() }">${dayjs(point.date_to).format('hh:mm') }</time>
        </p>
        <p class="event__duration">${dayjs(point.date_to).diff(point.date_from, 'hour') }H</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderEventOffers(point.offers)}
      </ul>
      <button class="event__favorite-btn ${point.is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;

  return template;
};

