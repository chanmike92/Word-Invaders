import WordObject from './word.js';

class Board {
  constructor(dimx, dimy) {
    this.dimx = dimx;
    this.dimy = dimy;
    this.fallingWords = {};
    this.generateBoard(this.dimx, this.dimy);
    this.generateNewWord();
    this.time = 6000;
    // setInterval(this.generateNewWord.bind(this), this.time);
    // setInterval(this.render.bind(this), 3000);
  }

  generateBoard(dimx, dimy) {
    const grid = [];
    for (let i = 0; i < dimx; i++) {
      const row = [];
      for (let j = 0; j < dimy; j++) {
        row.push('.');
      }
      grid.push(row);
    }
    return grid;
  }


  generateNewWord() {
    const newWord = new WordObject(this.dimx, 2);
    Object.assign(this.fallingWords, {[newWord.word]: newWord});
    setTimeout(this.generateNewWord.bind(this), this.time);
  }

  removeWord(word) {
    delete this.fallingWords[word];
    this.time = this.time * 0.95;
  }

  render() {
    const grid = Board.generateBoard(this.dim);
    Object.values(this.fallingWords).forEach( word => {
      grid[word.pos[0]][word.pos[1]].push(word.word);
    });
    setTimeout(this.generateNewWord(), 3000);
  }


}

export default Board;
