import Board from './board.js';

class Game {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(10, 6);
    this.setupGrid();
    setInterval(this.render.bind(this), 1000);
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
    debugger
    const eventListener = (e) => {
      e.preventDefault();
      if (typeof this.board.fallingWords[inputBox.val()] === 'undefined') {
        debugger
        e.preventDefault();
      } else {
        debugger
        this.board.removeWord(inputBox.val());
      }
    };
    inputForm.on('submit', eventListener);
  }

  updatePosition() {
    this.$li = $('li');
    Object.values(this.board.fallingWords).forEach(word => {
      word.move();
      let li = this.$li.eq(word.pos[0]);
      $(li).html(word.word);
    });
  }

  render() {
    this.updatePosition();
    // Object.values(this.board.fallingWords).forEach(word => {
    //   word.move();
    // });
  }


}

export default Game;
