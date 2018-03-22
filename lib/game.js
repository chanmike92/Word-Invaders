import Board from './board.js';

class Game {
  constructor($el) {
    this.$el = $el;
    this.time = 2000;
    this.board = new Board(10, 6);
    this.setupGrid();
    this.render();
    // setInterval(this.render.bind(this), this.time);
    this.handleSubmit();
  }

  setupGrid() {
    for (var i = 0; i < this.board.dimx; i++) {
      const $ul = $('<ul>');

      for (var j = 0; j < this.board.dimy; j++) {
        const $li = $('<li>');
        $ul.append($li);
      }
      this.$el.append($ul);
    }
  }

  handleSubmit() {
    const inputForm = $(".input-form");
    const inputBox = $('.input-box');

    const eventListener = (e) => {
      e.preventDefault();
      if (typeof this.board.fallingWords[inputBox.val()] === 'undefined') {
        // debugger
        e.preventDefault();
      } else {
        this.board.removeWord(inputBox.val());
        inputBox.val('');
        this.time = this.time * 0.95;
      }
    };
    inputForm.on('submit', eventListener);
  }

  updatePosition() {
    this.$li = $('li');
    this.$li.empty();
    Object.values(this.board.fallingWords).forEach(word => {
      word.move();
      let li = this.$li.eq((word.pos[0] * 6) - word.pos[1]);
      $(li).html(word.word);
    });
    setTimeout(this.render.bind(this), this.time);
  }

  render() {
    this.updatePosition();

    // Object.values(this.board.fallingWords).forEach(word => {
    //   word.move();
    // });
  }


}

export default Game;
