import { Word } from "../types.ts";

export class WordDrawer {
  private ctx: CanvasRenderingContext2D;
  private words: Word[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public addWord(word: Word) {
    this.words.push(word);
  }

  public drawWords() {
    this.words.forEach((word) => {
      this.drawWord(word);
    });
  }

  private drawWord(word: Word) {
    const {
      text,
      position,
      style: { fontSize, fontFamily, color },
    } = word;
    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, position.x, position.y);
  }

  public moveWords() {
    this.words.forEach((word) => {
      const predictedWidth = this.ctx.measureText(word.text).width;
      const predictedHeigh = word.style.fontSize;
      const endX = word.position.x + predictedWidth + word.velocity.x;
      if (endX > this.ctx.canvas.width || word.position.x < 0) {
        word.velocity.x *= -1;
        // console.log(word.position, predictedWidth);
      }
      if (
        word.position.y > this.ctx.canvas.height ||
        word.position.y < predictedHeigh
      ) {
        word.velocity.y *= -1;
        // console.log(word.position, predictedHeigh);
      }
      word.position.x += word.velocity.x;
      word.position.y += word.velocity.y;
    });
  }
}
