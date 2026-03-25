/* ============================================================
   script.js — Refugio Emocional
   💡 Editá los arrays de abajo para personalizar el contenido
   ============================================================ */

"use strict";

// ═══════════════════════════════════════════════════════════════
//   💡 FRASES DE CALMA — editá o agregá las que quieras acá
// ═══════════════════════════════════════════════════════════════
const FRASES_CALMA = [
  // — Generales —
  "No todo lo que sentís ahora es permanente.",
  "Estás haciendo lo mejor que podés con lo que tenés.",
  "Tus emociones son válidas. Todas.",
  "No tenés que tenerlo todo resuelto ahora mismo.",
  "Está bien no estar bien a veces.",
  "Cada momento difícil que pasaste, lo superaste. Este también.",
  "Mereces cosas lindas, aunque no siempre lo sintás así.",
  "Tomá las cosas de a una. Un paso es suficiente.",

  // — Para ataques de pánico —
  "Respirá conmigo. Inhalá por la nariz, exhalá por la boca. Todo va bien.",
  "Lo que sentís ahora es intenso, pero no es peligroso. Va a pasar.",
  "Tu cuerpo está intentando protegerte. Estás a salvo.",
  "Nombrá 5 cosas que podés ver ahora mismo. Anclate acá.",
  "No tenés que luchar contra lo que sentís. Solo observalo y dejalo ir.",
  "Este momento va a terminar. Siempre termina.",
  "Ponete la mano en el pecho. Sentí el calor. Estás acá, estás presente.",
  "No estás sola en esto. Yo estoy acá aunque no esté físicamente.",

  // — Para ansiedad —
  "La ansiedad miente. No todo lo que te dice es verdad.",
  "No tenés que resolver el futuro ahora. Solo este momento.",
  "El miedo no define lo que sos capaz de hacer.",
  "Respirá profundo. El aire que respirás siempre va a estar.",
  "No tenés que estar en control de todo para estar bien.",
  "Soltá lo que no podés controlar. Solo existe el ahora.",
  "Sos más grande que tus pensamientos. Podés observarlos sin ser ellos.",

  // — Para depresión y días oscuros —
  "No tenés que sentirte bien para ser valiosa. Sos valiosa exactamente así.",
  "Levantarte fue suficiente. Eso ya es un logro hoy.",
  "No te compares con quien eras antes. Estás en proceso.",
  "Los días oscuros no duran para siempre, aunque lo parezca.",
  "Está bien descansar. Estar quieta también es avanzar.",
  "No estás rota. Estás sanando. Y eso duele, pero es real.",
  "Pedir ayuda no es debilidad. Es el acto más valiente que existe.",
  "Sos suficiente. Hoy, mañana, siempre.",
];

// ═══════════════════════════════════════════════════════════════
//   💡 MENSAJES DE RECUERDOS — editá con tus momentos reales
// ═══════════════════════════════════════════════════════════════
const RECUERDOS = [
  // Cada entrada muestra una imagen de assets/images con un mensaje.
  // "sent" = burbuja tuya (violeta, derecha) | "received" = su burbuja (gris, izquierda)
  {
    tipo: "sent",
    imagen: "assets/images/nuestro-primer-mes.jpg",
    texto: "Nuestro primer mes. El primero de todos los que vienen. 🥺",
    tiempo: "el inicio de todo",
  },
  {
    tipo: "sent",
    imagen: "assets/images/nuestro-segundo-mes.jpg",
    texto: "El segundo mes... ya sabía que esto era algo especial. 💙",
    tiempo: "cada vez más cerca",
  },
  {
    tipo: "sent",
    imagen: "assets/images/cuando-te-abriste-por-primera-vez-conmigo.jpg",
    texto: "Cuando te abriste por primera vez conmigo. Ese momento lo guardo para siempre. 🌙",
    tiempo: "una noche que no olvido",
  },
  {
    tipo: "sent",
    imagen: "assets/images/cuando-sali-de-mi-bloqueo-emocional-gracias-a-ti.jpg",
    texto: "Cuando salí de mi bloqueo emocional gracias a vos. Me enseñaste a sentir de nuevo. ❤️",
    tiempo: "cuando todo cambió",
  },
  {
    tipo: "sent",
    imagen: "assets/images/cuando-llore-gracias-a-ti.jpg",
    texto: "Cuando lloré gracias a vos... de emoción, de gratitud, de amor. 🥹",
    tiempo: "un momento real",
  },
  {
    tipo: "sent",
    imagen: "assets/images/cuando-le-conte-a-mi-mama-lo-nuestro.jpg",
    texto: "Cuando le conté a mi mamá lo nuestro. Ese día entendí que esto era serio y hermoso. 💫",
    tiempo: "un paso enorme",
  },
  {
    tipo: "sent",
    imagen: "assets/images/otro-lindo-recuerdo-mas.jpg",
    texto: "Otro recuerdo lindo más. Y van... 💙",
    tiempo: "cositas nuestras",
  },
];

