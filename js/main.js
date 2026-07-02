/**
 * Van Gogh — Immersive Experience (Hybrid Premium Solution)
 *
 * 1. Загрузка ~2-3 сек: Захватывает кадры 14-мегабайтного видео в память на скорости 6x.
 * 2. 0ms Scroll Lag: Отрисовка идет мгновенно через Canvas (чистые пиксели из RAM).
 * 3. Нелинейная прокрутка: В начале видео скроллится на 200% быстрее, чтобы движение начиналось сразу же.
 * 4. Умные оверлеи 1 и 2: Анимации выезда привязаны к секундам видео (блок 1: 8.0s-10.8s, блок 2: 18.0s-20.8s).
 */

// ── Настройки ────────────────────────────────────────────────
const VIDEO_SRC         = 'video/01.mp4';
const PIXELS_PER_SECOND = 500;   // Масштаб скролла для плавности
const JPEG_QUALITY      = 0.80;  // Сжатие кадров в памяти

// Фазы оверлея 1 (в секундах видео)
const OV_FADE_IN_START  = 8.0;
const OV_FADE_IN_END    = 8.8;
const OV_HOLD_END       = 10.0;
const OV_SLIDE_OUT_END  = 10.8;

// Фазы оверлея 2 (в секундах видео)
const OV2_FADE_IN_START = 18.0;
const OV2_FADE_IN_END   = 18.8;
const OV2_HOLD_END      = 20.0;
const OV2_SLIDE_OUT_END = 20.8;
// ─────────────────────────────────────────────────────────────

// ── Переводы (5 языков) ──────────────────────────────────────
const TRANSLATIONS = {
  uk: {
    lang: 'UA',
    nav1: 'Про Ван Гога',
    nav2: 'Його життя',
    nav3: 'Творчість',
    nav4: 'Листи до Тео',
    nav5: 'Цікаві факти',
    title:    'Вінсент ван Гог',
    subtitle: 'Світ очима, що відчувають глибше',
    desc:     'Його картини — це не просто кольори й мазки.\nЦе емоції, думки, біль і надія.',
    p1title: 'Тривога',      p1sub: 'Коли всередині буря',
    p2title: 'Самотність',   p2sub: 'Коли ти наодинці зі світом',
    p3title: 'Надія',        p3sub: 'Коли попри все хочеться жити',
    p4title: 'Натхнення',    p4sub: 'Коли світ сповнений краси',
    p5title: 'Любов',        p5sub: 'Коли серце бачить більше',
    // Блок 2
    sec2_title: 'Карта творчості',
    sec2_subtitle: 'Шлях мандрівок та визначних місць у житті Вінсента',
    comingSoon: 'Очікується незабаром',
    // Картопля
    contact_dev: 'Зв\'язок з розробником',
    pot1_title: 'ОБЛИЧЧЯ ЗЕМЛИСТОГО КОЛЬОРУ', pot1_desc: 'символ землі, якою вони годуються.',
    pot2_title: 'ПРАЦЯ ТА МОЗОЛІ', pot2_desc: 'сіль землі, як приправа до картоплі.',
    pot3_title: 'СВІТЛО ЛАМПИ', pot3_desc: 'єдине світло надії в їхньому житті.',
    pot4_title: 'ЧАЙНИК', pot4_desc: 'символ тепла в цьому злиденному домі.',
    pot5_title: 'ВІРА ТА БОГ', pot5_desc: 'єдині свідки їхніх страждань.',
    pot6_title: 'ПІДГНИЛА ПЕЧЕНА КАРТОПЛЯ', pot6_desc: 'нагорода за тяжку працю.',
    detailsToggle: 'Деталі',
    mobile_title: 'Тільки для ПК',
    mobile_desc: 'Цей сайт створено як імерсивний досвід, який найкраще працює на великих екранах.<br>Будь ласка, відкрийте сайт на своєму ноутбуці або ПК для повного занурення.',
  },
  en: {
    lang: 'EN',
    nav1: 'About Van Gogh',
    nav2: 'His Life',
    nav3: 'Artwork',
    nav4: 'Letters to Theo',
    nav5: 'Did You Know?',
    title:    'Vincent van Gogh',
    subtitle: 'The world through eyes that feel deeper',
    desc:     'His paintings are not just colors and brushstrokes.\nThey are emotions, thoughts, pain and hope.',
    p1title: 'Anxiety',      p1sub: 'When there\'s a storm inside',
    p2title: 'Solitude',     p2sub: 'When you are alone with the world',
    p3title: 'Hope',         p3sub: 'When you want to live despite everything',
    p4title: 'Inspiration',  p4sub: 'When the world is full of beauty',
    p5title: 'Love',         p5sub: 'When the heart sees more',
    // Блок 2
    sec2_title: 'Journey Map',
    sec2_subtitle: 'The places and travels that shaped Vincent\'s artistic life',
    comingSoon: 'Coming soon',
    contact_dev: 'Contact developer',
    pot1_title: 'EARTHEN-COLORED FACES', pot1_desc: 'a symbol of the earth they feed on.',
    pot2_title: 'HARD WORK AND CALLUSES', pot2_desc: 'the salt of the earth, like seasoning for potatoes.',
    pot3_title: 'LAMP LIGHT', pot3_desc: 'the only light of hope in their lives.',
    pot4_title: 'THE KETTLE', pot4_desc: 'a symbol of warmth in this destitute home.',
    pot5_title: 'FAITH AND GOD', pot5_desc: 'the only witnesses to their suffering.',
    pot6_title: 'ROTTEN BAKED POTATOES', pot6_desc: 'the reward for hard labor.',
    detailsToggle: 'Details',
    mobile_title: 'PC Only',
    mobile_desc: 'This site is designed as an immersive experience best viewed on large screens.<br>Please open the site on your laptop or PC for full immersion.',
  },
  es: {
    lang: 'ES',
    nav1: 'Sobre Van Gogh',
    nav2: 'Su vida',
    nav3: 'Arte',
    nav4: 'Cartas a Theo',
    nav5: '¿Sabías que?',
    title:    'Vincent van Gogh',
    subtitle: 'El mundo a través de ojos que sienten más',
    desc:     'Sus pinturas no son solo colores y pinceladas.\nSon emociones, pensamientos, dolor y esperanza.',
    p1title: 'Ansiedad',     p1sub: 'Cuando hay una tormenta dentro',
    p2title: 'Soledad',      p2sub: 'Cuando estás solo con el mundo',
    p3title: 'Esperanza',    p3sub: 'Cuando quieres vivir a pesar de todo',
    p4title: 'Inspiración',  p4sub: 'Cuando el mundo está lleno de belleza',
    p5title: 'Amor',         p5sub: 'Cuando el corazón ve más',
    // Блок 2
    sec2_title: 'Mapa del viaje',
    sec2_subtitle: 'Los lugares y recorridos que definieron la vida de Vincent',
    comingSoon: 'Próximamente',
    contact_dev: 'Contactar al desarrollador',
    pot1_title: 'ROSTROS COLOR TIERRA', pot1_desc: 'un símbolo de la tierra de la que se alimentan.',
    pot2_title: 'TRABAJO Y CALLOS', pot2_desc: 'la sal de la tierra, como condimento para las papas.',
    pot3_title: 'LA LUZ DE LA LÁMPARA', pot3_desc: 'la única luz de esperanza en sus vidas.',
    pot4_title: 'LA TETERA', pot4_desc: 'un símbolo de calidez en este hogar indigente.',
    pot5_title: 'LA FE Y DIOS', pot5_desc: 'los únicos testigos de su sufrimiento.',
    pot6_title: 'PAPAS ASADAS PODRIDAS', pot6_desc: 'la recompensa por el trabajo duro.',
    detailsToggle: 'Detalles',
    mobile_title: 'Solo PC',
    mobile_desc: 'Este sitio está diseñado como una experiencia inmersiva que se ve mejor en pantallas grandes.<br>Por favor, abra el sitio en su computadora portátil o PC para una inmersión total.',
  },
  pt: {
    lang: 'PT',
    nav1: 'Sobre Van Gogh',
    nav2: 'Sua vida',
    nav3: 'Arte',
    nav4: 'Cartas a Theo',
    nav5: 'Você sabia?',
    title:    'Vincent van Gogh',
    subtitle: 'O mundo pelos olhos que sentem mais fundo',
    desc:     'Suas pinturas não são apenas cores e pinceladas.\nSão emoções, pensamentos, dor e esperança.',
    p1title: 'Ansiedade',    p1sub: 'Quando há uma tempestade por dentro',
    p2title: 'Solidão',      p2sub: 'Quando você está só com o mundo',
    p3title: 'Esperança',    p3sub: 'Quando você quer viver apesar de tudo',
    p4title: 'Inspiração',   p4sub: 'Quando o mundo está cheio de beleza',
    p5title: 'Amor',         p5sub: 'Quando o coração vê mais',
    // Блок 2
    sec2_title: 'Mapa da Jornada',
    sec2_subtitle: 'Os caminhos e lugares marcantes na vida artística de Vincent',
    comingSoon: 'Em breve',
    contact_dev: 'Contatar desenvolvedor',
    pot1_title: 'ROSTOS COR DE TERRA', pot1_desc: 'um símbolo da terra de onde se alimentam.',
    pot2_title: 'TRABALHO E CALOS', pot2_desc: 'o sal da terra, como tempero para as batatas.',
    pot3_title: 'LUZ DA LÂMPADA', pot3_desc: 'a única luz de esperança em suas vidas.',
    pot4_title: 'A CHALEIRA', pot4_desc: 'um símbolo de calor neste lar destituído.',
    pot5_title: 'FÉ E DEUS', pot5_desc: 'os únicos testemunhos de seu sofrimento.',
    pot6_title: 'BATATAS ASSADAS PODRES', pot6_desc: 'a recompensa pelo trabalho árduo.',
    detailsToggle: 'Detalhes',
    mobile_title: 'Apenas PC',
    mobile_desc: 'Este site foi projetado como uma experiência imersiva melhor visualizada em telas grandes.<br>Por favor, abra o site em seu laptop ou PC para imersão total.',
  },
  ru: {
    lang: 'RU',
    nav1: 'О Ван Гоге',
    nav2: 'Его жизнь',
    nav3: 'Творчество',
    nav4: 'Письма Тео',
    nav5: 'Интересные факты',
    title:    'Винсент ван Гог',
    subtitle: 'Мир глазами, что чувствуют глубже',
    desc:     'Его картины — это не просто цвета и мазки.\nЭто емоции, мысли, боль и надежда.',
    p1title: 'Тревога',      p1sub: 'Когда внутри буря',
    p2title: 'Одиночество',  p2sub: 'Когда ты наедине с миром',
    p3title: 'Надежда',      p3sub: 'Когда несмотря ни на что хочется жить',
    p4title: 'Вдохновение',  p4sub: 'Когда мир наполнен красотой',
    p5title: 'Любовь',       p5sub: 'Когда сердце видит больше',
    // Блок 2
    sec2_title: 'Карта творчества',
    sec2_subtitle: 'Путь странствий и ключевых мест в жизни Винсента',
    comingSoon: 'Ожидается скоро',
    contact_dev: 'Связь с разработчиком',
    pot1_title: 'ЛИЦА ЗЕМЛИСТОГО ЦВЕТА', pot1_desc: 'символ земли, которой они кормятся.',
    pot2_title: 'ТРУД И МОЗОЛИ', pot2_desc: 'соль земли, как приправа к картофелю.',
    pot3_title: 'СВЕТ ЛАМПЫ', pot3_desc: 'единственный свет надежды их жизни.',
    pot4_title: 'ЧАЙНИК', pot4_desc: 'символ тепла в этом нищем доме.',
    pot5_title: 'ВЕРА И БОГ', pot5_desc: 'единственные свидетели их страданий.',
    pot6_title: 'ПОДГНИВШИЙ ПЕЧЁНЫЙ КАРТОФЕЛЬ', pot6_desc: 'награда за тяжкий труд.',
    detailsToggle: 'Детали',
    mobile_title: 'Только для ПК',
    mobile_desc: 'Этот сайт создан как иммерсивный опыт, который лучше всего работает на больших экранах.<br>Пожалуйста, откройте сайт на своем ноутбуке или ПК для полного погружения.',
  },
};

