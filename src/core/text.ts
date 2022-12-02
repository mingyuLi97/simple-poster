import { DisplayElement } from "./displayElement";
import { DrawPosition } from "../type";

export interface DrawTextOption extends DrawPosition {
  content: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontFamily?: string;
  /** 字体颜色 */
  color?: string;
  maxWidth?: number;
  textAlign?: CanvasTextAlign;
  lineLimit?: number;
  lineHeight?: number;
}

export class TextElement extends DisplayElement {
  constructor(public option: DrawTextOption) {
    super(option);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const {
      content,
      color = "#000000",
      fontSize = 14,
      fontFamily,
      fontWeight,
      textAlign = "left",
      maxWidth = Infinity,
      lineHeight = fontSize,
      lineLimit = Infinity,
    } = this.option;
    const x = this._x;
    const y = this._y;

    ctx.fillStyle = color;
    // 设置字体时必须要给 fontFamily，这里用 || 判断是防止用户输入 ''
    ctx.font = [fontWeight, fontSize + "px", fontFamily || "sans-serif"].join(
      " "
    );
    ctx.textAlign = textAlign;
    ctx.textBaseline = "middle";
    ctx.direction = "ltr";

    // 行高和文字的间距 + 字体的一半（绘制点是字体的中心）
    const offset = (lineHeight - fontSize) / 2 + fontSize / 2;

    const wrapTextList = this.getWrapText(ctx, content, maxWidth);
    if (wrapTextList.length === 1) {
      ctx.fillText(wrapTextList[0], x, y + offset);
    } else {
      for (let i = 0; i < wrapTextList.length; i++) {
        const text = wrapTextList[i];
        // 如果超出了就加 ...
        if (i + 1 >= lineLimit) {
          const _text = this.cutText(
            ctx,
            text + (wrapTextList[i + 1] || ""),
            maxWidth
          ).content;
          ctx.fillText(_text, x, y + lineHeight * i + offset);
          break;
        } else {
          ctx.fillText(text, x, y + lineHeight * i + offset);
        }
      }
    }
    ctx.restore();
    super.render(ctx);
  }

  /**
   * 文字超长截断
   */
  cutText(ctx: CanvasRenderingContext2D, content: string, maxLen: number) {
    const metrics = ctx.measureText(content);
    let width = metrics.width;
    // 不需要裁切
    if (width <= maxLen) {
      return { content, width };
    }
    const ellipsisWidth = ctx.measureText("...").width;
    let line = "";
    let lastWidth = ellipsisWidth;
    for (const char of content.split("")) {
      const charWidth = ctx.measureText(char).width;
      if (lastWidth + charWidth <= maxLen) {
        line += char;
        lastWidth += charWidth;
      } else {
        break;
      }
    }
    return { content: line + "...", width: lastWidth };
  }

  getWrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
    const txtList: string[] = [];
    let str = "";
    for (let i = 0, len = text.length; i < len; i++) {
      str += text.charAt(i);
      if (ctx.measureText(str).width > maxWidth) {
        txtList.push(str.substring(0, str.length - 1));
        str = "";
        i--;
      }
    }
    txtList.push(str);
    return txtList;
  }
}
