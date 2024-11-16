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
  color: string;
}

export interface Word {
  position: Position;
  text: string;
  style: WordStyle;
  velocity: Velocity;
}
