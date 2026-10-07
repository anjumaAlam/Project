// ==========================================
// MoodSpace - script.js
// ==========================================

// ------------------------------------------
// 1. MOOD DATA
// Each mood is just an object with an emoji, a few quotes and a message.
// To add a new mood: copy one block, change the text, then add a
// matching button in index.html and a theme in style.css.
// Later you can add more fields here, like music: "rain.mp3"
// ------------------------------------------
const moods = {
  happy: {
    emoji: "🌻",
    quotes: [
      "Joy is not in things, it is in us.",
      "Let today be loud with sunshine and small wins.",
      "A good mood is a quiet kind of magic.",
      "Notice the small bright things. They add up.",
      "Today is allowed to be good, simply because it is.",
      "Happiness grows a little each time you notice it.",
    ],
    message: "Hold on to this feeling. You deserve every bit of it.",
  },
  sad: {
    emoji: "🌧️",
    quotes: [
      "Even rain is gentle with the earth.",
      "It's okay to feel heavy. Clouds don't stay forever.",
      "Soft days are allowed too.",
      "You can be gentle with yourself and still be sad.",
      "Not every storm is here to break you. Some just water what grows.",
      "Today, being here is enough.",
    ],
    message: "You don't have to fix anything right now. Just breathe. I'm glad you're here.",
  },
  angry: {
    emoji: "🔥",
    quotes: [
      "Let the fire cool into warmth.",
      "Breathe in slowly. Let the storm pass through you.",
      "Your feelings are valid. You are still in control.",
      "You can feel fire and still choose how to hold it.",
      "Pause. The urge will pass, and you'll still be you.",
      "Anger is information. Listen, then respond slowly.",
    ],
    message: "Take a slow breath in, and a slower breath out. You've got this.",
  },
  tired: {
    emoji: "🌙",
    quotes: [
      "Rest is not laziness. It is how you refill.",
      "The night is soft. Let it hold you.",
      "Slow down. The world can wait a little.",
      "Even the sun rests every night.",
      "Put down what you can. Pick it up again in the morning.",
      "A tired mind needs kindness, not more pushing.",
    ],
    message: "You've done enough for now. Be kind to yourself and rest.",
  },
  romantic: {
    emoji: "💕",
    quotes: [
      "Love is the quiet poem the heart keeps writing.",
      "Some feelings don't need words, only warmth.",
      "Where there is love, even ordinary days glow.",
      "Love grows in small gestures and soft glances.",
      "Be the kind of love you'd like to receive.",
      "Some hearts speak best in quiet moments.",
    ],
    message: "Let your heart be soft today. Love starts with how you treat yourself.",
  },
  calm: {
    emoji: "🌿",
    quotes: [
      "Be still. The world keeps turning without your help.",
      "Peace is a quiet green place inside you.",
      "Nothing to chase. Nothing to prove. Just this breath.",
      "Let the water settle and the sky shows itself.",
      "Slow is smooth, and smooth is peaceful.",
      "You are allowed to simply be.",
    ],
    message: "Let your shoulders drop. You're exactly where you need to be.",
  },
  excited: {
    emoji: "🎉",
    quotes: [
      "Today feels like the first page of something big.",
      "Let the sparks fly. You've earned this energy.",
      "Your excitement is a tiny firework. Let it shine.",
      "Say yes to the spark!",
      "Big feelings make big beginnings.",
      "This energy is yours to use, so use it well.",
    ],
    message: "Ride this wave! And share the joy with someone you love.",
  },
  anxious: {
    emoji: "🫧",
    quotes: [
      "One breath. Then another. That's all you need right now.",
      "You don't have to solve everything today.",
      "This feeling is a wave. It rises, and it passes.",
      "You've gotten through hard moments before.",
      "Your worries are loud, but they aren't always true.",
      "Feel your feet on the ground. You're here.",
    ],
    message: "You're safe in this moment. Breathe in slowly, hold, and let go. If it feels like too much, talking to someone you trust can help.",
  },
};