let currentLang = 'uk';

// ── DOM ──────────────────────────────────────────────────────
const canvas      = document.getElementById('display-canvas');
const ctx         = canvas.getContext('2d');
const loader      = document.getElementById('loader');
const loaderFill  = document.getElementById('loader-bar-fill');
const loaderPct   = document.getElementById('loader-pct');
const progressBar = document.getElementById('progress-bar');
const scrollHint  = document.getElementById('scroll-hint');
const spacer      = document.getElementById('spacer');

// Оверлей 1
const overlay     = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');

// Оверлей 2
const overlay2    = document.getElementById('overlay2');
const overlay2Content = document.getElementById('overlay2-content');

const langBtn     = document.getElementById('lang-btn');
const langLabel   = document.getElementById('lang-label');
const langDropdown= document.getElementById('lang-dropdown');

// DPR для четкости на Retina дисплеях
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
const DPR      = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 1.5);
const MAX_W    = isMobile ? 720  : 1280;
const MAX_H    = isMobile ? 405  : 720;
const CAPTURE_W = Math.min(window.innerWidth,  MAX_W);
const CAPTURE_H = Math.min(window.innerHeight, MAX_H);

// Скрытое видео для декодирования кадров
const video = document.createElement('video');
video.src = VIDEO_SRC; video.muted = true; video.playsInline = true; video.preload = 'auto';
video.style.display = 'none';
document.body.appendChild(video);

// Вспомогательный canvas для экспорта
const offCanvas = document.createElement('canvas');
offCanvas.width = CAPTURE_W; offCanvas.height = CAPTURE_H;
const offCtx = offCanvas.getContext('2d');

let frames = [], duration = 0, ready = false, ticking = false, lastIdx = -1;

// Подгонка размера display-canvas
function resizeCanvas() {
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width  = Math.round(w * DPR);
  canvas.height = Math.round(h * DPR);
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resizeCanvas();

// ── Язык ─────────────────────────────────────────────────────
function applyLanguage(lang) {
  currentLang = lang;
  const t = TRANSLATIONS[lang];
  langLabel.textContent = t.lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      if (key === 'desc' || key === 'mobile_desc') {
        el.innerHTML = t[key].replace(/\n/g, '<br>');
      } else {
        el.textContent = t[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
    const key = el.dataset.i18nTooltip;
    if (t[key] !== undefined) {
      el.setAttribute('data-tooltip', t[key]);
    }
  });

  langDropdown.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update map image based on selected language
  const mapImg = document.getElementById('map-img');
  if (mapImg) {
    const mapSources = {
      uk: 'images/Map_ukr.webp',
      en: 'images/Map_eng.webp',
      es: 'images/Map_esp.webp',
      pt: 'images/Map_port.webp',
      ru: 'images/Map_rus.webp'
    };
    if (mapSources[lang]) {
      mapImg.src = mapSources[lang]; // Исправлено: для <img> нужно менять src, а не href
    }
  }
  localStorage.setItem('vangogh_lang', lang);
}

langBtn.addEventListener('click', e => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
});
langDropdown.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    applyLanguage(btn.dataset.lang);
    langDropdown.classList.remove('open');
  });
});
document.addEventListener('click', () => langDropdown.classList.remove('open'));

function getInitialLanguage() {
  const savedLang = localStorage.getItem('vangogh_lang');
  if (savedLang && TRANSLATIONS[savedLang]) {
    return savedLang;
  }
  
  const userLangs = navigator.languages || [navigator.language || navigator.userLanguage];
  if (userLangs) {
    for (let l of userLangs) {
      if (!l) continue;
      const shortLang = l.split('-')[0].toLowerCase();
      if (TRANSLATIONS[shortLang]) {
        return shortLang;
      }
    }
  }
  
  return 'uk';
}

applyLanguage(getInitialLanguage());

// ── 1. Ждем метаданные ────────────────────────────────────────
video.addEventListener('loadedmetadata', () => {
  duration = video.duration;
  spacer.style.height = (duration * PIXELS_PER_SECOND) + 'px';
  startExtraction();
});
video.load();

// ── 2. Извлечение кадров в память (ускоренное) ────────────────
function startExtraction() {
  if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
    extractViaPlaythrough();
  } else {
    extractViaSeek();
  }
}

function extractViaPlaythrough() {
  const captured = [];
  function onFrame(now, meta) {
    offCtx.drawImage(video, 0, 0, CAPTURE_W, CAPTURE_H);
    const img = new Image();
    img.src = offCanvas.toDataURL('image/jpeg', JPEG_QUALITY);
    captured.push({ time: meta.mediaTime, img });
    setLoaderProgress(meta.mediaTime / duration);
    if (!video.ended && meta.mediaTime < duration - 0.05) {
      video.requestVideoFrameCallback(onFrame);
    } else {
      finalize(captured);
    }
  }
  video.addEventListener('ended', () => finalize(captured), { once: true });
  video.requestVideoFrameCallback(onFrame);
  video.playbackRate = 6.0; // 6x скорость захвата
  video.play();
}

async function extractViaSeek() {
  const FPS = isMobile ? 12 : 15;
  const total = Math.ceil(duration * FPS);
  const captured = [];
  for (let i = 0; i <= total; i++) {
    video.currentTime = i / FPS;
    await new Promise(r => video.addEventListener('seeked', r, { once: true }));
    offCtx.drawImage(video, 0, 0, CAPTURE_W, CAPTURE_H);
    const img = new Image();
    img.src = offCanvas.toDataURL('image/jpeg', JPEG_QUALITY);
    captured.push({ time: i / FPS, img });
    setLoaderProgress(i / total);
  }
  finalize(captured);
}

function finalize(captured) {
  if (ready) return;
  captured.sort((a, b) => a.time - b.time);
  frames = captured.map(f => f.img);
  onExtractionDone();
}
function setLoaderProgress(p) {
  const pct = Math.min(Math.round(p * 100), 100);
  loaderFill.style.width = pct + '%';
  loaderPct.textContent  = pct + '%';
}

function onExtractionDone() {
  ready = true;
  drawFrame(0);
  setLoaderProgress(1);
  setTimeout(() => loader.classList.add('hidden'), 300);
  video.pause(); video.removeAttribute('src'); video.load();

  window.addEventListener('scroll',            onScroll,      { passive: true });
  window.addEventListener('resize',            onResize,      { passive: true });
  window.addEventListener('orientationchange', onOrientation, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onViewportResize, { passive: true });
  }
  update();
}

// ── 3. Скролл ────────────────────────────────────────────────
function onScroll() {
  if (!ticking) { requestAnimationFrame(update); ticking = true; }
}

function update() {
  ticking = false;
  if (!ready || !frames.length) return;

  const scrollY   = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress  = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

  progressBar.style.width = (progress * 100) + '%';
  scrollHint.classList.toggle('hidden', scrollY > 30);

  // Нелинейность: более быстрое воспроизведение видео вначале скролла
  const warpedProgress = Math.pow(progress, 0.65);
  const targetTime = warpedProgress * duration;

  // Отрисовка кадра
  const idx = Math.min(Math.round(warpedProgress * (frames.length - 1)), frames.length - 1);
  if (idx !== lastIdx) { lastIdx = idx; drawFrame(idx); }

  // Параллакс параметры
  const slideDistance = window.innerHeight;
  const driftDistance = 150;

  // ── Оверлей 1 (8.0s — 10.8s) ─────────────────────────────────
  let ov1TranslateY = slideDistance;
  let ov1Active = false;

  if (targetTime <= OV_FADE_IN_START) {
    ov1TranslateY = slideDistance;
    ov1Active = false;
  } else if (targetTime <= OV_FADE_IN_END) {
    const t = (targetTime - OV_FADE_IN_START) / (OV_FADE_IN_END - OV_FADE_IN_START);
    ov1TranslateY = slideDistance * (1 - t);
    ov1Active = true;
  } else if (targetTime <= OV_HOLD_END) {
    const t = (targetTime - OV_FADE_IN_END) / (OV_HOLD_END - OV_FADE_IN_END);
    ov1TranslateY = -driftDistance * t;
    ov1Active = true;
  } else if (targetTime <= OV_SLIDE_OUT_END) {
    const t = (targetTime - OV_HOLD_END) / (OV_SLIDE_OUT_END - OV_HOLD_END);
    ov1TranslateY = -driftDistance - (slideDistance * t);
    ov1Active = true;
  } else {
    ov1TranslateY = -slideDistance - driftDistance;
    ov1Active = false;
  }

  overlay.style.pointerEvents = ov1Active ? 'auto' : 'none';
  overlayContent.style.transform = `translateY(${ov1TranslateY}px)`;

  // ── Оверлей 2 (18.0s — 20.8s) ────────────────────────────────
  let ov2TranslateY = slideDistance;
  let ov2Active = false;

  if (targetTime <= OV2_FADE_IN_START) {
    ov2TranslateY = slideDistance;
    ov2Active = false;
  } else if (targetTime <= OV2_FADE_IN_END) {
    const t = (targetTime - OV2_FADE_IN_START) / (OV2_FADE_IN_END - OV2_FADE_IN_START);
    ov2TranslateY = slideDistance * (1 - t);
    ov2Active = true;
  } else if (targetTime <= OV2_HOLD_END) {
    const t = (targetTime - OV2_FADE_IN_END) / (OV2_HOLD_END - OV2_FADE_IN_END);
    ov2TranslateY = -driftDistance * t;
    ov2Active = true;
  } else if (targetTime <= OV2_SLIDE_OUT_END) {
    const t = (targetTime - OV2_HOLD_END) / (OV2_SLIDE_OUT_END - OV2_HOLD_END);
    ov2TranslateY = -driftDistance - (slideDistance * t);
    ov2Active = true;
  } else {
    ov2TranslateY = -slideDistance - driftDistance;
    ov2Active = false;
  }

  overlay2.style.pointerEvents = ov2Active ? 'auto' : 'none';
  overlay2Content.style.transform = `translateY(${ov2TranslateY}px)`;

  // Update HQ Layer opacity
  const hqLayer = document.getElementById('hq-potato-layer');
  const qualityToggle = document.getElementById('quality-toggle');
  if (hqLayer) {
    if (qualityToggle && qualityToggle.checked) {
      if (progress >= 0.995) {
        hqLayer.style.opacity = 1;
      } else if (progress > 0.95) {
        hqLayer.style.opacity = (progress - 0.95) / (0.995 - 0.95);
      } else {
        hqLayer.style.opacity = 0;
      }
    } else {
      hqLayer.style.opacity = 0;
    }
  }

  if (typeof checkPotatoOverlay === 'function') {
    checkPotatoOverlay(progress);
  }
}

function drawFrame(idx) {
  const img = frames[idx];
  if (img && img.complete && img.naturalWidth > 0) {
    const canvasW = window.innerWidth;
    const canvasH = window.innerHeight;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let drawW, drawH, x, y;

    if (imgRatio > canvasRatio) {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      x = (canvasW - drawW) / 2;
      y = 0;
    } else {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      x = 0;
      y = (canvasH - drawH) / 2;
    }

    ctx.drawImage(img, x, y, drawW, drawH);
    
    // Sync HQ Layer position
    const hqLayer = document.getElementById('hq-potato-layer');
    if (hqLayer) {
      hqLayer.style.left = x + 'px';
      hqLayer.style.top = y + 'px';
      hqLayer.style.width = drawW + 'px';
      hqLayer.style.height = drawH + 'px';
    }
  }
}

