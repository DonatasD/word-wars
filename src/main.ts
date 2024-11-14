import "./index.scss";
import { FlowFieldEffect } from "./flowFieldEffect.ts";

const canvas = <HTMLCanvasElement>document.getElementById("word-wars-game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
flowField.animate();

window.addEventListener("resize", () => {
  cancelAnimationFrame();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate();
});
