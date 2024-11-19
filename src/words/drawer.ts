import { COLOR_DEFAULT, COLOR_MATCH } from "./constants.ts";
import { GameStore } from "../game/store.ts";
import { GameContext } from "../game/context.ts";

export class WordDrawer {
  private store: GameStore;
  private context: GameContext;

  constructor(store: GameStore, context: GameContext) {
    this.store = store;
    this.context = context;
  }

  public draw() {
    this.moveWords();
    this.styleWords();
    this.store.wordStore.getWords().forEach((word) => {
      word.draw(this.context.gameContext);
    });
  }

  private moveWords() {
    this.store.wordStore.getWords().forEach((word) => {
      const predictedWidth = this.context.gameContext.measureText(
        word.text,
      ).width;
      const predictedHeigh = word.styles[0].fontSize;
      const endX = word.position.x + predictedWidth + word.velocity.x;
      if (
        (endX > this.context.gameContext.canvas.width && word.velocity.x > 0) ||
        (word.position.x < 0 && word.velocity.x < 0)
      ) {
        word.velocity.x *= -1;
      }
      if (
        (word.position.y > this.context.gameContext.canvas.height &&
          word.velocity.y > 0) ||
        (word.position.y < predictedHeigh && word.velocity.y < 0)
      ) {
        word.velocity.y *= -1;
      }
      word.position.x += word.velocity.x;
      word.position.y += word.velocity.y;
    });
  }

  private styleWords() {
    const value = this.store.inputStore.getValue();
    this.store.wordStore.getWords().forEach((word) => {
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
