import { drawRoundRect } from "./utils";
function processImg(u: string | HTMLImageElement) {
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
export { processImg, drawRoundRect };
