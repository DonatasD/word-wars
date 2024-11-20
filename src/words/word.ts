import { Position, Velocity, WordStyle } from "../types.ts";

export class Word {
  position: Position;
  text: string;
  styles: WordStyle[];
  velocity: Velocity;

  constructor(
    position: Position,
    text: string,
    styles: WordStyle[],
    velocity: Velocity,
  ) {
    this.position = position;
    this.text = text;
    this.styles = styles;
    this.velocity = velocity;
  }

  draw(ctx: CanvasRenderingContext2D) {
    let letterPositionX = 0;
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
    for (let i = 0; i < this.text.length; i++) {
      const { fontSize, fontFamily, fontUnitSize, color } = this.styles[i];
      const text = this.text.charAt(i);
      ctx.font = `${fontSize}${fontUnitSize} ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.fillText(text, this.position.x + letterPositionX, this.position.y);
      letterPositionX += ctx.measureText(text).width;
    }
  }
}
