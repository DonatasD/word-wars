export class GameContext {
  private _canvasGame: HTMLCanvasElement;
  private _canvasInput: HTMLCanvasElement;
  private _backgroundImage: HTMLImageElement;

  constructor(
    canvasGame: HTMLCanvasElement,
    canvasInput: HTMLCanvasElement,
    backgroundImage: HTMLImageElement,
  ) {
    this._canvasGame = canvasGame;
    this._canvasInput = canvasInput;
    this._backgroundImage = backgroundImage;
  }

  get canvasGame(): HTMLCanvasElement {
    return this._canvasGame;
  }

  get canvasInput(): HTMLCanvasElement {
    return this._canvasInput;
  }

  get backgroundImage(): HTMLImageElement {
    return this._backgroundImage;
  }

  get gameContext(): CanvasRenderingContext2D {
    return this._canvasGame.getContext("2d")!;
  }

  get inputContext(): CanvasRenderingContext2D {
    return this._canvasInput.getContext("2d")!;
  }
}
