import { InputStore } from "./store.ts";

export class InputDrawer {
  private inputStore: InputStore;

  constructor(inputStore: InputStore) {
    this.inputStore = inputStore;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "120px Serif";
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      this.inputStore.getValue(),
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
    );
  }
}
