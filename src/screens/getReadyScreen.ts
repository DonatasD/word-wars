import { GameContext } from "../game/context.ts";
import { GameStore } from "../game/store.ts";

export class GetReadyScreen {
  private readonly gameStore: GameStore;
  private readonly gameContext: GameContext;

  constructor(gameStore: GameStore, gameContext: GameContext) {
    this.gameStore = gameStore;
    this.gameContext = gameContext;
  }

  draw() {
    const gameContext = this.gameContext.gameContext;
    gameContext.font = "100px Serif";
    gameContext.fillStyle = "#ffffff";
    gameContext.textBaseline = "middle";
    gameContext.textAlign = "center";
    gameContext.fillText(
      `Get Ready Level ${this.gameStore.level}!`,
      gameContext.canvas.width / 2,
      gameContext.canvas.height / 2,
    );
  }
}
