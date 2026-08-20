/* ============================================================
   GRØNÅS BYGG — interaksjon
   Enkelt, stabilt, ingen eksterne avhengigheter.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Navbar: tilstand ved scroll ---------- */
  var nav = document.getElementById("nav");
  var hero = document.getElementById("hero");

  function setNavState() {
    var threshold = hero ? hero.offsetHeight - 90 : 120;
    nav.setAttribute("data-state", window.scrollY > threshold ? "scrolled" : "top");
  }
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
  window.addEventListener("resize", setNavState);

  /* ---------- Mobilmeny ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");

  function closeMenu() {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Åpne meny");
    document.body.classList.remove("menu-open");
  }
  function openMenu() {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Lukk meny");
    document.body.classList.add("menu-open");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      menu.classList.contains("open") ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Reveal ved scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // liten stagger for elementer som avsløres samtidig
            setTimeout(function () { el.classList.add("in"); }, (i % 4) * 90);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Lightbox for prosjekter ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCat = document.getElementById("lightboxCat");
  var lbText = document.getElementById("lightboxText");
  var lbClose = document.getElementById("lightboxClose");
  var lastFocus = null;

  function openLightbox(fig) {
    lastFocus = fig;
    lbImg.src = fig.getAttribute("data-full");
    lbImg.alt = fig.querySelector("img") ? fig.querySelector("img").alt : "";
    lbCat.textContent = fig.getAttribute("data-cat") || "";
    lbText.textContent = fig.getAttribute("data-caption") || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".gallery__item").forEach(function (fig) {
    fig.addEventListener("click", function () { openLightbox(fig); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(fig); }
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });

  /* ---------- Kontaktskjema (demo) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("error");
      if (!form.checkValidity()) {
        status.textContent = "Fyll ut alle felt, så sender vi forespørselen.";
        status.classList.add("error");
        form.reportValidity();
        return;
      }
      // Demo: ingen e-postkobling ennå.
      status.textContent = "Takk! Dette er en demo – ved lansering sendes forespørselen til Grønås Bygg.";
      form.reset();
    });
  }
})();
