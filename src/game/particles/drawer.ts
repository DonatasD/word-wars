import { ParticleStore } from "./store.ts";

export class ParticleDrawer {
  particleStore: ParticleStore;

  constructor(particleStore: ParticleStore) {
    this.particleStore = particleStore;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.particleStore.getParticles().forEach((particle) => {
      particle.draw(ctx);
      particle.update();
    });
    this.particleStore.update();
  }
}
