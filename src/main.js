import _ from "lodash";
import { sceneInfo } from "./data";
let yOffset = 0;
let prevScrollHeight = 0;
let currentScene = 0;
let enterNewScene = false;

let acc = 0.1;
let delayedYOffset = 0;
let rafId;
let rafState;

function calcValues(values, currentYOffset) {
  let rv;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = currentYOffset / scrollHeight;
  if (values.length === 3) {
    const partScrollStart = values[2].start * scrollHeight;
    const partScrollEnd = values[2].end * scrollHeight;
    const partScrollHeight = partScrollEnd - partScrollStart;
    if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
      rv =
        ((currentYOffset - partScrollStart) / partScrollHeight) *
          (values[1] - values[0]) +
        values[0];
    } else if (currentYOffset < partScrollStart) {
      rv = values[0];
    } else if (currentYOffset > partScrollEnd) {
      rv = values[1];
    }
  } else {
    rv = scrollRatio * (values[1] - values[0]) + values[0];
  }
  return rv;
}

function setLayout() {
  for (let i = 0; i < sceneInfo.length; i++) {
    if (sceneInfo[i].type === "sticky") {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    } else if (sceneInfo[i].type === "normal") {
      sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
    }
    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
  }

  let yOffset = window.pageYOffset;
  let totalScrollHeight = 0;
  for (let i = 0; i < sceneInfo.length; i++) {
    totalScrollHeight += sceneInfo[i].scrollHeight;
    if (totalScrollHeight >= yOffset) {
      currentScene = i;
      break;
    }
  }
  setCurrent();

  const heightRatio = window.innerHeight / 1080;
  sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
  sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%,0) scale(${heightRatio})`;
}
function checkMenu() {
  if (yOffset > 44) {
    document.body.classList.add("local-nav-sticky");
  } else {
    document.body.classList.remove("local-nav-sticky");
  }
}

function playAnimation() {
  const values = sceneInfo[currentScene].values;
  const objs = sceneInfo[currentScene].objs;
  const currentYOffset = yOffset - prevScrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = currentYOffset / scrollHeight;

  switch (currentScene) {
    case 0: {
      // let sequence = Math.round(
      //   calcValues(values.imageSequence, currentYOffset)
      // );
      // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      objs.canvas.style.opacity = calcValues(
        values.canvas_opacity,
        currentYOffset
      );
      objs.context.fillStyle = "white";
      if (scrollRatio <= 0.22) {
        // in
        objs.messageA.style.opacity = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        objs.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageA.style.opacity = calcValues(
          values.messageA_opacity_out,
          currentYOffset
        );
        objs.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_out,
          currentYOffset
        )}%, 0)`;
      }

      if (scrollRatio <= 0.42) {
        // in
        objs.messageB.style.opacity = calcValues(
          values.messageB_opacity_in,
          currentYOffset
        );
        objs.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageB.style.opacity = calcValues(
          values.messageB_opacity_out,
          currentYOffset
        );
        objs.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_out,
          currentYOffset
        )}%, 0)`;
      }

      if (scrollRatio <= 0.62) {
        // in
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );
        objs.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );
        objs.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_out,
          currentYOffset
        )}%, 0)`;
      }

      if (scrollRatio <= 0.82) {
        // in
        objs.messageD.style.opacity = calcValues(
          values.messageD_opacity_in,
          currentYOffset
        );
        objs.messageD.style.transform = `translate3d(0, ${calcValues(
          values.messageD_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageD.style.opacity = calcValues(
          values.messageD_opacity_out,
          currentYOffset
        );
        objs.messageD.style.transform = `translate3d(0, ${calcValues(
          values.messageD_translateY_out,
          currentYOffset
        )}%, 0)`;
      }
      break;
    }
    case 2: {
      // let sequence2 = Math.round(
      //   calcValues(values.imageSequence, currentYOffset)
      // );
      // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
      if (scrollRatio <= 0.5) {
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity_in,
          currentYOffset
        );
      } else {
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity_out,
          currentYOffset
        );
      }

      if (scrollRatio <= 0.32) {
        // in
        objs.messageA.style.opacity = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        objs.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageA.style.opacity = calcValues(
          values.messageA_opacity_out,
          currentYOffset
        );
        objs.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_out,
          currentYOffset
        )}%, 0)`;
      }

      if (scrollRatio <= 0.67) {
        // in
        objs.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_in,
          currentYOffset
        )}%, 0)`;
        objs.messageB.style.opacity = calcValues(
          values.messageB_opacity_in,
          currentYOffset
        );
        objs.pinB.style.transform = `scaleY(${calcValues(
          values.pinB_scaleY,
          currentYOffset
        )})`;
      } else {
        // out
        objs.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_out,
          currentYOffset
        )}%, 0)`;
        objs.messageB.style.opacity = calcValues(
          values.messageB_opacity_out,
          currentYOffset
        );
        objs.pinB.style.transform = `scaleY(${calcValues(
          values.pinB_scaleY,
          currentYOffset
        )})`;
      }

      if (scrollRatio <= 0.93) {
        // in
        objs.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_in,
          currentYOffset
        )}%, 0)`;
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );
        objs.pinC.style.transform = `scaleY(${calcValues(
          values.pinC_scaleY,
          currentYOffset
        )})`;
      } else {
        // out
        objs.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_out,
          currentYOffset
        )}%, 0)`;
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );
        objs.pinC.style.transform = `scaleY(${calcValues(
          values.pinC_scaleY,
          currentYOffset
        )})`;
      }
      //---------------------------33333333
      if (scrollRatio > 0.9) {
        const objs = sceneInfo[3].objs;
        const values = sceneInfo[3].values;
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRation = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;
        if (widthRatio <= heightRation) {
          canvasScaleRatio = heightRation;
        } else {
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = "white";
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth =
          document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 흰색 박스 그리기
        objs.context.fillRect(
          parseInt(values.rect1X[1]),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(values.rect2X[1]),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
      }

      break;
    }

    case 3: {
      let step = 0;
      const widthRatio = window.innerWidth / objs.canvas.width;
      const heightRation = window.innerHeight / objs.canvas.height;
      let canvasScaleRatio;
      if (widthRatio <= heightRation) {
        canvasScaleRatio = heightRation;
      } else {
        canvasScaleRatio = widthRatio;
      }

      objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
      objs.context.fillStyle = "white";
      objs.context.drawImage(objs.images[0], 0, 0);

      // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
      const recalculatedInnerWidth =
        document.body.offsetWidth / canvasScaleRatio;
      const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

      if (!values.rectStartY) {
        // values.rectStartY = objs.canvas.getBoundingClientRect().top;
        values.rectStartY =
          objs.canvas.offsetTop +
          (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
        values.rect1X[2].start = window.innerWidth / 2 / scrollHeight;
        values.rect2X[2].start = window.innerWidth / 2 / scrollHeight;
        values.rect1X[2].end = values.rectStartY / scrollHeight;
        values.rect2X[2].end = values.rectStartY / scrollHeight;
      }

      const whiteRectWidth = recalculatedInnerWidth * 0.15;
      values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
      values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
      values.rect2X[0] =
        values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
      values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

      // 좌우 흰색 박스 그리기
      objs.context.fillRect(
        parseInt(calcValues(values.rect1X, currentYOffset)),
        0,
        parseInt(whiteRectWidth),
        objs.canvas.height
      );
      objs.context.fillRect(
        parseInt(calcValues(values.rect2X, currentYOffset)),
        0,
        parseInt(whiteRectWidth),
        objs.canvas.height
      );

      if (scrollRatio < values.rect1X[2].end) {
        step = 1;
        console.log("before");
        objs.canvas.classList.remove("sticky");
      } else {
        step = 2;
        values.blendHeight[0] = 0;
        values.blendHeight[1] = objs.canvas.height;
        values.blendHeight[2].start = values.rect1X[2].end;
        values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
        const blendHeight = calcValues(values.blendHeight, currentYOffset);

        objs.context.drawImage(
          objs.images[1],
          0,
          objs.canvas.height - blendHeight,
          objs.canvas.width,
          blendHeight,
          0,
          objs.canvas.height - blendHeight,
          objs.canvas.width,
          blendHeight
        );

        objs.canvas.classList.add("sticky");
        objs.canvas.style.top = `${
          -(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2
        }px`;
      }

      if (scrollRatio > values.blendHeight[2].end) {
        values.canvas_scale[0] = canvasScaleRatio;
        values.canvas_scale[1] =
          document.body.offsetWidth / (1.5 * objs.canvas.width);

        values.canvas_scale[2].start = values.blendHeight[2].end;
        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
        objs.canvas.style.transform = `scale(${calcValues(
          values.canvas_scale,
          currentYOffset
        )})`;
        objs.canvas.style.marginTop = 0;
      }

      if (
        scrollRatio > values.canvas_scale[2].end &&
        values.canvas_scale[2].end > 0
      ) {
        objs.canvas.classList.remove("sticky");
        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

        values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
        values.canvasCaption_opacity[2].end =
          values.canvasCaption_opacity[2].start + 0.1;

        objs.canvasCaption.style.opacity = calcValues(
          values.canvasCaption_opacity,
          currentYOffset
        );

        values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;
        values.canvasCaption_translateY[2].end =
          values.canvasCaption_opacity[2].start + 0.1;
        objs.canvasCaption.style.transform = `translate3d(0,${calcValues(
          values.canvasCaption_translateY,
          currentYOffset
        )}%,0)`;
      }

      break;
    }
  }
}

