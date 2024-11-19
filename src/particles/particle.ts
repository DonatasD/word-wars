import { Position, Velocity } from "../types.ts";
import { generateRandomColor } from "../utils/random.ts";

export class Particle {
  position: Position;
  velocity: Velocity;
  size: number;
  style: string;
  constructor(position: Position, style = generateRandomColor()) {
    this.position = position;
    this.size = Math.random() * 5 + 1;
    this.velocity = {
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 - 1.5,
    };
    this.style = style;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.size > 0) {
      this.size -= 0.075;
    } else {
      this.size = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.style;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
