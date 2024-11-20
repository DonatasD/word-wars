import { GameStore } from "../game/store.ts";
import { GameContext } from "../game/context.ts";
import { CANVAS_HEIGHT_BREAKPOINTS, FONT_SIZES } from "./constants.ts";

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
    this.context.inputContext.font = `${this.calcFontSize()} Serif`;
    this.context.inputContext.fillStyle = "#ffffff";
    this.context.inputContext.textBaseline = "middle";
    this.context.inputContext.textAlign = "center";
    this.context.inputContext.fillText(
      this.store.inputStore.getValue(),
      this.context.canvasInput.width / 2,
      this.context.canvasInput.height / 2,
    );
  }

  private calcFontSize() {
    const canvasHeight = this.context.canvasInput.height;
    switch (true) {
      case CANVAS_HEIGHT_BREAKPOINTS.xs >= canvasHeight &&
        canvasHeight < CANVAS_HEIGHT_BREAKPOINTS.sm:
        return FONT_SIZES.xs;
      case CANVAS_HEIGHT_BREAKPOINTS.sm >= canvasHeight &&
        canvasHeight < CANVAS_HEIGHT_BREAKPOINTS.md:
        return FONT_SIZES.sm;
      case CANVAS_HEIGHT_BREAKPOINTS.md >= canvasHeight &&
        canvasHeight < CANVAS_HEIGHT_BREAKPOINTS.lg:
        return FONT_SIZES.md;
      default:
        return FONT_SIZES.lg;
    }
  }
}
