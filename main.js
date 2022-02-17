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

// Inits
window.scrollTo({ top: 1 });
gsap.to(".loader", 1, { autoAlpha: 0 });

// Start message
let scrollMessageDelayTimeout;
const tlScrollMessage = gsap.to(".scroll-message", 3, {
  delay: 2,
  repeat: -1,
  yoyo: true,
  autoAlpha: 1,
  scale: 1.1,
});
ScrollTrigger.create({
  trigger: ".section--1",
  start: "top top",
  onEnter: () => {
    if (scrollMessageDelayTimeout) clearTimeout(scrollMessageDelayTimeout);
    tlScrollMessage.pause();
    gsap.to(".scroll-message", {
      autoAlpha: 0,
    });
  },
  onLeaveBack: () => {
    scrollMessageDelayTimeout = setTimeout(() => {
      tlScrollMessage.play(0);
    }, 4000);
  },
});

// Make plane looks good on load
gsap.from(".plane", 1, { autoAlpha: 0 });
if (window.scrollY > 20) gsap.to(".plane", { x: -100 });
gsap.to(".plane", 1.8, {
  motionPath: {
    autoRotate: true,
    curviness: 0.5,
    path: [
      { x: wPercent(-10), y: wPercent(4) },
      { x: wPercent(0), y: wPercent(0) },
    ],
  },
});

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
    end: winWidth > 600 ? "+=3000" : "+=1500",
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
const tlThirdSection = gsap.timeline({
  scrollTrigger: {
    trigger: ".features-container",
    start: `top top`,
    end: "+=450%",
    scrub: 1,
    pin: ".section--3",
    pinType: "fixed",
    anticipatePin: 1,
    // markers: true,
  },
});

let tlFeatures = gsap.timeline();
tlFeatures.fromTo(
  ".features",
  2,
  { y: 400, autoAlpha: 0 },
  { y: 0, autoAlpha: 1 }
);

tlThirdSection.add(tlFeatures);

gsap.utils.toArray(".feature").forEach((element, index) => {
  let elementSVG = element.querySelector(".feature__svg");
  let elementName = element.querySelector(".feature__name");
  let elementDesc = element.querySelector(".feature__desc");

  let xMove = isOdd(index) ? -100 : 100;
  let transformStartSVG = `rotateX(80deg) rotateY(9deg) scaleY(0.5) scaleX(0.5)`;
  let transformFinishSVG = `rotateX(10deg) rotateY(9deg)`;

  let tlFeature = gsap.timeline({ defaults: { duration: 3 } });
  tlFeature
    .fromTo(
      elementSVG,
      3,
      {
        y: -100,
        autoAlpha: 0,
        transform: transformStartSVG,
      },
      { y: 0, autoAlpha: 1, transform: transformFinishSVG },
      "feature"
    )
    .fromTo(
      elementName,
      { x: xMove, autoAlpha: 0 },
      { x: 0, autoAlpha: 1 },
      "feature+=0.3"
    )
    .fromTo(
      elementDesc,
      { x: xMove, autoAlpha: 0 },
      { x: 0, autoAlpha: 1 },
      "feature+=0.6"
    )
    .fromTo(element, 1.8, {}, {})
    .fromTo(
      element,
      3,
      { y: "-50%", x: "-50%", autoAlpha: 1 },
      { y: "-100%", x: "-50%", autoAlpha: 0 }
    );

  tlThirdSection.add(tlFeature);
});

// ------------------ ADDITIONAL --------------------
// Simple parallax effect
gsap.utils.toArray(".parallax").forEach((element) => {
  let tlParallax = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 20%",
      scrub: 2,
      // markers: true,
    },
  });
  tlParallax.to(element, { y: element.dataset.plxMove });
});
