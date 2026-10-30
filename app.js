/**
 * Happy 11th Birthday Chethas! - Magical Mystery Wheel & Celebration Engine
 */

// ============================================================================
// 1. 7 SURPRISE GIFTS CONFIGURATION (Revealed ONLY after spin)
// ============================================================================
const GIFTS = [
  {
    id: 0,
    name: "Luzsco Astronomical Telescope",
    shortName: "Telescope",
    category: "🔭 STEM Stargazer",
    image: "assets/telescope.jpg",
    color: "#1e3a8a",
    accentColor: "#3b82f6",
    url: "https://www.amazon.in/Luzsco-Telescope-Astronomical-Educational-Eyepieces/dp/B0DXJTQ89Z",
    description: "Explore the Moon, planets, rings of Saturn, and star clusters! Features high-grade optical eyepieces, 100x magnification, and an adjustable aluminum tripod."
  },
  {
    id: 1,
    name: "LEVIXA 3-in-1 Science Microscope",
    shortName: "Microscope",
    category: "🔬 Science Explorer",
    image: "assets/microscope.jpg",
    color: "#0e7490",
    accentColor: "#06b6d4",
    url: "https://www.amazon.in/LEVIXA-Educational-Microscope-Transforming-Magnifier/dp/B0H7XFMBKZ",
    description: "Discover the hidden microscopic universe with 40x-160x magnification, LED illumination, prepared specimen slides, and smartphone adapter."
  },
  {
    id: 2,
    name: "Adidas ZapCore Running Shoes",
    shortName: "Adidas Shoes",
    category: "👟 Athletic Style",
    image: "assets/shoes.jpg",
    color: "#6b21a8",
    accentColor: "#8b5cf6",
    url: "https://www.amazon.in/adidas-ZapCore-CBLACK-ZEROMT-Running/dp/B0CPVKZP4Z",
    description: "Ultra-comfortable, lightweight running sneakers in Core Black with classic Adidas three stripes and cloud-cushion bounce."
  },
  {
    id: 3,
    name: "₹3,000 Amazon Gift Voucher",
    shortName: "₹3,000 Voucher",
    category: "💳 Shopping Spree",
    image: "assets/voucher.jpg",
    color: "#b45309",
    accentColor: "#f59e0b",
    url: "https://www.amazon.in/",
    description: "A ₹3,000 Amazon Pay Gift Voucher to buy any books, electronics, video games, or sports gear of your choice on Amazon.in!"
  },
  {
    id: 4,
    name: "Yonex Astrox Lite 27i Badminton Racquet",
    shortName: "Yonex Racquet",
    category: "🏸 Pro Badminton",
    image: "assets/badminton.jpg",
    color: "#b91c1c",
    accentColor: "#ef4444",
    url: "https://www.amazon.in/YONEX-Badminton-Racquet-Astrox-Tension/dp/B08WQ2THFG",
    description: "Play like a champion! Professional Nanomesh Neo graphite frame, 77g ultra-lightweight, head-heavy balance for lightning-fast smashes."
  },
  {
    id: 5,
    name: "Trip to Beach 🏖️ (Sunny Family Vacation)",
    shortName: "Trip to Beach",
    category: "🌊 Holiday Adventure",
    image: "assets/beach.jpg",
    color: "#047857",
    accentColor: "#10b981",
    url: "https://www.google.com/travel",
    description: "An unforgettable family holiday trip to the sunny beach! Golden sands, turquoise ocean waves, swimming, sandcastles, and delicious coastal food!"
  },
  {
    id: 6,
    name: "WRF Superior Foldable Carrom Board",
    shortName: "Carrom Board",
    category: "🎯 Family Champion Game",
    image: "assets/carrom.jpg",
    color: "#c2410c",
    accentColor: "#ea580c",
    url: "https://www.amazon.in/WRF-Superior-Practice-Serious-Professional/dp/B0HFW9H8RV",
    description: "Tournament practice foldable carrom board with smooth mirror-glide playing surface, heavy hardwood border, striker, coins, and carrom powder."
  }
];

// Preload product images for the revelation modal
const PRELOADED_IMAGES = [];
GIFTS.forEach((gift, idx) => {
  const img = new Image();
  img.src = gift.image;
  PRELOADED_IMAGES[idx] = img;
});

// ============================================================================
// 2. INTERACTIVE QUIZ QUESTIONS CONFIGURATION
// ============================================================================
const QUIZ_QUESTIONS = [
  {
    text: "Whom do you like the most?",
    options: ["Thoyaj", "Mom", "Dad", "Cherry"],
    correctIndex: -1 // Any answer is correct!
  },
  {
    text: "Capital of Telangana State?",
    options: ["Hyderabad", "Chennai", "Jharkhand", "Bangalore"],
    correctIndex: 0 // Hyderabad
  },
  {
    text: "When is your year of birth?",
    options: ["2013", "2014", "2015", "2016"],
    correctIndex: 2 // 2015
  }
];