// ------------------------------------------
// 2. FIND THE PAGE ELEMENTS WE NEED
// querySelector looks for an element by its class or id.
// ------------------------------------------
const card = document.querySelector(".mood-card");
const emojiEl = document.querySelector(".mood-emoji");
const quoteEl = document.querySelector(".mood-quote");
const authorEl = document.querySelector(".mood-author");
const messageEl = document.querySelector(".mood-message");

// Remember which mood and quote we're showing right now
let currentMood = null;
let currentQuote = "";

// ------------------------------------------
// 2b. ANIMATIONS
// Each mood has a small recipe: what to show, how many,
// which CSS animation to use ("style"), and how fast (seconds).
// Change the numbers to see what happens!
// ------------------------------------------
const animationLayer = document.querySelector(".animation-layer");

const animations = {
  happy:    { symbol: "✨", count: 18, style: "float-up", minTime: 8,  maxTime: 14 },
  sad:      { symbol: "",   count: 70, style: "rain",     minTime: 0.8, maxTime: 1.6 },
  angry:    { symbol: "",   count: 3,  style: "ring",     minTime: 7,  maxTime: 7 },
  tired:    { symbol: "⭐", count: 28, style: "twinkle",  minTime: 2,  maxTime: 5 },
  romantic: { symbol: ["💖", "🌸", "💕"], count: 18, style: "float-up", minTime: 9, maxTime: 15 },
  calm:     { symbol: ["🍃", "🌿"], count: 14, style: "leaf",     minTime: 10, maxTime: 18 },
  excited:  { symbol: "",   count: 50, style: "confetti", minTime: 4,  maxTime: 8 },
  anxious:  { symbol: "",   count: 20, style: "bubble",   minTime: 9,  maxTime: 16 },
};

function showAnimation(moodName) {
  const recipe = animations[moodName];
  animationLayer.innerHTML = ""; // clear the old animation first

  for (let i = 0; i < recipe.count; i++) {
    const item = document.createElement("span");
    const duration = recipe.minTime + Math.random() * (recipe.maxTime - recipe.minTime);

    item.className = recipe.style === "ring" ? "ring" : "particle " + recipe.style;
    item.textContent = Array.isArray(recipe.symbol)
      ? recipe.symbol[Math.floor(Math.random() * recipe.symbol.length)]
      : recipe.symbol;
    item.style.animationDuration = duration + "s";

    if (recipe.style === "ring") {
      // the 3 rings start one after another, like slow breaths
      item.style.animationDelay = i * (duration / recipe.count) + "s";
    } else {
      // negative delay = the particle starts already "in the middle" of its path
      item.style.animationDelay = -Math.random() * duration + "s";
      item.style.left = Math.random() * 100 + "%";
      item.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
      if (recipe.style === "twinkle") {
        item.style.top = Math.random() * 100 + "%";
      }
      if (recipe.style === "confetti") {
        item.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      }
      if (recipe.style === "bubble") {
        const size = 14 + Math.random() * 44;
        item.style.width = size + "px";
        item.style.height = size + "px";
      }
    }

    animationLayer.appendChild(item);
  }

  // Extra decoration just for the Sad page
  addScene(moodName);
}

// Slow clouds drifting across the top of the screen
function addClouds() {
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement("span");
    const duration = 70 + Math.random() * 50;       // very slow (70-120 seconds)

    cloud.className = "cloud";
    cloud.style.top = 2 + i * 6 + Math.random() * 4 + "%";   // stacked at different heights
    cloud.style.scale = 0.8 + Math.random() * 1.1;   // size (separate from the moving animation)
    cloud.style.animationDuration = duration + "s";
    cloud.style.animationDelay = -Math.random() * duration + "s";

    animationLayer.appendChild(cloud);
  }
}

// ------------------------------------------
// 2c. EXTRA SCENE DECORATIONS (one per mood)
// ------------------------------------------
const confettiColors = ["#ffd60a", "#00e5ff", "#ff4d8d", "#7cff6b", "#ffffff"];

