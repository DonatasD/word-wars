import { GameStore } from "../game/store.ts";
import { GameContext } from "../game/context.ts";

export class Input {
  private store: GameStore;
  private context: GameContext;

  constructor(store: GameStore, context: GameContext) {
    this.store = store;
    this.context = context;
  }

  draw() {
    this.context.inputContext.clearRect(
      0,
      0,
      this.context.canvasInput.width,
      this.context.canvasInput.height,
    );
    this.context.inputContext.font = "120px Serif";
    this.context.inputContext.fillStyle = "#ffffff";
    this.context.inputContext.textBaseline = "middle";
    this.context.inputContext.textAlign = "center";
    this.context.inputContext.fillText(
      this.store.inputStore.getValue(),
      this.context.canvasInput.width / 2,
      this.context.canvasInput.height / 2,
    );
  }
}
