gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

window.addEventListener("resize", () => {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
});

function wPercent(percent) {
  return winWidth * (percent / 100);
}
function hPercent(percent) {
  return winHeight * (percent / 100);
}

function calculatePath() {
  return {
    // relative: true,
    autoRotate: true,
    curviness: 0.5,
    path: [
      { x: wPercent(20), y: hPercent(-4) },
      { x: wPercent(35), y: hPercent(5) },
      { x: wPercent(50), y: hPercent(2) },
      { x: wPercent(53), y: hPercent(-6) },
      { x: wPercent(47), y: hPercent(-18) },
      { x: wPercent(39), y: hPercent(-10) },
      { x: wPercent(39), y: hPercent(0) },
      { x: wPercent(47), y: hPercent(2) },
      { x: wPercent(80), y: hPercent(-10) },
      { x: wPercent(100), y: hPercent(2) },
    ],
  };
}

function firstSectionRefresh() {
  let restore = tlFirstSection.time();
  let paused = tlFirstSection.paused();

  tlFirstSection
    .invalidate() // clear timeline values
    .restart() // set time to start so that initial values can be recorded
    .pause(paused) // restore the previous paused state
    .time(restore); // set time to same position as before

  gsap.set(".plane", { clearProps: true });
}

const tlFirstSection = gsap.timeline({
  defaults: {
    duration: 2,
  },
  scrollTrigger: {
    trigger: ".section--1",
    start: "top top",
    end: "+=800%",
    pin: true,
    // pinSpacing: false,
    anticipatePin: 1,
    scrub: 1,
    // markers: true,
    onRefresh: firstSectionRefresh,
  },
});

window.scrollTo({ top: 1 }); // plane rotate itself to match path direction
gsap.to(".loader", 1, { autoAlpha: 0 });
gsap.from(".plane", 2, { autoAlpha: 0 });

function randomNumber(min, max, isFloor = true) {
  let rand = Math.random() * (max - min + 1) + min;
  return isFloor ? Math.floor(rand) : rand;
}

gsap.utils.toArray(".cloud-moving").forEach((cloud) => {
  let side = randomNumber(0, 1);
  let xPos = side === 0 ? randomNumber(0, 40) : randomNumber(65, 90);
  let speed = randomNumber(10, 28);
  let delay = randomNumber(0, 10);
  let scale = randomNumber(0.8, 1.6, false);
  let opacity = randomNumber(0.3, 0.8, false);
  let rotate = side === 0 ? "0" : "180deg";

  gsap.fromTo(
    cloud,
    speed,
    {
      scale: scale,
      rotateY: rotate,
      autoAlpha: 0,
      left: `${xPos}%`,
      top: hPercent(100),
    },
    {
      scale: scale,
      rotateY: rotate,
      autoAlpha: opacity,
      left: `${xPos}%`,
      top: hPercent(-20),
      repeat: -1,
      delay: delay,
      ease: "linear",
    }
  );
});

tlFirstSection
  .fromTo(
    ".plane",
    8,
    {
      motionPath: { path: [{ x: 0, y: 0 }] },
    },
    {
      motionPath: calculatePath,
      onComplete: () => {
        // document.querySelector(".plane").style.display = "none";
      },
    },

    "first"
  )
  .fromTo(
    ".one-text-container h1",
    3,
    {
      autoAlpha: 0,
      y: 100,
    },
    {
      autoAlpha: 1,
      y: 0,
    },
    "first+=0.2"
  )
  .fromTo(
    ".one-text-container p",
    3,
    {
      autoAlpha: 0,
      y: 50,
    },
    {
      autoAlpha: 1,
      y: 0,
    },
    "first+=2"
  )
  .fromTo(
    ".cloud--1",
    2,
    {
      scale: 0.9,
      autoAlpha: 0,
      y: 80,
      x: -20,
    },
    {
      scale: 1,
      autoAlpha: 1,
      y: 0,
      x: 0,
    },
    "first+=2.5"
  )
  .fromTo(
    ".cloud--2",
    {
      autoAlpha: 0,
      y: 100,
    },
    {
      autoAlpha: 1,
      y: 20,
    },
    "first+=2"
  )
  .fromTo(
    ".cloud--3",
    {
      autoAlpha: 0,
      scale: 0.8,
      y: 40,
      x: 10,
    },
    {
      scale: 1,
      autoAlpha: 1,
      y: 5,
      x: 0,
    },
    "first+=3"
  )
  .fromTo(
    ".cloud--4",
    {
      autoAlpha: 0,
      y: 50,
    },
    {
      autoAlpha: 1,
      y: 20,
    },
    "first+=4.5"
  );

