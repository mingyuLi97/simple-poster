import {
  DrawImageOption,
  DrawRectOption,
  DrawTextOption,
  ImageElement,
  RectElement,
  TextElement,
} from "./core";

export interface DrawPosition {
  /**
   * 绘制元素的横坐标，默认相对于 canvas 画布左上角，如果有父元素则相对于父元素。
   * @default 0
   */
  x?: number;
  /**
   * 绘制元素的纵坐标，默认相对于 canvas 画布左上角，如果有父元素则相对于父元素。
   * @default 0
   */
  y?: number;
  /**
   * 绘制元素的层级，仅作用于兄弟元素。
   * @default 0
   */
  zIndex?: number;
}

export interface PosterConfig {
  width: number;
  height: number;
  background?: string | CanvasGradient | CanvasPattern;
  fileType?: "jpg" | "png";
  /**
   * 输出图片质量，范围（0 - 1）
   * @default 0.95
   */
  quality?: number;
  /**
   * 是否开启调试模式，开启后 canvas 画布会放置到页面中央
   */
  debug?: boolean;
}

export type CreateElementOptionMap = {
  text: DrawTextOption;
  image: DrawImageOption;
  rect: DrawRectOption;
};

export type CreateElementReturnMap = {
  text: TextElement;
  image: ImageElement;
  rect: RectElement;
};

export type ElementType = keyof CreateElementOptionMap;

interface TextSchema extends DrawTextOption {
  type: "text";
}
interface ImageSchema extends DrawImageOption {
  type: "image";
}
interface RectSchema extends DrawRectOption {
  type: "rect";
}

type Schema = TextSchema | ImageSchema | RectSchema;

export type DrawSchema = Schema & { children?: DrawSchema[] };
