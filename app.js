(function () {
  var S = window.SITE;
  var lang = pickLang();

  function pickLang() {
    var saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "vi" || q === "en") return q;
    if (saved === "vi" || saved === "en") return saved;
    return "en";
  }

  function tr(v) { return v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v; }
  function get(path) { return path.split(".").reduce(function (o, k) { return o && o[k]; }, S); }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function link(href, text, cls, ext) {
    var a = el("a", { href: href, text: text, class: cls || "" });
    if (ext) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  function renderProjects() {
    var board = document.getElementById("board");
    board.innerHTML = "";
    S.projects.forEach(function (p) {
      var live = p.status === "live" || p.status === "ui";
      var statusText = p.status === "live" ? tr(S.ui.statusLive) : p.status === "ui" ? tr(S.ui.statusUi) : tr(S.ui.statusSoon);

      var actions = el("div", { class: "row-actions" });
      if (live && p.demo) actions.appendChild(link(p.demo, p.demoLabel ? tr(p.demoLabel) : tr(S.ui.openDemo), "btn primary", p.demo.indexOf("http") === 0));
      if (p.demoAdmin) actions.appendChild(link(p.demoAdmin, tr(S.ui.adminDemo), "btn primary", false));
      var player = null;
      if (p.video) {
        var vbtn = el("button", { class: "btn primary", type: "button", "aria-expanded": "false", "aria-controls": "v-" + p.id, text: tr(S.ui.watchVideo) });
        player = el("div", { class: "player", id: "v-" + p.id, hidden: "" });
        vbtn.addEventListener("click", function () {
          var open = vbtn.getAttribute("aria-expanded") === "true";
          vbtn.setAttribute("aria-expanded", String(!open));
          vbtn.textContent = open ? tr(S.ui.watchVideo) : tr(S.ui.hideVideo);
          if (open) { player.setAttribute("hidden", ""); player.innerHTML = ""; return; }
          player.appendChild(el("div", { class: "frame" }, [el("iframe", {
            src: p.video.embed, title: p.name + " demo video", allow: "autoplay; fullscreen", allowfullscreen: "", loading: "lazy"
          })]));
          player.appendChild(el("p", { class: "extra" }, [link(p.video.view, tr(S.ui.videoNewTab), "", true)]));
          player.removeAttribute("hidden");
        });
        actions.appendChild(vbtn);
      }
      actions.appendChild(link(p.code, tr(S.ui.viewCode), "btn", true));

      var detailsId = "d-" + p.id;
      var toggle = el("button", { class: "toggle", type: "button", "aria-expanded": "false", "aria-controls": detailsId, text: tr(S.ui.details) });

      var points = el("ul", { class: "points" });
      tr(p.points).forEach(function (t) { points.appendChild(el("li", { text: t })); });
      var details = el("div", { class: "details", id: detailsId, hidden: "" }, [
        el("p", { class: "context", text: tr(p.context) }),
        points,
        p.extra ? el("p", { class: "extra" }, [link(p.extra.url, tr(p.extra.label), "", true)]) : null
      ]);

      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        toggle.textContent = open ? tr(S.ui.details) : tr(S.ui.hideDetails);
        if (open) details.setAttribute("hidden", ""); else details.removeAttribute("hidden");
      });

      var stack = el("ul", { class: "stack", "aria-label": "Tech stack" });
      p.stack.forEach(function (s) { stack.appendChild(el("li", { text: s })); });

      var row = el("li", { id: p.id, tabindex: "-1", class: "row " + (p.status === "live" ? "is-live" : p.status === "ui" ? "is-ui" : "is-soon") }, [
        el("div", { class: "row-main" }, [
          el("p", { class: "status" }, [el("span", { class: "dot", "aria-hidden": "true" }), document.createTextNode(statusText)]),
          el("h3", { text: p.name }),
          el("p", { class: "tagline", text: tr(p.tagline) }),
          stack,
          p.status !== "live" && p.demoNote ? el("p", { class: "note", text: tr(p.demoNote) }) : null
        ]),
        el("div", { class: "row-side" }, [actions, toggle]),
        player,
        details
      ]);
      board.appendChild(row);
    });
  }

  function renderExperience() {
    var box = document.getElementById("exp");
    box.innerHTML = "";
    S.experience.forEach(function (x) {
      var ul = el("ul", { class: "points" });
      tr(x.points).forEach(function (t) { ul.appendChild(el("li", { text: t })); });
      box.appendChild(el("article", { class: "entry" }, [
        el("p", { class: "when", text: tr(x.time) }),
        el("h3", {}, [link(x.url, x.org, "", true)]),
        el("p", { class: "what", text: tr(x.role) + " — " + x.stack.join(", ") }),
        ul
      ]));
    });
    var e = S.education;
    var edu = document.getElementById("edu");
    edu.innerHTML = "";
    edu.appendChild(el("article", { class: "entry" }, [
      el("p", { class: "when", text: e.time }),
      el("h3", { text: tr(e.school) }),
      el("p", { class: "what", text: tr(e.major) }),
      el("p", { text: tr(e.note) })
    ]));
  }

  function renderSkills() {
    var dl = document.getElementById("skill-list");
    dl.innerHTML = "";
    S.skills.forEach(function (g) {
      dl.appendChild(el("dt", { text: tr(g.group) }));
      dl.appendChild(el("dd", { text: g.items.join(", ") }));
    });
    var cl = document.getElementById("cert-list");
    cl.innerHTML = "";
    S.certificates.forEach(function (c) {
      cl.appendChild(el("li", {}, [el("strong", { text: c.name }), el("span", { text: c.by })]));
    });
  }

  function renderContact() {
    var p = S.person;
    var ul = document.getElementById("contact-list");
    ul.innerHTML = "";
    [
      ["Email", "mailto:" + p.email, p.email],
      [lang === "vi" ? "Điện thoại" : "Phone", "tel:" + p.phone.replace(/\s/g, ""), p.phone],
      ["GitHub", p.github, "github.com/DuongNT1424"],
      ["Hugging Face", p.huggingface, "huggingface.co/DuongNTCE"],
      ["CV (PDF)", p.cv[lang], tr(S.ui.downloadCv)]
    ].forEach(function (r) {
      var ext = r[1].indexOf("http") === 0;
      ul.appendChild(el("li", {}, [el("span", { class: "k", text: r[0] }), link(r[1], r[2], "", ext)]));
    });
  }

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-t]").forEach(function (n) { n.textContent = tr(get(n.getAttribute("data-t"))); });
    document.querySelectorAll("[data-nav]").forEach(function (n) { n.textContent = tr(S.ui.nav)[+n.getAttribute("data-nav")]; });
    document.getElementById("lang").textContent = tr(S.ui.langSwitch);
    document.getElementById("lang").setAttribute("aria-label", lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt");
    var cv = document.getElementById("cv-link"); cv.href = S.person.cv[lang];
    document.getElementById("hero-mail").href = "mailto:" + S.person.email;
    document.getElementById("hero-gh").href = S.person.github;
    document.title = lang === "vi" ? "Nguyễn Thái Dương · Kỹ sư Backend & AI" : "Nguyen Thai Duong · Backend & AI Engineer";
    document.querySelector(".skip").textContent = lang === "vi" ? "Bỏ qua tới phần dự án" : "Skip to projects";
    document.querySelector(".hero-photo img").alt = lang === "vi" ? "Ảnh chân dung Nguyễn Thái Dương" : "Portrait of Nguyen Thai Duong";
    document.getElementById("year").textContent = new Date().getFullYear();
    renderProjects(); renderExperience(); renderSkills(); renderContact();
  }

  document.getElementById("lang").addEventListener("click", function () {
    if (window.cursorSwarm) { try { window.cursorSwarm.stop({ reveal: true }); } catch (e) {} }
    lang = lang === "vi" ? "en" : "vi";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    render();
  });

  render();

  // Cursor swarm: three agent cursors build the page as the visitor scrolls.
  // Skipped for deep links from the CV (the visitor wants the project right away)
  // and for people who prefer reduced motion (handled by the library).
  if (window.CursorSwarm && !location.hash) {
    try {
      window.cursorSwarm = new CursorSwarm({
        cursors: 3,
        names: ["BACKEND", "AI", "DATA"],
        colors: ["#14304a", "#1d8a5a", "#2563a8"],
        startPosition: "corners",
        ignore: ".top, .skip",
        deconstruct: false,
        exitAfterBuild: "edge",
        hudPosition: "bottom-right",
        speed: 1.5
      }).init();
    } catch (e) { document.documentElement.classList.remove("cs-cloak"); }
  } else {
    document.documentElement.classList.remove("cs-cloak");
  }

  // Deep links from the CV, e.g. /#booknest: scroll to the project and open its details
  function focusHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var row = id && document.getElementById(id);
    if (!row || !row.classList.contains("row")) return;
    var t = row.querySelector(".toggle");
    if (t && t.getAttribute("aria-expanded") === "false") t.click();
    row.classList.add("is-target");
    row.scrollIntoView({ block: "start" });
    row.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", focusHash);
  focusHash();
})();
