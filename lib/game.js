import Board from './board.js';

class Game {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(6, 14);
    this.setupGrid();
    this.musicHandler();
    this.clearWordTimeouts = this.clearWordTimeouts.bind(this);
    this.handleStart();
    this.started = false;
    this.timeouts = [];
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
      const wordCount = $('.counter');
      if (typeof this.board.fallingWords[inputBox.val()] === 'undefined') {
        // debugger
        e.preventDefault();
      } else {
        this.board.removeWord(inputBox.val());
        this.destroyedWord ++;
        wordCount.html(`Words Destroyed: ${this.destroyedWord}`);

        // $(`li:contains(${inputBox.val()}`).empty();
        inputBox.val('');
        this.clearBoard();
        var wordarr = Object.values(this.board.fallingWords);
        for (var i = 0; i < wordarr.length; i++) {
          let li = this.$li.eq((wordarr[i].pos[0] * 14) + wordarr[i].pos[1]);
          $(li).html(wordarr[i].word);
          if (wordarr[i].validMove() === false) {
            this.endGame(wordarr[i].word, this.destroyedWord);
            break;
          }
        }
        this.time = this.time * 0.99;
      }
    };
    inputForm.on('submit', eventListener);
  }

  musicHandler() {
    const audioPlayer = $('.audioplay');
    var audio = document.getElementById("myAudio");
    audio.play();
    const eventListener = (e) => {
      e.preventDefault();
      if (audioPlayer.hasClass('playing')) {
        audioPlayer.toggleClass('playing');
        audioPlayer.html('<i class="fas fa-play"></i>');
        audio.pause();
      }
      else {
        audioPlayer.toggleClass('playing');
        audioPlayer.html('<i class="fas fa-pause"></i>');
        audio.play();
      }
    };
    audioPlayer.on('click', eventListener);
  }

  clearBoard() {
    this.$li = $('li');
    this.$li.empty();
  }

  updatePosition() {
    this.clearBoard();
    var wordarr = Object.values(this.board.fallingWords);
    for (var i = 0; i < wordarr.length; i++) {
      let li = this.$li.eq((wordarr[i].pos[0] * 14) + wordarr[i].pos[1]);
      $(li).html(wordarr[i].word);
      if (wordarr[i].validMove() === false) {
        this.endGame(wordarr[i].word, this.destroyedWord);
        break;
      }
      wordarr[i].move();
    }
    this.timeouts.push(setTimeout(this.render.bind(this), this.time));
  }

  handleStart() {
    const instructions = $('.instructions');
    const gameField = $('.game-field');
    const wordCount = $('.counter');
    const start = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        instructions.addClass('hide');
        gameField.removeClass('hide');
        this.time = 1000;
        this.board.start();
        this.destroyedWord = 0;
        wordCount.html(`Words Destroyed: ${this.destroyedWord}`);
        this.handleSubmit();
        if (this.started === false) {
          this.updatePosition();
          this.started = true;
        }
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

  clearWordTimeouts() {
    this.timeouts.forEach(el => {
      clearTimeout(el);
    });
    this.timeouts = [];
  }

  endGame(a, b) {
    this.board.endGame();
    this.clearWordTimeouts();
    const instructions = $('.instructions');
    const gameField = $('.game-field');
    instructions.html(`You were defeated by "${a}".<br>
          You destroyed ${b} words.<br>
          Press Enter to play again!`);
    instructions.removeClass('hide');
    gameField.addClass('hide');
    this.handleStart();
  }

}

export default Game;