// ============================================================================
// 3. SYNTHESIZED WEB AUDIO ENGINE (Music, Clock Ticks, Buzzers & Fanfare)
// ============================================================================
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimeout = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.24, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);
  }

  playChime(freq, duration = 0.8, time = 0, gainNode = this.musicGain) {
    if (!this.ctx) return;
    const startTime = time || this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    const oscHarmonic = this.ctx.createOscillator();
    oscHarmonic.type = "triangle";
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, startTime);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const harmGain = this.ctx.createGain();
    harmGain.gain.setValueAtTime(0.001, startTime);
    harmGain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
    harmGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

    osc.connect(noteGain);
    oscHarmonic.connect(harmGain);
    noteGain.connect(gainNode);
    harmGain.connect(gainNode);

    osc.start(startTime);
    oscHarmonic.start(startTime);
    osc.stop(startTime + duration);
    oscHarmonic.stop(startTime + duration);
  }

  startHappyBirthdayMelody() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlayingMusic = true;

    const melody = [
      { note: 392.00, dur: 0.35, pause: 0.4 },  // Hap-
      { note: 392.00, dur: 0.35, pause: 0.4 },  // py
      { note: 440.00, dur: 0.7, pause: 0.8 },   // Birth-
      { note: 392.00, dur: 0.7, pause: 0.8 },   // day
      { note: 523.25, dur: 0.7, pause: 0.8 },   // to
      { note: 493.88, dur: 1.2, pause: 1.4 },   // you
      
      { note: 392.00, dur: 0.35, pause: 0.4 },  // Hap-
      { note: 392.00, dur: 0.35, pause: 0.4 },  // py
      { note: 440.00, dur: 0.7, pause: 0.8 },   // Birth-
      { note: 392.00, dur: 0.7, pause: 0.8 },   // day
      { note: 587.33, dur: 0.7, pause: 0.8 },   // to
      { note: 523.25, dur: 1.2, pause: 1.4 },   // you
      
      { note: 392.00, dur: 0.35, pause: 0.4 },  // Hap-
      { note: 392.00, dur: 0.35, pause: 0.4 },  // py
      { note: 783.99, dur: 0.7, pause: 0.8 },   // Birth-
      { note: 659.25, dur: 0.7, pause: 0.8 },   // day
      { note: 523.25, dur: 0.7, pause: 0.8 },   // dear
      { note: 493.88, dur: 0.7, pause: 0.8 },   // Che-
      { note: 440.00, dur: 1.2, pause: 1.4 },   // thas
      
      { note: 698.46, dur: 0.35, pause: 0.4 },  // Hap-
      { note: 698.46, dur: 0.35, pause: 0.4 },  // py
      { note: 659.25, dur: 0.7, pause: 0.8 },   // Birth-
      { note: 523.25, dur: 0.7, pause: 0.8 },   // day
      { note: 587.33, dur: 0.7, pause: 0.8 },   // to
      { note: 523.25, dur: 1.5, pause: 2.2 }    // you!
    ];

    let currentStep = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const step = melody[currentStep];
      this.playChime(step.note, step.dur);
      
      if (currentStep === 4 || currentStep === 10 || currentStep === 16 || currentStep === 22) {
        this.playChime(step.note / 2, step.dur * 1.5);
      }

      currentStep = (currentStep + 1) % melody.length;
      this.musicTimeout = setTimeout(playNext, step.pause * 1000);
    };

    playNext();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  // Ticking sound for 5s Countdown Timer
  playCountdownTick(isUrgent = false) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(isUrgent ? 880 : 540, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isUrgent ? 0.35 : 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Buzzer Sound for wrong answer / timeout
  playBuzzer() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = "sawtooth";
    osc2.type = "sawtooth";
    osc1.frequency.setValueAtTime(140, now);
    osc2.frequency.setValueAtTime(148, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  // Correct Answer Ding
  playCorrectSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Wheel Ratchet Peg Tick
  playWheelTick(velocity = 1) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(750 + Math.random() * 250, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.04);

    const gain = this.ctx.createGain();
    const vol = Math.min(0.55, 0.12 + velocity * 0.18);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  // Balloon Pop Sound
  playBalloonPop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    noise.connect(gain);
    osc.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    osc.start(now);
    noise.stop(now + 0.09);
    osc.stop(now + 0.09);
  }

  // Winning Victory Fanfare
  playVictoryFanfare() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [
      { f: 523.25, t: 0.0, d: 0.18 }, // C5
      { f: 659.25, t: 0.18, d: 0.18 }, // E5
      { f: 783.99, t: 0.36, d: 0.22 }, // G5
      { f: 1046.50, t: 0.6, d: 0.8 }   // High C6
    ];

    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(n.f, now + n.t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now + n.t);
      gain.gain.linearRampToValueAtTime(0.4, now + n.t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }
}

const audio = new AudioEngine();

