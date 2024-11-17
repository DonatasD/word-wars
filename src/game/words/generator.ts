import words from "./words_dictionary.json";
import { Position, Velocity } from "../../types.ts";
import { FONT_SIZE_DEFAULT, VELOCITY_MAX, VELOCITY_MIN } from "./constants.ts";

export class WordGenerator {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly wordList: string[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.wordList = Object.keys(words);
  }

  generateWordText() {
    return this.wordList[Math.floor(Math.random() * this.wordList.length)];
  }

  generateWordPosition(fontSize = FONT_SIZE_DEFAULT): Position {
    return {
      x: this.generateRandomInt(0, this.ctx.canvas.width),
      y: this.generateRandomInt(fontSize, this.ctx.canvas.height - fontSize),
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
