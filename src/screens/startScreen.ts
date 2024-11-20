import { GameContext } from "../game/context.ts";
import {
  FONT_FAMILY_DEFAULT,
  FONT_SIZE_DEFAULT,
  FONT_UNIT_SIZE_DEFAULT,
  PADDING_DEFAULT,
  TEXT_DEFAULT,
} from "./constant.ts";

export class StartScreen {
  private readonly gameContext: GameContext;

  constructor(gameContext: GameContext) {
    this.gameContext = gameContext;
  }

  draw() {
    const ctx = this.gameContext.gameContext;
    ctx.font = `${FONT_SIZE_DEFAULT}${FONT_UNIT_SIZE_DEFAULT} ${FONT_FAMILY_DEFAULT}`;
    const measuredText = ctx.measureText(TEXT_DEFAULT);
    const measuredTextWidth = measuredText.width;
    const measuredTextHeight =
      measuredText.actualBoundingBoxAscent +
      measuredText.actualBoundingBoxDescent;

    const rectWidth = measuredTextWidth + PADDING_DEFAULT * 2;
    const rectHeight = measuredTextHeight + PADDING_DEFAULT * 2;
    const rect = {
      x: ctx.canvas.width / 2 - rectWidth / 2,
      y: ctx.canvas.height / 2 - rectHeight / 2,
      width: rectWidth,
      height: rectHeight,
    };
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fillText(
      "Press Enter",
      rect.x + PADDING_DEFAULT,
      rect.y + rect.height - PADDING_DEFAULT,
    );
  }
}
