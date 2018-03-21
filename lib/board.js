import WordObject from './word.js';

class Board {
  constructor(dimx, dimy) {
    this.dimx = dimx;
    this.dimy = dimy;
    this.fallingWords = {};
  }

  generateBoard(dim) {
    const grid = [];

    for (let i = 0; i < dim; i++) {
      const row = [];
      for (let j = 0; j < dim; j++) {
        row.push('.');
      }
      grid.push(row);
    }

    return grid;
  }

  generateNewWord() {
    const newWord = new WordObject(Math.floor(Math.random() * this.dimx), this.dimy);
    Object.assign(this.fallingWords, {[newWord.word]: newWord});
  }

  render() {
    const grid = Board.generateBoard(this.dim);
    Object.values(this.fallingWords)
  }


}

export default Board;