// A helper that makes many copies of one decoration.
// "setup" is a small function that customises each copy.
function spawn(count, className, minTime, maxTime, setup) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const duration = minTime + Math.random() * (maxTime - minTime);
    el.className = className;
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = -Math.random() * duration + "s";
    if (setup) setup(el);
    animationLayer.appendChild(el);
  }
}

// Makes ONE decoration (sun, moon, glow...)
function addDecor(className) {
  const el = document.createElement("div");
  el.className = className;
  animationLayer.appendChild(el);
}

function addScene(moodName) {
  if (moodName === "sad") addClouds();
  if (moodName === "happy") addDecor("sun");
  if (moodName === "tired") addDecor("moon");

  if (moodName === "angry") {
    addDecor("glow");   // warm glow at the bottom
    spawn(25, "particle ember float-up", 5, 10, (el) => {
      const size = 3 + Math.random() * 5;
      el.style.left = Math.random() * 100 + "%";
      el.style.width = size + "px";
      el.style.height = size + "px";
    });
  }

  if (moodName === "romantic") {
    spawn(8, "bokeh", 12, 22, (el) => {
      const size = 40 + Math.random() * 90;
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.width = size + "px";
      el.style.height = size + "px";
    });
  }

  if (moodName === "anxious") {
    spawn(2, "ring", 9, 9);   // slow rings to breathe with
  }
}

// ------------------------------------------
// 3. QUOTE SLIDER
// A new quote appears every QUOTE_SECONDS. It pauses when the
// mouse is over the card, when you press pause, or when the tab is hidden.
// ------------------------------------------
const QUOTE_SECONDS = 30;   // change this to speed up or slow down

const bar = document.getElementById("progress-bar");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pauseBtn = document.getElementById("pause");

let quotes = [];
let quoteIndex = 0;
let manualPause = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let hoverPause = false;

function isPaused() {
  return manualPause || hoverPause || document.hidden;
}

function buildDots() {
  dotsEl.innerHTML = "";
  quotes.forEach((q, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", "Quote " + (i + 1));
    dot.addEventListener("click", () => showQuote(i));
    dotsEl.appendChild(dot);
  });
}

function updateDots() {
  Array.from(dotsEl.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === quoteIndex);
  });
}

// Show one quote with a soft fade
function showQuote(index) {
  quoteIndex = (index + quotes.length) % quotes.length;
  quoteEl.classList.add("fading");
  setTimeout(() => {
    quoteEl.textContent = '"' + quotes[quoteIndex] + '"';
    quoteEl.classList.remove("fading");
  }, 400);
  updateDots();
  restartTimer();
}

// Start the progress bar again from empty.
// The bar IS the timer: when it reaches 100%, the browser fires
// "animationend" and we show the next quote. So the bar always fills fully.
function restartTimer() {
  bar.style.animation = "none";
  void bar.offsetWidth;   // tiny trick that makes the bar restart
  bar.style.setProperty("--quote-seconds", QUOTE_SECONDS + "s");
  bar.style.animation = "fill " + QUOTE_SECONDS + "s linear forwards";
  applyPause();
}

// Freeze or resume the bar exactly where it is (nothing is reset)
function applyPause() {
  bar.style.animationPlayState = isPaused() ? "paused" : "running";
  pauseBtn.textContent = manualPause ? "▶" : "⏸";
}

bar.addEventListener("animationend", () => showQuote(quoteIndex + 1));

prevBtn.addEventListener("click", () => showQuote(quoteIndex - 1));
nextBtn.addEventListener("click", () => showQuote(quoteIndex + 1));
pauseBtn.addEventListener("click", () => {
  manualPause = !manualPause;
  applyPause();
});

// Pause while a mouse is over the card (not for touch screens)
card.addEventListener("pointerenter", (e) => {
  if (e.pointerType === "mouse") { hoverPause = true; applyPause(); }
});
card.addEventListener("pointerleave", (e) => {
  if (e.pointerType === "mouse") { hoverPause = false; applyPause(); }
});

