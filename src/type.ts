/**
 * 位置信息
 * @param top 距离顶部偏移值
 * @param left 距离左边偏移值
 * @param bottom 距离底部偏移值，如果设置该值将会覆盖 top
 * @param right 距离右侧偏移值, 如果设置该值将会覆盖 left
 * @param zIndex 同 css，默认为 0
 */
export interface IContentPosition {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  zIndex?: number;
}

/** `canvas`矩阵尺寸类型 */
interface CanvasRect {
  /** 生成的图片宽度 */
  width: number;
  /** 生成的图片高度 */
  height: number;
  /**
   * 边框圆角
   * - 当`width === height`，`borderRadius = width / 2`或者`borderRadius = height / 2`就会变成一个圆形
   */
  borderRadius?: number;
  /** 边框厚度 */
  borderWidth?: number;
  /** 边框颜色 */
  borderColor?: string;
}

/**
 * 图片的配置信息
 * @param type 类型 img
 * @param img 图片的路径 或 图片 dom
 */
export interface CanvasImg
  extends IContentPosition,
    Omit<CanvasRect, "borderWidth" | "borderColor"> {
  type: "img";
  img: string | HTMLImageElement;
}

export interface IRealImageOptions extends CanvasImg {
  _img: HTMLImageElement;
}

export interface CanvasBox extends CanvasRect, IContentPosition {
  type: "box";
  /** 容器背景颜色 */
  backgroundColor: string;
}

export interface CanvasText extends IContentPosition {
  type: "text";
  /** 文字内容 */
  content: string;
  /** 字体大小 */
  font: string;
  /** 字体颜色 */
  color: string;
  // /** 指定字体的宽度，超过会被挤压 */
  // width?: number
  // /** 与`css`的`font-family`行为一致 */
  // fontFamily?: string
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  direction?: CanvasDirection;
}
export type DrawItemType = CanvasImg | CanvasBox | CanvasText;

export interface SimplePosterParams {
  width: number;
  height: number;
  fileType?: "jpg" | "png";
  /**
   * 输出图片质量
   */
  quality?: number;
  /**
   * 是否开启调试模式，开启后 canvas 画布会放置到页面中央
   */
  debug?: boolean;
}
