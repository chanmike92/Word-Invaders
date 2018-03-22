import { words } from './word_array.js';

class WordObject {
  constructor(dimx, dimy) {
    this.pos = [dimx, dimy];
    this.generateRandomWord();
  }

  generateRandomWord() {
    this.word = words[Math.floor(Math.random() * this.dictionary.length)];
  }

  move() {
    this.pos = [this.pos[0] - 1, this.pos[1]];
    this.validMove(this.pos);
  }

  validMove(pos) {
    if (pos[0] === 1) {
      return false;
    } else {
      return true;
    }
  }


}

export default WordObject;
