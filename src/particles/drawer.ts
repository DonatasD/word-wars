import { GameStore } from "../game/store.ts";
import { GameContext } from "../game/context.ts";

export class ParticleDrawer {
  store: GameStore;
  context: GameContext;

  constructor(store: GameStore, context: GameContext) {
    this.store = store;
    this.context = context;
  }

  public draw() {
    this.store.particleStore.getParticles().forEach((particle) => {
      particle.draw(this.context.gameContext);
      particle.update();
    });
    this.store.particleStore.update();
  }
}
