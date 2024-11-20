import { Input } from "../input/input.ts";
import { Background } from "../background/background.ts";
import { Keyboard } from "../keyboard/keyboard.ts";
import { WordDrawer } from "../words/drawer.ts";
import { FrameLimiter } from "../utils/frameLimiter.ts";
import { ParticleDrawer } from "../particles/drawer.ts";
import { GameState } from "../types.ts";
import { GameStore } from "./store.ts";
import { GameContext } from "./context.ts";
import { MIN_INPUT_HEIGHT } from "../constants.ts";

export class Game {
  private readonly store: GameStore;
  private readonly context: GameContext;
  private readonly wordDrawer: WordDrawer;
  private readonly particleDrawer: ParticleDrawer;
  private readonly input: Input;
  private readonly background: Background;
  private readonly keyboard: Keyboard;
  private readonly frameLimiter: FrameLimiter = new FrameLimiter();

  constructor(
    canvasGame: HTMLCanvasElement,
    canvasInput: HTMLCanvasElement,
    backgroundImage: HTMLImageElement,
  ) {
    this.context = new GameContext(canvasGame, canvasInput, backgroundImage);
    this.background = new Background(this.context);
    this.store = new GameStore();
    this.input = new Input(this.store, this.context);
    this.wordDrawer = new WordDrawer(this.store, this.context);
    this.particleDrawer = new ParticleDrawer(this.store, this.context);
    this.keyboard = new Keyboard(this.store, this.context);
  }

  public init() {
    this.initCanvas();
    this.keyboard.init();

    window.addEventListener("resize", () => {
      this.initCanvas();
    });
  }

  private initCanvas() {
    this.context.canvasInput.width = window.innerWidth;
    const scaledCanvasInputHeight = window.innerHeight * 0.1;
    this.context.canvasInput.height =
      scaledCanvasInputHeight >= MIN_INPUT_HEIGHT
        ? scaledCanvasInputHeight
        : MIN_INPUT_HEIGHT;
    this.context.canvasInput.style.background = "#000000";
    this.context.canvasGame.width = window.innerWidth;
    this.context.canvasGame.height =
      window.innerHeight - this.context.canvasInput.height;
    this.context.canvasGame.style.background = "#000000";
  }

  start() {
    if (this.frameLimiter.isReady()) {
      const ctxGame = this.context.gameContext;
      switch (this.store.state) {
        case GameState.Idle: {
          // TODO add initial screen to start
          // this.input.draw();
          // const ctx = this.context.gameContext;
          // const rect = {
          //   x: ctx.canvas.width / 2 - 100,
          //   y: ctx.canvas.height / 2 - 50,
          //   width: 200,
          //   height: 100,
          // };
          // ctx.beginPath();
          // ctx.rect(rect.x, rect.y, rect.width, rect.height);
          // ctx.fillStyle = "rgba(225,225,225,0.5)";
          // ctx.fill();
          // ctx.lineWidth = 2;
          // ctx.strokeStyle = "#000000";
          // ctx.stroke();
          // ctx.closePath();
          // ctx.font = "40pt Kremlin Pro Web";
          // ctx.fillStyle = "#000000";
          // ctx.fillText("Start", rect.x + rect.width / 4, rect.y + 64);
          break;
        }
        case GameState.Starting: {
          // TODO add timer
          this.background.draw();
          this.input.draw();
          if (this.store.wordStore.isEmpty()) {
            for (let i = 0; i < this.store.level; i++) {
              this.store.wordStore.addGenerated(ctxGame);
            }
          }
          this.store.state = GameState.InProgress;
          break;
        }
        case GameState.InProgress: {
          this.background.draw();
          this.input.draw();
          this.particleDrawer.draw();
          this.wordDrawer.draw();
          break;
        }
        case GameState.WaitingToStart: {
          // TODO add congratulations screen
          this.background.draw();
          this.input.draw();
          this.store.state = GameState.Starting;
          break;
        }
      }
    }
    requestAnimationFrame(this.start.bind(this));
  }

  // private draw() {}
}
