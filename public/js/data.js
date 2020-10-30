export const sceneInfo = [
  {
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-0"),
      messageA: document.querySelector("#scroll-section-0 .main-message.a"),
      messageB: document.querySelector("#scroll-section-0 .main-message.b"),
      messageC: document.querySelector("#scroll-section-0 .main-message.c"),
      messageD: document.querySelector("#scroll-section-0 .main-message.d"),
    },
    values: {
      messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
      messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
      messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
      messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],

      //   messageB_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
      //   messageC_opacity_out: [1, 0, { start: 0.5, end: 0.6 }],
      //   messageD_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
    },
  },
  {
    type: "normal",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-1"),
    },
  },
  {
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-2"),
    },
  },
  {
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-3"),
    },
  },
];
