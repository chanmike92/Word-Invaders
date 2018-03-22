import Board from './board.js';

class Game {
  constructor($el) {
    this.$el = $el;
    this.time = 1000;
    this.board = new Board(6, 12);
    this.setupGrid();
    this.render();
    this.destroyedWord = 0;
    // setInterval(this.render.bind(this), this.time);
    this.handleSubmit();
  }

  setupGrid() {
    for (var i = 0; i < this.board.dimx; i++) {
      const $ul = $('<ul>');

      for (var j = 0; j < this.board.dimy; j++) {
        const $li = $('<li>');
        $ul.prepend($li);
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
        this.destroyedWord ++;
        // $(`li:contains(${inputBox.val()}`).empty();
        inputBox.val('');
        this.time = this.time * 0.9999;
      }
    };
    inputForm.on('submit', eventListener);
  }

  updatePosition() {
    this.$li = $('li');
    this.$li.empty();
    Object.values(this.board.fallingWords).forEach(word => {
      word.move();
      let li = this.$li.eq((word.pos[0] * 12) + word.pos[1]);
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

  endGame() {

  }

}

export default Game;
