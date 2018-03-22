import WordObject from './word.js';

class Board {
  constructor(dimx, dimy) {
    this.dimx = dimx;
    this.dimy = dimy;
    this.fallingWords = {};
    this.generateBoard(this.dimx, this.dimy);
    this.generateNewWord();
    
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
    const newWord = new WordObject(Math.floor(Math.random() * this.dimx), this.dimy);
    Object.assign(this.fallingWords, {[newWord.word]: newWord});
  }

  removeWord(word) {
    delete this.fallingWords[word];
  }

  render() {
    const grid = Board.generateBoard(this.dim);
    Object.values(this.fallingWords).forEach( word => {
      grid[word.pos[0]][word.pos[1]] = word.word;
    });
    setTimeout(this.generateNewWord(), 3000);
  }


}

export default Board;
