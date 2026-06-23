import { keySound, clickSound } from "./audio.js";
import { COMMANDS } from "./commands.js";
import { addLine, esc } from "./output.js";

const ALL_CMDS = [
  "about",
  "skills",
  "projects",
  "contact",
  "whoami",
  "neofetch",
  "ls",
  "help",
  "clear",
  "github",
  "linkedin",
  "open",
];

const hist = [];
let histIdx = -1;
let busy = false;

export function setSidebarActive(cmd) {
  document.querySelectorAll(".sb-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cmd === cmd);
  });
}

function echoPrompt(txt) {
  addLine(
    '<span class="g b">frank</span><span class="dim">@</span><span class="c">dev</span>' +
      '<span class="dim">:</span><span class="y">~</span><span class="dim">$ </span>' +
      `<span class="w">${esc(txt)}</span>`,
  );
}

export async function runCmd(raw) {
  if (busy) return;
  const line = raw.trim();
  if (!line) return;

  echoPrompt(line);
  clickSound();

  const [cmd, ...args] = line.split(/\s+/);
  const key = cmd.toLowerCase();

  setSidebarActive(key);
  busy = true;

  const fn = COMMANDS[key];
  await (fn ? fn.call(COMMANDS, args) : COMMANDS._notFound(key));
  busy = false;

  document.getElementById("cmdInput").focus();
}

export function initInput() {
  const input = document.getElementById("cmdInput");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value;
      input.value = "";
      if (val.trim()) {
        hist.unshift(val);
        histIdx = -1;
      }
      runCmd(val);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < hist.length - 1) {
        histIdx++;
        input.value = hist[histIdx];
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      histIdx > 0
        ? (histIdx--, (input.value = hist[histIdx]))
        : ((histIdx = -1), (input.value = ""));
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.value.toLowerCase();
      const match = ALL_CMDS.find((c) => c.startsWith(partial));
      if (match) {
        input.value = match;
        keySound();
      }
      return;
    }
    keySound();
  });

  document
    .getElementById("output")
    .addEventListener("click", () => input.focus());
}