// ═══════════════════════════════════════════════════════════════
//   ESTADO INTERNO DE LA APP
// ═══════════════════════════════════════════════════════════════
let indiceFrase = 0;
let indiceRecuerdo = 0;
let breathState = "idle"; // 'idle' | 'inhale' | 'exhale'
let breathTimer = null;
let breathPhase = 0; // 0=inhale 1=hold 2=exhale
let currentSongId = null;

// ═══════════════════════════════════════════════════════════════
//   INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // ── Contador de días juntos ──────────────────────────────────
  // 💡 Cambiá esta fecha si cambia el aniversario
  const FECHA_INICIO = new Date('2026-01-11T00:00:00');
  const hoy          = new Date();
  const diffMs       = hoy - FECHA_INICIO;
  const dias         = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const daysEl       = document.getElementById('days-count');
  if (daysEl) daysEl.textContent = dias;

  // ── Saludo por hora ──────────────────────────────────────────
  const hora = new Date().getHours();
  const titleEl = document.getElementById('intro-title');
  const subEl   = document.getElementById('intro-sub');

  let saludo, sub;
  if (hora >= 0 && hora < 7) {
    saludo = 'No podés dormir...';
    sub    = 'La noche puede ser muy pesada. Estoy acá con vos. 🌙';
  } else if (hora >= 7 && hora < 12) {
    saludo = 'Empezar el día pesado también duele...';
    sub    = 'Que sea mañana no lo hace más fácil. Pero no estás sola. 💙';
  } else if (hora >= 12 && hora < 19) {
    saludo = 'En medio del día y cuesta...';
    sub    = 'No tenés que estar bien ahora mismo. Entrá. 💙';
  } else {
    saludo = 'Si estás acá, es porque no estás teniendo un buen momento...';
    sub    = 'Solo quiero que sepas que no estás sola. 💙';
  }

  if (titleEl) titleEl.textContent = saludo;
  if (subEl)   subEl.textContent   = sub;

  // ── Fecha en la carta ────────────────────────────────────────
  const fechaEl = document.getElementById('letter-date');
  if (fechaEl) {
    fechaEl.textContent = new Date().toLocaleDateString('es-AR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  // Inicializar dots de calma
  renderDots();

  // Intersection Observer para animaciones de scroll
  initRevealAnimations();

  // Navegación activa según scroll
  initScrollSpy();

  // Accesibilidad: breathe con teclado
  const breathCircle = document.getElementById('breath-circle');
  if (breathCircle) {
    breathCircle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBreath();
      }
    });
  }
});

// ═══════════════════════════════════════════════════════════════
//   PANTALLA INICIAL → ENTRAR
// ═══════════════════════════════════════════════════════════════
function entrar() {
  const intro   = document.getElementById('intro');
  const mainApp = document.getElementById('main-app');
  const sosFab  = document.getElementById('sos-fab');

  // Animación de salida de la intro
  intro.classList.add('fade-out');

  setTimeout(() => {
    intro.style.display = 'none';
    mainApp.classList.remove('hidden');
    mainApp.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Mostrar el botón SOS flotante con pequeño retraso
    if (sosFab) {
      setTimeout(() => {
        sosFab.style.display = 'flex';
      }, 800);
    }
  }, 800);
}

