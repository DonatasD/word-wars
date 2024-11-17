import { InputDrawer } from "./input/inputDrawer.ts";
import { Background } from "./background.ts";
import { Keyboard } from "./keyboard.ts";
import { InputStore } from "./input/store.ts";
import { WordStore } from "./words/store.ts";
import { WordDrawer } from "./words/drawer.ts";
import { WordGenerator } from "./words/generator.ts";
import { FrameLimiter } from "./utils/frameLimiter.ts";

export class Game {
  private canvasGame: HTMLCanvasElement;
  private canvasInput: HTMLCanvasElement;
  private wordDrawer: WordDrawer;
  private readonly input: InputDrawer;
  private background: Background;
  private keyboard: Keyboard;
  private readonly frameLimiter: FrameLimiter;

  constructor() {
    this.canvasGame = <HTMLCanvasElement>(
      document.getElementById("word-wars-game")
    );
    this.canvasInput = <HTMLCanvasElement>(
      document.getElementById("word-wars-user-input")
    );
    this.frameLimiter = new FrameLimiter();
    this.initCanvas();
    const gameCtx = this.canvasGame.getContext("2d");
    this.background = new Background(
      gameCtx!,
      <HTMLImageElement>document.getElementById("letofi"),
    );
    const inputCtx = this.canvasInput.getContext("2d");
    const inputStore = new InputStore();
    this.input = new InputDrawer(inputCtx!, inputStore);
    const wordGenerator = new WordGenerator(gameCtx!);
    const wordStore = new WordStore(wordGenerator);
    this.wordDrawer = new WordDrawer(gameCtx!, wordStore, inputStore);
    for (let i = 0; i < 10; i++) {
      wordStore.add();
    }
    this.keyboard = new Keyboard(inputStore, wordStore);
    this.init();
  }

  private init() {
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
    if (this.frameLimiter.isReady()) {
      this.background.draw();
      this.wordDrawer.draw();
      this.input.draw();
    }
    requestAnimationFrame(this.start.bind(this));
  }
}
