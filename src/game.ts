import { WordDrawer } from "./wordDrawer.ts";

export class Game {
  ctx: CanvasRenderingContext2D;
  wordDrawer: WordDrawer;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.wordDrawer = new WordDrawer(ctx);
  }

  public run() {
    this.wordDrawer.addWord({
      text: "Hello",
      position: { x: 0, y: 0 },
      style: { fontSize: 24, fontSizeUnits: "px", fontFamily: "Serif" },
    });

    this.wordDrawer.moveWords();
    this.wordDrawer.drawWords();
  }
}
