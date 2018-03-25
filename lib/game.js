import Board from './board.js';

class Game {
  constructor($el) {
    this.$el = $el;
    this.handleStart();
    this.board = new Board(6, 14);
    this.setupGrid();
    // this.time = 1000;
    // this.board = new Board(6, 14);
    // this.setupGrid();
    // this.render();
    // this.destroyedWord = 0;
    // // setInterval(this.render.bind(this), this.time);
    // this.handleSubmit();
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

  clearBoard() {
    this.$li = $('li');
    this.$li.empty();
  }

  updatePosition() {
    this.clearBoard();
    var wordarr = Object.values(this.board.fallingWords);
    for (var i = 0; i < wordarr.length; i++) {
      wordarr[i].move();
      let li = this.$li.eq((wordarr[i].pos[0] * 14) + wordarr[i].pos[1]);
      $(li).html(wordarr[i].word);
      if (wordarr[i].validMove() === false) {
        this.endGame();
        break;
      }
    }
    const timeout = setTimeout(this.render.bind(this), this.time);
  }

  handleStart() {
    const instructions = $('.instructions');
    const gameField = $('.game-field');
    const start = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        instructions.addClass('hide');
        gameField.removeClass('hide');
        this.time = 1000;
        this.render();
        this.destroyedWord = 0;
        this.handleSubmit();
        $(document).off('keypress', start);
      }
    };
  $(document).on('keypress', start);
  }

  render() {
    this.updatePosition();

    // Object.values(this.board.fallingWords).forEach(word => {
    //   word.move();
    // });
  }

  endGame() {
    this.clearBoard();
    this.board.fallingWords = {};
    // clearTimeout(timeout);
    debugger
  }

}

export default Game;
