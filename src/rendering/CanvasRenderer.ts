import { Board } from '../game/Board';
import { Player, WinLine } from '../game/Player';
import { getCellCenter } from '../utils/helpers';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  cellSize: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not available');
    }
    this.ctx = ctx;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cellSize = this.canvasWidth / 3;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawGrid(): void {
    this.ctx.strokeStyle = '#374151';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';

    // Draw vertical lines
    for (let i = 1; i < 3; i++) {
      const x = i * this.cellSize;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvasHeight);
      this.ctx.stroke();
    }

    // Draw horizontal lines
    for (let i = 1; i < 3; i++) {
      const y = i * this.cellSize;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvasWidth, y);
      this.ctx.stroke();
    }
  }

  drawX(row: number, col: number, alpha: number = 1): void {
    const padding = this.cellSize * 0.2;
    const { x, y } = getCellCenter(row, col, this.cellSize);
    const halfSize = this.cellSize / 2 - padding;

    this.ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
    this.ctx.lineWidth = 8;
    this.ctx.lineCap = 'round';

    // Draw first diagonal (top-left to bottom-right)
    this.ctx.beginPath();
    this.ctx.moveTo(x - halfSize, y - halfSize);
    this.ctx.lineTo(x + halfSize, y + halfSize);
    this.ctx.stroke();

    // Draw second diagonal (top-right to bottom-left)
    this.ctx.beginPath();
    this.ctx.moveTo(x + halfSize, y - halfSize);
    this.ctx.lineTo(x - halfSize, y + halfSize);
    this.ctx.stroke();
  }

  drawO(row: number, col: number, alpha: number = 1): void {
    const { x, y } = getCellCenter(row, col, this.cellSize);
    const radius = this.cellSize * 0.35;

    this.ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
    this.ctx.lineWidth = 8;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  drawMark(player: Player, row: number, col: number, alpha: number = 1): void {
    if (player === 'X') {
      this.drawX(row, col, alpha);
    } else {
      this.drawO(row, col, alpha);
    }
  }

  drawBoard(board: Board): void {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = board.cells[row][col];
        if (cell) {
          this.drawMark(cell, row, col);
        }
      }
    }
  }

  drawWinLine(winLine: WinLine): void {
    this.ctx.strokeStyle = '#10B981';
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    if (winLine.type === 'row') {
      const row = winLine.index;
      const y = row * this.cellSize + this.cellSize / 2;
      startX = this.cellSize * 0.2;
      startY = y;
      endX = this.canvasWidth - this.cellSize * 0.2;
      endY = y;
    } else if (winLine.type === 'col') {
      const col = winLine.index;
      const x = col * this.cellSize + this.cellSize / 2;
      startX = x;
      startY = this.cellSize * 0.2;
      endX = x;
      endY = this.canvasHeight - this.cellSize * 0.2;
    } else if (winLine.type === 'diagonal') {
      const padding = this.cellSize * 0.2;
      if (winLine.index === 0) {
        // Top-left to bottom-right
        startX = padding;
        startY = padding;
        endX = this.canvasWidth - padding;
        endY = this.canvasHeight - padding;
      } else {
        // Top-right to bottom-left
        startX = this.canvasWidth - padding;
        startY = padding;
        endX = padding;
        endY = this.canvasHeight - padding;
      }
    }

    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  drawGameOverText(winner: Player | null): void {
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = '#1F2937';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    this.ctx.shadowBlur = 4;
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;

    const text = winner ? `${winner} Wins!` : "It's a Tie!";
    this.ctx.fillText(text, this.canvasWidth / 2, this.canvasHeight / 2);

    // Reset shadow
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  render(
    board: Board,
    hoveredCell?: { row: number; col: number; player: Player }
  ): void {
    // Clear canvas
    this.clear();

    // Draw grid
    this.drawGrid();

    // Draw all marks from board state
    this.drawBoard(board);

    // Draw hover preview
    if (hoveredCell && !board.gameOver && board.isCellEmpty(hoveredCell.row, hoveredCell.col)) {
      this.drawMark(hoveredCell.player, hoveredCell.row, hoveredCell.col, 0.3);
    }

    // Draw win line if game is over
    if (board.gameOver && board.winningLine) {
      this.drawWinLine(board.winningLine);
    }

    // Draw game over text (overlay on top of everything)
    if (board.gameOver) {
      this.drawGameOverText(board.winner);
    }
  }
}
