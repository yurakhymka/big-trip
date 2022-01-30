import {RenderPosition, render} from '../render.js';
import {updateItem} from './../utils/utils';

import TripInfoView from '../view/tripInfo-view';
import NavigationView from '../view/navigation-view';
import SortView from '../view/sort-view';
import EventListView from '../view/eventsList-view';
import NoPointsView from '../view/emptyList-view';
import PointPresenter from './point-presenter';
import {filter} from '../utils/filter.js';
import { SortType } from '../const/sortType';
import { sortPointPrice, sortPointDate } from './../utils/point';

export default class TripPresenter {
    #mainContainer = null;
    #navigationContainer = null;
    #contentContainer = null;
    #pointModel = null;
    #filterType = null;
    #filterModel = null;

    #tripInfoComponent = new TripInfoView();
    #navigationComponent = new NavigationView();
    #sortComponent = new SortView();
    #noPointsComponent = new NoPointsView();
    #eventListContainer = new EventListView();
    #pointPresenter = new Map();
    #currentSortType = SortType.DEFAULT;

    #tripPoints = [];
    #sourcedtripPoints = [];

    constructor(mainContainer, navigationContainer, contentContainer, pointModel, filterModel) {
      this.#mainContainer = mainContainer;
      this.#navigationContainer = navigationContainer;
      this.#contentContainer = contentContainer;
      this.#pointModel = pointModel;
      this.#filterModel = filterModel;
    }

    get points () {
      this.#filterType = this.#filterModel.filter;
      const points = this.#pointModel.points;
      const filteredPoints = filter[this.#filterType](points);
      switch (this.#currentSortType) {
        case SortType.PRICE:
          return filteredPoints.sort(sortPointPrice);
        case SortType.TIME:
          return filteredPoints.sort(sortPointDate);
      }
      return filteredPoints;
    }

    #handlePointChange = (updatedPoint) => {
      this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
      this.#sourcedtripPoints = updateItem(this.#sourcedtripPoints, updatedPoint);
      this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
    }

    #handleModeChange = () => {
      this.#pointPresenter.forEach((presenter) => presenter.resetView());
    }

    init = () => {
      render(this.#mainContainer, this.#tripInfoComponent.element, RenderPosition.AFTERBEGIN);
      render(this.#navigationContainer, this.#navigationComponent.element, RenderPosition.BEFOREEND);
      //render(this.#filtersContainer, this.#filersComponent.element, RenderPosition.BEFOREEND);
      render(this.#contentContainer, this.#eventListContainer.element, RenderPosition.BEFOREEND);
      this.#renderBoard();
    }

    #handleSortTypeChange = (sortType) => {
      if (this.#currentSortType === sortType) {
        return;
      }
      this.#currentSortType = sortType;
      this.#clearPointsList();
      this.#renderPointsList();
    }

    #renderSort = () => {
      render(this.#contentContainer, this.#sortComponent.element, RenderPosition.AFTERBEGIN);
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    }

    #renderPoint = (pointsContainer, point) => {
      const pointPresenter = new PointPresenter(pointsContainer, this.#handlePointChange, this.#handleModeChange);
      pointPresenter.init(point);
      this.#pointPresenter.set(point.id, pointPresenter);
    };

    #clearPointsList = () => {
      this.#pointPresenter.forEach((presenter) => presenter.destroy());
      this.#pointPresenter.clear();
    };

    #renderPointsList = () => {
      for(let i = 0; i < this.points.length; i++) {
        this.#renderPoint(this.#eventListContainer.element, this.points[i]);
      }
    };

    #renderBoard = () => {
      if (this.points.length) {
        this.#renderSort();
        this.#renderPointsList();

      } else {
        render(this.#contentContainer, this.#noPointsComponent.element, RenderPosition.BEFOREEND);
      }
    }
}
