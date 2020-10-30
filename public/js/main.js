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
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
}

function playAnimation() {
  const values = sceneInfo[currentScene].values;
  const objs = sceneInfo[currentScene].objs;
  const currentYOffset = yOffset - prevScrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight;
  switch (currentScene) {
    case 0:
      const messageA_opacity_in = calcValues(
        values.messageA_opacity_in,
        currentYOffset
      );
      const messageA_opacity_out = calcValues(
        values.messageA_opacity_out,
        currentYOffset
      );
      const messageA_translateY_in = calcValues(
        values.messageA_translateY_in,
        currentYOffset
      );
      const messageA_translateY_out = calcValues(
        values.messageA_translateY_out,
        currentYOffset
      );

      if (scrollRatio <= 0.22) {
        objs.messageA.style.opacity = messageA_opacity_in;
        objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
      } else {
        objs.messageA.style.opacity = messageA_opacity_out;
        objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
      }

      break;
    case 1:
      break;
    case 2:
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
window.addEventListener("load", setLayout);
