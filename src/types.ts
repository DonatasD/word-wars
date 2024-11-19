export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface WordStyle {
  fontFamily: string;
  fontSize: number;
  fontUnitSize: string;
  color: string;
}

export enum GameState {
  Idle,
  Starting,
  InProgress,
  WaitingToStart,
}
