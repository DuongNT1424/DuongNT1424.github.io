
(function(){
  var ROOT = window.__BN_ROOT || ".";
  var DATA = {"search": "search/q-keyword=s_ch/index.html", "revenue": {"stationerySold": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "revenue": [0.0, 0.0, 0.0, 0.0, 0.0, 285000.0, 0.0, 0.0, 0.0, 0.0, 152100.0, 0.0, 0.0, 0.0, 0.0, 177000.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], "booksSold": [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "productsSold": [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "labels": ["17/10", "18/10", "19/10", "20/10", "21/10", "22/10", "23/10", "24/10", "25/10", "26/10", "27/10", "28/10", "29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11"]}, "products": [{"id": 6, "title": "Quản Trị Thời Gian", "author": "", "typeName": "Sách", "path": "books/6/index.html"}, {"id": 1, "title": "Mùa Hạ Bên Sông", "author": "", "typeName": "Sách", "path": "books/1/index.html"}, {"id": 4, "title": "Tư Duy Tài Chính Cá Nhân", "author": "", "typeName": "Sách", "path": "books/4/index.html"}, {"id": 7, "title": "Sống Chậm Giữa Đời Vội", "author": "", "typeName": "Sách", "path": "books/7/index.html"}, {"id": 13, "title": "Bút bi xanh hộp 3 cây", "author": "", "typeName": "Văn phòng phẩm", "path": "stationery/13/index.html"}, {"id": 14, "title": "Bút dạ quang 5 màu", "author": "", "typeName": "Văn phòng phẩm", "path": "stationery/14/index.html"}, {"id": 15, "title": "Sổ tay A5 bìa vải", "author": "", "typeName": "Văn phòng phẩm", "path": "stationery/15/index.html"}, {"id": 16, "title": "Sổ lò xo 200 trang", "author": "", "typeName": "Văn phòng phẩm", "path": "stationery/16/index.html"}, {"id": 2, "title": "Thành Phố Không Ngủ", "author": "", "typeName": "Sách", "path": "books/2/index.html"}, {"id": 5, "title": "Khởi Nghiệp Từ Con Số 0", "author": "", "typeName": "Sách", "path": "books/5/index.html"}, {"id": 8, "title": "Nghệ Thuật Lắng Nghe", "author": "", "typeName": "Sách", "path": "books/8/index.html"}, {"id": 9, "title": "Chú Mèo Đi Tìm Mặt Trăng", "author": "", "typeName": "Sách", "path": "books/9/index.html"}, {"id": 10, "title": "Phiêu Lưu Đảo Xanh", "author": "", "typeName": "Sách", "path": "books/10/index.html"}, {"id": 11, "title": "Lập Trình Java Thực Chiến", "author": "", "typeName": "Sách", "path": "books/11/index.html"}, {"id": 12, "title": "Nhập Môn Trí Tuệ Nhân Tạo", "author": "", "typeName": "Sách", "path": "books/12/index.html"}, {"id": 17, "title": "Thước kẻ nhôm 30cm", "author": "", "typeName": "Văn phòng phẩm", "path": "stationery/17/index.html"}, {"id": 18, "title": "Hộp bút vải canvas", "author": "", "typeName": "Văn phòng phẩm", "path": "stationery/18/index.html"}]};
  function go(p){ location.href = ROOT + "/" + p; }
  // fetch stubs for the endpoints the pages call
  var realFetch = window.fetch;
  window.fetch = function(input, init){
    var url = typeof input === "string" ? input : input.url;
    function json(o){ return Promise.resolve(new Response(JSON.stringify(o), {headers:{"Content-Type":"application/json"}})); }
    if (/revenue-statistics/.test(url)) return json(DATA.revenue);
    if (/suggest/.test(url)) {
      var m = /[?&]q=([^&]*)/.exec(url); var q = m ? decodeURIComponent(m[1]).toLowerCase() : "";
      var res = DATA.products.filter(function(p){ return q && p.title.toLowerCase().indexOf(q) >= 0; }).slice(0, 8)
        .map(function(p){ return {id:p.id, title:p.title, author:p.author, typeName:p.typeName, url: ROOT + "/" + p.path}; });
      return json(res);
    }
    if (url && url.charAt(0) === "/") return json({});
    return realFetch.apply(this, arguments);
  };
  function toast(msg){
    var t = document.getElementById("bn-demo-toast");
    if (!t){ t = document.createElement("div"); t.id = "bn-demo-toast";
      t.style.cssText = "position:fixed;left:50%;bottom:72px;transform:translateX(-50%);background:#14304a;color:#fff;padding:12px 18px;border-radius:10px;font:500 14px/1.4 system-ui,sans-serif;z-index:99999;box-shadow:0 6px 24px rgba(0,0,0,.25);max-width:90vw;text-align:center";
      document.body.appendChild(t); }
    t.textContent = msg; t.style.display = "block"; clearTimeout(t._h); t._h = setTimeout(function(){ t.style.display = "none"; }, 2600);
  }
  var MSG = "This is a UI demo with sample data, so saving is turned off.";
  document.addEventListener("submit", function(e){
    var f = e.target; var act = (f.getAttribute("action") || "").toLowerCase();
    e.preventDefault(); e.stopImmediatePropagation();
    if (/login/.test(act) || f.querySelector('input[name="email"][type="email"]') && f.querySelector('input[name="password"]') && !f.querySelector('input[name="fullName"]')) {
      var em = (f.querySelector('input[name="email"]') || {}).value || "";
      if (/admin|staff/i.test(em)) go("admin/index.html"); else go("index.html"); return;
    }
    if (f.method && f.method.toLowerCase() === "get" && /search/.test(act)) { go(DATA.search); return; }
    toast(MSG);
  }, true);
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[data-demo-off]');
    if (a){ e.preventDefault(); toast(MSG); }
  }, true);
  // demo bar
  document.addEventListener("DOMContentLoaded", function(){
    var admin = window.__BN_GROUP === "admin";
    var bar = document.createElement("div");
    bar.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:99998;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:center;background:rgba(20,48,74,.96);color:#fff;padding:10px 14px;border-radius:12px;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.25)";
    var s = "color:#fff;text-decoration:underline;text-underline-offset:3px;font-weight:600";
    bar.innerHTML = '<span>BookNest UI demo · sample data, saving is turned off</span>'
      + (admin ? '<a style="'+s+'" href="'+ROOT+'/index.html">Store view</a>' : '<a style="'+s+'" href="'+ROOT+'/admin/index.html">Admin view</a>')
      + '<a style="'+s+'" href="https://duongnt1424.github.io/">Back to portfolio</a>'
      + '<button type="button" aria-label="Hide" style="background:none;border:0;color:#fff;font-size:18px;cursor:pointer;line-height:1">&times;</button>';
    var lf = document.querySelector('form input[name="password"]');
    if (lf && /login/.test(location.pathname)) {
      var hint = document.createElement("p");
      hint.style.cssText = "margin:0 0 12px;padding:10px 12px;border-radius:8px;background:#fff4e6;color:#7a3e00;font:500 13px/1.5 system-ui,sans-serif";
      hint.innerHTML = "Demo: type <b>customer@booknest.demo</b> for the store or <b>admin@booknest.demo</b> for the admin panel. Any password works.";
      lf.closest("form").prepend(hint);
    }
    bar.querySelector("button").onclick = function(){ bar.remove(); };
    document.body.appendChild(bar);
  });
})();
