export class InputStore {
  private value: string;
  private limit?: number;

  constructor(value: string = "") {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setValue(ctx: CanvasRenderingContext2D, value: string) {
    if (
      (this.limit && this.limit < this.value.length) ||
      this.value.length > value.length
    ) {
      this.limit = undefined;
    }
    if (!this.limit) {
      if (
        this.value.length > value.length ||
        ctx.measureText(value).width <= ctx.canvas.width * 0.9
      ) {
        this.value = value;
      } else {
        this.limit = this.value.length;
      }
    }
  }
}
