import { drawRoundRect } from "../utils";
import { DisplayElement } from "./displayElement";
import { DrawPosition } from "../type";

export interface DrawRectOption extends DrawPosition {
  width: number;
  height: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

export class RectElement extends DisplayElement {
  constructor(public option: DrawRectOption) {
    super(option);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const {
      width,
      height,
      borderRadius = 0,
      backgroundColor = "#FFFFFF",
      borderColor = "#FFFFFF",
      borderWidth = 0,
    } = this.option;
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    drawRoundRect(ctx, this._x, this._y, width, height, borderRadius);
    if (borderWidth > 0) {
      ctx.stroke();
    }
    ctx.fill();
    ctx.restore();
    super.render(ctx);
  }
}
