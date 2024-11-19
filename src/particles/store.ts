import { Particle } from "./particle.ts";
import { Position } from "../types.ts";

export class ParticleStore {
  private particles: Particle[];

  constructor(particles: Particle[] = []) {
    this.particles = particles;
  }

  add(position: Position) {
    const particle = new Particle(position);
    this.particles.push(particle);
  }

  getParticles() {
    return this.particles;
  }

  update() {
    this.particles = this.particles.filter((particle) => particle.size > 0);
  }
}