// ============================================================================
// 4. WHEEL ENGINE & REALISTIC 3-PHASE CREEP PHYSICS
// ============================================================================
class SpinWheel {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.numSlices = GIFTS.length; // 7 slices
    this.sliceAngle = (2 * Math.PI) / this.numSlices;
    
    this.currentAngle = 0;
    this.isSpinning = false;
    this.pointerEl = document.getElementById("wheel-pointer");
    this.lastTickSlice = -1;

    this.setupCanvas();
    this.draw();
  }

  setupCanvas() {
    const dpr = window.devicePixelRatio || 2;
    const size = 700;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalSize = size;
  }

  draw() {
    const ctx = this.ctx;
    const size = this.logicalSize;
    const center = size / 2;
    const radius = center - 14;

    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(this.currentAngle);

    const sliceColors = [
      { base: "#1e3a8a", light: "#3b82f6" }, // 1. Telescope
      { base: "#0e7490", light: "#06b6d4" }, // 2. Microscope
      { base: "#6b21a8", light: "#8b5cf6" }, // 3. Shoes
      { base: "#b45309", light: "#f59e0b" }, // 4. Voucher
      { base: "#b91c1c", light: "#ef4444" }, // 5. Badminton
      { base: "#047857", light: "#10b981" }, // 6. Beach
      { base: "#c2410c", light: "#f97316" }  // 7. Carrom
    ];

    // Draw 7 Slices showing JUST CLEAN NUMBERS 1 TO 7
    for (let i = 0; i < this.numSlices; i++) {
      const palette = sliceColors[i % sliceColors.length];
      const startAngle = i * this.sliceAngle;
      const endAngle = startAngle + this.sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      const grad = ctx.createRadialGradient(0, 0, 50, 0, 0, radius);
      grad.addColorStop(0, palette.light);
      grad.addColorStop(0.65, palette.base);
      grad.addColorStop(1, "#0a0a14");
      ctx.fillStyle = grad;
      ctx.fill();

      // Divider
      ctx.strokeStyle = "rgba(255, 215, 0, 0.45)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Content inside slice: JUST THE NUMBER (1, 2, 3...)
      ctx.save();
      const midAngle = startAngle + this.sliceAngle / 2;
      ctx.rotate(midAngle);

      const numRadius = radius * 0.62;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Golden Badge Circle
      ctx.beginPath();
      ctx.arc(numRadius, 0, 36, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fill();
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Number in Bold
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 42px 'Fredoka', cursive, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.9)";
      ctx.shadowBlur = 8;
      ctx.fillText(`${i + 1}`, numRadius, 2);

      // Lucky Stars
      ctx.font = "bold 13px 'Fredoka', sans-serif";
      ctx.fillStyle = "#ffd700";
      ctx.fillText("★ LUCKY ★", radius - 30, 0);

      ctx.restore();
    }

    // Outer Rim Pegs
    for (let i = 0; i < this.numSlices; i++) {
      const angle = i * this.sliceAngle;
      const px = Math.cos(angle) * (radius - 2);
      const py = Math.sin(angle) * (radius - 2);

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd700";
      ctx.fill();
      ctx.strokeStyle = "#4a2f00";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
  }

  // REALISTIC 3-PHASE DECELERATION (HIGH SPEED -> SLOW DOWN -> CREEP & TEETER CRAWL)
  spin(targetIndex, onComplete) {
    if (this.isSpinning) return;
    this.isSpinning = true;

    const targetSliceCenter = targetIndex * this.sliceAngle + this.sliceAngle / 2;
    const pointerAngle = (3 * Math.PI) / 2;

    let targetAngle = pointerAngle - targetSliceCenter;
    while (targetAngle < this.currentAngle) {
      targetAngle += 2 * Math.PI;
    }

    // 8 full initial revolutions
    const fullSpins = 8 * (2 * Math.PI);
    const destinationAngle = targetAngle + fullSpins;
    const startAngle = this.currentAngle;
    const totalRotation = destinationAngle - startAngle;

    // Total duration: 10.5 seconds (gives ample time for slow creep!)
    const duration = 10500;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // 3-Phase Easing Function with Extended Creeping Phase:
      // Phase 1 (0 to 0.4): Fast spin, covers 70% of distance
      // Phase 2 (0.4 to 0.75): Medium deceleration, covers next 20%
      // Phase 3 (0.75 to 1.0): Agonizingly slow creep & teeter over final 10%
      let progress;
      if (t < 0.4) {
        // Fast cubic ease-in-out
        const subT = t / 0.4;
        progress = 0.70 * (subT * subT * (3 - 2 * subT));
      } else if (t < 0.75) {
        // Deceleration curve
        const subT = (t - 0.4) / 0.35;
        const ease = 1 - Math.pow(1 - subT, 2.8);
        progress = 0.70 + 0.20 * ease;
      } else {
        // Creep and crawl phase (teetering slowly across the final pegs)
        const subT = (t - 0.75) / 0.25;
        const ease = 1 - Math.pow(1 - subT, 2.2);
        progress = 0.90 + 0.10 * ease;
      }

      this.currentAngle = startAngle + totalRotation * progress;

      // Calculate instantaneous speed factor for ticks
      const speedFactor = Math.max(0.04, 1 - t);
      this.checkTicker(this.currentAngle, speedFactor);

      this.draw();

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.currentAngle = destinationAngle % (2 * Math.PI);
        this.draw();
        if (onComplete) onComplete(targetIndex);
      }
    };

    requestAnimationFrame(animate);
  }

  checkTicker(angle, speedFactor) {
    const pointerPos = (3 * Math.PI) / 2;
    const relativeAngle = ((pointerPos - angle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const sliceIndex = Math.floor(relativeAngle / this.sliceAngle);

    if (sliceIndex !== this.lastTickSlice) {
      this.lastTickSlice = sliceIndex;
      audio.playWheelTick(speedFactor);

      this.pointerEl.classList.add("ticker-bounce");
      setTimeout(() => {
        this.pointerEl.classList.remove("ticker-bounce");
      }, 70);
    }
  }
}

// ============================================================================
// 5. INTERACTIVE CELEBRATION BALLOONS ENGINE
// ============================================================================
class BalloonCelebration {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.colors = [
      "#ff2a85", "#ffd700", "#00f2fe", "#9d4edd", "#ff7b00", 
      "#06d6a0", "#3a86ff", "#f72585", "#ff006e"
    ];
  }

  spawnBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "floating-balloon";

    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    balloon.style.background = `radial-gradient(circle at 35% 30%, ${color} 0%, rgba(10,10,20,0.85) 120%)`;

    const string = document.createElement("div");
    string.className = "balloon-string";
    balloon.appendChild(string);

    const startX = Math.random() * 92;
    const driftX = (Math.random() * 120 - 60) + "px";
    const rot = (Math.random() * 30 - 15) + "deg";
    const duration = (6 + Math.random() * 5) + "s";
    const delay = (Math.random() * 1.5) + "s";
    const scale = 0.85 + Math.random() * 0.45;

    balloon.style.left = `${startX}vw`;
    balloon.style.setProperty("--drift-x", driftX);
    balloon.style.setProperty("--rot", rot);
    balloon.style.animationDuration = duration;
    balloon.style.animationDelay = delay;
    balloon.style.transform = `scale(${scale})`;

    balloon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.pop(balloon, color);
    });

    this.container.appendChild(balloon);

    setTimeout(() => {
      if (balloon.parentNode === this.container) {
        this.container.removeChild(balloon);
      }
    }, 13000);
  }

  pop(balloon, color) {
    audio.playBalloonPop();

    const rect = balloon.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    if (window.confetti) {
      window.confetti({
        particleCount: 22,
        spread: 70,
        origin: { x, y },
        colors: [color, "#ffffff", "#ffd700"],
        disableForReducedMotion: true
      });
    }

    balloon.remove();
  }

  launchCelebration(count = 35) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.spawnBalloon();
      }, i * 160);
    }
  }
}

