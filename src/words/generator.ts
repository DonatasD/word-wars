import { WORDS } from "./dictionary.ts";
import { Position, Velocity } from "../types.ts";
import { FONT_SIZE_DEFAULT, VELOCITY_MAX, VELOCITY_MIN } from "./constants.ts";

export class WordGenerator {
  private readonly wordList: string[];

  constructor() {
    this.wordList = WORDS;
  }

  generateWordText() {
    return this.wordList[Math.floor(Math.random() * this.wordList.length)];
  }

  generateWordPosition(
    ctx: CanvasRenderingContext2D,
    fontSize = FONT_SIZE_DEFAULT,
  ): Position {
    return {
      x: this.generateRandomInt(0, ctx.canvas.width),
      y: this.generateRandomInt(fontSize, ctx.canvas.height - fontSize),
    };
  }

  generateWordVelocity(): Velocity {
    return {
      x: this.generateRandomInt(VELOCITY_MIN, VELOCITY_MAX) || 1,
      y: this.generateRandomInt(VELOCITY_MIN, VELOCITY_MAX) || 1,
    };
  }

  private generateRandomInt(start: number = 0, end: number) {
    return Math.floor(Math.random() * end) + start;
  }
}
