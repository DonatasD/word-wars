import "./index.scss";
import { Game } from "./game/game.ts";
// import { Input } from "./input.ts";
//
// const canvasGame = <HTMLCanvasElement>document.getElementById("word-wars-game");
// const canvasInput = <HTMLCanvasElement>(
//   document.getElementById("word-wars-user-input")
// );
// const letofiImage = <HTMLImageElement>document.getElementById("letofi");
// const gameCtx = canvasGame.getContext("2d");
// const inputCtx = canvasInput.getContext("2d");
// const inputWord = "";

// const init = () => {
//   canvasInput.width = window.innerWidth;
//   canvasInput.height = 200;
//   canvasInput.style.background = "#000000";
//   canvasGame.width = window.innerWidth;
//   canvasGame.height = window.innerHeight - 200;
//   canvasGame.style.background = "#000000";
// };

// init();
const game = new Game();
game.start();
// const input = new Input(inputCtx!, inputWord);
// input.draw();

// window.addEventListener("resize", () => {
//   // cancelAnimationFrame();
//   init();
// });

// window.addEventListener("keypress", (e) => {
//   input.setInput(e.key);
//   console.log(e.key);
// });
