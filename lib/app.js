import Game from './game.js';

$(function () {
  const rootEl = $('.game-field');
  new Game(rootEl);
});
