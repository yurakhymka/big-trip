import {RenderPosition, render, replace, remove} from '../render.js';

import EditCardView from './../view/addEditCard/editCard-view';
import EventItemView from './../view/eventItem-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {

  #point = null;
  #mode = Mode.DEFAULT;
  #pointsContainer = null;
  #changeData = null;
  #changeMode = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventItemView(point);
    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    
    this.#pointEditComponent = new EditCardView(point);
    this.#pointEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setCloseHandler(this.#handleFormClose);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointsContainer, this.#pointComponent.element, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent.element, prevPointComponent.element);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent.element, prevPointEditComponent.element);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    this.#pointsContainer.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    this.#pointsContainer.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFavoriteClick = () => {
    // eslint-disable-next-line camelcase
    this.#changeData({...this.#point, is_favorite: !this.#point.is_favorite});
  }

  #handleFormSubmit = (point) => {
    // eslint-disable-next-line no-console
    console.log('change data', point);
    this.#changeData(point);
    this.#replaceFormToPoint();
  }

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  }

}
