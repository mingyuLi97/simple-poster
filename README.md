# simple-poster

简易生成海报的工具，通过配置绘制 canvas 生成海报

## 使用

```javascript
import createPoster, {
  schemaToElement,
  processImg,
  DisplayElement,
} from "@limy-org/simple-poster";

// 第一步：加载异步资源
const img = await processImg(
  "http://n.sinaimg.cn/default/3a94eedb/20220921/qrcode.png"
);

// 第二步：生成对应 Element 数据
const QR = schemaToElement({
  type: "image",
  img,
  width: 100,
  height: 100,
});

// 第三步：生成 URL
const url = createPoster(
  {
    width: 200,
    height: 200,
  },
  QR
);
```

## 方法介绍

### createPoster(config, data)

将 canvas 配置和渲染数据结合生成海报。

1. config：海报的配置文件

```typescript
interface PosterConfig {
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
```

2. data：用于渲染的数据，通过 `schemaToElement` 生成

### schemaToElement(obj)

将配置信息生成 `DisplayElement` 对象，用于 canvas 渲染，目前支持 Text、Rect、Image

## 自定义渲染

所有的渲染都基于 `DisplayElement`，我们可以继承它并重写其 `render` 方法，完成自定义渲染

```javascript
class Yellow extends DisplayElement {
  constructor(x, y) {
    super({ x, y });
  }
  render(ctx) {
    ctx.fillStyle = "yellow";
    // _x, _y 是经过计算后到真实位置 (x + parent.x)
    ctx.fillRect(this._x, this._y, 100, 100);
    // ⚠️ 记得调用父类方法
    super.render(ctx);
  }
}
```

## 组合数据的多种方式

1. `schemaToElement` 方法接受的数据类型支持嵌套。

```javascript
schemaToElement({
  type: "rect",
  width: 110,
  height: 110,
  children: [
    {
      type: "rect",
      width: 10,
      height: 10,
    },
  ],
});
```

2. `DisplayElement` 支持 `appendChild`

> 自定义渲染的类继承的 `DisplayElement`，因此同样支持 `appendChild`

```javascript
const rect1 = schemaToElement({
  type: "rect",
  width: 110,
  height: 110,
});
const rect2 = schemaToElement({
  type: "rect",
  width: 10,
  height: 10,
});
rect1.appendChild(rect2);
```