// ── 4. Ресайз / поворот ──────────────────────────────────────
function onResize() {
  resizeCanvas();
  if (ready) { lastIdx = -1; update(); }
}
function onOrientation() {
  setTimeout(() => {
    resizeCanvas();
    if (ready) { spacer.style.height = (duration * PIXELS_PER_SECOND) + 'px'; lastIdx = -1; update(); }
  }, 150);
}
function onViewportResize() {
  resizeCanvas();
  if (ready) { lastIdx = -1; update(); }
}

// ══════════════════════════════════════════════════════════
// MAP PAINTING ZONES — данные для всех 8 локаций
// Добавляй данные по мере добавления картин в images/
// ══════════════════════════════════════════════════════════

const PAINTING_ZONES = {
  1: {
    image:  'images/1 dvoe detey.webp',
    title:  {
      uk: '«Двоє дітей»',
      en: '"Two Children"',
      es: '"Dos Niños"',
      pt: '"Duas Crianças"',
      ru: '«Двое детей»',
    },
    year:   '1890 · Зюндерт, Нидерланды',
    desc: {
      uk: 'Вінсент ван Гог створив цю картину в 1890 році, незадовго до своєї загибелі. Всупереч своєму душевному стану, художник зображує сцену глибокого миру і спокою, немов прагнучи відобразити ідеалізований образ «священного» моменту навчання і споглядання. Він писав її у пориві гарячкового натхнення, прагнучи створити картину, яка несе в собі світло істини і надію на зцілення через мистецтво. Використання м\'яких, «заспокійливих» кольорів і стриманої композиції відображає його боротьбу за збереження розуму в той час, коли він писав цей шедевр. Картина стала його останнім оплотом перед трагічною загибеллю, свідченням його прагнення до гармонії і вічної цінності знань, які можуть освітити навіть найтемніші моменти людського буття.',
      en: 'Vincent van Gogh created this painting in 1890, shortly before his death. Despite his mental state, the artist depicts a scene of profound peace and tranquility, as if seeking to capture an idealized image of a "sacred" moment of learning and contemplation. He painted it in a fit of feverish inspiration, striving to create a picture that carries the light of truth and hope for healing through art. The use of soft, "calming" colors and a restrained composition reflects his struggle to preserve his sanity at the time he painted this masterpiece. The painting became his last stronghold before his tragic death, a testament to his striving for harmony and the eternal value of knowledge that can illuminate even the darkest moments of human existence.',
      es: 'Vincent van Gogh creó esta pintura en 1890, poco antes de su muerte. A pesar de su estado mental, el artista representa una escena de profunda paz y tranquilidad, como si buscara capturar una imagen idealizada de un momento "sagrado" de aprendizaje y contemplación. La pintó en un arrebato de inspiración febril, esforzándose por crear un cuadro que lleve la luz de la verdad y la esperanza de curación a través del arte. El uso de colores suaves y "relajantes" y una composición sobria refleja su lucha por preservar la cordura en el momento en que pintó esta obra maestra. La pintura se convirtió en su último bastión antes de su trágica muerte, un testimonio de su búsqueda de la armonía y el valor eterno del conocimiento que puede iluminar incluso los momentos más oscuros de la existencia humana.',
      pt: 'Vincent van Gogh criou esta pintura em 1890, pouco antes de sua morte. Apesar de seu estado mental, o artista retrata uma cena de profunda paz e tranquilidade, como se buscasse capturar uma imagem idealizada de um momento "sagrado" de aprendizado e contemplação. Ele a pintou em um acesso de inspiração febril, esforçando-se para criar um quadro que carrega a luz da verdade e a esperança de cura através da arte. O uso de cores suaves e "calmantes" e uma composição contida reflete sua luta para preservar a sanidade na época em que pintou esta obra-prima. A pintura tornou-se sua última fortaleza antes de sua trágica morte, um testemunho de sua busca pela harmonia e pelo valor eterno do conhecimento que pode iluminar até os momentos mais sombrios da existência humana.',
      ru: 'Винсент ван Гог создал эту картину в 1890 году, незадолго до своей гибели. Вопреки своему душевному состоянию, художник изображает сцену глубокого мира и спокойствия, словно стремясь запечатлеть идеализированный образ «священного» момента обучения и созерцания. Он писал её в порыве лихорадочного вдохновения, стремясь создать картину, которая несет в себе свет истины и надежду на исцеление через искусство. Использование мягких, «успокаивающих» цветов и сдержанной композиции отражает его борьбу за сохранение рассудка в то время, когда он писал этот шедевр. Картина стала его последним оплотом перед трагической гибелью, свидетельством его стремления к гармонии и вечной ценности знаний, которые могут осветить даже самые темные моменты человеческого бытия.'
    },
    active: true,
  },
  2: {
    image:  'images/2 vid na more u Sheveningena.webp',
    title:  { uk: '«Вид на море у Схевенінгені»', en: '"Sea View at Scheveningen"', es: '"Vista del mar en Scheveningen"', pt: '"Vista do mar em Scheveningen"', ru: '«Вид на море у Схевенингена»' },
    year:   '1882 · Схевенинген',
    desc: {
      uk: 'Ця картина, створена в 1882 році, коли Вінсент тільки починав свій шлях художника, переносить нас на бурхливе узбережжя Північного моря. Всупереч спокою, який ми бачили в його пізніших роботах, цей морський пейзаж написаний у стані глибокої тривоги і внутрішнього сум\'яття. Ван Гог немов вихлюпує на полотно бурю, що вирує в його душі, використовуючи густі, важкі мазки і похмуру, драматичну палітру. Він стоїть обличчям до стихії, шукаючи в цьому протистоянні зцілення, прагнучи відобразити не просто вид моря, а саму енергію боротьби, яка стане лейтмотивом усього його життя. Це полотно — перший оплот художника перед обличчям життєвих бур, свідчення його непереборного прагнення знайти гармонію і сенс через мистецтво, навіть коли світ навколо здається похмурим і неспокійним.',
      en: 'This painting, created in 1882 when Vincent was just beginning his journey as an artist, transports us to the stormy coast of the North Sea. Contrary to the calm we saw in his later works, this seascape is painted in a state of deep anxiety and inner turmoil. Van Gogh seems to pour out the storm raging in his soul onto the canvas, using thick, heavy brushstrokes and a gloomy, dramatic palette. He faces the elements, seeking healing in this confrontation, striving to capture not just a view of the sea, but the very energy of struggle that will become the leitmotif of his entire life. This canvas is the artist\'s first stronghold in the face of life\'s storms, a testament to his overwhelming desire to find harmony and meaning through art, even when the world around seems grim and restless.',
      es: 'Esta pintura, creada en 1882 cuando Vincent recién comenzaba su camino como artista, nos transporta a la tormentosa costa del Mar del Norte. Contrario a la calma que vimos en sus obras posteriores, este paisaje marino está pintado en un estado de profunda ansiedad y agitación interna. Van Gogh parece derramar sobre el lienzo la tormenta que ruge en su alma, utilizando pinceladas gruesas y pesadas y una paleta sombría y dramática. Se enfrenta a los elementos, buscando la curación en este enfrentamiento, esforzándose por capturar no solo una vista del mar, sino la energía misma de la lucha que se convertirá en el leitmotiv de toda su vida. Este lienzo es el primer bastión del artista ante las tormentas de la vida, un testimonio de su abrumador deseo de encontrar armonía y significado a través del arte, incluso cuando el mundo exterior parece sombrío e inquieto.',
      pt: 'Esta pintura, criada em 1882 quando Vincent estava apenas começando sua jornada como artista, nos transporta para a costa tempestuosa do Mar do Norte. Ao contrário da calma que vimos em suas obras posteriores, esta paisagem marinha é pintada em um estado de profunda ansiedade e turbulência interior. Van Gogh parece derramar a tempestade que ruge em sua alma na tela, usando pinceladas grossas e pesadas e uma paleta sombria e dramática. Ele enfrenta os elementos, buscando cura neste confronto, esforçando-se para capturar não apenas uma vista do mar, mas a própria energia da luta que se tornará o leitmotiv de toda a sua vida. Esta tela é a primeira fortaleza do artista diante das tempestades da vida, um testemunho de seu desejo avassalador de encontrar harmonia e significado através da arte, mesmo quando o mundo ao redor parece sombrio e inquieto.',
      ru: 'Эта картина, созданная в 1882 году, когда Винсент только начинал свой путь художника, переносит нас на бурное побережье Северного моря. Вопреки спокойствию, которое мы видели в его более поздних работах, этот морской пейзаж написан в состоянии глубокой тревоги и внутреннего смятения. Ван Гог словно выплескивает на холст бурю, бушующую в его душе, используя густые, тяжелые мазки и мрачную, драматичную палитру. Он стоит лицом к стихии, ища в этом противостоянии исцеление, стремясь запечатлеть не просто вид моря, а саму энергию борьбы, которая станет лейтмотивом всей его жизни. Это полотно — первый оплот художника перед лицом жизненных бурь, свидетельство его непреодолимого стремления найти гармонию и смысл через искусство, даже когда мир вокруг кажется мрачным и беспокойным.'
    },
    active: true,
  },
  3: {
    image:  'images/3 edoki kartofela.webp',
    title:  { uk: '«Їдці картоплі»', en: '"The Potato Eaters"', es: '"Los Comedores de Patatas"', pt: '"Os Comedores de Batatas"', ru: '«Едоки картофеля»' },
    year:   '1885 · Нюэнен',
    desc: {
      uk: '«Їдці картоплі» — це маніфест суворої правди, створений Вінсентом у Нюенені в 1885 році. Ван Гог писав цю роботу з глибоким внутрішнім трепетом, прагнучи передати не зовнішню красу, а саму суть виснажливого селянського побуту, де руки, що обробляють землю, самі стають частиною цієї землі. Він використовував нарочито темну, «землисту» палітру, щоб підкреслити зв\'язок героїв з ґрунтом, який їх годує. Це полотно — спроба художника возвеличити гідність простої людини, чиє єдине світло в житті — це тьмяний вогник лампи, що освітлює їхню чесну і важку працю.',
      en: '"The Potato Eaters" is a manifesto of harsh truth, created by Vincent in Nuenen in 1885. Van Gogh painted this work with deep inner trepidation, striving to convey not external beauty, but the very essence of grueling peasant life, where the hands that work the earth themselves become part of this earth. He used a deliberately dark, "earthy" palette to emphasize the heroes\' connection to the soil that feeds them. This canvas is the artist\'s attempt to elevate the dignity of the common man, whose only light in life is the dim flicker of a lamp illuminating their honest and hard work.',
      es: '"Los comedores de patatas" es un manifiesto de cruda verdad, creado por Vincent en Nuenen en 1885. Van Gogh pintó esta obra con profunda trepidación interior, esforzándose por transmitir no la belleza externa, sino la esencia misma de la agotadora vida campesina, donde las manos que trabajan la tierra se convierten en parte de esta tierra. Utilizó una paleta deliberadamente oscura y "terrosa" para enfatizar la conexión de los héroes con el suelo que los alimenta. Este lienzo es el intento del artista de elevar la dignidad del hombre común, cuya única luz en la vida es el tenue parpadeo de una lámpara que ilumina su trabajo honesto y duro.',
      pt: '"Os Comedores de Batatas" é um manifesto da dura verdade, criado por Vincent em Nuenen em 1885. Van Gogh pintou esta obra com profunda trepidação interior, esforçando-se para transmitir não a beleza externa, mas a própria essência da extenuante vida camponesa, onde as mãos que trabalham a terra tornam-se parte desta terra. Ele usou uma paleta deliberadamente escura e "terrosa" para enfatizar a conexão dos heróis com o solo que os alimenta. Esta tela é a tentativa do artista de elevar a dignidade do homem comum, cuja única luz na vida é o brilho fraco de uma lâmpada iluminando seu trabalho honesto e duro.',
      ru: '«Едоки картофеля» — это манифест суровой правды, созданный Винсентом в Нюэнене в 1885 году. Ван Гог писал эту работу с глубоким внутренним трепетом, стремясь передать не внешнюю красоту, а саму суть изнурительного крестьянского быта, где руки, обрабатывающие землю, сами становятся частью этой земли. Он использовал нарочито темную, «землистую» палитру, чтобы подчеркнуть связь героев с почвой, которая их кормит. Этот полотно — попытка художника возвеличить достоинство простого человека, чей единственный свет в жизни — это тусклый огонек лампы, освещающий их честный и тяжелый труд.'
    },
    active: true,
  },
  4: {
    image:  'images/4 butylki i posuda.webp',
    title:  { uk: '«Натюрморт з пляшками та глиняним посудом»', en: '"Still Life with Bottles and Earthenware"', es: '"Bodegón con botellas y cerámica"', pt: '"Natureza Morta com Garrafas e Louça de Barro"', ru: '«Натюрморт с бутылками и глиняной посудой»' },
    year:   '1884–1885 · Нюэнен',
    desc: {
      uk: 'У цьому натюрморті, створеному близько 1884-1885 років, Вінсент звертається до скромних, повсякденних предметів, які стають головними героями його мальовничого дослідження. Ван Гог писав ці пляшки та глиняний посуд з майже відчутною увагою до їхньої форми та матеріальності. Він використовує густі, соковиті мазки, щоб передати шорсткість глини та гладкість скла, а його стримана, землиста палітра — від глибоких вохристих тонів до насичених зелених і коричневих — створює відчуття вагомості та монументальності, здавалося б, незначних речей. Це полотно — свідчення його безперервного пошуку суті речей, який стане фундаментом для всієї його зрілої творчості.',
      en: 'In this still life, created around 1884-1885, Vincent turns to humble, everyday objects, which become the main subjects of his pictorial exploration. Van Gogh painted these bottles and earthenware with an almost tangible attention to their shape and materiality. He uses thick, juicy brushstrokes to convey the roughness of the clay and the smoothness of the glass, and his restrained, earthy palette—from deep ochre tones to rich greens and browns—creates a sense of weight and monumentality in seemingly insignificant things. This canvas is a testament to his continuous search for the essence of things, which will become the foundation for all his mature work.',
      es: 'En este bodegón, creado alrededor de 1884-1885, Vincent recurre a objetos humildes y cotidianos, que se convierten en los protagonistas de su exploración pictórica. Van Gogh pintó estas botellas y vasijas de barro con una atención casi tangible a su forma y materialidad. Utiliza pinceladas gruesas y jugosas para transmitir la rugosidad de la arcilla y la suavidad del vidrio, y su paleta sobria y terrosa, desde tonos ocres profundos hasta ricos verdes y marrones, crea una sensación de peso y monumentalidad en cosas aparentemente insignificantes. Este lienzo es testimonio de su búsqueda continua de la esencia de las cosas, que se convertirá en la base de toda su obra de madurez.',
      pt: 'Nesta natureza morta, criada por volta de 1884-1885, Vincent volta-se para objetos humildes e cotidianos, que se tornam os protagonistas de sua exploração pictórica. Van Gogh pintou essas garrafas e louças de barro com uma atenção quase tangível à sua forma e materialidade. Ele usa pinceladas grossas e suculentas para transmitir a aspereza da argila e a suavidade do vidro, e sua paleta contida e terrosa - de tons ocres profundos a verdes e marrons ricos - cria uma sensação de peso e monumentalidade em coisas aparentemente insignificantes. Esta tela é um testemunho de sua busca contínua pela essência das coisas, que se tornará a base para toda a sua obra madura.',
      ru: 'В этом натюрморте, созданном около 1884-1885 годов, Винсент обращается к скромным, повседневным предметам, которые становятся главными героями его живописного исследования. Ван Гог писал эти бутылки и глиняную посуду с почти осязаемым вниманием к их форме и материальности. Он использует густые, сочные мазки, чтобы передать шероховатость глины и гладкость стекла, а его сдержанная, землистая палитра — от глубоких охристых тонов до насыщенных зеленых и коричневых — создает ощущение весомости и монументальности, казалось бы, незначительных вещей. Это полотно — свидетельство его непрерывного поиска сути вещей, который станет фундаментом для всего его зрелого творчества.'
    },
    active: true,
  },
  5: {
    image:  'images/5 salf.webp',
    title:  { uk: '«Автопортрет»', en: '"Self-Portrait"', es: '"Autorretrato"', pt: '"Autorretrato"', ru: '«Автопортрет»' },
    year:   '1888 · Париж',
    desc: {
      uk: 'Цей автопортрет 1888 року — глибоке й пронизливе дослідження душі художника перед його від\'їздом до Арля. Напружений, прямий погляд і гіпнотичне, вихрове тло відображають внутрішню бурю і те ментальне напруження, яке супроводжувало Ван Гога в той період. Використовуючи сміливі контрасти зеленуватих відтінків і густий, фактурний мазок, він створює не просто портретну схожість, а справжній маніфест свого пошуку мальовничої істини. Це полотно — свідчення щирого самовираження та непохитної рішучості художника знайти гармонію через мистецтво, навіть коли світ усередині здається неспокійним.',
      en: 'This 1888 self-portrait is a deep and piercing exploration of the artist\'s soul before his departure for Arles. The intense, direct gaze and the hypnotic, swirling background reflect the internal storm and mental tension that accompanied Van Gogh during that period. Using bold contrasts of greenish hues and thick, textured brushstrokes, he creates not just a portrait likeness, but a true manifesto of his search for pictorial truth. This canvas is a testament to the artist\'s sincere self-expression and unyielding determination to find harmony through art, even when the world inside seems restless.',
      es: 'Este autorretrato de 1888 es una exploración profunda y penetrante del alma del artista antes de su partida a Arlés. La mirada intensa y directa, y el fondo hipnótico y arremolinado, reflejan la tormenta interna y la tensión mental que acompañaron a Van Gogh durante ese período. Utilizando audaces contrastes de tonos verdosos y pinceladas gruesas y texturizadas, crea no solo un parecido en el retrato, sino un verdadero manifiesto de su búsqueda de la verdad pictórica. Este lienzo es testimonio de la sincera autoexpresión del artista y su determinación inquebrantable de encontrar la armonía a través del arte, incluso cuando el mundo interior parece inquieto.',
      pt: 'Este autorretrato de 1888 é uma exploração profunda e penetrante da alma do artista antes de sua partida para Arles. O olhar tenso e direto e o fundo hipnótico e rodopiante refletem a tempestade interna e a tensão mental que acompanharam Van Gogh durante aquele período. Usando contrastes ousados de tons esverdeados e pinceladas grossas e texturizadas, ele cria não apenas uma semelhança de retrato, mas um verdadeiro manifesto de sua busca pela verdade pictórica. Esta tela é um testemunho da sincera autoexpressão do artista e de sua determinação inabalável de encontrar harmonia através da arte, mesmo quando o mundo interior parece inquieto.',
      ru: 'Этот автопортрет 1888 года — глубокое и пронзительное исследование души художника перед его отъездом в Арль. Напряженный, прямой взгляд и гипнотический, вихревой фон отражают внутреннюю бурю и то ментальное напряжение, которое сопровождало Ван Гога в тот период. Используя смелые контрасты зеленоватых оттенков и густой, фактурный мазок, он создает не просто портретное сходство, а настоящий манифест своего поиска живописной истины. Это полотно — свидетельство искреннего самовыражения и непреклонной решимости художника найти гармонию через искусство, даже когда мир внутри кажется беспокойным.'
    },
    active: true,
  },
  6: {
    image:  'images/6_1 podsolnuhi.webp',
    title:  { uk: '«Соняшники»', en: '"Sunflowers"', es: '"Girasoles"', pt: '"Girassóis"', ru: '«Подсолнухи»' },
    year:   '1888 · Арль',
    desc: {
      uk: '«Соняшники» 1888 року — це гімн південному сонцю і втілення творчого захоплення Ван Гога в Арлі. Пишучи їх з гарячковою швидкістю в очікуванні приїзду Поля Гогена, художник прагнув передати саму суть життя, відображену в яскравому, майже відчутному кольорі. Використовуючи цілу палітру жовтих відтінків, він виходить далеко за межі простого натюрморту: кожна квітка, від розпущеного бутона до в\'янучого стебла, стає метафорою людського циклу — розквіту, зрілості та неминучого в\'янення. Ця робота — маніфест радості та вдячності за красу буття, де світло, втілене у фарбі, перетворює звичайні квіти на сліпучий символ життєвої сили, здатний освітити навіть найтемніші куточки людської душі.',
      en: 'The 1888 "Sunflowers" is a hymn to the southern sun and the embodiment of Van Gogh\'s creative delight in Arles. Painting them with feverish speed in anticipation of Paul Gauguin\'s arrival, the artist sought to convey the very essence of life, captured in bright, almost tangible color. Using a whole palette of yellow hues, he goes far beyond a simple still life: each flower, from a blooming bud to a fading stem, becomes a metaphor for the human cycle—blooming, maturity, and inevitable fading. This work is a manifesto of joy and gratitude for the beauty of existence, where light, embodied in paint, transforms ordinary flowers into a dazzling symbol of vitality, capable of illuminating even the darkest corners of the human soul.',
      es: 'Los "Girasoles" de 1888 son un himno al sol del sur y la encarnación del deleite creativo de Van Gogh en Arlés. Pintándolos a una velocidad febril en previsión de la llegada de Paul Gauguin, el artista buscó transmitir la esencia misma de la vida, capturada en colores brillantes y casi tangibles. Utilizando toda una paleta de tonos amarillos, va mucho más allá de un simple bodegón: cada flor, desde un capullo floreciente hasta un tallo marchito, se convierte en una metáfora del ciclo humano: florecimiento, madurez y marchitamiento inevitable. Esta obra es un manifiesto de alegría y gratitud por la belleza de la existencia, donde la luz, encarnada en pintura, transforma flores ordinarias en un símbolo deslumbrante de vitalidad, capaz de iluminar incluso los rincones más oscuros del alma humana.',
      pt: 'Os "Girassóis" de 1888 são um hino ao sol do sul e a personificação do deleite criativo de Van Gogh em Arles. Pintando-os a uma velocidade febril em antecipação à chegada de Paul Gauguin, o artista procurou transmitir a própria essência da vida, capturada em cores brilhantes e quase tangíveis. Usando toda uma paleta de tons amarelos, ele vai muito além de uma simples natureza morta: cada flor, de um botão desabrochando a um caule murchando, torna-se uma metáfora para o ciclo humano – florescimento, maturidade e inevitável murchamento. Esta obra é um manifesto de alegria e gratidão pela beleza da existência, onde a luz, encarnada na tinta, transforma flores comuns num símbolo deslumbrante de vitalidade, capaz de iluminar até os cantos mais escuros da alma humana.',
      ru: '«Подсолнухи» 1888 года — это гимн южному солнцу и воплощение творческого восторга Ван Гога в Арле. Писав их с лихорадочной скоростью в ожидании приезда Поля Гогена, художник стремился передать саму суть жизни, запечатленную в ярком, почти осязаемом цвете. Используя целую палитру желтых оттенков, он выходит далеко за пределы простого натюрморта: каждый цветок, от распустившегося бутона до увядающего стебля, становится метафорой человеческого цикла — расцвета, зрелости и неизбежного увядания. Эта работа — манифест радости и благодарности за красоту бытия, где свет, воплощенный в краске, превращает обычные цветы в ослепительный символ жизненной силы, способный осветить даже самые темные уголки человеческой души.'
    },
    active: true,
  },
  7: {
    image:  'images/6_2 spalnya v Arle.webp',
    title:  { uk: '«Спальня в Арлі»', en: '"The Bedroom"', es: '"El Dormitorio"', pt: '"O Quarto"', ru: '«Спальня в Арле»' },
    year:   '1888 · Арль',
    desc: {
      uk: '«Спальня в Арлі» (1888) — це спроба Вінсента знайти фізичне та духовне втілення спокою, якого йому так бракувало в житті. У цьому камерному просторі він використав сміливі, майже дитячі поєднання кольорів — блакитні стіни, червону ковдру та жовті деталі — щоб передати відчуття абсолютної безпеки й домашнього затишку. Художник писав цей інтер\'єр із майже фанатичною любов\'ю до деталей, прагнучи перетворити просту кімнату на символ прихистку, де кожен предмет, від стільця до картини на стіні, покликаний заспокоювати втомлений розум. Це полотно — не просто зображення побуту, а тиха молитва про мир і надія на те, що навіть найвиснаженіший мандрівник може знайти спокій у своєму особистому, нехай і скромному, просторі.',
      en: '"The Bedroom in Arles" (1888) is Vincent\'s attempt to find physical and spiritual embodiment of the peace he so lacked in life. In this intimate space, he used bold, almost childlike color combinations—azure walls, a red blanket, and yellow details—to convey a sense of absolute security and domestic comfort. The artist painted this interior with an almost fanatical love for detail, striving to turn a simple room into a symbol of refuge, where every object, from a chair to a painting on the wall, is designed to soothe a tired mind. This canvas is not just a depiction of everyday life, but a quiet prayer for peace and a hope that even the most exhausted traveler can find rest in their personal, albeit modest, space.',
      es: '"El Dormitorio en Arlés" (1888) es el intento de Vincent de encontrar una encarnación física y espiritual de la paz que tanto le faltaba en la vida. En este espacio íntimo, utilizó combinaciones de colores audaces, casi infantiles (paredes celestes, una manta roja y detalles amarillos) para transmitir una sensación de absoluta seguridad y comodidad doméstica. El artista pintó este interior con un amor casi fanático por los detalles, esforzándose por convertir una habitación sencilla en un símbolo de refugio, donde cada objeto, desde una silla hasta un cuadro en la pared, está diseñado para calmar una mente cansada. Este lienzo no es solo una representación de la vida cotidiana, sino una oración silenciosa por la paz y la esperanza de que incluso el viajero más exhausto pueda encontrar descanso en su espacio personal, aunque modesto.',
      pt: '"O Quarto em Arles" (1888) é a tentativa de Vincent de encontrar a personificação física e espiritual da paz que tanto lhe faltava na vida. Neste espaço íntimo, ele usou combinações de cores ousadas, quase infantis — paredes azuis, um cobertor vermelho e detalhes amarelos — para transmitir uma sensação de segurança absoluta e conforto doméstico. O artista pintou esse interior com um amor quase fanático pelos detalhes, esforçando-se para transformar um quarto simples num símbolo de refúgio, onde cada objeto, desde uma cadeira até um quadro na parede, é projetado para acalmar uma mente cansada. Esta tela não é apenas uma representação da vida cotidiana, mas uma oração silenciosa pela paz e uma esperança de que mesmo o viajante mais exausto possa encontrar descanso em seu espaço pessoal, embora modesto.',
      ru: '«Спальня в Арле» (1888) — это попытка Винсента найти физическое и духовное воплощение покоя, которого ему так не хватало в жизни. В этом камерном пространстве он использовал смелые, почти детские сочетания цветов — лазурные стены, красное одеяло и желтые детали — чтобы передать ощущение абсолютной безопасности и домашнего уюта. Художник писал этот интерьер с почти фанатичной любовью к деталям, стремясь превратить простую комнату в символ убежища, где каждый предмет, от стула до картины на стене, призван успокаивать уставший разум. Это полотно — не просто изображение быта, а тихая молитва о мире и надежда на то, что даже самый измученный путник может обрести покой в своем личном, пусть и скромном, пространстве.'
    },
    active: true,
  },
  8: {
    image:  'images/7 stars night.webp',
    title:  { uk: '«Зоряна ніч»', en: '"The Starry Night"', es: '"La Noche Estrellada"', pt: '"A Noite Estrelada"', ru: '«Звездная ночь»' },
    year:   '1889 · Сен-Реми-де-Прованс',
    desc: {
      uk: '«Зоряна ніч» (1889) — це не просто пейзаж, написаний з вікна лікарні в Сен-Ремі, це візуалізація нескінченності, народжена в моменти найглибшого душевного надлому. Ван Гог створює потужний, пульсуючий потік енергії, де небесні світила перетворюються на сліпучі вихори, а кипарис на передньому плані — на темний міст, що палає між грішною землею та бездонним космосом. Художник відмовляється від фотографічної точності заради емоційної правди, передаючи своє відчуття того, що за межами видимого світу ховається щось колосальне і вічне. Це полотно — найвища точка його творчого шляху, де боротьба з особистою темрявою трансформується в сліпучий тріумф духу, перетворюючи нічне небо на гімн людській уяві, здатній знайти світло навіть у найглибшій безнадійності.',
      en: '"The Starry Night" (1889) is not just a landscape painted from the window of the asylum in Saint-Rémy; it is a visualization of infinity, born in moments of the deepest mental breakdown. Van Gogh creates a powerful, pulsating flow of energy, where celestial bodies turn into dazzling whirlpools, and the cypress in the foreground becomes a dark, flaming bridge between the sinful earth and the bottomless cosmos. The artist abandons photographic accuracy for emotional truth, conveying his feeling that something colossal and eternal lies beyond the visible world. This canvas is the highest point of his creative path, where the struggle with personal darkness is transformed into a dazzling triumph of the spirit, turning the night sky into a hymn to human imagination, capable of finding light even in the deepest hopelessness.',
      es: '"La Noche Estrellada" (1889) no es solo un paisaje pintado desde la ventana del asilo en Saint-Rémy; es una visualización del infinito, nacida en momentos de la más profunda crisis mental. Van Gogh crea un poderoso y palpitante flujo de energía, donde los cuerpos celestiales se convierten en deslumbrantes torbellinos, y el ciprés en primer plano se convierte en un oscuro puente llameante entre la tierra pecaminosa y el cosmos insondable. El artista abandona la precisión fotográfica en favor de la verdad emocional, transmitiendo su sentimiento de que algo colosal y eterno se esconde más allá del mundo visible. Este lienzo es el punto más alto de su camino creativo, donde la lucha contra la oscuridad personal se transforma en un triunfo deslumbrante del espíritu, convirtiendo el cielo nocturno en un himno a la imaginación humana, capaz de encontrar la luz incluso en la más profunda desesperanza.',
      pt: '"A Noite Estrelada" (1889) não é apenas uma paisagem pintada da janela do asilo em Saint-Rémy; é uma visualização do infinito, nascida em momentos do mais profundo colapso mental. Van Gogh cria um fluxo de energia poderoso e pulsante, onde os corpos celestes se transformam em redemoinhos deslumbrantes, e o cipreste em primeiro plano se torna uma ponte escura e flamejante entre a terra pecaminosa e o cosmos insondável. O artista abandona a precisão fotográfica em favor da verdade emocional, transmitindo o seu sentimento de que algo colossal e eterno se esconde além do mundo visível. Esta tela é o ponto mais alto do seu caminho criativo, onde a luta contra a escuridão pessoal se transforma num triunfo deslumbrante do espírito, transformando o céu noturno num hino à imaginação humana, capaz de encontrar a luz até na mais profunda desesperança.',
      ru: '«Звездная ночь» (1889) — это не просто пейзаж, написанный из окна лечебницы в Сен-Реми, это визуализация бесконечности, рожденная в моменты глубочайшего душевного надлома. Ван Гог создает мощный, пульсирующий поток энергии, где небесные светила превращаются в ослепительные вихри, а кипарис на переднем плане — в темный, пламенеющий мост между грешной землей и бездонным космосом. Художник отказывается от фотографической точности ради эмоциональной правды, передавая свое ощущение того, что за пределами видимого мира скрывается нечто колоссальное и вечное. Это полотно — высшая точка его творческого пути, где борьба с личной тьмой трансформируется в ослепительный триумф духа, превращая ночное небо в гимн человеческому воображению, способному найти свет даже в самой глубокой безнадежности.'
    },
    active: true,
  },
  9: {
    image:  'images/8 pole vorony.webp',
    title:  { uk: '«Пшеничне поле з воронами»', en: '"Wheatfield with Crows"', es: '"Campo de Trigo con Cuervos"', pt: '"Campo de Trigo com Corvos"', ru: '«Пшеничное поле с воронами»' },
    year:   '1890 · Овер-сюр-Уаз',
    desc: {
      uk: '«Пшеничне поле з воронами» (1890) часто називають однією з останніх робіт Ван Гога, і вона звучить як пронизливий мальовничий епілог усього його життя. Написане в пориві тривоги, це полотно вражає контрастом золотої стиглої пшениці та грозового, майже чорнильного неба, яке немов нависає над землею, передвіщаючи бурю. Ван Гог використовує різкі, енергійні мазки, створюючи відчуття нестабільності та надриву; ворони, що кружляють над полем, додають сцені нотку зловісної невизначеності. У цій картині художник остаточно відходить від спроб відобразити реальність, натомість оголюючи свій внутрішній світ — стан людини, яка стоїть на порозі невідомості, але продовжує з відчайдушною рішучістю шукати світло серед сутінків, що згущуються. Це не просто пейзаж, а гранично щире свідчення боротьби духу, де природа стає дзеркалом найглибшої самотності та неприборканої творчої волі.',
      en: '"Wheatfield with Crows" (1890) is often called one of Van Gogh\'s last works, and it sounds like a piercing pictorial epilogue to his entire life. Painted in a fit of anxiety, this canvas strikes with the contrast of golden ripe wheat and a stormy, almost inky sky, which seems to hang over the earth, predicting a storm. Van Gogh uses sharp, energetic brushstrokes, creating a feeling of instability and anguish; the crows circling over the field add a note of ominous uncertainty to the scene. In this painting, the artist finally moves away from attempts to capture reality, instead exposing his inner world—the state of a person standing on the threshold of the unknown, but continuing with desperate determination to seek light amidst the gathering twilight. This is not just a landscape, but an extremely sincere testimony to the struggle of the spirit, where nature becomes a mirror of the deepest loneliness and indomitable creative will.',
      es: '"Campo de Trigo con Cuervos" (1890) a menudo se llama una de las últimas obras de Van Gogh, y suena como un epílogo pictórico penetrante de toda su vida. Pintado en un ataque de ansiedad, este lienzo sorprende con el contraste del trigo maduro dorado y un cielo tormentoso, casi entintado, que parece cernirse sobre la tierra, presagiando una tormenta. Van Gogh utiliza pinceladas marcadas y enérgicas, creando una sensación de inestabilidad y angustia; los cuervos que vuelan sobre el campo añaden una nota de siniestra incertidumbre a la escena. En esta pintura, el artista finalmente se aleja de los intentos de capturar la realidad, exponiendo en su lugar su mundo interior: el estado de una persona que se encuentra en el umbral de lo desconocido, pero que continúa con desesperada determinación buscando la luz en medio del crepúsculo que se acumula. Este no es solo un paisaje, sino un testimonio extremadamente sincero de la lucha del espíritu, donde la naturaleza se convierte en un espejo de la soledad más profunda y la voluntad creativa indomable.',
      pt: '"Campo de Trigo com Corvos" (1890) é frequentemente chamado de uma das últimas obras de Van Gogh, e soa como um epílogo pictórico penetrante para toda a sua vida. Pintada num ataque de ansiedade, esta tela impressiona com o contraste do trigo maduro dourado e um céu tempestuoso, quase coberto de tinta, que parece pairar sobre a terra, prevendo uma tempestade. Van Gogh usa pinceladas nítidas e enérgicas, criando uma sensação de instabilidade e angústia; os corvos voando sobre o campo adicionam uma nota de incerteza sinistra à cena. Nesta pintura, o artista finalmente se afasta das tentativas de capturar a realidade, em vez disso expondo o seu mundo interior — o estado de uma pessoa no limiar do desconhecido, mas que continua com desesperada determinação a procurar a luz em meio ao crepúsculo que se acumula. Esta não é apenas uma paisagem, mas um testemunho extremamente sincero da luta do espírito, onde a natureza se torna um espelho da mais profunda solidão e vontade criativa indomável.',
      ru: '«Пшеничное поле с воронами» (1890) часто называют одной из последних работ Ван Гога, и она звучит как пронзительный живописный эпилог всей его жизни. Написанное в пориве тревоги, это полотно поражает контрастом золотой спелой пшеницы и грозового, почти чернильного неба, которое словно нависает над землею, предвещая бурю. Ван Гог использует резкие, энергичные мазки, создавая ощущение нестабильности и надрыва; вороны, кружащие над полем, добавляют сцене нотку зловещей неопределенности. В этой картине художник окончательно отходит от попыток запечатлеть реальность, вместо этого обнажая свой внутренний мир — состояние человека, стоящего на пороге неизвестности, но продолжающего с отчаянной решимостью искать свет среди сгущающихся сумерек. Это не просто пейзаж, а предельно искреннее свидетельство борьбы духа, где природа становится зеркалом глубочайшего одиночества и неукротимой творческой воли.'
    },
    active: true,
  },
};

