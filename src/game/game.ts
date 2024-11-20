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
import { StartScreen } from "../screens/startScreen.ts";
import { GetReadyScreen } from "../screens/getReadyScreen.ts";
import { Timer } from "../utils/timer.ts";
import { CongratulationsScreen } from "../screens/congratulationsScreen.ts";

export class Game {
  private readonly store: GameStore;
  private readonly context: GameContext;
  private readonly wordDrawer: WordDrawer;
  private readonly particleDrawer: ParticleDrawer;
  private readonly input: Input;
  private readonly background: Background;
  private readonly startScreen: StartScreen;
  private readonly getReadyScreen: GetReadyScreen;
  private readonly congratulationsScreen: CongratulationsScreen;
  private readonly keyboard: Keyboard;
  private readonly frameLimiter: FrameLimiter = new FrameLimiter();
  private readonly timer: Timer = new Timer();

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
    this.startScreen = new StartScreen(this.context);
    this.getReadyScreen = new GetReadyScreen(this.store, this.context);
    this.congratulationsScreen = new CongratulationsScreen(this.context);
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
          this.startScreen.draw();
          break;
        }
        case GameState.Starting: {
          if (!this.timer.isRunning()) {
            this.timer.start();
            this.background.draw();
            this.input.draw();
            this.getReadyScreen.draw();
            if (this.store.wordStore.isEmpty()) {
              for (let i = 0; i < this.store.level; i++) {
                this.store.wordStore.addGenerated(ctxGame);
              }
            }
          }
          if (this.timer.getTimePassed() > 2000) {
            this.store.state = GameState.InProgress;
            this.timer.reset();
          }
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
          if (!this.timer.isRunning()) {
            this.timer.start();
          }
          this.background.draw();
          this.input.draw();
          this.congratulationsScreen.draw();
          this.particleDrawer.draw();
          if (this.timer.getTimePassed() > 1000) {
            this.store.state = GameState.Starting;
            this.timer.reset();
          }
          break;
        }
      }
    }
    requestAnimationFrame(this.start.bind(this));
  }

  // private draw() {}
}