function scrollLoop() {
  enterNewScene = false;
  prevScrollHeight = 0;

  for (let i = 0; i < currentScene; i++) {
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }
  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    enterNewScene = true;
    currentScene++;
    setCurrent();
  }
  if (yOffset < prevScrollHeight) {
    if (currentScene === 0) return;
    enterNewScene = true;
    currentScene--;
    setCurrent();
  }
  if (enterNewScene) return;
  playAnimation();
}

const handleScroll = () => {
  yOffset = window.pageYOffset;
  requestAnimationFrame(() => {
    scrollLoop();
  });
};

function setCurrent() {
  document
    .querySelector("body")
    .setAttribute("id", `show-scene-${currentScene}`);
}

function setCanvasImages() {
  let imgElem;
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `public/video/love/${1000 + i}.jpg`;
    sceneInfo[0].objs.videoImages.push(imgElem);
  }
  let imgElem2;
  for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
    imgElem2 = new Image();
    imgElem2.src = `public/video/002/IMG_${7027 + i}.JPG`;
    sceneInfo[2].objs.videoImages.push(imgElem2);
  }
  let imgElem3;
  for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
    imgElem3 = new Image();
    imgElem3.src = sceneInfo[3].objs.imagesPath[i];
    sceneInfo[3].objs.images.push(imgElem3);
  }
}
function loop() {
  if (!enterNewScene) {
    if (currentScene === 0 || currentScene === 2) {
      delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;
      const currentYOffset = delayedYOffset - prevScrollHeight;
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      let sequence = Math.round(
        calcValues(values.imageSequence, currentYOffset)
      );
      if (objs.videoImages[sequence]) {
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      }
    }
  }

  rafId = requestAnimationFrame(loop);

  if (Math.abs(yOffset - delayedYOffset < 1)) {
    cancelAnimationFrame(rafId);
    rafState = false;
  }
}

window.addEventListener("scroll", () => {
  checkMenu();
  handleScroll();
  if (!rafState) {
    rafId = requestAnimationFrame(loop);
    rafState = true;
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    setLayout();
  }
  sceneInfo[3].values.rectStartY = 0;
});
window.addEventListener("orientationchange", setLayout);
window.addEventListener("load", () => {
  document.body.classList.remove("before-load");

  setLayout();
  sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  sceneInfo[2].objs.context.drawImage(sceneInfo[2].objs.videoImages[0], 0, 0);
});
document.querySelector(".loading").addEventListener("transitionend", (e) => {
  document.body.removeChild(e.currentTarget);
});
setCanvasImages();
