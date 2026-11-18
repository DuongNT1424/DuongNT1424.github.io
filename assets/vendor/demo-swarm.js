/* Plays the cursor-swarm intro on the first page a visitor opens in a demo, then stays out of the way. */
(function () {
  var me = document.currentScript; if (!me || !window.CursorSwarm) return;
  var d = me.dataset;
  // one intro per area of a demo: the store / candidate side, the admin panel and the manager console each get their own
  var area = /\/admin(\/|$)/i.test(location.pathname) ? "admin" : /\/manager(\/|$)/i.test(location.pathname) ? "manager" : "main";
  var key = "swarm-seen-" + (d.demo || "demo") + "-" + area;
  var seen = false;
  try { seen = sessionStorage.getItem(key) === "1"; sessionStorage.setItem(key, "1"); } catch (e) { seen = true; }
  if (seen || (d.skip && new RegExp(d.skip, "i").test(location.pathname))) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.__swarmIntro = true;
  CursorSwarm.cloak();
  var safety = setTimeout(function () { document.documentElement.classList.remove("cs-cloak"); }, 3500);
  window.addEventListener("load", function () {
    setTimeout(function () {
      try {
        var preset = {
          booknest: { names: ["STORE", "ADMIN", "DATA", "CART", "ORDER"], colors: ["#f97316", "#14304a", "#2a9d8f", "#e76f51", "#6d597a"] },
          devprep: { names: ["CANDIDATE", "ADMIN", "AI", "MANAGER", "CV"], colors: ["#8b5cf6", "#22d3ee", "#a3e635", "#f472b6", "#fbbf24"] }
        }[d.demo] || {};
        window.cursorSwarm = new CursorSwarm({
          cursors: 5,
          names: preset.names || (d.names || "UI,API,DATA").split(","),
          colors: preset.colors || (d.colors || "#14304a,#1d8a5a,#2563a8").split(","),
          startPosition: "corners",
          ignore: d.ignore || null,
          deconstruct: false,
          exitAfterBuild: "edge",
          hud: false,
          speed: 0.9,
          maxSpeed: 2
        }).init();
      } catch (e) { document.documentElement.classList.remove("cs-cloak"); }
      clearTimeout(safety);
    }, 250);
  });
})();
