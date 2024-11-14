export interface Position {
  x: number;
  y: number;
}

export interface WordStyle {
  fontFamily: string;
  fontSize: number;
  fontSizeUnits: string;
}

export interface Word {
  position: Position;
  text: string;
  style: WordStyle;
}
