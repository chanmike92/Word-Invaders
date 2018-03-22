import Board from 'board.js';

class Game {
  constructor() {
    this.board = new Board(20, 25);
    this.setupGraid();
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dimy; i++) {
      const row = document.createElement("ul");
      for (let j = 0; j < this.board.dimx; j++) {
        const el = document.createElement("li");
        row.append(el);
      }

    }
  }

  handleSubmit(e) {
    const inputForm = document.querySelector(".input-form");
    e.preventDefault();
    if (typeof this.board.fallingWords[inputForm.value] === 'undefined') {
      e.preventDefault();
    } else {
      delete this.board.fallingWords[inputForm.value];
    }
  }

}
