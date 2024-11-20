import { GameContext } from "../game/context.ts";

export class CongratulationsScreen {
  private readonly gameContext: GameContext;

  constructor(gameContext: GameContext) {
    this.gameContext = gameContext;
  }

  draw() {
    const gameContext = this.gameContext.gameContext;
    gameContext.font = "100px Serif";
    gameContext.fillStyle = "#ffffff";
    gameContext.textBaseline = "middle";
    gameContext.textAlign = "center";
    gameContext.fillText(
      `Congratulations!`,
      gameContext.canvas.width / 2,
      gameContext.canvas.height / 2,
    );
  }
}
