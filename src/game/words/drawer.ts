import { WordStore } from "./store.ts";
import { InputStore } from "../input/store.ts";
import { COLOR_DEFAULT, COLOR_MATCH } from "./constants.ts";

export class WordDrawer {
  private ctx: CanvasRenderingContext2D;
  private wordStore: WordStore;
  private inputStore: InputStore;

  constructor(
    ctx: CanvasRenderingContext2D,
    wordStore: WordStore,
    inputStore: InputStore,
  ) {
    this.ctx = ctx;
    this.wordStore = wordStore;
    this.inputStore = inputStore;
  }

  public draw() {
    this.moveWords();
    this.styleWords();
    this.wordStore.getWords().forEach((word) => {
      word.draw(this.ctx);
    });
  }

  private moveWords() {
    this.wordStore.getWords().forEach((word) => {
      const predictedWidth = this.ctx.measureText(word.text).width;
      const predictedHeigh = word.styles[0].fontSize;
      const endX = word.position.x + predictedWidth + word.velocity.x;
      if (
        (endX > this.ctx.canvas.width && word.velocity.x > 0) ||
        (word.position.x < 0 && word.velocity.x < 0)
      ) {
        word.velocity.x *= -1;
      }
      if (
        (word.position.y > this.ctx.canvas.height && word.velocity.y > 0) ||
        (word.position.y < predictedHeigh && word.velocity.y < 0)
      ) {
        word.velocity.y *= -1;
      }
      word.position.x += word.velocity.x;
      word.position.y += word.velocity.y;
    });
  }

  private styleWords() {
    const value = this.inputStore.getValue();
    this.wordStore.getWords().forEach((word) => {
      const isMatch = value && word.text.startsWith(value);
      if (isMatch) {
        word.styles = word.styles.map((style, index) => ({
          ...style,
          color: index < value.length ? COLOR_MATCH : COLOR_DEFAULT,
        }));
      } else {
        word.styles = word.styles.map((style) => ({
          ...style,
          color: COLOR_DEFAULT,
        }));
      }
    });
  }
}
