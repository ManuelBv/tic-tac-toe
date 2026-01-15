import { Player, WinLine } from './Player';

export class Board {
  cells: (Player | null)[][];
  currentPlayer: Player;
  winner: Player | null;
  gameOver: boolean;
  winningLine: WinLine | null;

  constructor() {
    this.cells = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameOver = false;
    this.winningLine = null;
  }

  makeMove(row: number, col: number): boolean {
    if (this.gameOver || !this.isCellEmpty(row, col)) {
      return false;
    }

    this.cells[row][col] = this.currentPlayer;

    const winLine = this.checkWinner();
    if (winLine) {
      this.winner = this.currentPlayer;
      this.gameOver = true;
      this.winningLine = winLine;
      return true;
    }

    if (this.isFull()) {
      this.gameOver = true;
      return true;
    }

    this.switchPlayer();
    return true;
  }

  checkWinner(): WinLine | null {
    const cells = this.cells;

    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        cells[row][0] &&
        cells[row][0] === cells[row][1] &&
        cells[row][1] === cells[row][2]
      ) {
        return { type: 'row', index: row };
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        cells[0][col] &&
        cells[0][col] === cells[1][col] &&
        cells[1][col] === cells[2][col]
      ) {
        return { type: 'col', index: col };
      }
    }

    // Check diagonal (top-left to bottom-right)
    if (
      cells[0][0] &&
      cells[0][0] === cells[1][1] &&
      cells[1][1] === cells[2][2]
    ) {
      return { type: 'diagonal', index: 0 };
    }

    // Check diagonal (top-right to bottom-left)
    if (
      cells[0][2] &&
      cells[0][2] === cells[1][1] &&
      cells[1][1] === cells[2][0]
    ) {
      return { type: 'diagonal', index: 1 };
    }

    return null;
  }

  isCellEmpty(row: number, col: number): boolean {
    return this.cells[row][col] === null;
  }

  isFull(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.cells[row][col] === null) {
          return false;
        }
      }
    }
    return true;
  }

  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  reset(): void {
    this.cells = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameOver = false;
    this.winningLine = null;
  }
}
