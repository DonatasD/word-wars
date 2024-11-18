export class Background {
  img: HTMLImageElement;

  constructor(img: HTMLImageElement) {
    this.img = img;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
