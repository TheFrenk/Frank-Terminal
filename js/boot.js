import { typeLines } from "./output.js";
import { runCmd, initInput } from "./input.js";

function tick() {
  document.getElementById("sbTime").textContent = new Date().toLocaleTimeString(
    "en-GB",
  );
}
tick();
setInterval(tick, 1000);

document.querySelectorAll(".sb-btn[data-cmd]").forEach((btn) => {
  btn.addEventListener("click", () => {
    runCmd(btn.dataset.cmd);
    document.getElementById("cmdInput").focus();
  });
});

initInput();

async function boot() {
  await typeLines(
    [
      {
        html: '<span class="dim">Last login: Tue Jun 23 12:12:02 2026</span>',
        delay: 0,
      },
      {
        html: '<span class="g b">frank@dev</span><span class="dim">:~$</span> <span class="w">./init_portfolio.sh</span>',
        delay: 300,
      },
      "",
      { html: '<span class="dim">[  OK  ] Go runtime 1.22</span>', delay: 60 },
      {
        html: '<span class="dim">[  OK  ] PostgreSQL driver</span>',
        delay: 60,
      },
      { html: '<span class="dim">[  OK  ] Redis connected</span>', delay: 60 },
      { html: '<span class="g">[  OK  ] Portfolio online.</span>', delay: 120 },
      "",
      '<span class="c b">frank.dev</span> — Backend Engineer',
      '<span class="dim">Type <span class="y">help</span> or click a file in the sidebar.</span>',
      "",
    ],
    35,
  );

  document.getElementById("cmdInput").focus();
}

boot();
