export class Input {
  ctx: CanvasRenderingContext2D;
  private value: string;
  private limit?: number;

  constructor(ctx: CanvasRenderingContext2D, value: string = "") {
    this.ctx = ctx;
    this.value = value;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.font = "120px Serif";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.value,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2,
    );
  }

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    if (
      (this.limit && this.limit < this.value.length) ||
      this.value.length > value.length
    ) {
      this.limit = undefined;
    }
    if (!this.limit) {
      if (this.ctx.measureText(value).width <= this.ctx.canvas.width) {
        this.value = value;
      } else {
        this.limit = this.value.length;
      }
    }
  }
}
