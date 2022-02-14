// ------------ UTILS START --------------
function randomNumber(min, max, isFloor = true) {
  let rand = Math.random() * (max - min + 1) + min;
  return isFloor ? Math.floor(rand) : rand;
}
function isOdd(number) {
  return number % 2;
}
function wPercent(percent) {
  return winWidth * (percent / 100);
}
function hPercent(percent) {
  return winHeight * (percent / 100);
}

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

window.addEventListener("resize", () => {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
});
// ------------ UTILS END --------------
// ------------ GENERAL STRART --------------

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Force show address bar on mobile
ScrollTrigger.defaults({ scroller: ".page-container" });

// Simple parallax effect
gsap.utils.toArray(".parallax").forEach((element) => {
  const tlParallax = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 20%",
      scrub: 2,
    },
  });

  tlParallax.to(element, { y: element.dataset.plxMove });
});

// Generate random values for moving clouds
gsap.utils.toArray(".cloud-moving").forEach((cloud) => {
  let side = randomNumber(0, 1);
  let xPos = side === 0 ? randomNumber(0, 40) : randomNumber(65, 90);
  let rotate = side === 0 ? "0" : "180deg";
  let speed = randomNumber(10, 28);
  let delay = randomNumber(0, 10);
  let scale = randomNumber(8, 25) / 10;
  let opacity = randomNumber(3, 8) / 10;

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

// ------------ GENERAL END --------------
// ------------------ SECTION 1 --------------------

// Make plane looks good on load
window.scrollTo({ top: 1 });
gsap.to(".loader", 1, { autoAlpha: 0 });
gsap.from(".plane", 1, { autoAlpha: 0 });
if (window.scrollY > 20) gsap.to(".plane", { x: -100 });

// Plane path
function calculatePath() {
  return {
    autoRotate: true,
    curviness: 0.5,
    path: [
      { x: wPercent(20), y: wPercent(-4) },
      { x: wPercent(50), y: wPercent(2) },
      { x: wPercent(56), y: wPercent(-6) },
      { x: wPercent(47), y: wPercent(-13) },
      { x: wPercent(39), y: wPercent(-10) },
      { x: wPercent(39), y: 0 },
      { x: wPercent(47), y: wPercent(2) },
      { x: wPercent(80), y: wPercent(-10) },
      { x: wPercent(100), y: wPercent(-5) },
    ],
  };
}

// Recalculate plane path on window resize
function firstSectionRefresh() {
  let restore = tlFirstSection.time();
  let paused = tlFirstSection.paused();

  tlFirstSection
    .invalidate() // clear timeline values
    .restart()
    .pause(paused)
    .time(restore);
}

const tlFirstSection = gsap.timeline({
  defaults: {
    duration: 2,
  },
  scrollTrigger: {
    trigger: ".section--1",
    start: "top top",
    end: "+=300%",
    pin: true,
    pinType: "fixed",
    anticipatePin: 1,
    scrub: 1,
    // markers: true,
    onRefresh: firstSectionRefresh,
  },
});

tlFirstSection
  .fromTo(
    ".plane",
    6,
    {
      motionPath: { path: [{ x: 0, y: 0 }] },
    },
    {
      motionPath: calculatePath,
      ease: "none",
      onComplete: () => {
        document.querySelector(".plane").style.transform = "translateX(10000)";
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
    },
    {
      scale: 1,
      autoAlpha: 1,
      y: 5,
      x: "-50%",
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
    "first+=3.5"
  );

// ------------------ SECTION 2 --------------------

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
    start: "50% bottom",
    end: "75% bottom",
    scrub: 3,
    // markers: true,
  },
});

tlSecondSectionStep_final
  .fromTo(
    ".final-bg",
    25,
    { y: "-50%", x: "-100%", autoAlpha: 0 },
    { y: "10%", x: 0, autoAlpha: 1 },
    "first"
  )
  .fromTo(
    ".step--final .step__text--final",
    25,
    { y: 100, autoAlpha: 0 },
    { y: 0, autoAlpha: 1 },
    "first+=9"
  )
  .fromTo(".step--final .cta", 10, { autoAlpha: 0 }, { autoAlpha: 1 }, "-=6");

// LINE DRAWING
const pageContainer = document.querySelector(".page-container");
const lineContainer = document.querySelector(".line-container");
const path = lineContainer.querySelector("path");
let pathLength = path.getTotalLength();

path.style.strokeDasharray = `${pathLength} ${pathLength}`;
path.style.strokeDashoffset = pathLength;

function drawSVG() {
  let rect = lineContainer.getBoundingClientRect();
  let scrollPercentage =
    (rect.bottom - pageContainer.offsetHeight) / rect.height;
  scrollPercentage = 1 + scrollPercentage;

  let drawLength = pathLength * scrollPercentage;

  path.style.strokeDashoffset = pathLength + drawLength;
}

pageContainer.addEventListener("scroll", drawSVG);

// ------------------ SECTION 3 --------------------
const tlThirdSectionContainer = gsap.timeline({
  scrollTrigger: {
    trigger: ".features-container",
    start: "top 50%",
    end: "top 10%",
    scrub: 2,
    // markers: true,
  },
});

tlThirdSectionContainer.fromTo(
  ".features",
  2,
  { y: 100, autoAlpha: 0 },
  { y: 0, autoAlpha: 1 },
  "first"
);

gsap.utils.toArray(".feature").forEach((element, index) => {
  const tlThirdSectionFeature = gsap.timeline({
    defaults: {
      duration: 2,
    },
    scrollTrigger: {
      trigger: element,
      start: "top 70%",
      end: "top 30%",
      scrub: 2.5,
      // markers: true,
    },
  });

  let elementSVG = element.querySelector(".feature__svg");
  let elementName = element.querySelector(".feature__name");
  let elementDesc = element.querySelector(".feature__desc");

  let xMove = isOdd(index) ? -100 : 100;
  let transformStart = `rotateX(80deg) rotateY(9deg) scaleY(0.5) scaleX(0.5)`;
  let transformFinish = `rotateX(10deg) rotateY(9deg)`;

  tlThirdSectionFeature
    .fromTo(
      elementSVG,
      {
        y: -100,
        autoAlpha: 0,
        transform: transformStart,
      },
      { y: 0, autoAlpha: 1, transform: transformFinish },
      "first"
    )
    .fromTo(
      elementName,
      { x: xMove, autoAlpha: 0 },
      { x: 0, autoAlpha: 1 },
      "first+=0.7"
    )
    .fromTo(
      elementDesc,
      { x: xMove, autoAlpha: 0 },
      { x: 0, autoAlpha: 1 },
      "first+=1.5"
    );
});
