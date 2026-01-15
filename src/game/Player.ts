export type Player = 'X' | 'O';

export interface WinLine {
  type: 'row' | 'col' | 'diagonal';
  index: number;
}
