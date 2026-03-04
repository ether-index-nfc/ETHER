const container = document.getElementById('container');
const text = document.getElementById('text');
let speed = 0.8; // vitesse pixels/frame
let isPaused = false;

// ---------- Gestion du toucher ----------
document.addEventListener('touchstart', () => { isPaused = true; });
document.addEventListener('touchend', () => { isPaused = false; });

// ---------- Textes FR et EN ----------
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

// ---------- Variables pour animation ----------
let y = 0;
let yClone = 0;
let clone = null;

// ---------- Fonction pour mettre à jour le texte ----------
function updateText(lang) {
  // Supprime tout contenu existant
  text.innerHTML = "";
  
  // Ajoute chaque ligne
  texts[lang].forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    text.appendChild(p);
  });

  // Supprime le clone précédent
  if (clone) clone.remove();

  // Crée un clone pour boucle infinie
  clone = text.cloneNode(true);
  clone.classList.add("clone");
  container.appendChild(clone);

  // Position initiale
  y = 0;
  yClone = text.offsetHeight;
  clone.style.top = yClone + "px";
}

// ---------- Boutons ----------
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

// ---------- Boucle d'animation ----------
function animate() {
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

// ---------- Gestion du redimensionnement ----------
window.addEventListener('resize', () => {
  if (!clone) return;

  // Repositionne le clone et reset positions pour éviter chevauchement
  y = 0;
  yClone = text.offsetHeight;
  clone.style.top = yClone + "px";
});

// ---------- Initialisation ----------
updateText("en"); // anglais par défaut
animate();