// ── Элементы попапа ─────────────────────────────────────
const paintingModal    = document.getElementById('artModal');
const modalPaintingImg = paintingModal.querySelector('.modal-image');
const modalVertTitle   = paintingModal.querySelector('.vertical-title');
const modalVertMeta    = paintingModal.querySelector('.vertical-meta');
const modalClose       = document.getElementById('closeModalBtn');

const infoIcon         = document.getElementById('infoIcon');
const infoPanel        = document.getElementById('modalInfoPanel');
const rightSection     = document.getElementById('modalRightSection');
const descText         = document.getElementById('modalDescText');

let modalCloseTimer = null;
let infoHoverTimer  = null;
let typeWriterTimer = null;
let currentDescText = '';

// Эффект печатной машинки
function startTypewriter(text) {
  clearTimeout(typeWriterTimer);
  descText.textContent = '';
  let i = 0;
  function typeNext() {
    if (i < text.length) {
      descText.textContent += text.charAt(i);
      i++;
      typeWriterTimer = setTimeout(typeNext, 8); // Очень быстрая, элегантная печать
    }
  }
  typeNext();
}

// ── Открыть попап ────────────────────────────────────────
function openPaintingModal(zoneId, triggerElement) {
  const data = PAINTING_ZONES[zoneId];
  if (!data || !data.active || !data.image) return;

  // Применяем горизонтальную компоновку только для "Пшеничного поля с воронами" (ID 9)
  if (Number(zoneId) === 9) {
    paintingModal.classList.add('layout-horizontal');
  } else {
    paintingModal.classList.remove('layout-horizontal');
  }

  modalPaintingImg.src = data.image;
  modalPaintingImg.alt = data.title[currentLang] || data.title.en;

  // Получаем название картины в верхнем регистре
  const titleText = data.title[currentLang] || data.title.en;
  modalVertTitle.textContent = titleText.toUpperCase();

  // Формируем мета-строку: Автор, Год. (в верхнем регистре)
  let author = 'Vincent van Gogh';
  if (currentLang === 'uk') author = 'Вінсент ван Гог';
  if (currentLang === 'ru') author = 'Винсент ван Гог';

  // Извлекаем четырехзначный год из строки года
  const yearMatch = data.year.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : '1890';

  modalVertMeta.textContent = `${author}, ${year}.`.toUpperCase();

  // Показать через Native Dialog API
  paintingModal.showModal();

  // Сбрасываем панель с описанием при открытии
  paintingModal.classList.remove('info-expanded');
  descText.textContent = '';
  currentDescText = data.desc[currentLang] || data.desc.en;

  // Вычисляем transform-origin для кинематографичного появления из триггера
  if (triggerElement) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const targetX = triggerRect.left + triggerRect.width / 2;
    const targetY = triggerRect.top + triggerRect.height / 2;
    
    const rect = paintingModal.getBoundingClientRect();
    const originX = targetX - rect.left;
    const originY = targetY - rect.top;
    paintingModal.style.transformOrigin = `${originX}px ${originY}px`;
  } else {
    paintingModal.style.transformOrigin = `50% 50%`;
  }

  // Вычисляем ширину скроллбара и добавляем класс для предотвращения рывка
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  document.body.classList.add('modal-open');

  // Заблокировать скролл
  document.body.style.overflow = 'hidden';
}

