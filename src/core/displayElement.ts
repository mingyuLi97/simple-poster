import { DrawPosition } from "../type";

export class DisplayElement {
  x = 0;
  y = 0;
  zIndex = 0;
  parent: DisplayElement = null;
  children: DisplayElement[] = [];
  constructor(option: DrawPosition) {
    this.x = option.x ?? 0;
    this.y = option.y ?? 0;
    this.zIndex = option.zIndex ?? 0;
  }

  get _x() {
    return this.parent ? this.parent._x + this.x : this.x;
  }

  get _y() {
    return this.parent ? this.parent._y + this.y : this.y;
  }

  appendChild(...children: DisplayElement[]) {
    children.forEach((child) => {
      child.parent = this;
      this.children.push(child);
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.children
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach((v) => v.render(ctx));
  }
}
