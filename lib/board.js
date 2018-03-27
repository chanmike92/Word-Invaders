import WordObject from './word.js';

class Board {
  constructor(dimx, dimy) {
    this.dimx = dimx;
    this.dimy = dimy;
    this.fallingWords = {};
    this.count = 0;
    // this.generateBoard(this.dimx, this.dimy);
    // this.generateNewWord();
    this.levelUp = this.levelUp.bind(this);
    this.time = 2000;
    // setInterval(this.generateNewWord.bind(this), this.time);
    // setInterval(this.render.bind(this), 3000);
  }

  // generateBoard(dimx, dimy) {
  //   const grid = [];
  //   for (let i = 0; i < dimx; i++) {
  //     const row = [];
  //     for (let j = 0; j < dimy; j++) {
  //       row.push('.');
  //     }
  //     grid.push(row);
  //   }
  //   return grid;
  // }


  generateNewWord() {
    const newWord = new WordObject(this.dimx, 1);
    Object.assign(this.fallingWords, {[newWord.word]: newWord});
    // this.timeouts.push(setTimeout(this.generateNewWord.bind(this), this.time));
  }

  clearWordTimeouts() {
    // this.timeouts.forEach(el => {
    //   clearTimeout(el);
    // });
    // this.timeouts = [];
    clearInterval(this.wordInterval);
  }

  removeWord(word) {
    delete this.fallingWords[word];
    this.count ++;
    if (this.count % 10 === 0) {
      this.levelUp();
    }
  }

  render() {
    const grid = Board.generateBoard(this.dim);
    Object.values(this.fallingWords).forEach( word => {
      grid[word.pos[0]][word.pos[1]].push(word.word);
    });
  }

  levelUp() {
    this.time = this.time * 0.9;
    debugger
    clearInterval(this.wordInterval);
    this.wordInterval = setInterval(this.generateNewWord.bind(this), this.time);
  }

  start() {
    this.wordInterval = setInterval(this.generateNewWord.bind(this), this.time);
  }

  endGame() {
    this.clearWordTimeouts();
    this.fallingWords = {};
    this.count = 0;
    this.time = 2000;
  }


}

export default Board;
