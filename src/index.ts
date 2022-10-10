import {
  CanvasBox,
  CanvasImg,
  CanvasText,
  DrawItemType,
  IContentPosition,
  IRealImageOptions,
  SimplePosterParams,
} from "./type";

class SimplePoser {
  context: CanvasRenderingContext2D = null;
  canvas: HTMLCanvasElement = null;
  textAlign: CanvasTextAlign = "start";
  textBaseline: CanvasTextBaseline = "alphabetic";
  textDirection: CanvasDirection = "inherit";
  constructor(public options: SimplePosterParams) {
    this.initCanvas();
  }

  public async draw(drawItems: DrawItemType[]) {
    await this.loadResource(drawItems);
    // 按照 zIndex 排序
    drawItems.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    const strategy = {
      img: this.drawImage.bind(this),
      box: this.drawBox.bind(this),
      text: this.drawText.bind(this),
    };
    drawItems.forEach((item) => strategy[item.type](item));
    return this.toImageURL();
  }

  private loadResource(drawItems: DrawItemType[]) {
    // 加载所有图片
    return Promise.all(
      drawItems
        .filter((item) => item.type === "img")
        .map((i) => this.handleImageOption(i as CanvasImg))
    );
  }

  private initCanvas() {
    const { width, height, debug } = this.options;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.setProperty("position", "fixed");
    if (!debug) {
      canvas.style.setProperty("left", "9999px");
    }
    document.body.appendChild(canvas);
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
  }
  /**
   * 绘制圆角矩形
   */
  private drawRoundRect(x: number, y: number, w: number, h: number, r = 0) {
    const ctx = this.context;
    const min = Math.min(w, h);
    if (r > min / 2) {
      r = min / 2;
    }
    // 开始绘制
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  private drawImage(option: IRealImageOptions) {
    const ctx = this.context;
    const { x, y } = this.getPosition(option);
    const { width, height, _img, borderRadius } = option;
    const w = width || _img.width;
    const h = height || _img.height;
    if (borderRadius) {
      // ctx.fillStyle = ctx.createPattern(_img, "no-repeat");
      this.drawRoundRect(x, y, w, h, borderRadius);
      ctx.clip();
    }
    ctx.drawImage(_img, x, y, w, h);
  }

  private drawBox(option: CanvasBox) {
    const ctx = this.context;
    const { x, y } = this.getPosition(option);
    const {
      width,
      height,
      borderRadius,
      backgroundColor,
      borderColor = "rgba(0,0,0,0)",
      borderWidth,
    } = option;

    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    this.drawRoundRect(x, y, width, height, borderRadius);
    ctx.stroke();
    ctx.fill();
  }

  private drawText(option: CanvasText) {
    const ctx = this.context;
    const {
      content,
      color = "#000000",
      font,
      textAlign,
      textBaseline,
      direction,
    } = option;
    const { x, y } = this.getPosition(option);
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign || this.textAlign;
    ctx.textBaseline = textBaseline || this.textBaseline;
    ctx.direction = direction || this.textDirection;
    ctx.fillText(content, x, y);
  }

  private handleImageOption(opt: CanvasImg) {
    return new Promise<IRealImageOptions>((resolve, reject) => {
      this.loadImg(opt.img).then(
        (img) => resolve(Object.assign(opt, { _img: img })),
        reject
      );
    });
  }

  private loadImg(u: CanvasImg["img"]) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      if (u instanceof HTMLImageElement) {
        u.setAttribute("crossOrigin", "Anonymous");
        resolve(u);
      } else {
        const img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = u;
        img.onload = () => resolve(img);
        img.onerror = reject;
      }
    });
  }

  private getPosition({ top = 0, left = 0, right, bottom }: IContentPosition) {
    const { width, height } = this.options;
    if (typeof right === "number") {
      left = width - right;
    }
    if (typeof bottom === "number") {
      top = height - bottom;
    }
    return { x: left, y: top };
  }

  private toImageURL() {
    const { fileType = "jpg", quality = 0.95 } = this.options;
    return this.canvas.toDataURL("image/" + fileType, quality);
  }
}
export { SimplePoser };
export default SimplePoser;
