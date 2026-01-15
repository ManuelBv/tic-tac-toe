import { Game } from './game/Game';
import './styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;

  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  if (!restartBtn) {
    throw new Error('Restart button not found');
  }

  const game = new Game(canvas);
  game.init();

  restartBtn.addEventListener('click', () => {
    game.restart();
  });
});
