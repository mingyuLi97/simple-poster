import {
  PosterConfig,
  ElementType,
  CreateElementOptionMap,
  CreateElementReturnMap,
  DrawSchema,
} from "./type";

import { ImageElement, RectElement, TextElement } from "./core";
import { DisplayElement } from "./core/displayElement";
import { createCanvas } from "./canvas";

function createPoster(
  config: PosterConfig,
  data: DisplayElement | DisplayElement[]
) {
  const { canvas, context } = createCanvas(config);

  if (Array.isArray(data)) {
    data.forEach((d) => d.render(context));
  } else {
    data.render(context);
  }
  const { fileType = "jpg", quality = 0.95 } = config;
  const url = canvas.toDataURL("image/" + fileType, quality);
  if (!config.debug) {
    canvas.parentNode.removeChild(canvas);
  }
  return url;
}

function createElement<T extends ElementType>(
  type: T,
  option: CreateElementOptionMap[T]
): CreateElementReturnMap[T] {
  const constructor: Record<ElementType, any> = {
    image: ImageElement,
    text: TextElement,
    rect: RectElement,
  };
  return new constructor[type](option);
}

function schemaToElement(schema: DrawSchema) {
  const el = createElement(schema.type, schema);
  if (Array.isArray(schema.children)) {
    schema.children.forEach((child) => {
      el.appendChild(schemaToElement(child));
    });
  }
  return el;
}
export * from "./shared";
export {
  createPoster as default,
  createElement,
  schemaToElement,
  DisplayElement,
};