// ── Закрыть попап ────────────────────────────────────────
function closePaintingModal() {
  paintingModal.classList.remove('info-expanded');
  clearTimeout(typeWriterTimer);
  paintingModal.close();
  
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}

// ── Popup-события: только .pin-popup-zone (зона над иконкой левого списка) ──
function attachZoneEvents() {
  document.querySelectorAll('.pin-popup-zone').forEach(zone => {
    const id   = parseInt(zone.dataset.zoneId, 10);
    const data = PAINTING_ZONES[id];

    if (data && data.active) {
      zone.addEventListener('mouseenter', () => {
        clearTimeout(modalCloseTimer);
        openPaintingModal(id, zone);
      });
      zone.addEventListener('mouseleave', () => {
        modalCloseTimer = setTimeout(closePaintingModal, 200);
      });
      zone.addEventListener('click', e => {
        e.stopPropagation();
        paintingModal.open
          ? closePaintingModal()
          : openPaintingModal(id, zone);
      });
    }
  });

  // События для самих пинов (если они есть)
  document.querySelectorAll('.pin').forEach(pin => {
    const id = parseInt(pin.dataset.zoneId, 10);
    const data = PAINTING_ZONES[id];
    if (data && data.active) {
      pin.style.pointerEvents = 'auto';
      pin.addEventListener('mouseenter', () => {
        clearTimeout(modalCloseTimer);
        openPaintingModal(id, pin);
      });
      pin.addEventListener('mouseleave', () => {
        modalCloseTimer = setTimeout(closePaintingModal, 200);
      });
      pin.addEventListener('click', e => {
        e.stopPropagation();
        paintingModal.open
          ? closePaintingModal()
          : openPaintingModal(id, pin);
      });
    }
  });

  // Попап не закрывается пока мышь над ним
  paintingModal.addEventListener('mouseenter', () => clearTimeout(modalCloseTimer));
  paintingModal.addEventListener('mouseleave', () => {
    modalCloseTimer = setTimeout(closePaintingModal, 200);
  });

  // Кнопка закрытия
  modalClose.addEventListener('click', e => { 
    e.stopPropagation(); 
    closePaintingModal(); 
  });

  // Логика расширения окна при наведении на 'i'
  const expandInfo = () => {
    clearTimeout(infoHoverTimer);
    if (!paintingModal.classList.contains('info-expanded')) {
      paintingModal.classList.add('info-expanded');
      // В горизонтальном режиме показываем текст сразу — прокрутка должна работать с полным текстом
      if (paintingModal.classList.contains('layout-horizontal')) {
        clearTimeout(typeWriterTimer);
        descText.textContent = currentDescText;
      } else {
        startTypewriter(currentDescText);
      }
    }
  };

  const collapseInfo = () => {
    infoHoverTimer = setTimeout(() => {
      paintingModal.classList.remove('info-expanded');
      // Не очищаем текст мгновенно, чтобы он уезжал красиво
    }, 250);
  };

  infoIcon.addEventListener('mouseenter', expandInfo);
  rightSection.addEventListener('mouseleave', collapseInfo);

  // Закрытие по клику на backdrop диалога
  paintingModal.addEventListener('click', event => {
    if (event.target === paintingModal) {
      closePaintingModal();
    }
  });
}

