import _ from "lodash";
import { sceneInfo } from "./data";
let yOffset = 0;
let prevScrollHeight = 0;
let currentScene = 0;
let enterNewScene = false;

function setCurrent() {
  document
    .querySelector("body")
    .setAttribute("id", `show-scene-${currentScene}`);
}

function setCanvasImages() {
  let imgElem;
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `public/video/001/IMG_${6726 + i}.JPG`;
    sceneInfo[0].objs.videoImages.push(imgElem);
  }
}
setCanvasImages();

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
}

function playAnimation() {
  const values = sceneInfo[currentScene].values;
  const objs = sceneInfo[currentScene].objs;
  const currentYOffset = yOffset - prevScrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = currentYOffset / scrollHeight;

  switch (currentScene) {
    case 0:
      let sequence = Math.round(
        calcValues(values.imageSequence, currentYOffset)
      );
      objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      objs.canvas.style.opacity = calcValues(
        values.canvas_opacity,
        currentYOffset
      );
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
    case 2:
      // console.log('2 play');
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

      break;
    case 3:
      break;
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

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", setLayout);
window.addEventListener("load", () => {
  setLayout();
  sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
});
