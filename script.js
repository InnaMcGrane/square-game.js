function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

class SquareGame {
  _state = {
    total: 0,
  };

  constructor(data, Square) {
    this._data = data;
    this._Square = Square;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<div class="square-game">
								<span class="square-game__total">total number: ${this._state.total}</span>
                <div class="square-game">
                  <button class="btn btn--reset">reset</button>
                </div>
								<div class="square-game__wrapper"></div>
						</div>`;
  }

  _setStateTotal(num) {
    this._state.total = num;
  }

  _setStateTotalHandler(num) {
    this._setStateTotal(this._state.total + num);
    this._render();
  }

  _render() {
    this._element.querySelector(".square-game__wrapper").textContent = "";
    this._element.querySelector(".square-game__wrapper").append(...this._generateItems());
    this._element.querySelector(".square-game__total").textContent = `total number: ${this._state.total}`;
  }

  _addListeners() {
    this._element.querySelector(".btn--reset").addEventListener("click", () => {
      this._setStateTotal(0);
      this._render();
    });
  }

  _generateItems() {
    return this._data.map((currentDataForSquare) => new this._Square(currentDataForSquare, this._setStateTotalHandler.bind(this)).element);
  }

  get element() {
    return this._element;
  }
}

class Square {
  constructor({ color, number }, setStateTotalHandler) {
    this._color = color;
    this._number = number;
    this._setStateTotalHandler = setStateTotalHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="square square--${this._color}">${this._number}</div>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._setStateTotalHandler(this._number);
    });
  }

  get element() {
    return this._element;
  }
}

const data = [
  {
    id: 5423,
    color: "green",
    number: 10,
  },
  {
    id: 235,
    color: "violet",
    number: 340,
  },
  {
    id: 65,
    color: "red",
    number: 15460,
  },
  {
    id: 23,
    color: "red",
    number: 150,
  },
  {
    id: 34,
    color: "green",
    number: 1230,
  },
  {
    id: 345,
    color: "blue",
    number: 1650,
  },
  {
    id: 34,
    color: "green",
    number: 1760,
  },
  {
    id: 346,
    color: "violet",
    number: 130,
  },
  {
    id: 567,
    color: "green",
    number: 170,
  },
];

const root = document.querySelector(".root");
root.insertAdjacentElement("beforeend", new SquareGame(data, Square).element);
