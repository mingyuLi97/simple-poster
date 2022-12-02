import { drawRoundRect } from "../utils";
import { DisplayElement } from "./displayElement";
import { DrawPosition } from "../type";

export interface DrawImageOption extends DrawPosition {
  img: HTMLImageElement | ImageBitmap;

  /**
   * 绘制图片的宽度，不传默认使用图片宽度
   */
  width?: number;
  /**
   * 绘制图片的高度，不传默认使用图片高度
   */
  height?: number;
  borderRadius?: number;
}

export class ImageElement extends DisplayElement {
  constructor(public option: DrawImageOption) {
    super(option);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    const {
      img,
      width = img.width,
      height = img.height,
      borderRadius,
    } = this.option;
    if (borderRadius) {
      drawRoundRect(ctx, this._x, this._y, width, height, borderRadius);
      ctx.clip();
    }
    ctx.drawImage(img, this._x, this._y, width, height);
    ctx.restore()
    super.render(ctx);
  }
}
