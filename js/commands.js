import { addLine, gap, typeLines, esc } from "./output.js";

export const COMMANDS = {
  help() {
    gap();
    return typeLines([
      '<span class="c b">Available commands</span>',
      '<span class="dim">────────────────────────────────</span>',
      '  <span class="g">about</span>      — who I am',
      '  <span class="g">skills</span>     — tech stack + levels',
      '  <span class="g">projects</span>   — list my projects',
      '  <span class="g">open &lt;n&gt;</span>   — open project 1–4',
      '  <span class="g">contact</span>    — get in touch',
      '  <span class="g">whoami</span>     — quick identity',
      '  <span class="g">neofetch</span>   — system info',
      '  <span class="g">ls</span>         — list directory',
      '  <span class="g">github</span>     — open GitHub',
      '  <span class="g">linkedin</span>   — open LinkedIn',
      '  <span class="g">clear</span>      — clear screen',
      '<span class="dim">  Tab = autocomplete  ↑↓ = history</span>',
      "",
    ]);
  },

  about() {
    gap();
    return typeLines([
      {
        html: '<span class="ascii">  ███████╗██████╗  █████╗ ███╗   ██╗██╗  ██╗\n  ██╔════╝██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝\n  █████╗  ██████╔╝███████║██╔██╗ ██║█████╔╝\n  ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██╔═██╗\n  ██║     ██║  ██║██║  ██║██║ ╚████║██║  ██╗\n  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝</span>',
        delay: 0,
      },
      "",
      '  <span class="c b">Backend Engineer</span>  <span class="dim">//</span>  <span class="y">Czechia </span>',
      '  <span class="dim">Ukraine 🇺🇦 · Kharkiv University (remote)</span>',
      "",
      '  Building fast backend systems in <span class="g">Go</span> & <span class="c">PHP/Laravel</span>.',
      "  Interested in security, DevOps, microservices.",
      "",
      {
        html: '<div class="card hi"><div class="tags"><span class="tag g">open to work</span><span class="tag c">backend</span><span class="tag y">devops</span><span class="tag p">security</span></div></div>',
        delay: 80,
      },
      "",
    ]);
  },

  whoami() {
    gap();
    return typeLines([
      '<span class="g b">frank</span>',
      'uid=1000(frank) gid=1000(frank) groups=<span class="c">developers</span>,<span class="p">security</span>',
      "",
    ]);
  },

  skills() {
    const rows = [
      { n: "Go", p: 78, c: "g" },
      { n: "PHP/Laravel", p: 88, c: "c" },
      { n: "PostgreSQL", p: 75, c: "p" },
      { n: "Docker", p: 70, c: "y" },
      { n: "Linux", p: 82, c: "g" },
      { n: "Security", p: 65, c: "p" },
    ]
      .map(
        (s) =>
          `<div class="prow"><span class="plabel">${esc(s.n)}</span>` +
          `<div class="pbar"><div class="pfill ${s.c}" data-pct="${s.p}"></div></div>` +
          `<span class="ppct">${s.p}%</span></div>`,
      )
      .join("");

    gap();
    return typeLines([
      '<span class="c b">// skills.go</span>',
      { html: rows, delay: 40 },
      "",
    ]).then(() => {
      document.querySelectorAll(".pfill[data-pct]").forEach((el, i) => {
        setTimeout(() => {
          el.style.width = el.dataset.pct + "%";
        }, i * 80);
      });
    });
  },

  projects() {
    gap();
    return typeLines([
      '<span class="c b">~/projects</span>  <span class="dim">(2 items)</span>',
      "",
      {
        html: '<div class="card ci"><div class="card-title">01 · FaceitHunter</div><div class="kv"><span class="k">stack</span><span><span class="g">Go</span> · PostgreSQL · Redis</span></div><div class="kv"><span class="k">url</span><span class="c">faceithunter.com</span></div><div class="tags"><span class="tag g">featured</span><span class="tag c">live</span></div></div>',
        delay: 30,
      },
      {
        html: '<div class="card"><div class="card-title">02 · Order System</div><div class="kv"><span class="k">stack</span><span><span class="o">Laravel</span> · Livewire · GA4</span></div><div class="tags"><span class="tag y">fullstack</span></div></div>',
        delay: 50,
      },
      "",
      '<span class="dim">type <span class="y">open 1</span> to visit a project</span>',
      "",
    ]);
  },

  open(args) {
    const n = parseInt(args[0]);
    const list = [
      { name: "FaceitHunter", url: "https://faceithunter.com", live: true },
      { name: "Order System", url: "https://food-prom.com.ua", live: true },
    ];
    if (!n || n < 1 || n > 4) {
      gap();
      return typeLines([
        '<span class="r">error:</span> usage: open &lt;1-4&gt;',
        '<span class="dim">run <span class="y">projects</span> first</span>',
        "",
      ]);
    }
    const p = list[n - 1];
    gap();
    const lines = [
      `<span class="g">Opening:</span> <span class="c">${esc(p.name)}</span>`,
    ];
    if (p.live) {
      lines.push(
        `<span class="g">↳</span> <a href="${p.url}" target="_blank" style="color:var(--cyan)">${p.url}</a>`,
      );
    } else {
      lines.push('<span class="y">↳ Private — contact me for access</span>');
    }
    lines.push("");
    return typeLines(lines).then(() => {
      if (p.live) setTimeout(() => window.open(p.url, "_blank"), 500);
    });
  },

  contact() {
    gap();
    return typeLines([
      '<span class="c b">// contact.sh</span>',
      "",
      {
        html: '<div class="card hi"><div class="card-title">📬 Contact</div><div class="kv"><span class="k">email</span><a href="mailto:thefrenky30@gmail.com" style="color:var(--cyan)">thefrenky30@gmail.com</a></div><div class="kv"><span class="k">status</span><span class="g">● open to work</span></div></div>',
        delay: 30,
      },
      "",
      '  <span class="g">$</span> <a href="mailto:thefrenky30@gmail.com" style="color:var(--cyan)">thefrenky30@gmail.com</a>',
      '  <span class="g">$</span> <a href="https://github.com/TheFrenk" target="_blank" style="color:var(--cyan)">github.com/TheFrenk</a>',
      "",
    ]);
  },

  neofetch() {
    gap();
    return typeLines([
      {
        html: '<span class="g">       ████████</span>         <span class="c b">frank</span><span class="dim">@</span><span class="g b">dev</span>',
        delay: 0,
      },
      {
        html: '<span class="g">     ████████████</span>       <span class="dim">──────────────────</span>',
      },
      {
        html: '<span class="g">    ██</span><span class="c">████████████</span><span class="g">██</span>     <span class="y">OS</span>       Arch Linux x86_64',
      },
      {
        html: '<span class="g">    ██</span><span class="c">████████████</span><span class="g">██</span>     <span class="y">Go</span>       1.22.4',
      },
      {
        html: '<span class="g">    ██</span><span class="c">████████████</span><span class="g">██</span>     <span class="y">PHP</span>      8.3.9',
      },
      {
        html: '<span class="g">     ████████████</span>       <span class="y">Docker</span>   26.1.4',
      },
      {
        html: '<span class="g">       ████████</span>         <span class="y">Location</span> CZ',
      },
      "",
    ]);
  },

  ls() {
    gap();
    return typeLines([
      "total 5",
      'drwxr-xr-x  frank  <span class="c">projects/</span>',
      '-rw-r--r--  frank  <span class="y">about.txt</span>',
      '-rwxr-xr-x  frank  <span class="g">skills.go</span>',
      '-rwxr-xr-x  frank  <span class="g">contact.sh</span>',
      "",
    ]);
  },

  github() {
    gap();
    return typeLines(['<span class="g">↳ Opening GitHub...</span>', ""]).then(
      () =>
        setTimeout(
          () => window.open("https://github.com/TheFrenk", "_blank"),
          400,
        ),
    );
  },

  linkedin() {
    gap();
    return typeLines(['<span class="g">↳ Opening LinkedIn...</span>', ""]).then(
      () =>
        setTimeout(() => window.open("https://linkedin.com", "_blank"), 400),
    );
  },

  clear() {
    document.getElementById("output").innerHTML = "";
    return Promise.resolve();
  },

  _notFound(cmd) {
    gap();
    return typeLines([
      `<span class="r">bash: ${esc(cmd)}: command not found</span>`,
      '<span class="dim">type <span class="y">help</span></span>',
      "",
    ]);
  },
};