// ============================================================================
// 6. WEBRTC LIVE REMOTE SYNC & SCREENSHARE
// ============================================================================
class RemoteSyncManager {
  constructor() {
    this.peer = null;
    this.conn = null;
    this.localStream = null;
    this.remoteStream = null;
    this.role = this.getRoleFromURL();
    this.roomId = "chethas-11th-birthday";
    this.statusEl = document.getElementById("screenshare-status");
  }

  getRoleFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("role") === "parent" ? "parent" : "kid";
  }

  init(onRemoteSpinCallback) {
    this.onRemoteSpinCallback = onRemoteSpinCallback;

    if (typeof Peer === "undefined") {
      console.warn("PeerJS not loaded, running in standalone mode.");
      return;
    }

    const peerId = this.role === "kid" ? `${this.roomId}-kid` : `${this.roomId}-parent`;

    try {
      this.peer = new Peer(peerId, { debug: 1 });

      this.peer.on("open", (id) => {
        this.updateStatus(`Ready as ${this.role.toUpperCase()} (Room: ${this.roomId})`);
        if (this.role === "parent") {
          this.connectToKid();
        }
      });

      this.peer.on("connection", (c) => {
        this.conn = c;
        this.setupDataListeners();
      });

      this.peer.on("call", (call) => {
        call.answer();
        call.on("stream", (stream) => {
          this.remoteStream = stream;
          const video = document.getElementById("remote-video");
          const container = document.getElementById("stream-container");
          if (video && container) {
            video.srcObject = stream;
            container.classList.remove("hidden");
            this.updateStatus("🟢 Live Screenshare Connected!");
          }
        });
      });

      this.peer.on("error", (err) => {
        if (err.type === "unavailable-id") {
          this.peer = new Peer();
        }
      });
    } catch (e) {
      console.error("PeerJS initialization exception:", e);
    }
  }

  connectToKid() {
    if (!this.peer) return;
    const kidPeerId = `${this.roomId}-kid`;
    this.conn = this.peer.connect(kidPeerId);
    this.setupDataListeners();
  }

  setupDataListeners() {
    if (!this.conn) return;

    this.conn.on("open", () => {
      this.updateStatus("🟢 Connected Live with Other Device!");
    });

    this.conn.on("data", (data) => {
      if (data.type === "SPIN" && this.onRemoteSpinCallback) {
        this.onRemoteSpinCallback(data.targetIndex);
      }
    });
  }

  broadcastSpin(targetIndex) {
    if (this.conn && this.conn.open) {
      this.conn.send({ type: "SPIN", targetIndex });
    }
  }

  async startScreenShare() {
    try {
      this.updateStatus("Requesting screen permission...");
      this.localStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      this.updateStatus("Streaming Chethas's screen to Dad/Mom! 🟢");

      if (this.peer) {
        const parentPeerId = `${this.roomId}-parent`;
        this.peer.call(parentPeerId, this.localStream);
      }
    } catch (err) {
      console.error("Screen share cancelled:", err);
      this.updateStatus("Screen share cancelled by user.");
    }
  }

  updateStatus(msg) {
    if (this.statusEl) {
      this.statusEl.textContent = msg;
    }
  }
}