// ═══════════════════════════════════════════════════════════════
//   SECCIÓN CALMA — FRASES
// ═══════════════════════════════════════════════════════════════
function mostrarSiguienteFrase() {
  const fraseEl = document.getElementById("calma-frase");
  if (!fraseEl) return;

  // Avanzar índice
  indiceFrase = (indiceFrase + 1) % FRASES_CALMA.length;

  // Fade out
  fraseEl.classList.add("fade-out-frase");

  setTimeout(() => {
    fraseEl.textContent = `"${FRASES_CALMA[indiceFrase]}"`;
    fraseEl.classList.remove("fade-out-frase");
  }, 400);

  // Actualizar dots
  renderDots();

  // Feedback visual en el botón
  const btn = document.getElementById("btn-calma");
  if (btn) {
    btn.style.transform = "scale(0.97)";
    setTimeout(() => (btn.style.transform = ""), 150);
  }
}

function renderDots() {
  const dotsEl = document.getElementById("calma-dots");
  if (!dotsEl) return;

  // Mostrar máx. 8 dots para no saturar
  const total = Math.min(FRASES_CALMA.length, 8);
  const dotIndex = indiceFrase % total;

  dotsEl.innerHTML = Array.from(
    { length: total },
    (_, i) =>
      `<span class="calma-dot${i === dotIndex ? " active" : ""}" aria-hidden="true"></span>`,
  ).join("");
}

// ═══════════════════════════════════════════════════════════════
//   SECCIÓN CALMA — RESPIRACIÓN
// ═══════════════════════════════════════════════════════════════
const BREATH_STEPS = [
  { texto: "Inhalá...\n4 segundos", duracion: 4000, clase: "inhale" },
  { texto: "Sostené...\n4 segundos", duracion: 4000, clase: "" },
  { texto: "Exhalá...\n6 segundos", duracion: 6000, clase: "exhale" },
];

function toggleBreath() {
  const circle = document.getElementById("breath-circle");
  const textEl = document.getElementById("breath-text");

  if (breathState === "idle") {
    breathState = "running";
    breathPhase = 0;
    runBreathStep(circle, textEl);
  } else {
    // Parar
    clearTimeout(breathTimer);
    breathState = "idle";
    circle.className = "breath-circle";
    textEl.textContent = "Tocá para respirar";
  }
}

function runBreathStep(circle, textEl) {
  if (breathState !== "running") return;

  const step = BREATH_STEPS[breathPhase];

  // Actualizar texto y animación
  textEl.textContent = step.texto;
  circle.className = "breath-circle" + (step.clase ? ` ${step.clase}` : "");

  // Temporizador
  breathTimer = setTimeout(() => {
    breathPhase = (breathPhase + 1) % BREATH_STEPS.length;
    runBreathStep(circle, textEl);
  }, step.duracion);
}

// ═══════════════════════════════════════════════════════════════
//   SECCIÓN RECUERDOS — VISOR 9:16
// ═══════════════════════════════════════════════════════════════
function mostrarRecuerdo() {
  const placeholder  = document.getElementById('memory-placeholder');
  const card         = document.getElementById('memory-card');
  const img          = document.getElementById('memory-img');
  const textEl       = document.getElementById('memory-text');
  const timeEl       = document.getElementById('memory-time');

  if (!card || !img) return;

  // Obtener recuerdo actual
  const recuerdo = RECUERDOS[indiceRecuerdo % RECUERDOS.length];
  indiceRecuerdo++;

  // Ocultar placeholder la primera vez
  if (placeholder) placeholder.style.display = 'none';

  // Fade-out suave si ya había una tarjeta visible
  if (!card.classList.contains('hidden')) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.96)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }

  setTimeout(() => {
    // Actualizar contenido
    if (recuerdo.imagen) {
      img.src = recuerdo.imagen;
      img.alt = recuerdo.texto || 'Recuerdo';
    } else {
      // Si no hay imagen, usar un gradiente de fondo como fallback
      img.src = '';
    }

    if (textEl) textEl.textContent = recuerdo.texto  || '';
    if (timeEl) timeEl.textContent = recuerdo.tiempo || '';

    // Mostrar tarjeta con animación
    card.classList.remove('hidden');
    card.style.opacity   = '1';
    card.style.transform = 'scale(1)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    // Actualizar dots de progreso
    renderMemoryDots();
  }, card.classList.contains('hidden') ? 0 : 320);
}