document.addEventListener("visibilitychange", applyPause);

// Arrow keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showQuote(quoteIndex - 1);
  if (e.key === "ArrowRight") showQuote(quoteIndex + 1);
});

// Swipe on phones
let touchStartX = 0;
card.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; });
card.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) showQuote(quoteIndex + (dx < 0 ? 1 : -1));
});

// ------------------------------------------
// 4. SMALL ACTIVITIES (one per mood)
// Each activity is a list of steps. A step can be just text, or an object:
//   { text: "...", breathe: true, cycles: 4 }   -> shows a breathing circle
//   { text: "...", texts: ["a", "b"] }           -> adds one random suggestion
// ------------------------------------------
const activities = {
  sad: {
    label: "🌅 Ease the mood",
    lift: true,   // the page slowly turns from rainy night to calm dawn
    steps: [
      { text: "Breathe", breathe: true, cycles: 5 },
      { text: "One small thing you can do now:", texts: [
        "drink a glass of water.",
        "sit by a window for two minutes.",
        "send a short message to someone you like.",
        "stretch your arms up high for ten seconds.",
      ]},
      "That's enough for now. Be gentle with yourself.",
    ],
  },
  anxious: {
    label: "🫶 Try 5-4-3-2-1",
    steps: [
      "Look around. Name 5 things you can see.",
      "Notice 4 things you can touch.",
      "Listen closely. Name 3 sounds.",
      "Find 2 things you can smell.",
      "Notice 1 thing you can taste. Then take one slow breath. You're here.",
    ],
  },
  angry: {
    label: "🧊 Cool down",
    steps: [
      { text: "Breathe", breathe: true, cycles: 3 },
      "Unclench your jaw. Drop your shoulders.",
      "Count slowly back from 10. Then decide what you need next.",
    ],
  },
  tired: {
    label: "🌙 Wind down",
    steps: [
      "Dim your screen. In a few minutes, put your phone down.",
      "Drink a little water. Stretch your neck and shoulders slowly.",
      { text: "Breathe", breathe: true, cycles: 3 },
      "Rest now. Tomorrow can wait.",
    ],
  },
  happy: {
    label: "☀️ Savor it",
    steps: [
      "Pause. What made you smile today?",
      "Hold that moment in your mind for 20 seconds. Notice how it feels.",
      "Tell one person about it. Good feelings grow when shared.",
    ],
  },
  romantic: {
    label: "💌 Spread the love",
    steps: [
      "Think of someone you care about.",
      "Write them one short, kind message. A few words are enough.",
      "Send it now, or keep it for when you're ready.",
    ],
  },
  calm: {
    label: "🌿 One mindful minute",
    steps: [
      { text: "Breathe", breathe: true, cycles: 4 },
      "Notice 3 things around you without judging them.",
      "Carry this slowness with you.",
    ],
  },
  excited: {
    label: "🎉 Share the spark",
    steps: [
      "What is one thing you want to do with this energy?",
      "Tell someone about it. Excitement is better together.",
      { text: "Breathe", breathe: true, cycles: 2 },
    ],
  },
};

const activityBtn = document.getElementById("activity-btn");
const panel = document.getElementById("activity");
const stepTextEl = document.getElementById("activity-text");
const breathEl = document.getElementById("breath");
const stepNextBtn = document.getElementById("activity-next");

let activity = null;
let stepIndex = 0;
let breathTimer = null;

