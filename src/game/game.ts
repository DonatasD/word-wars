import { WordDrawer } from "./wordDrawer.ts";
import { Input } from "../input.ts";
import { Background } from "./background.ts";
import { Keyboard } from "./keyboard.ts";

export class Game {
  canvasGame: HTMLCanvasElement;
  canvasInput: HTMLCanvasElement;
  wordDrawer: WordDrawer;
  input: Input;
  background: Background;
  keyboard: Keyboard;

  constructor() {
    this.canvasGame = <HTMLCanvasElement>(
      document.getElementById("word-wars-game")
    );
    this.canvasInput = <HTMLCanvasElement>(
      document.getElementById("word-wars-user-input")
    );
    const gameCtx = this.canvasGame.getContext("2d");
    this.background = new Background(
      gameCtx!,
      <HTMLImageElement>document.getElementById("letofi"),
    );
    this.wordDrawer = new WordDrawer(gameCtx!);
    this.wordDrawer.addWord({
      text: "Meow Meow Meow",
      position: { x: 0, y: 24 },
      style: {
        fontSize: 24,
        fontFamily: "Serif",
        color: "#ffffff",
      },
      velocity: {
        x: 5,
        y: 5,
      },
    });
    const inputCtx = this.canvasInput.getContext("2d");
    this.input = new Input(inputCtx!);
    this.keyboard = new Keyboard(this.input);
    this.init();
  }

  private init() {
    this.initCanvas();
    this.keyboard.init();

    window.addEventListener("resize", () => {
      this.initCanvas();
    });
  }

  private initCanvas() {
    this.canvasInput.width = window.innerWidth;
    this.canvasInput.height = 200;
    this.canvasInput.style.background = "#000000";
    this.canvasGame.width = window.innerWidth;
    this.canvasGame.height = window.innerHeight - 200;
    this.canvasGame.style.background = "#000000";
  }

  public start() {
    this.background.draw();
    this.wordDrawer.moveWords();
    this.wordDrawer.drawWords();
    this.input.draw();
    requestAnimationFrame(this.start.bind(this));
  }
}
