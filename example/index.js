import SimplePoster from "../dist/index.js";

const poster = new SimplePoster({
  width: 750,
  height: 640 * 2,
});
poster.textBaseline = "middle";

poster
  .draw([
    {
      type: "img",
      img: "http://n.sinaimg.cn/default/3a94eedb/20220923/bamboo_bg.jpg",
      width: 750,
      height: 640 * 2,
    },
    {
      type: "img",
      img: "http://n.sinaimg.cn/default/3a94eedb/20220921/poster_bg.png",
      width: 596,
      height: 1182,
      top: 20,
      left: 73,
    },
    {
      type: "box",
      top: 956,
      left: 496,
      width: 114,
      height: 114,
      backgroundColor: "#FFFFFF",
      borderColor: "#505050",
      borderWidth: 1,
      borderRadius: 8,
    },
    {
      type: "img",
      width: 100,
      height: 100,
      top: 956 + 7,
      left: 496 + 7,
      img: "http://n.sinaimg.cn/default/3a94eedb/20220921/qrcode.png",
    },
    {
      type: "text",
      left: 140,
      top: 973,
      content: "参与时间：",
      font: "20px PingFangSC-Regular",
      color: "#444444",
    },
    {
      type: "text",
      left: 140,
      top: 1001,
      content: "2022年9月16日",
      font: "26px PingFangSC-Regular",
      color: "#444444",
    },
    {
      type: "text",
      left: 140,
      top: 1050,
      content: "种植地点：",
      font: "20px PingFangSC-Regular",
      color: "#444444",
    },
    {
      type: "text",
      left: 140,
      top: 1078,
      content: "秦岭大熊猫栖息地",
      font: "26px PingFangSC-Regular",
      color: "#444444",
    },
  ])
  .then(showPoster);

function showPoster(url) {
  const imgEl = document.querySelector(".poster");
  imgEl.src = url;
}
