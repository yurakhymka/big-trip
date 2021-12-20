import { createElement } from './../render';

const renderNoPointsTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoPointsView {
    #element = null;

    get element() {
      if (!this.#element) {
        this.#element = createElement(this.template);
      }

      return this.#element;
    }

    get template() {
      return renderNoPointsTemplate();
    }

    removeElement() {
      this.#element = null;
    }
}