function renderMemoryDots() {
  const dotsEl = document.getElementById('memory-dots');
  if (!dotsEl) return;

  const total   = RECUERDOS.length;
  const current = (indiceRecuerdo - 1 + total) % total; // índice mostrado actualmente

  dotsEl.innerHTML = Array.from({ length: total }, (_, i) => {
    let cls;
    if (i < current)      cls = 'seen';
    else if (i === current) cls = 'active';
    else                   cls = 'unseen';
    return `<span class="memory-dot ${cls}" aria-hidden="true"></span>`;
  }).join('');
}

// (función toggleEditar eliminada — la carta es de solo lectura)

// ═══════════════════════════════════════════════════════════════
//   SECCIÓN TERNURA — 🐾 Un respiro
// ═══════════════════════════════════════════════════════════════

// 💡 Editá las rutas acá para cambiar las imágenes de ternura
const IMAGENES_TERNURA = [
  {
    src:  'assets/images/perrito-y-gatito-tierno-uno.jpg',
    alt:  'Un perrito y un gatito tiernos',
  },
  {
    src:  'assets/images/perrito-y-gatito-tierno-dos.jpg',
    alt:  'Perritos y gatitos tiernos',
  },
  {
    src:  'assets/images/perrito-y-gatito-tierno-tres.jpg',
    alt:  'Más ternura',
  },
];

let indiceTernura = -1; // -1 = no mostrado aún

function mostrarTernura() {
  const placeholder = document.getElementById('ternura-placeholder');
  const card        = document.getElementById('ternura-card');
  const img         = document.getElementById('ternura-img');
  const btn         = document.getElementById('btn-ternura');

  if (!card || !img) return;

  // Avanzar al siguiente (aleatorio si hay más de uno)
  let nuevoIndice;
  if (IMAGENES_TERNURA.length === 1) {
    nuevoIndice = 0;
  } else {
    // Evitar repetir la misma
    do {
      nuevoIndice = Math.floor(Math.random() * IMAGENES_TERNURA.length);
    } while (nuevoIndice === indiceTernura);
  }
  indiceTernura = nuevoIndice;

  const item = IMAGENES_TERNURA[indiceTernura];

  // Ocultar placeholder
  if (placeholder) {
    placeholder.style.opacity = '0';
    placeholder.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { placeholder.style.display = 'none'; }, 300);
  }

  // Animar salida si ya hay una imagen
  if (!card.classList.contains('hidden')) {
    card.style.opacity   = '0';
    card.style.transform = 'scale(0.92)';
    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  }

  // Feedback en botón
  if (btn) {
    btn.disabled = true;
    setTimeout(() => { btn.disabled = false; }, 600);
  }

  setTimeout(() => {
    // Cargar nueva imagen
    img.src = item.src;
    img.alt = item.alt;

    // Reiniciar animación CSS borrando y agregando la clase
    card.classList.remove('hidden');
    card.style.opacity   = '';
    card.style.transform = '';
    card.style.transition = '';

    // Forzar reflow para reiniciar @keyframes
    void card.offsetWidth;
    // La animación 'ternura-pop' se dispara sola por la clase
  }, card.classList.contains('hidden') ? 0 : 280);
}

// ═══════════════════════════════════════════════════════════════
//   SECCIÓN MÚSICA — REPRODUCTOR
// ═══════════════════════════════════════════════════════════════

/**
 * Reproduce una canción en el iframe.
 * @param {string} videoId  - ID del video de YouTube (los 11 caracteres)
 * @param {string} songName - Nombre de la canción para mostrar
 * @param {string} frase    - Frase descriptiva de la canción
 */