// Инициализация
attachZoneEvents();

// ── Последовательная подсветка активных зон при первом появлении карты ──────
(function initZoneHints() {
  const mapPinsEl = document.getElementById('map-pins-container');
  if (!mapPinsEl) return;

  let hintPlayed = false;

  // Порядок зон для подсветки (повторяем 2 раза для бесшовной двойной пробежки сверху вниз)
  const HINT_ORDER = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ];
  const HINT_DURATION   = 900;   // мс — время видимости (ускорено)
  const HINT_INTERVAL   = 450;   // мс — интервал между кружками (ускорено)
  const HINT_FADE       = 350;   // мс — плавное исчезновение (соответствует CSS transition)

  function runHintSequence() {
    if (hintPlayed) return;
    hintPlayed = true;

    const zones = document.querySelectorAll('.pin-popup-zone');
    const zoneMap = {};
    zones.forEach(z => { zoneMap[parseInt(z.dataset.zoneId)] = z; });

    HINT_ORDER.forEach((id, idx) => {
      const zone = zoneMap[id];
      if (!zone) return;

      const data = PAINTING_ZONES[id];
      if (!data || !data.active) return;

      setTimeout(() => {
        const rect = zone.getBoundingClientRect();
        const containerRect = mapPinsEl.getBoundingClientRect();

        // Создаём кружок-подсказку
        const hint = document.createElement('div');
        hint.className = 'zone-hint-ring';

        // Позиционируем по центру зоны относительно map-pins-container
        const cx = rect.left - containerRect.left + rect.width / 2;
        const cy = rect.top  - containerRect.top  + rect.height / 2;
        // Сделали диаметр немного компактнее (множитель 0.72 вместо 0.85)
        const r  = Math.max(rect.width, rect.height) * 0.72;

        hint.style.width  = (r * 2) + 'px';
        hint.style.height = (r * 2) + 'px';
        hint.style.left   = (cx - r) + 'px';
        hint.style.top    = (cy - r) + 'px';

        mapPinsEl.appendChild(hint);

        // Появление (небольшой delay чтобы браузер успел применить display)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { hint.classList.add('visible'); });
        });

        // Исчезание
        setTimeout(() => {
          // НЕ удаляем visible, чтобы рамка и тень не исчезали мгновенно.
          // Добавление класса hiding плавно уведет общую прозрачность (opacity) элемента в 0.
          hint.classList.add('hiding');
          setTimeout(() => hint.remove(), HINT_FADE + 50);
        }, HINT_DURATION);

      }, idx * HINT_INTERVAL);
    });
  }

  // Запускаем ровно один раз, когда overlay2 становится активным
  // Отслеживаем через MutationObserver на pointer-events overlay2
  const overlay2El = document.getElementById('overlay2');
  if (!overlay2El) return;

  const observer = new MutationObserver(() => {
    if (overlay2El.style.pointerEvents === 'auto' && !hintPlayed) {
      // Небольшая задержка — даём карте полностью въехать
      setTimeout(runHintSequence, 600);
    }
  });
  observer.observe(overlay2El, { attributes: true, attributeFilter: ['style'] });
})();