function startActivity() {
  stepIndex = 0;
  activityBtn.hidden = true;
  panel.hidden = false;
  if (activity.lift) startEasing();
  showStep();
  panel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showStep() {
  const raw = activity.steps[stepIndex];
  const step = typeof raw === "string" ? { text: raw } : raw;
  const isLast = stepIndex === activity.steps.length - 1;

  stepNextBtn.textContent = isLast ? "Done" : "Next";

  if (step.breathe) {
    breathEl.hidden = false;
    stepNextBtn.disabled = true;
    runBreathing(step.cycles || 3);
  } else {
    breathEl.hidden = true;
    stepNextBtn.disabled = false;
    const extra = step.texts ? " " + step.texts[Math.floor(Math.random() * step.texts.length)] : "";
    stepTextEl.textContent = step.text + extra;
  }
}

// Breathe in for 4 seconds, out for 6 (a longer exhale is calming)
function runBreathing(cycles) {
  let done = 0;

  function inhale() {
    stepTextEl.textContent = "Breathe in… follow the circle";
    breathEl.style.transitionDuration = "4s";
    breathEl.style.transform = "scale(1.6)";
    breathTimer = setTimeout(exhale, 4000);
  }

  function exhale() {
    stepTextEl.textContent = "Breathe out slowly…";
    breathEl.style.transitionDuration = "6s";
    breathEl.style.transform = "scale(1)";
    done++;
    breathTimer = setTimeout(done >= cycles ? finish : inhale, 6000);
  }

  function finish() {
    stepTextEl.textContent = "Nice. Take a moment, then continue.";
    stepNextBtn.disabled = false;
  }

  inhale();
}

function endActivity() {
  clearTimeout(breathTimer);
  panel.hidden = true;
  activityBtn.hidden = false;
}

stepNextBtn.addEventListener("click", () => {
  if (stepIndex >= activity.steps.length - 1) {
    endActivity();
  } else {
    stepIndex++;
    showStep();
  }
});

activityBtn.addEventListener("click", startActivity);

// Sad page only: over about a minute, rain fades away, clouds thin out,
// and the colors turn from rainy night to soft dawn.
function startEasing() {
  addDecor("dawn");
  void document.body.offsetWidth;          // lets the dawn glow fade in smoothly
  document.body.classList.add("easing");

  // remove the rain in 9 small batches, one every 5 seconds
  const drops = Array.from(animationLayer.querySelectorAll(".rain")).sort(() => Math.random() - 0.5);
  const batch = Math.ceil(drops.length / 9);
  for (let i = 0; i < 9; i++) {
    setTimeout(() => {
      drops.slice(i * batch, (i + 1) * batch).forEach((d) => d.remove());
    }, 5000 * (i + 1));
  }
}

// ------------------------------------------
// 5. THE MAIN FUNCTION: shows the page for one mood
// ------------------------------------------
function applyTheme(moodName) {
  document.body.className = "theme-" + moodName;
}

function showMoodCard(moodName) {
  const mood = moods[moodName];

  quotes = mood.quotes;
  quoteIndex = Math.floor(Math.random() * quotes.length);   // start on a random quote
  activity = activities[moodName];

  emojiEl.textContent = mood.emoji;
  quoteEl.textContent = '"' + quotes[quoteIndex] + '"';
  authorEl.textContent = "";
  messageEl.textContent = mood.message;
  activityBtn.textContent = activity.label;
  document.getElementById("care-note").hidden = !["sad", "anxious"].includes(moodName);

  buildDots();
  updateDots();
  card.classList.remove("hidden");   // fade in
  restartTimer();
}

function selectMood(moodName) {
  currentMood = moodName;
  document.title = "MoodSpace · " + moodName.charAt(0).toUpperCase() + moodName.slice(1);

  applyTheme(moodName);
  showAnimation(moodName);
  setTimeout(() => showMoodCard(moodName), 150);
}

// ------------------------------------------
// 6. READ THE MOOD FROM THE URL
// A link like mood.html?mood=sad means "show the sad page".
// If the mood is missing or unknown, go back to the home page.
// ------------------------------------------
const params = new URLSearchParams(window.location.search);
const moodFromUrl = params.get("mood");

if (moodFromUrl && moods[moodFromUrl]) {
  selectMood(moodFromUrl);
} else {
  window.location.href = "index.html";
}