import createPoster, {
  schemaToElement,
  processImg,
  DisplayElement,
} from "../dist/index.js";
class Yellow extends DisplayElement {
  constructor(x, y) {
    super({ x, y });
  }
  render(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this._x, this._y, 100, 100);
    super.render(ctx);
  }
}

function showPoster(url) {
  const imgEl = document.querySelector(".poster");
  imgEl.src = url;
}

async function main() {
  const qr = await createQR();
  const url = createPoster(
    {
      width: 500,
      height: 500,
      background: "red",
      debug: false,
    },
    [createMain(), qr, createCustom()]
  );
  showPoster(url);
}

async function createQR() {
  const img = await processImg(
    "http://n.sinaimg.cn/default/3a94eedb/20220921/qrcode.png"
  );
  return schemaToElement({
    type: "rect",
    width: 110,
    height: 110,
    backgroundColor: "#ffffff",
    x: 350,
    y: 350,
    children: [
      {
        type: "image",
        img,
        x: 5,
        y: 5,
        width: 100,
        height: 100,
        borderRadius: 5,
      },
    ],
  });
}

function createMain() {
  const red = schemaToElement({
    type: "rect",
    x: 10,
    y: 0,
    width: 20,
    height: 20,
    backgroundColor: "red",
  });
  const main = schemaToElement({
    type: "rect",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    backgroundColor: "pink",
    children: [
      {
        type: "text",
        content:
          "实弹射击的老师看了大手大脚老师家啊多久啊是教练大世界酒店睡觉啊多久啊说了多少教练空间",
        x: 200,
        y: 0,
        color: "green",
        fontSize: 20,
        maxWidth: 200,
        lineLimit: 3,
        fontWeight: 600,
        textAlign: "left",
        lineHeight: 30,
      },
      {
        type: "rect",
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        backgroundColor: "black",
        borderRadius: 10,
        zIndex: 1,
      },
      {
        type: "rect",
        x: 30,
        y: 30,
        width: 50,
        height: 50,
        backgroundColor: "skyblue",
        children: [
          {
            type: "rect",
            x: 20,
            width: 20,
            height: 20,
            backgroundColor: "green",
          },
        ],
      },
    ],
  });

  main.appendChild(red);
  return main;
}

function createCustom() {
  const y1 = new Yellow(100, 330);

  y1.appendChild(
    schemaToElement({
      type: "text",
      content: "自定义图形",
      y: 30,
    })
  );
  return y1;
}

main();
