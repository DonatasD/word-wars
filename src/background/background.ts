import { GameContext } from "../game/context.ts";

export class Background {
  context: GameContext;

  constructor(context: GameContext) {
    this.context = context;
  }

  draw() {
    this.context.gameContext.drawImage(
      this.context.backgroundImage,
      0,
      0,
      this.context.canvasGame.width,
      this.context.canvasGame.height,
    );
  }
}
