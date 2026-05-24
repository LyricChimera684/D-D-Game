// Lightweight Web Audio synth for D&D UI sounds.
// No external assets — all sounds are generated procedurally.

const STORAGE_KEY = "ror:sound-muted";
const listeners = new Set<(muted: boolean) => void>();

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function readMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const W = window as unknown as { webkitAudioContext?: typeof AudioContext };
  const Ctor = window.AudioContext || W.webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    try {
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
    } catch {
      ctx = null;
    }
  }
  // Some browsers suspend the context until a user gesture.
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

type Tone = {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
  detune?: number;
};

function playTones(tones: Tone[]) {
  if (readMuted()) return;
  const c = ensureCtx();
  if (!c || !master) return;
  const now = c.currentTime;
  for (const t of tones) {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = t.type ?? "sine";
    osc.frequency.value = t.freq;
    if (t.detune) osc.detune.value = t.detune;
    const start = now + (t.delay ?? 0);
    const peak = (t.gain ?? 1) * 0.85;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + t.duration);
    osc.connect(g);
    g.connect(master);
    osc.start(start);
    osc.stop(start + t.duration + 0.05);
  }
}

/** Play a single oscillator whose frequency sweeps from freqStart to freqEnd. */
function playRamp(
  freqStart: number,
  freqEnd: number,
  duration: number,
  options?: { type?: OscillatorType; gain?: number; delay?: number },
) {
  if (readMuted()) return;
  const c = ensureCtx();
  if (!c || !master) return;
  const now = c.currentTime;
  const start = now + (options?.delay ?? 0);
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = options?.type ?? "sine";
  osc.frequency.setValueAtTime(freqStart, start);
  osc.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
  const peak = (options?.gain ?? 1) * 0.85;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g);
  g.connect(master);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

