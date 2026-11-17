/* DevPrep static UI demo: serves recorded API responses and turns off saving. */
(function () {
  var DP = window.__DP || {}, DATA = window.__DPDATA || { xhr: {}, pages: [] };
  var ROOT = DP.root || "/devprep";
  var PAGES = {}; DATA.pages.forEach(function (p) { PAGES[p] = 1; });

  // Show the announcement popup only on the first page of a visit.
  try {
    if (sessionStorage.getItem("dp-demo-seen")) sessionStorage.setItem("devprep-ann-hidden", "1");
    sessionStorage.setItem("dp-demo-seen", "1");
  } catch (e) {}

  function stripRoot(path) { return path.indexOf(ROOT + "/") === 0 ? path.slice(ROOT.length) : path; }
  function normKey(method, url) {
    var u; try { u = new URL(url, location.href); } catch (e) { return null; }
    var host = u.port === "7000" ? "gw" : "wc";
    var path = stripRoot(u.pathname).replace(/\/+$/, "").toLowerCase();
    var q = [];
    u.searchParams.forEach(function (v, k) { q.push(k.toLowerCase() + "=" + v); });
    q.sort();
    return method.toUpperCase() + " " + host + path + (q.length ? "?" + q.join("&") : "");
  }
  var GUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
  function lookup(method, url) {
    var key = normKey(method, url); if (!key) return null;
    if (DATA.xhr[key] !== undefined) return DATA.xhr[key];
    var base = key.split("?")[0], pat = base.replace(GUID, "{id}"), best = null;
    for (var k in DATA.xhr) {
      var kb = k.split("?")[0];
      if (kb === base) return DATA.xhr[k];
      if (!best && kb.replace(GUID, "{id}") === pat) best = DATA.xhr[k];
    }
    return best;
  }
  function isOurs(url) {
    try { var u = new URL(url, location.href); return u.port === "7000" || u.origin === location.origin; } catch (e) { return false; }
  }

  var MSG = "This is a UI demo with sample data, so saving is turned off.";
  function toast(msg) {
    var t = document.getElementById("dp-demo-toast");
    if (!t) {
      t = document.createElement("div"); t.id = "dp-demo-toast";
      t.style.cssText = "position:fixed;left:50%;bottom:76px;transform:translateX(-50%);z-index:2147483647;background:#14304a;color:#fff;padding:12px 18px;border-radius:10px;font:500 14px/1.45 system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.35);max-width:90vw;text-align:center";
      (document.body || document.documentElement).appendChild(t);
    }
    t.textContent = msg || MSG; t.style.display = "block"; clearTimeout(t._h); t._h = setTimeout(function () { t.style.display = "none"; }, 2800);
  }

  // ---- simulated interview room ----
  function roomState() { try { return JSON.parse(sessionStorage.getItem("dp-room") || "null") || { answered: 2 }; } catch (e) { return { answered: 2 }; } }
  function saveRoom(s) { try { sessionStorage.setItem("dp-room", JSON.stringify(s)); } catch (e) {} }
  function special(method, url, body) {
    var key = normKey(method, url) || "";
    if (/^POST wc\/interview\/message\//.test(key)) {
      var s = roomState(), qs = DATA.roomQuestions || [], total = qs.length || 5;
      s.answered = Math.min(total, s.answered + 1); saveRoom(s);
      var done = s.answered >= total, next = done ? null : qs[s.answered];
      return { ended: done, shouldEndSession: done, message: done ? "Thanks! That was the last question. Your report is ready." : "",
        nextQuestion: next ? { sessionQuestionId: next.sessionQuestionId, orderIndex: next.orderIndex, content: next.content, idleReminderSeconds: 120, idleHardSeconds: 300, idleElapsedSeconds: 0 } : null,
        answeredQuestions: s.answered, totalQuestions: total, status: done ? "Completed" : "InProgress", terminationReason: null,
        canGeneratePerformanceReport: done, canSubmitInterviewFeedback: done };
    }
    if (/^POST wc\/interview\/hint/.test(key)) return { hint: "Start with a one-line definition, then give a concrete example from a project you built, and finish with one trade-off." };
    if (/^POST wc\/interview\/(completesession|endsession)\//.test(key)) { saveRoom({ answered: 2 }); return { status: "Completed", endedAt: new Date().toISOString(), canGeneratePerformanceReport: true, canSubmitInterviewFeedback: true, shouldEndSession: true, message: "Session completed." }; }
    if (/^POST wc\/interview\/pause\//.test(key)) return { status: "Paused", pauseCount: 1, pausesRemaining: 1, pausedSecondsRemaining: 300 };
    if (/^POST wc\/interview\/unpause\//.test(key)) return { status: "InProgress", remainingSeconds: 1100, pauseCount: 1, pausesRemaining: 1, pausedSecondsRemaining: 280 };
    if (/^GET wc\/verification\/insessioncheck/.test(key)) return { due: false, elapsedMinutes: 3, targetMinutes: 10, status: "InProgress", shouldEndSession: false };
    if (/^POST wc\/verification\//.test(key)) return { passed: true, recorded: true, outcome: "Ignored", status: "InProgress", shouldEndSession: false, strikeCount: 0, maxStrikes: 3, message: "" };
    if (/^POST wc\/interview\/(tts|stt|tourseen|cameraviolation)/.test(key)) return { text: "", status: "InProgress", shouldEndSession: false };
    return undefined;
  }

  function respond(method, url, body) {
    var sp = special(method, url, body);
    if (sp !== undefined) return { status: 200, text: JSON.stringify(sp) };
    if (method !== "GET") {
      var rec = lookup(method, url);
      if (rec) return { status: 200, text: rec };
      setTimeout(function () { toast(); }, 0);
      return { status: 200, text: JSON.stringify({ success: true, message: "Demo mode: changes are not saved.", data: null }) };
    }
    var r = lookup("GET", url);
    if (r !== null && r !== undefined) return { status: 200, text: r };
    return { status: 200, text: JSON.stringify({ success: true, message: "OK", data: { items: [], page: 1, pageIndex: 1, pageSize: 10, totalItems: 0, totalCount: 0, totalRecords: 0, totalPages: 1 } }) };
  }

  // ---- fetch ----
  var realFetch = window.fetch;
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || String(input);
    var method = ((init && init.method) || (input && input.method) || "GET").toUpperCase();
    if (!isOurs(url) || /\.(css|js|png|jpe?g|svg|woff2?|ico)(\?|$)/i.test(url)) return realFetch.apply(this, arguments);
    var r = respond(method, url, init && init.body);
    return new Promise(function (res) {
      setTimeout(function () { res(new Response(r.text, { status: r.status, headers: { "Content-Type": "application/json" } })); }, 120);
    });
  };

  // ---- XMLHttpRequest (jQuery ajax) ----
  var RealXHR = window.XMLHttpRequest;
  function FakeXHR() { this._real = new RealXHR(); this._fake = false; this.readyState = 0; this.status = 0; this.responseText = ""; this._h = {}; }
  ["onreadystatechange", "onload", "onerror", "onloadend", "ontimeout", "onabort", "onprogress", "timeout", "withCredentials", "responseType", "upload"].forEach(function (p) {
    Object.defineProperty(FakeXHR.prototype, p, {
      get: function () { return this._fake ? this["_" + p] : this._real[p]; },
      set: function (v) { this["_" + p] = v; try { this._real[p] = v; } catch (e) {} }
    });
  });
  FakeXHR.prototype.open = function (m, u) { this._m = (m || "GET").toUpperCase(); this._u = u; this._fake = isOurs(u) && !/\.(css|js|png|jpe?g|svg|html?)(\?|$)/i.test(u); if (!this._fake) return this._real.open.apply(this._real, arguments); this.readyState = 1; };
  FakeXHR.prototype.setRequestHeader = function () { if (!this._fake) return this._real.setRequestHeader.apply(this._real, arguments); };
  FakeXHR.prototype.getResponseHeader = function (h) { if (!this._fake) return this._real.getResponseHeader(h); return /content-type/i.test(h) ? "application/json" : null; };
  FakeXHR.prototype.getAllResponseHeaders = function () { return this._fake ? "content-type: application/json\r\n" : this._real.getAllResponseHeaders(); };
  FakeXHR.prototype.abort = function () { if (!this._fake) return this._real.abort(); };
  FakeXHR.prototype.addEventListener = function (t, fn) { if (!this._fake) { var self = this; return this._real.addEventListener(t, function (e) { fn.call(self, e); }); } (this._h[t] = this._h[t] || []).push(fn); };
  FakeXHR.prototype.send = function (body) {
    var self = this;
    if (!this._fake) {
      ["readyState", "status", "responseText", "response", "statusText"].forEach(function (p) { Object.defineProperty(self, p, { get: function () { return self._real[p]; }, configurable: true }); });
      return this._real.send(body);
    }
    var r = respond(this._m, this._u, body);
    setTimeout(function () {
      self.readyState = 4; self.status = r.status; self.statusText = "OK"; self.responseText = r.text; self.response = r.text;
      try { self.responseJSON = JSON.parse(r.text); } catch (e) {}
      var ev = { type: "load", target: self, currentTarget: self };
      if (self._onreadystatechange) self._onreadystatechange(ev);
      (self._h.readystatechange || []).forEach(function (f) { f.call(self, ev); });
      if (self._onload) self._onload(ev);
      (self._h.load || []).forEach(function (f) { f.call(self, ev); });
      if (self._onloadend) self._onloadend(ev);
      (self._h.loadend || []).forEach(function (f) { f.call(self, ev); });
    }, 120);
  };
  window.XMLHttpRequest = FakeXHR;

  // ---- navigation helpers ----
  function resolveDir(pathname) {
    var p = stripRoot(pathname).replace(/\/+$/, "").toLowerCase();
    if (DATA.aliases && DATA.aliases[p]) p = DATA.aliases[p];
    while (p && !PAGES[p]) p = p.replace(/\/[^\/]*$/, "");
    return ROOT + (p || "") + "/";
  }
  function go(path) { location.href = path; }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.defaultPrevented) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto|tel|javascript):/i.test(href)) return;
    var u; try { u = new URL(href, location.href); } catch (x) { return; }
    if (u.origin !== location.origin) return;
    if (u.pathname.indexOf(ROOT + "/") !== 0) {
      if (!/^\/(home|auth|interview|evaluation|profile|payment|news|feedback|cvjd|verification|admin|manager)(\/|$)/i.test(u.pathname)) return;
      e.preventDefault(); return go(resolveDir(ROOT + u.pathname));
    }
    var dir = u.pathname.replace(/index\.html$/, "");
    var key = stripRoot(dir).replace(/\/+$/, "").toLowerCase();
    if (!PAGES[key] && !/\.(css|js|png|jpe?g|svg|pdf|ico)$/i.test(dir)) { e.preventDefault(); go(resolveDir(dir)); }
  }, true);

  document.addEventListener("submit", function (e) {
    var f = e.target, act = (f.getAttribute("action") || location.pathname).toLowerCase();
    var email = f.querySelector('input[name="Email"], input[name="email"]'), pw = f.querySelector('input[type="password"]');
    if (/auth\/login/.test(act) || (email && pw && !f.querySelector('input[name="FullName"]') && !f.querySelector('input[name="ConfirmPassword"]'))) {
      e.preventDefault(); e.stopImmediatePropagation();
      var v = (email && email.value || "").toLowerCase();
      return go(ROOT + (/admin/.test(v) ? "/admin/" : /manager/.test(v) ? "/manager/" : "/"));
    }
    if (/auth\/logout/.test(act)) { e.preventDefault(); e.stopImmediatePropagation(); return go(ROOT + "/auth/login/"); }
    if (/interview\/start/.test(act)) { e.preventDefault(); e.stopImmediatePropagation(); saveRoom({ answered: 2 }); return go(DATA.roomUrl); }
    if (/interview\/acceptintegritypolicy/.test(act)) { e.preventDefault(); e.stopImmediatePropagation(); return go(DATA.roomUrl); }
    if ((f.method || "get").toLowerCase() === "get") {
      e.preventDefault(); e.stopImmediatePropagation();
      var u = new URL(f.getAttribute("action") || location.pathname, location.href);
      return go(resolveDir(u.pathname));
    }
    e.preventDefault(); e.stopImmediatePropagation(); toast();
  }, true);

  // ---- demo bar ----
  function bar() {
    if (document.getElementById("dp-demo-bar")) return;
    var b = document.createElement("div"); b.id = "dp-demo-bar";
    b.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483646;display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:center;background:rgba(20,48,74,.97);color:#fff;padding:9px 14px;border-radius:12px;font:500 13px/1.4 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.35)";
    var link = "color:#fff;text-decoration:underline;text-underline-offset:3px;font-weight:600";
    var btn = function (on) { return "text-decoration:none;font-weight:700;padding:5px 11px;border-radius:8px;" + (on ? "background:#fff;color:#14304a" : "color:#fff;border:1px solid rgba(255,255,255,.5)"); };
    var role = DP.role === "guest" ? "candidate" : DP.role;
    b.innerHTML = '<span>DevPrep UI demo · sample data, saving is turned off</span>'
      + '<span style="display:flex;gap:6px;align-items:center">View as'
      + '<a style="' + btn(role === "candidate") + '" href="' + ROOT + '/">Candidate</a>'
      + '<a style="' + btn(role === "admin") + '" href="' + ROOT + '/admin/">Admin</a>'
      + '<a style="' + btn(role === "manager") + '" href="' + ROOT + '/manager/">Manager</a></span>'
      + '<a style="' + link + '" href="/">Back to portfolio</a>'
      + '<button type="button" aria-label="Hide demo bar" style="background:none;border:0;color:#fff;font-size:18px;line-height:1;cursor:pointer">&times;</button>';
    b.querySelector("button").onclick = function () { b.remove(); };
    document.body.appendChild(b);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bar); else bar();
})();
