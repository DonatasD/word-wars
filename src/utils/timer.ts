export class Timer {
  private startTs?: DOMHighResTimeStamp;

  start() {
    this.startTs = performance.now();
  }

  getTimePassed() {
    if (this.startTs) {
      return performance.now() - this.startTs;
    }
    return 0;
  }

  reset() {
    this.startTs = undefined;
  }
}