export const sound = {
  // ── Basic UI ──────────────────────────────────────────────────────────────
  click() {
    playTones([{ freq: 880, duration: 0.06, type: "triangle", gain: 0.6 }]);
  },
  hover() {
    playTones([{ freq: 1320, duration: 0.04, type: "sine", gain: 0.25 }]);
  },
  themeChange() {
    // Quick three-note arpeggio
    playTones([
      { freq: 523.25, duration: 0.18, type: "sine", gain: 0.7 },
      { freq: 659.25, duration: 0.18, type: "sine", gain: 0.7, delay: 0.06 },
      { freq: 783.99, duration: 0.28, type: "sine", gain: 0.8, delay: 0.12 },
    ]);
  },
  toggleOn() {
    playTones([
      { freq: 440, duration: 0.1, type: "triangle", gain: 0.7 },
      { freq: 660, duration: 0.14, type: "triangle", gain: 0.7, delay: 0.05 },
    ]);
  },
  toggleOff() {
    playTones([
      { freq: 660, duration: 0.1, type: "triangle", gain: 0.5 },
      { freq: 330, duration: 0.14, type: "triangle", gain: 0.5, delay: 0.05 },
    ]);
  },
  /** Subtle tap for tab navigation — distinct from a plain click. */
  tabSwitch() {
    playTones([{ freq: 720, duration: 0.07, type: "triangle", gain: 0.45 }]);
  },
  /** Short buzz for validation errors or disabled actions. */
  error() {
    playTones([
      { freq: 220, duration: 0.14, type: "square", gain: 0.55, delay: 0.0 },
      { freq: 185, duration: 0.22, type: "square", gain: 0.48, delay: 0.13 },
    ]);
  },

  // ── Combat & Dice ─────────────────────────────────────────────────────────
  /** Rattling clatter of dice tumbling across the table. */
  diceRoll() {
    playTones([
      { freq: 350, duration: 0.04, type: "square", gain: 0.35, delay: 0.0 },
      { freq: 520, duration: 0.04, type: "square", gain: 0.3, delay: 0.07 },
      { freq: 290, duration: 0.04, type: "square", gain: 0.35, delay: 0.13 },
      { freq: 610, duration: 0.04, type: "square", gain: 0.3, delay: 0.19 },
      { freq: 380, duration: 0.04, type: "square", gain: 0.35, delay: 0.25 },
      { freq: 470, duration: 0.04, type: "square", gain: 0.3, delay: 0.31 },
      { freq: 320, duration: 0.05, type: "square", gain: 0.42, delay: 0.37 },
      { freq: 580, duration: 0.12, type: "triangle", gain: 0.52, delay: 0.45 }, // landing clack
    ]);
  },
  /** Satisfying ascending ping when the dice result is revealed. */
  diceResult() {
    playTones([
      { freq: 523.25, duration: 0.18, type: "sine", gain: 0.55, delay: 0.0 }, // C5
      { freq: 783.99, duration: 0.32, type: "sine", gain: 0.68, delay: 0.13 }, // G5
    ]);
  },
  /** Alert chime — the DM is requesting a dice roll. */
  diceRequest() {
    playTones([
      { freq: 440, duration: 0.1, type: "triangle", gain: 0.52, delay: 0.0 },
      { freq: 660, duration: 0.12, type: "triangle", gain: 0.58, delay: 0.09 },
      { freq: 880, duration: 0.24, type: "sine", gain: 0.58, delay: 0.21 },
    ]);
  },
  /** Dramatic clash of steel — combat has begun! */
  combatStart() {
    playTones([
      { freq: 110.0, duration: 0.65, type: "sawtooth", gain: 0.55, delay: 0.0 }, // A2
      {
        freq: 155.56,
        duration: 0.55,
        type: "sawtooth",
        gain: 0.45,
        delay: 0.18,
      }, // Eb3 (tritone)
      { freq: 220.0, duration: 0.48, type: "square", gain: 0.5, delay: 0.35 }, // A3
    ]);
    playRamp(300, 110, 0.75, { type: "sawtooth", gain: 0.32, delay: 0.45 });
  },
  /** Resolving chord — the battle is over, victory is yours. */
  combatEnd() {
    playTones([
      { freq: 392.0, duration: 0.18, type: "triangle", gain: 0.55, delay: 0.0 }, // G4
      {
        freq: 523.25,
        duration: 0.26,
        type: "triangle",
        gain: 0.62,
        delay: 0.13,
      }, // C5
      { freq: 659.25, duration: 0.48, type: "sine", gain: 0.62, delay: 0.28 }, // E5
      { freq: 523.25, duration: 0.58, type: "sine", gain: 0.44, delay: 0.4 }, // C5 harmony
    ]);
  },
  /** Somber descending tones — the hero has fallen. */
  characterDeath() {
    playTones([
      { freq: 220.0, duration: 0.85, type: "sine", gain: 0.55, delay: 0.0 }, // A3
      { freq: 196.0, duration: 0.9, type: "sine", gain: 0.48, delay: 0.45 }, // G3
      { freq: 164.81, duration: 1.3, type: "sine", gain: 0.42, delay: 1.0 }, // E3
    ]);
    playRamp(185, 65, 2.0, { type: "sine", gain: 0.28, delay: 0.65 });
  },

  // ── Story & Narrative ──────────────────────────────────────────────────────
  /** Forward whoosh — the action is launched into the world. */
  actionSend() {
    playRamp(620, 230, 0.2, { type: "sine", gain: 0.42 });
    playTones([
      { freq: 440, duration: 0.09, type: "triangle", gain: 0.32, delay: 0.06 },
    ]);
  },
  /** Mystical unfurling — the Dungeon Master's oracle speaks. */
  dmResponse() {
    playTones([
      { freq: 174.61, duration: 0.48, type: "sine", gain: 0.36, delay: 0.0 }, // F3
      { freq: 349.23, duration: 0.54, type: "sine", gain: 0.42, delay: 0.14 }, // F4
      { freq: 523.25, duration: 0.58, type: "sine", gain: 0.32, delay: 0.3 }, // C5
    ]);
  },
  /** Triumphant fanfare — achievement unlocked! */
  achievement() {
    playTones([
      {
        freq: 523.25,
        duration: 0.15,
        type: "triangle",
        gain: 0.72,
        delay: 0.0,
      }, // C5
      {
        freq: 659.25,
        duration: 0.15,
        type: "triangle",
        gain: 0.72,
        delay: 0.09,
      }, // E5
      {
        freq: 783.99,
        duration: 0.15,
        type: "triangle",
        gain: 0.72,
        delay: 0.18,
      }, // G5
      { freq: 1046.5, duration: 0.55, type: "sine", gain: 0.78, delay: 0.29 }, // C6
      { freq: 783.99, duration: 0.55, type: "sine", gain: 0.58, delay: 0.29 }, // G5 chord
    ]);
  },
  /** Epic ascending fanfare — you have grown mightier! */
  levelUp() {
    playTones([
      {
        freq: 261.63,
        duration: 0.14,
        type: "triangle",
        gain: 0.65,
        delay: 0.0,
      }, // C4
      {
        freq: 329.63,
        duration: 0.14,
        type: "triangle",
        gain: 0.65,
        delay: 0.11,
      }, // E4
      {
        freq: 392.0,
        duration: 0.14,
        type: "triangle",
        gain: 0.65,
        delay: 0.22,
      }, // G4
      {
        freq: 523.25,
        duration: 0.14,
        type: "triangle",
        gain: 0.7,
        delay: 0.34,
      }, // C5
      { freq: 659.25, duration: 0.38, type: "sine", gain: 0.65, delay: 0.47 }, // E5
      { freq: 783.99, duration: 0.58, type: "sine", gain: 0.72, delay: 0.56 }, // G5
      { freq: 1046.5, duration: 0.7, type: "sine", gain: 0.62, delay: 0.65 }, // C6
    ]);
  },
  /** Subtle ping — a party member sent a message. */
  chatMessage() {
    playTones([
      { freq: 880, duration: 0.07, type: "sine", gain: 0.28, delay: 0.0 },
      { freq: 1100, duration: 0.11, type: "sine", gain: 0.22, delay: 0.05 },
    ]);
  },
};

export function isMuted(): boolean {
  return readMuted();
}

export function setMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  listeners.forEach((fn) => fn(muted));
  if (!muted) {
    // Play a short confirmation when unmuting
    sound.toggleOn();
  }
}

export function subscribeMuted(fn: (m: boolean) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
