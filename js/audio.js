let _ctx = null;

function _ac() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function beep(freq = 800, dur = 0.025, type = "triangle", vol = 0.012) {
  try {
    const ctx = _ac();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(ctx.destination);
    const t = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch (_) {}
}

export const clickSound = () => beep(920, 0.025, "triangle", 0.013);
export const keySound = () => beep(1400, 0.008, "square", 0.005);
export const errorSound = () => beep(180, 0.09, "sawtooth", 0.01);
