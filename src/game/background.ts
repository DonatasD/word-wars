export class Background {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    this.ctx = ctx;
    this.img = img;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    );
  }
}