if (new URLSearchParams(location.search).has('calibrate')) {
  const mapWrapper = document.getElementById('map-wrapper');
  const mapImg     = document.getElementById('map-img');
  const mapPinsContainer = document.getElementById('map-pins-container');

  // Создаём панель с результатами
  const calPanel = document.createElement('div');
  calPanel.id = 'cal-panel';
  calPanel.innerHTML = `
    <div id="cal-title">🎯 Разметка интерактивных зон</div>
    <div id="cal-hint">
      Каждая зона размечается в <b>2 клика</b>:<br>
      1. Кликни в <b>левый верхний</b> угол зоны.<br>
      2. Кликни в <b>правый нижний</b> угол зоны.
    </div>
    <ol id="cal-list" style="max-height: 250px; overflow-y: auto; padding-left: 20px;"></ol>
    <button id="cal-copy">📋 Скопировать HTML</button>
    <button id="cal-clear">🗑 Сбросить</button>
  `;
  document.body.appendChild(calPanel);

  // Стили панели
  Object.assign(calPanel.style, {
    position: 'fixed', top: '80px', right: '20px', zIndex: '99999',
    background: 'rgba(10,6,2,0.95)', border: '1px solid #c9a84c',
    borderRadius: '10px', padding: '14px 18px', color: '#f0d898',
    fontFamily: 'monospace', fontSize: '13px', width: '350px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
  });

  const calList  = document.getElementById('cal-list');
  const calCopy  = document.getElementById('cal-copy');
  const calClear = document.getElementById('cal-clear');
  
  let firstClick = null; // Хранит {x, y} первого клика
  let zoneCount  = 0;
  let allZones   = [];
  let tempMarker = null; // Временный маркер первого клика

  mapWrapper.style.cursor = 'crosshair';

  mapWrapper.addEventListener('click', e => {
    const rect = mapImg.getBoundingClientRect();
    const contentW = rect.width;
    const contentH = rect.height;

    // Координаты клика относительно картинки в процентах
    const pctX = ((e.clientX - rect.left) / contentW) * 100;
    const pctY = ((e.clientY - rect.top) / contentH) * 100;

    if (!firstClick) {
      // ── ПЕРВЫЙ КЛИК (левый верхний угол) ──
      firstClick = { x: pctX, y: pctY };
      
      // Создаем временную красную точку
      tempMarker = document.createElement('div');
      Object.assign(tempMarker.style, {
        position: 'absolute', width: '8px', height: '8px',
        background: '#ff4444', borderRadius: '50%',
        left: pctX + '%', top: pctY + '%',
        transform: 'translate(-50%, -50%)', zIndex: '99999',
      });
      mapPinsContainer.appendChild(tempMarker);
    } else {
      // ── ВТОРОЙ КЛИК (правый нижний угол) ──
      const x1 = Math.min(firstClick.x, pctX);
      const y1 = Math.min(firstClick.y, pctY);
      const x2 = Math.max(firstClick.x, pctX);
      const y2 = Math.max(firstClick.y, pctY);

      const left   = parseFloat(x1.toFixed(1));
      const top    = parseFloat(y1.toFixed(1));
      const width  = parseFloat((x2 - x1).toFixed(1));
      const height = parseFloat((y2 - y1).toFixed(1));

      zoneCount++;
      
      // Убираем временную точку
      if (tempMarker) tempMarker.remove();
      firstClick = null;

      // Рисуем созданную зону на карте для наглядности
      const zoneVisual = document.createElement('div');
      Object.assign(zoneVisual.style, {
        position: 'absolute',
        left: left + '%', top: top + '%',
        width: width + '%', height: height + '%',
        border: '2px solid #ff4444',
        background: 'rgba(255, 68, 68, 0.2)',
        zIndex: '9999',
        pointerEvents: 'none',
      });
      // Добавляем номер зоны в центр
      zoneVisual.innerHTML = `<span style="color:#ffffff; background:#ff4444; padding:2px 6px; font-size:12px; font-weight:bold; position:absolute; left:0; top:0;">${zoneCount}</span>`;
      mapPinsContainer.appendChild(zoneVisual);

      allZones.push({ n: zoneCount, left, top, width, height });

      // Добавляем строку в панель калибратора
      const li = document.createElement('li');
      li.style.cssText = 'margin:6px 0; padding:4px 0; border-bottom:1px solid rgba(201,168,76,0.2); font-size:11px;';
      li.innerHTML = `
        <b style="color:#ff4444">Зона ${zoneCount}</b><br>
        left: ${left}%; top: ${top}%;<br>
        width: ${width}%; height: ${height}%;
      `;
      calList.appendChild(li);
      calList.scrollTop = calList.scrollHeight;
    }
  });

  calCopy.addEventListener('click', () => {
    const text = allZones.map(z =>
      `<!-- Попап-зона для иконки ${z.n} -->\n<div class="pin-popup-zone" style="left: ${z.left}%; top: ${z.top}%; width: ${z.width}%; height: ${z.height}%;" data-zone-id="${z.n}"></div>`
    ).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      calCopy.textContent = '✅ HTML Скопирован!';
      setTimeout(() => calCopy.textContent = '📋 Скопировать HTML', 2000);
    });
  });

  calClear.addEventListener('click', () => {
    zoneCount = 0; firstClick = null; allZones = [];
    calList.innerHTML = '';
    // Удаляем все нарисованные зоны и временные точки
    mapPinsContainer.querySelectorAll('div').forEach(el => {
      if (el.style.borderColor === 'rgb(255, 68, 68)' || el.style.backgroundColor === 'rgb(255, 68, 68)') {
        el.remove();
      }
    });
  });

  // Стилизация кнопок
  [calCopy, calClear].forEach(btn => Object.assign(btn.style, {
    marginTop: '8px', marginRight: '6px', padding: '6px 12px',
    background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
    borderRadius: '6px', color: '#f0d898', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'
  }));
}

// ══════════════════════════════════════════════════════════
// POTATO EATERS INTERACTIVE LAYER
// ══════════════════════════════════════════════════════════
const POTATO_ZONES = [
  { id: 1, img: 'images/Shit/1 голова.webp', left: 29.19, top: 37.65, width: 4.33, height: 9.44 },
  { id: 2, img: 'images/Shit/2 рука.webp', left: 59.22, top: 45.59, width: 4.96, height: 8.94 },
  { id: 3, img: 'images/Shit/3 лампа.webp', left: 44.41, top: 20.89, width: 8.38, height: 13.53 },
  { id: 4, img: 'images/Shit/4 чайник.webp', left: 81.91, top: 76.75, width: 9.01, height: 13.53 },
  { id: 5, img: 'images/Shit/5 картина.webp', left: 22.49, top: 11.95, width: 6.01, height: 10.92 },
  { id: 6, img: 'images/Shit/6 картофель.webp', left: 41.62, top: 66.2, width: 4.68, height: 8.57 }
];

// Load calibrated zones if any
try {
  const saved = localStorage.getItem('potato_zones_calibrated');
  if (saved) {
    const parsed = JSON.parse(saved);
    parsed.forEach((z, i) => {
      if (POTATO_ZONES[i]) {
        Object.assign(POTATO_ZONES[i], z);
      }
    });
  }
} catch (e) {}

const potatoOverlay = document.getElementById('potato-overlay');
const potatoLinesGrp = document.getElementById('potato-lines');
const potatoFramesGrp = document.getElementById('potato-frames');
const potatoSweepersGrp = document.getElementById('potato-sweepers');
const togglesContainer = document.getElementById('toggles-container');
const potatoToggle = document.getElementById('potato-toggle');
const qualityToggle = document.getElementById('quality-toggle');
const hqLayer = document.getElementById('hq-potato-layer');
const potatoFragments = document.querySelectorAll('.potato-fragment');

let potatoLayerInitialized = false;
let potatoLayerActive = false;

// Attach leave events to fragments so they close if mouse leaves them and not entering the rect
potatoFragments.forEach(frag => {
  frag.addEventListener('mouseleave', (e) => {
    const rect = potatoFramesGrp.querySelector(`.potato-frame[data-id="${frag.dataset.zone}"]`);
    if (rect && (e.relatedTarget === rect || rect.contains(e.relatedTarget))) return;
    hidePotatoFragment(parseInt(frag.dataset.zone));
  });
});

// Drawing function to match the letterboxed video on canvas
function getActualCanvasVideoRect() {
  const canvasW = window.innerWidth;
  const canvasH = window.innerHeight;
  // Fallback if no frame loaded yet
  const imgW = (frames && frames[0]) ? frames[0].naturalWidth : 1920;
  const imgH = (frames && frames[0]) ? frames[0].naturalHeight : 1080;

  const imgRatio = imgW / imgH;
  const canvasRatio = canvasW / canvasH;

  let drawW, drawH, x, y;
  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    x = (canvasW - drawW) / 2;
    y = 0;
  } else {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    x = 0;
    y = (canvasH - drawH) / 2;
  }
  return { x, y, w: drawW, h: drawH };
}

// Convert % to absolute canvas coordinates
function pctToPx(pctX, pctY, pctW, pctH, vRect) {
  return {
    x: vRect.x + (pctX / 100) * vRect.w,
    y: vRect.y + (pctY / 100) * vRect.h,
    w: (pctW / 100) * vRect.w,
    h: (pctH / 100) * vRect.h
  };
}

function buildPotatoSVG() {
  if (!potatoOverlay) return;
  potatoLinesGrp.innerHTML = '';
  potatoFramesGrp.innerHTML = '';
  const vRect = getActualCanvasVideoRect();

  const rects = [];
  
  POTATO_ZONES.forEach(zone => {
    const px = pctToPx(zone.left, zone.top, zone.width, zone.height, vRect);
    rects.push(px);

    // Create frame rect
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', px.x);
    rect.setAttribute('y', px.y);
    rect.setAttribute('width', px.w);
    rect.setAttribute('height', px.h);
    rect.setAttribute('class', 'potato-frame');
    rect.dataset.id = zone.id;
    potatoFramesGrp.appendChild(rect);

    // Hover events for rect
    rect.addEventListener('mouseenter', () => showPotatoFragment(zone.id, px));
    rect.addEventListener('mouseleave', (e) => {
      const frag = Array.from(potatoFragments).find(f => parseInt(f.dataset.zone) === zone.id);
      if (frag && (e.relatedTarget === frag || frag.contains(e.relatedTarget))) return;
      hidePotatoFragment(zone.id);
    });
  });

  function getPt(px, code) {
    if (code === 'tl') return { x: px.x, y: px.y };
    if (code === 'tr') return { x: px.x + px.w, y: px.y };
    if (code === 'bl') return { x: px.x, y: px.y + px.h };
    if (code === 'br') return { x: px.x + px.w, y: px.y + px.h };
    if (code === 'ml') return { x: px.x, y: px.y + px.h/2 };
    if (code === 'mr') return { x: px.x + px.w, y: px.y + px.h/2 };
    return { x: px.x + px.w/2, y: px.y + px.h/2 };
  }

  // Create connections (e.g. 5->3->1->2, 1->6->4)
  const linesDef = [
    { from: 5, fromPt: 'tr', to: 3, toPt: 'ml' },
    { from: 3, fromPt: 'bl', to: 1, toPt: 'tr' },
    { from: 1, fromPt: 'mr', to: 2, toPt: 'ml' },
    { from: 1, fromPt: 'br', to: 6, toPt: 'tl' },
    { from: 6, fromPt: 'br', to: 4, toPt: 'bl' }
  ];

  linesDef.forEach((def) => {
    const z1 = POTATO_ZONES.find(z => z.id === def.from);
    const z2 = POTATO_ZONES.find(z => z.id === def.to);
    if (!z1 || !z2) return;

    const px1 = pctToPx(z1.left, z1.top, z1.width, z1.height, vRect);
    const px2 = pctToPx(z2.left, z2.top, z2.width, z2.height, vRect);
    
    const pt1 = getPt(px1, def.fromPt);
    const pt2 = getPt(px2, def.toPt);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', pt1.x);
    line.setAttribute('y1', pt1.y);
    line.setAttribute('x2', pt2.x);
    line.setAttribute('y2', pt2.y);
    line.setAttribute('class', 'potato-line');
    potatoLinesGrp.appendChild(line);
  });
}

function showPotatoFragment(id, pxRect) {
  if (!potatoToggle || !potatoToggle.checked) return;
  const frag = Array.from(potatoFragments).find(f => parseInt(f.dataset.zone) === id);
  if (!frag) return;
  
  // Update image src properly
  const zone = POTATO_ZONES.find(z => z.id === id);
  const img = frag.querySelector('img');
  if (img && img.src.indexOf(zone.img) === -1) {
    img.src = zone.img;
  }

  // Position exactly over the frame
  frag.style.left = pxRect.x + 'px';
  frag.style.top = pxRect.y + 'px';
  frag.style.width = pxRect.w + 'px';
  frag.style.height = pxRect.h + 'px';

  frag.classList.add('visible');
}

function hidePotatoFragment(id) {
  const frag = Array.from(potatoFragments).find(f => parseInt(f.dataset.zone) === id);
  if (frag) frag.classList.remove('visible');
}

