import { InputStore } from "./store.ts";

export class InputDrawer {
  ctx: CanvasRenderingContext2D;
  private inputStore: InputStore;
  private limit?: number;
  readonly padding: number;

  constructor(ctx: CanvasRenderingContext2D, inputStore: InputStore) {
    this.ctx = ctx;
    this.inputStore = inputStore;
    this.padding = this.ctx.canvas.width * 0.1;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.font = "120px Serif";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.inputStore.getValue(),
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2,
    );
  }

  setValue(value: string) {
    const inputValue = this.inputStore.getValue();
    if (
      (this.limit && this.limit < inputValue.length) ||
      inputValue.length > value.length
    ) {
      this.limit = undefined;
    }
    if (!this.limit) {
      if (
        this.ctx.measureText(value).width <=
        this.ctx.canvas.width - this.padding
      ) {
        this.setValue(value);
      } else {
        this.limit = inputValue.length;
      }
    }
  }
}
