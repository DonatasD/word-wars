import "./index.scss";
import { Game } from "./game/game.ts";

const canvasGame = <HTMLCanvasElement>document.getElementById("word-wars-game");
const canvasInput = <HTMLCanvasElement>(
  document.getElementById("word-wars-user-input")
);
const backgroundImage = <HTMLImageElement>document.getElementById("letofi");
const game = new Game(canvasGame, canvasInput, backgroundImage);
game.init();
game.start();