// ============================================================================
// 7. MAIN APP: 5s SPEED QUIZ + REALISTIC SPIN REVELATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const wheel = new SpinWheel("wheel-canvas");
  const celebration = new BalloonCelebration("balloons-container");
  const remote = new RemoteSyncManager();

  // Test Mode Status (Defaults to FALSE for Live Production Mode!)
  const urlParams = new URLSearchParams(window.location.search);
  let isTestMode = urlParams.get("test") === "true"; // Only active if ?test=true is passed

  // Elements
  const testModeBanner = document.getElementById("test-mode-banner");
  const toggleTestBtn = document.getElementById("toggle-test-btn");
  const testToggleDot = document.getElementById("test-toggle-dot");
  const testToggleLabel = document.getElementById("test-toggle-label");
  const testGiftSelector = document.getElementById("test-gift-selector");
  const skipQuizBtn = document.getElementById("skip-quiz-btn");
  const exitTestModeBtn = document.getElementById("exit-test-mode-btn");

  // Quiz Elements
  const quizStage = document.getElementById("quiz-stage");
  const wheelStageSection = document.getElementById("wheel-stage-section");
  const quizTimerSeconds = document.getElementById("quiz-timer-seconds");
  const timerCircle = document.getElementById("timer-circle");
  const timerBar = document.getElementById("timer-bar");
  const questionTracker = document.getElementById("question-tracker");
  const questionText = document.getElementById("question-text");
  const optionsGrid = document.getElementById("options-grid");
  const quizFeedbackMsg = document.getElementById("quiz-feedback-msg");

  // Wheel Elements
  const spinHubBtn = document.getElementById("spin-hub-btn");
  const bigSpinBtn = document.getElementById("big-spin-btn");
  const spinBtnLabel = document.getElementById("spin-btn-label");
  const spinStatusMsg = document.getElementById("spin-status-msg");
  
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const musicDisc = document.getElementById("music-disc");
  const musicStatusText = document.getElementById("music-status-text");

  const winnerModal = document.getElementById("winner-modal");
  const winnerGiftImage = document.getElementById("winner-gift-image");
  const winnerGiftName = document.getElementById("winner-gift-name");
  const winnerGiftDesc = document.getElementById("winner-gift-desc");
  const winnerAmazonLink = document.getElementById("winner-amazon-link");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const popMoreBalloonsBtn = document.getElementById("pop-more-balloons-btn");
  const testAgainBtn = document.getElementById("test-again-btn");

  const remoteSyncBtn = document.getElementById("remote-sync-btn");
  const remoteModal = document.getElementById("remote-modal");
  const remoteCloseX = document.getElementById("remote-close-x");
  const startScreenshareBtn = document.getElementById("start-screenshare-btn");
  const viewScreenshareBtn = document.getElementById("view-screenshare-btn");
  const parentLinkInput = document.getElementById("parent-link-input");
  const kidLinkInput = document.getElementById("kid-link-input");
  const copyParentLinkBtn = document.getElementById("copy-parent-link-btn");
  const copyKidLinkBtn = document.getElementById("copy-kid-link-btn");

  const parentAdminBtn = document.getElementById("parent-admin-btn");
  const adminModal = document.getElementById("admin-modal");
  const adminCloseX = document.getElementById("admin-close-x");
  const adminToggleTestBtn = document.getElementById("admin-toggle-test-btn");
  const currentModeStatus = document.getElementById("current-mode-status");
  const adminResetSpinBtn = document.getElementById("admin-reset-spin-btn");
  const resetConfirmMsg = document.getElementById("reset-confirm-msg");
  const guaranteedGiftSelect = document.getElementById("guaranteed-gift-select");
  const adminSaveBtn = document.getElementById("admin-save-btn");

  // Dynamic Remote Presentation Links (Uses current host so works on mobile/remotely)
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  parentLinkInput.value = `${baseUrl}?role=parent&test=true`;
  kidLinkInput.value = `${baseUrl}?role=kid&test=false`;

  // LED Rim Bulbs
  const ledRim = document.getElementById("led-rim");
  const totalLeds = 24;
  for (let i = 0; i < totalLeds; i++) {
    const bulb = document.createElement("div");
    bulb.className = `led-bulb ${i % 2 === 0 ? "alt" : ""}`;
    const angle = (i / totalLeds) * (2 * Math.PI);
    const r = 49.5;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    bulb.style.left = `${x}%`;
    bulb.style.top = `${y}%`;
    ledRim.appendChild(bulb);
  }

  let ledStep = 0;
  setInterval(() => {
    const bulbs = ledRim.children;
    for (let i = 0; i < bulbs.length; i++) {
      if ((i + ledStep) % 2 === 0) {
        bulbs[i].classList.add("alt");
      } else {
        bulbs[i].classList.remove("alt");
      }
    }
    ledStep = (ledStep + 1) % bulbs.length;
  }, 220);

  // Initialize WebRTC
  remote.init((remoteTargetIndex) => {
    triggerSpinSequence(remoteTargetIndex, false);
  });

  // ========================================================================
  // QUIZ ENGINE (5-SECOND COUNTDOWN WITH TICKING & RESET)
  // ========================================================================
  let currentQuestionIndex = 0;
  let timerInterval = null;
  let remainingTime = 5.0; // 5 seconds
  let quizSolved = false;

  function startQuestion(index) {
    if (timerInterval) clearInterval(timerInterval);
    currentQuestionIndex = index;
    const q = QUIZ_QUESTIONS[index];

    questionTracker.textContent = `Question ${index + 1} of 3`;
    questionText.textContent = q.text;
    quizFeedbackMsg.textContent = "";
    quizFeedbackMsg.className = "quiz-feedback";

    optionsGrid.innerHTML = "";
    q.options.forEach((opt, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(optIdx));
      optionsGrid.appendChild(btn);
    });

    // Reset 5s Timer
    remainingTime = 5.0;
    updateTimerVisuals();

    timerInterval = setInterval(() => {
      remainingTime -= 0.1;
      if (remainingTime < 0) remainingTime = 0;
      updateTimerVisuals();

      // Audio tick on every second boundary
      if (Math.abs(remainingTime - Math.round(remainingTime)) < 0.05 && remainingTime > 0) {
        audio.playCountdownTick(remainingTime <= 2);
      }

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
      }
    }, 100);
  }

  function updateTimerVisuals() {
    const secs = Math.ceil(remainingTime);
    quizTimerSeconds.textContent = secs;

    const percent = (remainingTime / 5.0) * 100;
    timerBar.style.width = `${percent}%`;

    timerCircle.classList.remove("timer-warning", "timer-danger");
    if (remainingTime <= 2.0) {
      timerCircle.classList.add("timer-danger");
      timerBar.style.background = "#ef4444";
    } else if (remainingTime <= 3.5) {
      timerCircle.classList.add("timer-warning");
      timerBar.style.background = "#f59e0b";
    } else {
      timerBar.style.background = "linear-gradient(90deg, #22c55e, #ffd700)";
    }
  }

  function handleTimeout() {
    audio.playBuzzer();
    const card = document.querySelector(".quiz-card");
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 500);

    quizFeedbackMsg.textContent = "⏰ Too slow! Time ran out! Back to Question 1!";
    quizFeedbackMsg.className = "quiz-feedback error";

    setTimeout(() => {
      startQuestion(0);
    }, 1500);
  }

  function handleAnswer(selectedIndex) {
    if (timerInterval) clearInterval(timerInterval);
    const q = QUIZ_QUESTIONS[currentQuestionIndex];

    // Check correctness:
    // If correctIndex is -1, ANY answer is accepted!
    const isCorrect = (q.correctIndex === -1) || (selectedIndex === q.correctIndex);

    if (isCorrect) {
      audio.playCorrectSound();
      quizFeedbackMsg.textContent = "✓ Brilliant! Correct!";
      quizFeedbackMsg.className = "quiz-feedback success";

      if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
        setTimeout(() => {
          startQuestion(currentQuestionIndex + 1);
        }, 600);
      } else {
        // Solved all 3 questions!
        finishQuiz();
      }
    } else {
      // Wrong answer!
      audio.playBuzzer();
      const card = document.querySelector(".quiz-card");
      card.classList.add("shake");
      setTimeout(() => card.classList.remove("shake"), 500);

      quizFeedbackMsg.textContent = "❌ Oops! That's not correct! Starting over from Question 1!";
      quizFeedbackMsg.className = "quiz-feedback error";

      setTimeout(() => {
        startQuestion(0);
      }, 1500);
    }
  }

  function finishQuiz() {
    quizSolved = true;
    audio.playVictoryFanfare();
    triggerConfettiShower();

    quizFeedbackMsg.textContent = "🎉 LEVEL 11 UNLOCKED! ACCESS GRANTED TO THE WHEEL!";
    quizFeedbackMsg.className = "quiz-feedback success";

    setTimeout(() => {
      quizStage.style.display = "none";
      wheelStageSection.classList.remove("hidden");
      wheel.setupCanvas();
      wheel.draw();

      if (!audio.isPlayingMusic) {
        audio.startHappyBirthdayMelody();
        musicDisc.classList.remove("paused");
        musicStatusText.textContent = "Music: ON";
      }
    }, 1200);
  }

  // Skip Quiz button for quick testing
  skipQuizBtn.addEventListener("click", () => {
    finishQuiz();
  });

  // Start with Question 1
  startQuestion(0);

  // Update Test Mode UI State
  function updateTestModeUI() {
    if (isTestMode) {
      if (testModeBanner) testModeBanner.classList.remove("hidden");
      if (toggleTestBtn) {
        toggleTestBtn.classList.add("active");
        if (testToggleLabel) testToggleLabel.textContent = "Test Mode: ON";
        if (testToggleDot) testToggleDot.style.background = "#f59e0b";
      }
      if (testAgainBtn) testAgainBtn.classList.remove("hidden");
      if (currentModeStatus) currentModeStatus.textContent = "Mode: TEST (Spins Unlimited & Unsaved)";
    } else {
      if (testModeBanner) testModeBanner.classList.add("hidden");
      if (toggleTestBtn) {
        toggleTestBtn.classList.remove("active");
        if (testToggleLabel) testToggleLabel.textContent = "Test Mode: OFF";
        if (testToggleDot) testToggleDot.style.background = "#64748b";
      }
      if (testAgainBtn) testAgainBtn.classList.add("hidden");
      if (currentModeStatus) currentModeStatus.textContent = "Mode: LIVE (Strict 1 Spin For Chethas)";

      const savedWonGiftId = localStorage.getItem("chethas_won_gift");
      if (savedWonGiftId !== null) {
        const wonIdx = parseInt(savedWonGiftId, 10);
        quizStage.style.display = "none";
        wheelStageSection.classList.remove("hidden");
        markSpinAsCompleted(wonIdx);
      }
    }
  }

  updateTestModeUI();

  // Spin Request
  function handleSpinRequest() {
    if (wheel.isSpinning) return;

    if (!isTestMode && localStorage.getItem("chethas_won_gift") !== null) {
      alert("Chethas, you already spun your lucky charm! Check out your winning gift!");
      showWinnerModal(parseInt(localStorage.getItem("chethas_won_gift"), 10));
      return;
    }

    let targetIndex;
    if (isTestMode && testGiftSelector.value !== "random") {
      targetIndex = parseInt(testGiftSelector.value, 10);
    } else {
      const parentOverride = localStorage.getItem("chethas_parent_override");
      if (parentOverride && parentOverride !== "random") {
        targetIndex = parseInt(parentOverride, 10);
      } else {
        targetIndex = Math.floor(Math.random() * GIFTS.length);
      }
    }

    remote.broadcastSpin(targetIndex);
    triggerSpinSequence(targetIndex, true);
  }

  function triggerSpinSequence(targetIndex, isLocalTrigger) {
    spinHubBtn.disabled = true;
    bigSpinBtn.disabled = true;
    spinBtnLabel.textContent = "WHEEL IS SPINNING & CRAWLING...";
    spinStatusMsg.textContent = "✨ Watch closely! It will slow down and creep into your surprise! 🤞";

    if (!audio.isPlayingMusic) {
      audio.startHappyBirthdayMelody();
      musicDisc.classList.remove("paused");
      musicStatusText.textContent = "Music: ON";
    }

    wheel.spin(targetIndex, (wonIndex) => {
      if (!isTestMode) {
        localStorage.setItem("chethas_won_gift", wonIndex);
        markSpinAsCompleted(wonIndex);
      } else {
        spinHubBtn.disabled = false;
        bigSpinBtn.disabled = false;
        spinBtnLabel.textContent = "SPIN AGAIN (TEST MODE)";
        spinStatusMsg.textContent = "🧪 Test spin finished! Spin history was NOT registered.";
      }

      audio.playVictoryFanfare();
      triggerConfettiShower();
      celebration.launchCelebration(35);

      setTimeout(() => {
        showWinnerModal(wonIndex);
      }, 1000);
    });
  }

  function markSpinAsCompleted(wonIndex) {
    spinHubBtn.disabled = true;
    bigSpinBtn.disabled = true;
    spinBtnLabel.textContent = "LUCKY GIFT REVEALED! 🎉";
    const gift = GIFTS[wonIndex];
    spinStatusMsg.innerHTML = `🏆 Congratulations Chethas! You revealed: <strong>${gift.name}</strong>!`;
  }

  function showWinnerModal(giftIndex) {
    const gift = GIFTS[giftIndex];
    winnerGiftImage.src = gift.image;
    winnerGiftName.textContent = gift.name;
    winnerGiftDesc.textContent = gift.description;
    
    winnerAmazonLink.href = gift.url;
    if (gift.id === 5) {
      winnerAmazonLink.querySelector("span").textContent = "View Beach Destinations 🏖️";
    } else {
      winnerAmazonLink.querySelector("span").textContent = "View On Amazon.in";
    }

    winnerModal.classList.remove("hidden");
  }

  function triggerConfettiShower() {
    if (!window.confetti) return;
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      window.confetti({
        particleCount: 8,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ["#ffd700", "#ff2a85", "#00f2fe", "#9d4edd", "#ffffff", "#10b981"]
      });
      window.confetti({
        particleCount: 8,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ["#ffd700", "#ff2a85", "#00f2fe", "#9d4edd", "#ffffff", "#10b981"]
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }

  // Event Listeners
  spinHubBtn.addEventListener("click", handleSpinRequest);
  bigSpinBtn.addEventListener("click", handleSpinRequest);

  function toggleTestMode() {
    isTestMode = !isTestMode;
    updateTestModeUI();
  }

  if (toggleTestBtn) toggleTestBtn.addEventListener("click", toggleTestMode);
  if (adminToggleTestBtn) adminToggleTestBtn.addEventListener("click", toggleTestMode);
  if (exitTestModeBtn) {
    exitTestModeBtn.addEventListener("click", () => {
      isTestMode = false;
      updateTestModeUI();
    });
  }

  testAgainBtn.addEventListener("click", () => {
    winnerModal.classList.add("hidden");
    setTimeout(() => {
      handleSpinRequest();
    }, 400);
  });

  musicToggleBtn.addEventListener("click", () => {
    if (audio.isPlayingMusic) {
      audio.stopMusic();
      musicDisc.classList.add("paused");
      musicStatusText.textContent = "Music: OFF";
    } else {
      audio.startHappyBirthdayMelody();
      musicDisc.classList.remove("paused");
      musicStatusText.textContent = "Music: ON";
    }
  });

  modalCloseBtn.addEventListener("click", () => {
    winnerModal.classList.add("hidden");
  });

  popMoreBalloonsBtn.addEventListener("click", () => {
    celebration.launchCelebration(25);
    triggerConfettiShower();
  });

  remoteSyncBtn.addEventListener("click", () => {
    remoteModal.classList.remove("hidden");
  });

  remoteCloseX.addEventListener("click", () => {
    remoteModal.classList.add("hidden");
  });

  startScreenshareBtn.addEventListener("click", () => {
    remote.startScreenShare();
  });

  viewScreenshareBtn.addEventListener("click", () => {
    const video = document.getElementById("remote-video");
    const container = document.getElementById("stream-container");
    container.classList.remove("hidden");
    remote.connectToKid();
  });

  copyParentLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(parentLinkInput.value).then(() => {
      copyParentLinkBtn.textContent = "Copied! ✓";
      setTimeout(() => { copyParentLinkBtn.textContent = "Copy Link"; }, 2500);
    });
  });

  copyKidLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(kidLinkInput.value).then(() => {
      copyKidLinkBtn.textContent = "Copied! ✓";
      setTimeout(() => { copyKidLinkBtn.textContent = "Copy Link"; }, 2500);
    });
  });

  parentAdminBtn.addEventListener("click", () => {
    adminModal.classList.remove("hidden");
    const override = localStorage.getItem("chethas_parent_override") || "random";
    guaranteedGiftSelect.value = override;
  });

  adminCloseX.addEventListener("click", () => {
    adminModal.classList.add("hidden");
  });

  adminResetSpinBtn.addEventListener("click", () => {
    localStorage.removeItem("chethas_won_gift");
    spinHubBtn.disabled = false;
    bigSpinBtn.disabled = false;
    spinBtnLabel.textContent = "SPIN FOR YOUR BIRTHDAY GIFT!";
    spinStatusMsg.textContent = "Ready for the spin! Fortune is waiting for you, Chethas! 🍀";
    
    // Reset Quiz
    quizSolved = false;
    quizStage.style.display = "block";
    wheelStageSection.classList.add("hidden");
    startQuestion(0);

    resetConfirmMsg.textContent = "✓ Quiz & Spin Cleared! Ready for fresh start.";
    setTimeout(() => { resetConfirmMsg.textContent = ""; }, 3000);
  });

  guaranteedGiftSelect.addEventListener("change", (e) => {
    localStorage.setItem("chethas_parent_override", e.target.value);
  });

  adminSaveBtn.addEventListener("click", () => {
    adminModal.classList.add("hidden");
  });

  setTimeout(() => {
    celebration.launchCelebration(6);
  }, 1000);

  window.addEventListener("resize", () => {
    wheel.setupCanvas();
    wheel.draw();
  });
});
