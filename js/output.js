const outEl = document.getElementById("output");

export function scrollBottom() {
  outEl.scrollTop = outEl.scrollHeight;
}

export function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function addLine(html = "", extraClass = "") {
  const el = document.createElement("span");
  el.className = "ln fade" + (extraClass ? " " + extraClass : "");
  el.innerHTML = html + "\n";
  outEl.appendChild(el);
  scrollBottom();
  return el;
}

export function gap() {
  addLine("", "gap");
}

export function typeLines(lines, speed = 22) {
  return new Promise((resolve) => {
    let i = 0;
    function next() {
      if (i >= lines.length) {
        resolve();
        return;
      }
      const item = lines[i++];
      if (typeof item === "string") {
        addLine(item);
        setTimeout(next, speed);
      } else {
        addLine(item.html ?? "", item.cls ?? "");
        setTimeout(next, item.delay ?? speed);
      }
    }
    next();
  });
}
