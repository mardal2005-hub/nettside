/* Haugaland Byggpartner AS — interactions
   Vanilla JS, no dependencies. Respects prefers-reduced-motion. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- year ---------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- hero intro ---------- */
  var hero = $("#hero");
  if (hero) { requestAnimationFrame(function () { hero.classList.add("is-in"); }); }

  /* ---------- nav: solid + hide on scroll down ---------- */
  var nav = $("#nav");
  var lastY = window.pageYOffset;
  var ticking = false;
  function onScroll() {
    var yy = window.pageYOffset;
    if (nav) {
      nav.classList.toggle("is-solid", yy > 40);
      if (!document.body.classList.contains("menu-open")) {
        if (yy > lastY && yy > 320) nav.classList.add("is-hidden");
        else nav.classList.remove("is-hidden");
      }
    }
    var tt = $("#toTop");
    if (tt) tt.classList.toggle("is-on", yy > window.innerHeight * 0.9);
    lastY = yy;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = $("#burger");
  var menu = $("#mobileMenu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (burger) { burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny"); }
    if (menu) menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  if (menu) $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  var revealEls = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- stagger reveals within a group ---------- */
  $$(".stats, .why__grid, .svc-list, .area__list").forEach(function (group) {
    var kids = $$("[data-reveal]", group);
    kids.forEach(function (el, i) { el.style.transitionDelay = (i * 70) + "ms"; });
  });

  /* ---------- count-up ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target.toFixed(dec).replace(".", ",") + suffix; return; }
    var start = performance.now(), dur = 1400;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = val.toFixed(dec).replace(".", ",") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = $$("[data-count]");
  if (counters.length) {
    if (!("IntersectionObserver" in window)) { counters.forEach(animateCount); }
    else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ---------- services cursor-follow image ---------- */
  var hover = $("#svcHover");
  var hoverImg = hover ? $("img", hover) : null;
  var canHover = window.matchMedia("(hover:hover) and (min-width:900px)").matches;
  if (hover && hoverImg && canHover && !reduce) {
    var raf = null, tx = 0, ty = 0, cx = 0, cy = 0, active = false;
    $$(".svc").forEach(function (svc) {
      svc.addEventListener("mouseenter", function () {
        var src = svc.getAttribute("data-img");
        if (src) { hoverImg.src = src; }
        hover.classList.add("is-on"); active = true;
      });
      svc.addEventListener("mouseleave", function () { hover.classList.remove("is-on"); active = false; });
    });
    var svcList = $("#svcList");
    if (svcList) svcList.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; });
    function loop() {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      hover.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)" + (active ? " scale(1)" : " scale(.9)");
      raf = requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- contact form ---------- */
  var form = $("#contactForm");
  var note = $("#formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      var usesFormspree = action.indexOf("formspree.io") !== -1 && action.indexOf("your-form-id") === -1;
      if (!form.checkValidity()) { return; /* let native validation show */ }
      if (!usesFormspree) {
        // No form backend configured yet — fall back to a prefilled e-mail.
        e.preventDefault();
        var navn = encodeURIComponent($("#navn").value || "");
        var epost = encodeURIComponent($("#epost").value || "");
        var tlf = encodeURIComponent($("#telefon").value || "");
        var type = encodeURIComponent($("#type").value || "");
        var melding = encodeURIComponent($("#melding").value || "");
        var body = "Navn: " + navn + "%0D%0AE-post: " + epost + "%0D%0ATelefon: " + tlf +
          "%0D%0AGjelder: " + type + "%0D%0A%0D%0A" + melding;
        window.location.href = "mailto:akbyggpartneras@gmail.com?subject=" +
          encodeURIComponent("Forespørsel fra nettsiden — " + decodeURIComponent(type)) + "&body=" + body;
        if (note) { note.textContent = "Åpner e-postprogrammet ditt …"; note.className = "form__note is-ok"; }
        return;
      }
      // Formspree AJAX
      e.preventDefault();
      if (note) { note.textContent = "Sender …"; note.className = "form__note"; }
      fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (note) { note.textContent = "Takk! Vi tar kontakt så snart vi kan."; note.className = "form__note is-ok"; }
          } else { throw new Error("bad"); }
        })
        .catch(function () {
          if (note) { note.textContent = "Noe gikk galt. Ring oss gjerne på 407 41 934."; note.className = "form__note is-err"; }
        });
    });
  }

  /* ---------- active nav link ---------- */
  var sections = $$("main section[id]");
  var navLinks = $$(".nav__links a");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href")] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var a = byId["#" + en.target.id];
          if (a) { navLinks.forEach(function (l) { l.removeAttribute("data-active"); }); a.setAttribute("data-active", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { so.observe(s); });
  }
})();
