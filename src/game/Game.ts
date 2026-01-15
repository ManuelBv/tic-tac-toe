import { Board } from './Board';
import { CanvasRenderer } from '../rendering/CanvasRenderer';

export class Game {
  private board: Board;
  private renderer: CanvasRenderer;
  private canvas: HTMLCanvasElement;
  private hoveredCell: { row: number; col: number } | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.board = new Board();
    this.renderer = new CanvasRenderer(canvas);
    this.hoveredCell = null;
  }

  init(): void {
    this.setupEventListeners();
    this.render();
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { row, col } = this.pixelToGrid(x, y);

    if (this.board.makeMove(row, col)) {
      this.render();
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (this.board.gameOver) {
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { row, col } = this.pixelToGrid(x, y);

    // Update hovered cell if it changed
    if (
      !this.hoveredCell ||
      this.hoveredCell.row !== row ||
      this.hoveredCell.col !== col
    ) {
      this.hoveredCell = { row, col };
      this.render();
    }
  }

  private handleMouseLeave(): void {
    if (this.hoveredCell) {
      this.hoveredCell = null;
      this.render();
    }
  }

  private pixelToGrid(x: number, y: number): { row: number; col: number } {
    const col = Math.floor(x / this.renderer.cellSize);
    const row = Math.floor(y / this.renderer.cellSize);

    // Clamp to valid range
    return {
      row: Math.max(0, Math.min(2, row)),
      col: Math.max(0, Math.min(2, col)),
    };
  }

  restart(): void {
    this.board.reset();
    this.hoveredCell = null;
    this.render();
  }

  private render(): void {
    const hoveredCell = this.hoveredCell
      ? {
          row: this.hoveredCell.row,
          col: this.hoveredCell.col,
          player: this.board.currentPlayer,
        }
      : undefined;

    this.renderer.render(this.board, hoveredCell);
  }
}
