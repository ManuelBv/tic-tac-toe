export function getCellCenter(row: number, col: number, cellSize: number): { x: number; y: number } {
  return {
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2,
  };
}

export function getCellBounds(
  row: number,
  col: number,
  cellSize: number
): { x: number; y: number; width: number; height: number } {
  return {
    x: col * cellSize,
    y: row * cellSize,
    width: cellSize,
    height: cellSize,
  };
}