// Draw the sweeper animation path along the frame
function playRectSweeper(rectEl, duration) {
  return new Promise(resolve => {
    if (!rectEl) return resolve();
    const x = parseFloat(rectEl.getAttribute('x'));
    const y = parseFloat(rectEl.getAttribute('y'));
    const w = parseFloat(rectEl.getAttribute('width'));
    const h = parseFloat(rectEl.getAttribute('height'));
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // M top-left -> top-right -> bottom-right -> bottom-left -> top-left
    const d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`;
    path.setAttribute('d', d);
    path.setAttribute('class', 'potato-sweeper running');
    
    potatoSweepersGrp.appendChild(path);
    
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    
    // Force reflow
    path.getBoundingClientRect();
    
    path.style.transition = `stroke-dashoffset ${duration}ms linear`;
    path.style.strokeDashoffset = 0;
    
    setTimeout(() => {
      path.style.transition = `opacity 300ms ease`;
      path.style.opacity = 0;
      setTimeout(() => path.remove(), 300);
      resolve();
    }, duration);
  });
}

function playLineSweeper(lineEl, duration) {
  return new Promise(resolve => {
    if (!lineEl) return resolve();
    const x1 = parseFloat(lineEl.getAttribute('x1'));
    const y1 = parseFloat(lineEl.getAttribute('y1'));
    const x2 = parseFloat(lineEl.getAttribute('x2'));
    const y2 = parseFloat(lineEl.getAttribute('y2'));
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
    path.setAttribute('class', 'potato-sweeper running');
    potatoSweepersGrp.appendChild(path);
    
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    
    path.getBoundingClientRect();
    
    path.style.transition = `stroke-dashoffset ${duration}ms linear`;
    path.style.strokeDashoffset = 0;
    
    setTimeout(() => {
      path.style.transition = `opacity 300ms ease`;
      path.style.opacity = 0;
      setTimeout(() => path.remove(), 300);
      resolve();
    }, duration);
  });
}

async function runPotatoAnimationSequence() {
  if (potatoLayerActive || !potatoOverlay) return;
  potatoLayerActive = true;
  potatoOverlay.classList.add('active');
  
  buildPotatoSVG();

  const rects = Array.from(potatoFramesGrp.querySelectorAll('.potato-frame'));
  const lines = Array.from(potatoLinesGrp.querySelectorAll('.potato-line'));
  
  if (rects.length === 0) return;

  const getRect = (id) => rects.find(r => parseInt(r.dataset.id) === id);

  await new Promise(r => setTimeout(r, 500)); // Delay after video end

  // Sequence
  if (!potatoLayerActive) return;
  await playRectSweeper(getRect(5), 500);
  if (!potatoLayerActive) return;
  await playLineSweeper(lines[0], 200); // 5->3
  if (!potatoLayerActive) return;
  await playRectSweeper(getRect(3), 400);
  if (!potatoLayerActive) return;
  await playLineSweeper(lines[1], 250); // 3->1
  if (!potatoLayerActive) return;
  await playRectSweeper(getRect(1), 500);
  if (!potatoLayerActive) return;
  
  // Split parallel
  playLineSweeper(lines[2], 150).then(() => {
    if (potatoLayerActive) playRectSweeper(getRect(2), 400);
  });
  await playLineSweeper(lines[3], 150); // 1->6
  if (!potatoLayerActive) return;
  
  await playRectSweeper(getRect(6), 400);
  if (!potatoLayerActive) return;
  await playLineSweeper(lines[4], 250); // 6->4
  if (!potatoLayerActive) return;
  await playRectSweeper(getRect(4), 400);

  // Show toggle and contact link
  setTimeout(() => {
    if (potatoLayerActive && togglesContainer) {
      togglesContainer.classList.add('visible');
      const devContact = document.getElementById('dev-contact');
      if (devContact) devContact.classList.add('visible');
      
      setTimeout(() => {
        if (potatoLayerActive) {
          togglesContainer.classList.add('attention');
          setTimeout(() => togglesContainer.classList.remove('attention'), 2000);
        }
      }, 800);
    }
  }, 800);
}

// Check scroll progress inside update loop
function checkPotatoOverlay(progress) {
  // If we reached the end of the scroll (e.g. 99.5%)
  if (progress > 0.995 && !potatoLayerActive) {
    runPotatoAnimationSequence();
  } else if (progress < 0.95 && potatoLayerActive) {
    // Reset if we scroll back up
    potatoLayerActive = false;
    if (potatoOverlay) potatoOverlay.classList.remove('active');
    if (togglesContainer) togglesContainer.classList.remove('visible');
    const devContact = document.getElementById('dev-contact');
    if (devContact) devContact.classList.remove('visible');
    if (potatoToggle) potatoToggle.checked = false;
    // Don't uncheck qualityToggle so the user choice persists, but it will fade out natively
    if (potatoFramesGrp) potatoFramesGrp.querySelectorAll('.potato-frame').forEach(f => f.classList.remove('visible'));
    if (potatoLinesGrp) potatoLinesGrp.querySelectorAll('.potato-line').forEach(l => l.classList.remove('visible'));
    potatoFragments.forEach(f => f.classList.remove('visible'));
  }
}

// Toggle logic
if (potatoToggle) {
  potatoToggle.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    potatoFramesGrp.querySelectorAll('.potato-frame').forEach(f => f.classList.toggle('visible', isChecked));
    potatoLinesGrp.querySelectorAll('.potato-line').forEach(l => l.classList.toggle('visible', isChecked));
  });
}

if (qualityToggle) {
  qualityToggle.addEventListener('change', () => {
    // Trigger update immediately so opacity adjusts
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
}

// Update positions on resize
window.addEventListener('resize', () => {
  if (potatoLayerActive) {
    buildPotatoSVG();
    if (potatoToggle && potatoToggle.checked) {
      potatoFramesGrp.querySelectorAll('.potato-frame').forEach(f => f.classList.add('visible'));
      potatoLinesGrp.querySelectorAll('.potato-line').forEach(l => l.classList.add('visible'));
    }
  }
});

// ══════════════════════════════════════════════════════════
// POTATO CALIBRATION TOOL (?calibrate-potato)
// ══════════════════════════════════════════════════════════
if (new URLSearchParams(location.search).has('calibrate-potato')) {
  setTimeout(() => {
    // Scroll to bottom to show Potato Eaters
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    
    // Force active
    if (potatoOverlay) potatoOverlay.classList.add('active');
    potatoLayerActive = true;
    
    const calPanel = document.createElement('div');
    calPanel.id = 'pcal-panel';
    calPanel.innerHTML = `
      <div id="cal-title" style="margin-bottom:8px;">🎯 Разметка Картофеля (6 зон)</div>
      <div id="cal-hint" style="margin-bottom:8px; line-height:1.4;">
        Кликай 2 раза (верхний левый, нижний правый) для каждой зоны.<br>
        Порядок: 1(голова), 2(рука), 3(лампа), 4(чайник), 5(картина), 6(картофель).
      </div>
      <div id="pcal-status" style="color:#ffcc33; margin-bottom:8px;">Ожидание: Зона 1</div>
      <ol id="pcal-list" style="max-height: 200px; overflow-y: auto; padding-left: 20px;"></ol>
      <button id="pcal-save">💾 Тест (в localStorage)</button>
      <button id="pcal-copy">📋 Копировать JS</button>
      <button id="pcal-clear">🗑 Сбросить</button>
    `;
    document.body.appendChild(calPanel);

    Object.assign(calPanel.style, {
      position: 'fixed', top: '80px', right: '20px', zIndex: '99999',
      background: 'rgba(10,6,2,0.95)', border: '1px solid #c9a84c',
      borderRadius: '10px', padding: '14px 18px', color: '#f0d898',
      fontFamily: 'monospace', fontSize: '13px', width: '350px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
    });

    let firstClick = null;
    let zoneIndex = 0;
    let calZones = [];
    let tempMarker = null;
    
    const statusEl = document.getElementById('pcal-status');
    const listEl = document.getElementById('pcal-list');
    
    if (potatoOverlay) {
      potatoOverlay.style.pointerEvents = 'auto';
      potatoOverlay.style.cursor = 'crosshair';

      potatoOverlay.addEventListener('click', (e) => {
        if (zoneIndex >= 6) return;
        
        const vRect = getActualCanvasVideoRect();
        const pctX = ((e.clientX - vRect.x) / vRect.w) * 100;
        const pctY = ((e.clientY - vRect.y) / vRect.h) * 100;
        
        if (pctX < 0 || pctX > 100 || pctY < 0 || pctY > 100) return;

        if (!firstClick) {
          firstClick = { x: pctX, y: pctY };
          tempMarker = document.createElement('div');
          Object.assign(tempMarker.style, {
            position: 'fixed', width: '8px', height: '8px',
            background: '#ff4444', borderRadius: '50%',
            left: e.clientX + 'px', top: e.clientY + 'px',
            transform: 'translate(-50%, -50%)', zIndex: '99999',
          });
          document.body.appendChild(tempMarker);
        } else {
          const x1 = Math.min(firstClick.x, pctX);
          const y1 = Math.min(firstClick.y, pctY);
          const x2 = Math.max(firstClick.x, pctX);
          const y2 = Math.max(firstClick.y, pctY);

          const left   = parseFloat(x1.toFixed(2));
          const top    = parseFloat(y1.toFixed(2));
          const width  = parseFloat((x2 - x1).toFixed(2));
          const height = parseFloat((y2 - y1).toFixed(2));
          
          calZones.push({ id: zoneIndex + 1, left, top, width, height });
          zoneIndex++;
          
          if (tempMarker) tempMarker.remove();
          firstClick = null;
          
          const px = pctToPx(left, top, width, height, vRect);
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', px.x);
          rect.setAttribute('y', px.y);
          rect.setAttribute('width', px.w);
          rect.setAttribute('height', px.h);
          rect.setAttribute('fill', 'rgba(255,68,68,0.3)');
          rect.setAttribute('stroke', '#ff4444');
          rect.setAttribute('stroke-width', '2');
          potatoOverlay.appendChild(rect);
          
          listEl.innerHTML += `<li style="margin:4px 0; border-bottom:1px solid rgba(201,168,76,0.2);">
            <b>Зона ${zoneIndex}</b>: L:${left}% T:${top}% W:${width}% H:${height}%
          </li>`;
          
          if (zoneIndex < 6) {
            statusEl.textContent = `Ожидание: Зона ${zoneIndex + 1}`;
          } else {
            statusEl.textContent = 'Все 6 зон размечены!';
            statusEl.style.color = '#44ff44';
          }
        }
      });
    }

    document.getElementById('pcal-save').addEventListener('click', () => {
      if (calZones.length > 0) {
        localStorage.setItem('potato_zones_calibrated', JSON.stringify(calZones));
        alert('Сохранено в localStorage! Для постоянного сохранения скопируйте JS код и отправьте мне.');
      }
    });

    document.getElementById('pcal-copy').addEventListener('click', () => {
      if (calZones.length > 0) {
        const jsCode = JSON.stringify(calZones, null, 2);
        navigator.clipboard.writeText(jsCode).then(() => {
          const btn = document.getElementById('pcal-copy');
          btn.textContent = '✅ Скопировано!';
          setTimeout(() => btn.textContent = '📋 Копировать JS', 2000);
        });
      } else {
        alert('Сначала разметьте зоны!');
      }
    });

    document.getElementById('pcal-clear').addEventListener('click', () => {
      localStorage.removeItem('potato_zones_calibrated');
      location.reload();
    });

  }, 1000);
}

// Hover video logic for painting cards
document.querySelectorAll('.painting-card').forEach(card => {
  const vid = card.querySelector('video.hover-video');
  if (vid) {
    card.addEventListener('mouseenter', () => {
      vid.play().catch(()=>{});
    });
    card.addEventListener('mouseleave', () => {
      vid.pause();
    });
  }
});
