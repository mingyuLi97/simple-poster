import { PosterConfig } from "./type";

export function createCanvas(config: PosterConfig) {
  const { width, height, debug, background } = config;
  const radio = window.devicePixelRatio;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.width = width * radio;
  canvas.height = height * radio;
  canvas.style.setProperty("position", "fixed");
  canvas.style.setProperty("top", "0");
  if (!debug) {
    canvas.style.visibility = "hidden";
    canvas.style.setProperty("left", "9999px");
  }
  // 设置 canvas 背景
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width * radio, height * radio);
  }
  context.scale(radio, radio);
  document.body.appendChild(canvas);
  return { canvas, context };
}