function reproducir(videoId, songName, frase) {
  const playerIdle = document.getElementById("player-idle");
  const playerActive = document.getElementById("player-active");
  const iframe = document.getElementById("youtube-player");
  const fraseEl = document.getElementById("player-frase");
  const nameEl = document.getElementById("player-song-name");

  if (!iframe) return;

  // Actualizar iframe src con autoplay
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  iframe.src = src;

  // Mostrar player activo
  if (playerIdle) playerIdle.classList.add("hidden");
  if (playerActive) playerActive.classList.remove("hidden");

  // Actualizar textos con animación
  if (fraseEl) {
    fraseEl.style.opacity = "0";
    fraseEl.style.transform = "translateY(8px)";
    setTimeout(() => {
      fraseEl.textContent = frase;
      fraseEl.style.opacity = "1";
      fraseEl.style.transform = "translateY(0)";
      fraseEl.style.transition = "all 0.4s ease";
    }, 150);
  }

  if (nameEl) nameEl.textContent = songName;

  // Resaltar tarjeta activa
  document
    .querySelectorAll(".song-card")
    .forEach((card) => card.classList.remove("playing"));
  document
    .querySelectorAll(".song-play")
    .forEach((el) => (el.textContent = "▶"));

  // Buscar la tarjeta de la canción que se está reproduciendo y marcarla
  document.querySelectorAll(".song-card").forEach((card) => {
    if (
      card.getAttribute("onclick") &&
      card.getAttribute("onclick").includes(videoId)
    ) {
      card.classList.add("playing");
      const playIndicator = card.querySelector(".song-play");
      if (playIndicator) playIndicator.textContent = "♫";
    }
  });

  // Scroll suave al reproductor
  const playerContainer = document.getElementById("player-container");
  if (playerContainer) {
    setTimeout(() => {
      playerContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 200);
  }

  currentSongId = videoId;
}

// ═══════════════════════════════════════════════════════════════
//   BOTÓN SOS FLOTANTE
// ═══════════════════════════════════════════════════════════════

// Frases que rota el panel SOS cada vez que se abre
const FRASES_SOS = [
  '"Estás a salvo. Este momento va a pasar."',
  '"Respirá. Una vez. Otra vez. Bien."',
  '"Tu cuerpo te está protegiendo. No estás en peligro."',
  '"Lo que sentís es real, pero no es permanente."',
  '"Estoy acá. Siempre voy a estar."',
];
let indiceSOS = 0;

function toggleSOS() {
  const panel   = document.getElementById('sos-panel');
  const overlay = document.getElementById('sos-overlay');
  const fab     = document.getElementById('sos-fab');
  const fraseEl = document.getElementById('sos-frase');

  if (!panel) return;

  const isOpen = panel.classList.contains('open');

  if (isOpen) {
    // Cerrar
    panel.classList.remove('open');
    overlay.classList.remove('open');
    fab.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  } else {
    // Abrir — rotar frase
    indiceSOS = (indiceSOS + 1) % FRASES_SOS.length;
    if (fraseEl) fraseEl.textContent = FRASES_SOS[indiceSOS];

    panel.classList.add('open');
    overlay.classList.add('open');
    fab.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // evita scroll mientras panel abierto
  }
}

function irACalma() {
  // Cerrar panel SOS
  toggleSOS();
  // Esperar que cierre y navegar
  setTimeout(() => {
    scrollToSection('calma');
  }, 450);
}

// ═══════════════════════════════════════════════════════════════
//   NAVEGACIÓN — SCROLL SPY
// ═══════════════════════════════════════════════════════════════
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const navHeight = document.querySelector('.nav-bar')?.offsetHeight || 0;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

function initScrollSpy() {
  const sections = ['calma', 'recuerdos', 'mensaje', 'musica', 'ternura'];
  const navBtns = {
    calma:     document.getElementById('nav-calma'),
    recuerdos: document.getElementById('nav-recuerdos'),
    mensaje:   document.getElementById('nav-mensaje'),
    musica:    document.getElementById('nav-musica'),
    ternura:   document.getElementById('nav-ternura'),
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Quitar activos
          Object.values(navBtns).forEach((btn) =>
            btn?.classList.remove("active"),
          );
          // Activar el correcto
          const id = entry.target.id;
          if (navBtns[id]) navBtns[id].classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ═══════════════════════════════════════════════════════════════
//   ANIMACIONES DE SCROLL (Intersection Observer)
// ═══════════════════════════════════════════════════════════════
function initRevealAnimations() {
  // Agregar clase 'reveal' a los elementos que quieras animar
  const targets = document.querySelectorAll(
    ".section-header, .calma-card, .breath-card, .memory-viewer, .letter-container, .player-container, .music-category, .song-card, .ternura-viewer, .section-sorpresa"
  );

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}
