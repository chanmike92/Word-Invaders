import { words } from './word_array.js';

class WordObject {
  constructor(dimx, dimy) {
    this.dimx = dimx;
    this.dimy = dimy;
    this.pos = [Math.floor(Math.random() * dimx), 0];
    this.generateRandomWord();
  }

  generateRandomWord() {
    this.word = words[Math.floor(Math.random() * words.length)];
  }

  move() {
    this.pos = [this.pos[0], this.pos[1] + 1];
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
