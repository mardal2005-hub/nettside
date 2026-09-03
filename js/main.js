/* ============================================================
   MARDAL DIGITAL — main.js
   Kontrollerte interaksjoner: custom cursor, reveal, parallax,
   preloader, meny, live klokke. Alt respekterer reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Year + live klokke (Europe/Oslo) ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var clockEl = document.getElementById('clock');
  if (clockEl) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('no-NO', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'Europe/Oslo'
      });
    } catch (e) { fmt = null; }
    var tick = function () {
      var t = fmt ? fmt.format(new Date()) : '';
      clockEl.innerHTML = 'Oslo — <b>' + t + '</b>';
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Preloader ---------- */
  var loader = document.getElementById('loader');
  var hero = document.getElementById('hero');
  var countEl = document.getElementById('loaderCount');

  function startHero() {
    if (hero) hero.classList.add('ready');
  }

  if (loader && !reduce) {
    var n = 0;
    var counter = setInterval(function () {
      n = Math.min(100, n + Math.floor(Math.random() * 18) + 6);
      if (countEl) countEl.textContent = n < 10 ? '0' + n : '' + n;
      if (n >= 100) clearInterval(counter);
    }, 130);

    window.addEventListener('load', done);
    setTimeout(done, 1700); // fallback

    function done() {
      window.removeEventListener('load', done);
      if (loader.classList.contains('done')) return;
      if (countEl) countEl.textContent = '100';
      setTimeout(function () {
        loader.classList.add('done');
        startHero();
        setTimeout(function () { loader.style.display = 'none'; }, 950);
      }, 250);
    }
  } else {
    if (loader) loader.style.display = 'none';
    startHero();
  }

  /* ---------- Mobil meny ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    var setMenu = function (open) {
      mobileNav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Header skjul/vis ved scroll ---------- */
  var header = document.getElementById('header');
  var lastY = window.pageYOffset;
  if (header) {
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      if (y > lastY && y > 300) header.classList.add('hidden');
      else header.classList.remove('hidden');
      lastY = y;
    }, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-line]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- Parallax (subtil, kun der det gir mening) ---------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduce) {
    var ticking = false;
    var run = function () {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        el.style.transform = 'translate3d(0,' + (progress * speed * 100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    run();
  }

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduce) {
    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    var label = ring ? ring.querySelector('.cursor-label') : null;
    if (dot && ring) {
      document.body.classList.add('cursor-ready');
      var mx = window.innerWidth / 2, my = window.innerHeight / 2;
      var rx = mx, ry = my;

      window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
        document.body.classList.add('cursor-active');
      });
      document.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-active');
      });

      var loop = function () {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      // Hover targets
      var hoverSel = 'a, button, [data-cursor], input, textarea, .cap, .detail, .step';
      document.querySelectorAll(hoverSel).forEach(function (el) {
        var mode = el.getAttribute('data-cursor'); // "media" | "hover" | null
        el.addEventListener('mouseenter', function () {
          if (mode === 'media') {
            document.body.classList.add('cursor-media');
            if (label) label.textContent = el.getAttribute('data-cursor-label') || 'Se';
          } else {
            document.body.classList.add('cursor-hover');
          }
        });
        el.addEventListener('mouseleave', function () {
          document.body.classList.remove('cursor-media', 'cursor-hover');
        });
      });
    }
  }

  /* ---------- Magnetic email link (subtil) ---------- */
  if (finePointer && !reduce) {
    var mail = document.querySelector('.contact__mail');
    if (mail) {
      mail.addEventListener('mousemove', function (e) {
        var r = mail.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * 0.04;
        var y = (e.clientY - (r.top + r.height / 2)) * 0.08;
        mail.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      mail.addEventListener('mouseleave', function () {
        mail.style.transform = '';
      });
    }
  }
})();
