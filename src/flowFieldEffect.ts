export class FlowFieldEffect {
  ctx: CanvasRenderingContext2D;
  width;
  height;
  x;
  y;
  constructor(ctx: CanvasRenderingContext2D, width, heigh) {
    this.ctx = ctx;
    this.ctx.strokeStyle = "white";
    this.width = width;
    this.height = heigh;
    this.x = 0;
    this.y = 0;
  }

  draw(x, y) {
    // this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 100, y + 100);
    this.ctx.stroke();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw(this.x, this.y);
    this.x += 0.25;
    this.y += 0.25;
    console.log("animate");
    requestAnimationFrame(this.animate.bind(this));
  }
}
