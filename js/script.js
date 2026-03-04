
const intro = document.getElementById("intro");
const enterText = document.getElementById("enter-text");
const mainContent = document.getElementById("main-content");
const closeBtn = document.getElementById("close-btn");

const container = document.getElementById('container');
const text = document.getElementById('text');

let speed = 0.8;
let isPaused = false;
let animationRunning = false;

let y = 0;
let yClone = 0;
let clone = null;

// ---------- Gestion du toucher (pause) ----------
// Empêche le menu contextuel et la sélection au long press
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('touchstart', () => { isPaused = true; });
document.addEventListener('touchend', () => { isPaused = false; });

// ---------- Textes FR / EN ----------
const texts = {
  en: [
    "Above the lakes, above the valleys,",
    "The mountains, forests, clouds, and seas,",
    "Beyond the sun, beyond the winds,",
    "Beyond the confines of the starry spheres,",
    "My spirit, you roam with limber ease,",
    "And, like a fine swimmer plunging through the waves,",
    "Joyfully soar across the immense gulf",
    "With an indescribably masculine grace.",
    "Fly far away from these morbid miasmas",
    "To be purified in celestial airs",
    "And drink, like a divine spirit,",
    "The bright fire that fills the clear spaces.",
    "Behind the ennuis and vast griefs",
    "That weigh down our flimsy existence,",
    "Happy is he who has ample wings",
    "To set out over the serene and glowing fields;",
    "He whose thoughts, like larks,",
    "Soar freely into the morning sky",
    "—Who floats across life and effortlessly understands",
    "The language of the flowers and the silent things!"
  ],
  fr: [
    "Au-dessus des étangs, au-dessus des vallées,",
    "Des montagnes, des bois, des nuages, des mers,",
    "Par delà le soleil, par delà les éthers,",
    "Par delà les confins des sphères étoilées,",
    "Mon esprit, tu te meus avec agilité,",
    "Et, comme un bon nageur qui se pâme dans l'onde,",
    "Tu sillonnes gaiement l'immensité profonde",
    "Avec une indicible et mâle volupté.",
    "Envole-toi bien loin de ces miasmes morbides;",
    "Va te purifier dans l'air supérieur,",
    "Et bois, comme une pure et divine liqueur,",
    "Le feu clair qui remplit les espaces limpides.",
    "Derrière les ennuis et les vastes chagrins",
    "Qui chargent de leur poids l'existence brumeuse,",
    "Heureux celui qui peut d'une aile vigoureuse",
    "S'élancer vers les champs lumineux et sereins;",
    "Celui dont les pensers, comme des alouettes,",
    "Vers les cieux le matin prennent un libre essor,",
    "— Qui plane sur la vie, et comprend sans effort",
    "Le langage des fleurs et des choses muettes!"
  ]
};

// ---------- Mise à jour du texte ----------
function updateText(lang) {
  text.innerHTML = "";

  texts[lang].forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    text.appendChild(p);
  });

  if (clone) clone.remove();

  clone = text.cloneNode(true);
  container.appendChild(clone);

  y = 0;
  yClone = text.offsetHeight;
  clone.style.top = yClone + "px";
}

// ---------- Boutons langue ----------
document.getElementById("btn-en").addEventListener("click", () => {
  updateText("en");
  document.getElementById("btn-en").classList.add("active");
  document.getElementById("btn-fr").classList.remove("active");
});

document.getElementById("btn-fr").addEventListener("click", () => {
  updateText("fr");
  document.getElementById("btn-fr").classList.add("active");
  document.getElementById("btn-en").classList.remove("active");
});

// ---------- Animation ----------
function animate() {
  if (!animationRunning) return;

  if (!isPaused && clone) {
    y -= speed;
    yClone -= speed;

    const h = text.offsetHeight;

    if (y < -h) y = yClone + h;
    if (yClone < -h) yClone = y + h;

    text.style.top = y + "px";
    clone.style.top = yClone + "px";
  }

  requestAnimationFrame(animate);
}

// ---------- Resize ----------
window.addEventListener('resize', () => {
  if (!clone) return;

  y = 0;
  yClone = text.offsetHeight;
  clone.style.top = yClone + "px";
});

// ---------- ENTER ----------
enterText.addEventListener("click", () => {

  // Active plein écran
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }

  intro.style.display = "none";
  mainContent.style.display = "flex";
  closeBtn.style.display = "block";

  updateText("en");

  animationRunning = true;
  animate();
});

// ---------- CLOSE ----------
closeBtn.addEventListener("click", () => {

  // Quitte plein écran
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

  // Stop animation
  animationRunning = false;

  // Nettoyage
  if (clone) {
    clone.remove();
    clone = null;
  }

  text.innerHTML = "";
  y = 0;
  yClone = 0;

  mainContent.style.display = "none";
  closeBtn.style.display = "none";
  intro.style.display = "flex";

});
