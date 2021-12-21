import AbstractView from './abstract-view';

const renderEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class EventListView extends AbstractView {
  get template() {
    return renderEventsListTemplate();
  }
}
