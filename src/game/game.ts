import { InputDrawer } from "./input/inputDrawer.ts";
import { Background } from "./background.ts";
import { Keyboard } from "./keyboard.ts";
import { InputStore } from "./input/store.ts";
import { WordStore } from "./words/store.ts";
import { WordDrawer } from "./words/drawer.ts";
import { WordGenerator } from "./words/generator.ts";
import { FrameLimiter } from "./utils/frameLimiter.ts";
import { ParticleStore } from "./particles/store.ts";
import { ParticleDrawer } from "./particles/drawer.ts";

export class Game {
  private canvasGame: HTMLCanvasElement;
  private canvasInput: HTMLCanvasElement;
  private wordDrawer: WordDrawer;
  private readonly input: InputDrawer;
  private background: Background;
  private keyboard: Keyboard;
  private readonly frameLimiter: FrameLimiter;
  private particleDrawer: ParticleDrawer;
  private addWords: boolean = true;

  constructor() {
    this.canvasGame = <HTMLCanvasElement>(
      document.getElementById("word-wars-game")
    );
    this.canvasInput = <HTMLCanvasElement>(
      document.getElementById("word-wars-user-input")
    );
    this.frameLimiter = new FrameLimiter();
    this.initCanvas();
    this.background = new Background(
      <HTMLImageElement>document.getElementById("letofi"),
    );
    const wordGenerator = new WordGenerator();
    const wordStore = new WordStore(wordGenerator);
    const inputStore = new InputStore();
    const particleStore = new ParticleStore();
    this.input = new InputDrawer(inputStore);
    this.wordDrawer = new WordDrawer(wordStore, inputStore);
    this.particleDrawer = new ParticleDrawer(particleStore);
    this.keyboard = new Keyboard(inputStore, wordStore, particleStore);
    this.init();
  }

  private init() {
    const ctxInput = this.canvasInput.getContext("2d")!;
    this.keyboard.init(ctxInput);

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
      const ctxGame = this.canvasGame.getContext("2d")!;
      const ctxInput = this.canvasInput.getContext("2d")!;
      if (this.addWords) {
        for (let i = 0; i < 10; i++) {
          this.wordDrawer.getWordStore().add(ctxGame);
        }
        this.addWords = false;
      }
      this.background.draw(ctxGame);
      this.particleDrawer.draw(ctxGame);
      this.wordDrawer.draw(ctxGame);
      this.input.draw(ctxInput);
    }
    requestAnimationFrame(this.start.bind(this));
  }
}