// ------------------ SECTION 2 --------------------

gsap.utils.toArray(".parallax").forEach((element) => {
  const tlParallax = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 20%",
      // pin: true,
      // pinSpacing: false,
      // markers: true,
      scrub: 2,
    },
  });

  tlParallax.to(element, { y: element.dataset.plxMove });
});

const tlSecondSectionStep_1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".step--1",
    start: "top 50%",
    end: "bottom bottom",
    scrub: 2,
    // markers: true,
  },
});

tlSecondSectionStep_1
  .fromTo(
    ".step--1 .step__number",
    2,
    { y: -100, autoAlpha: 0 },
    { y: 0, autoAlpha: 1 },
    "first"
  )
  .fromTo(
    ".step--1 .step__text",
    2,
    { x: -100, autoAlpha: 0 },
    { x: 0, autoAlpha: 1 },
    "first+=0.7"
  );

const tlSecondSectionStep_2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".step--2",
    start: "top 50%",
    end: "bottom bottom",
    scrub: 2,
    // markers: true,
  },
});

tlSecondSectionStep_2
  .fromTo(
    ".step--2 .step__number",
    2,
    { y: -100, autoAlpha: 0 },
    { y: 0, autoAlpha: 1 },
    "first"
  )
  .fromTo(
    ".step--2 .step__text",
    2,
    { x: 100, autoAlpha: 0 },
    { x: 0, autoAlpha: 1 },
    "first+=0.7"
  );

const tlSecondSectionStep_3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".step--3",
    start: "top 50%",
    end: "bottom bottom",
    scrub: 2,
    // markers: true,
  },
});

tlSecondSectionStep_3
  .fromTo(
    ".step--3 .step__number",
    2,
    { y: -100, autoAlpha: 0 },
    { y: 0, autoAlpha: 1 },
    "first"
  )
  .fromTo(
    ".step--3 .step__text",
    2,
    { x: -100, autoAlpha: 0 },
    { x: 0, autoAlpha: 1 },
    "first+=0.7"
  );

const tlSecondSectionStep_final = gsap.timeline({
  scrollTrigger: {
    trigger: ".step--final",
    start: "50% 51%",
    end: "bottom bottom",
    scrub: 3,
    // markers: true,
  },
});

tlSecondSectionStep_final
  .fromTo(
    ".final-bg",
    15,
    { y: "-50%", x: "-100%", autoAlpha: 0 },
    { y: "10%", x: 0, autoAlpha: 1 },
    "first"
  )
  .fromTo(
    ".step--final .step__text--final",
    15,
    { y: 100, autoAlpha: 0 },
    { y: 0, autoAlpha: 1 },
    "first+=2"
  )
  .fromTo(".step--final .cta", 8, { autoAlpha: 0 }, { autoAlpha: 1 }, "-=1");

// LINE DRAWING

const lineContainer = document.querySelector(".line-container");
const path = lineContainer.querySelector("path");
let pathLength = path.getTotalLength();

path.style.strokeDasharray = `${pathLength} ${pathLength}`;
path.style.strokeDashoffset = pathLength;

let previousDashOffset = pathLength;

window.addEventListener("scroll", () => {
  // IF WE WANT SHOW SVG BASED ON TOTAL PAGE HEIGHT:

  //   let scrollPercentage =
  //     (document.documentElement.scrollTop + document.body.scrollTop) /
  //     (document.documentElement.scrollHeight -
  //       document.documentElement.clientHeight);

  //   IF WE WANT SHOW SVG BASED ON SECITON
  let rect = lineContainer.getBoundingClientRect();
  let scrollPercentage = (rect.bottom - window.innerHeight) / rect.height;
  scrollPercentage = 1 + scrollPercentage;

  let drawLength = pathLength * scrollPercentage;
  path.style.strokeDashoffset = pathLength + drawLength;
});
