import { Word } from "./types.ts";

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
    this.clearWords();
    this.words.forEach((word) => {
      this.drawWord(word);
    });
  }

  private drawWord(word: Word) {
    const {
      text,
      position,
      style: { fontSize, fontSizeUnits, fontFamily },
    } = word;
    this.ctx.font = `${fontSize}${fontSizeUnits} ${fontFamily}`;
    this.ctx.fillText(text, position.x, position.y);
  }

  private clearWords() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  public moveWords() {
    this.words.forEach((word) => {
      word.position.x++;
    });
  }
}
