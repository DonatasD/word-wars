export class FrameLimiter {
  private now = performance.now();
  private readonly fps;

  constructor(fps: number = 60) {
    this.fps = fps;
    this.now = performance.now();
  }

  isReady(): boolean {
    const current = performance.now();
    const diff = performance.now() - this.now;
    if (diff > 1000 / this.fps) {
      this.now = current;
      return true;
    }
    return false;
  }
}
