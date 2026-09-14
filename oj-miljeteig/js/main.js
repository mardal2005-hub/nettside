/* O.J. Miljeteig AS – interaksjon
   Meny, scroll-header, reveal-animasjoner, galleri-lightbox og skjema. */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;

  /* ---------- Sticky header state ---------- */
  var header = doc.getElementById('header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobil-meny ---------- */
  var toggle = doc.getElementById('navToggle');
  var nav = doc.getElementById('nav');
  function closeMenu() {
    body.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (nav) {
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = doc.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Årstall i footer ---------- */
  var yr = doc.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Galleri-lightbox ---------- */
  var figures = Array.prototype.slice.call(doc.querySelectorAll('#gallery figure'));
  var lb = doc.getElementById('lightbox');
  var lbImg = doc.getElementById('lbImg');
  var current = 0;

  function openLb(i) {
    current = i;
    var f = figures[current];
    var src = f.getAttribute('data-full');
    var cap = f.querySelector('figcaption');
    lbImg.src = src;
    lbImg.alt = cap ? cap.textContent : '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    lbImg.src = '';
  }
  function step(dir) {
    current = (current + dir + figures.length) % figures.length;
    openLb(current);
  }

  figures.forEach(function (f, i) {
    f.setAttribute('role', 'button');
    f.setAttribute('tabindex', '0');
    f.addEventListener('click', function () { openLb(i); });
    f.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
    });
  });

  if (lb) {
    doc.getElementById('lbClose').addEventListener('click', closeLb);
    doc.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
    doc.getElementById('lbNext').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    doc.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ---------- Kontaktskjema ---------- */
  var form = doc.getElementById('contactForm');
  var statusEl = doc.getElementById('formStatus');

  function setStatus(msg, ok) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + (ok ? 'ok' : 'err');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var action = form.getAttribute('action') || '';
      var usesFormspree = action.indexOf('formspree.io') !== -1 && action.indexOf('your-form-id') === -1;

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : '';

      if (usesFormspree) {
        if (btn) { btn.disabled = true; btn.textContent = 'Sender …'; }
        fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus('Takk! Forespørselen er sendt. Vi tar kontakt så snart som mulig.', true);
          } else {
            setStatus('Noe gikk galt. Prøv igjen, eller ring oss direkte.', false);
          }
        }).catch(function () {
          setStatus('Kunne ikke sende akkurat nå. Prøv igjen, eller ring oss direkte.', false);
        }).finally(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = original; }
        });
      } else {
        /* Ingen skjematjeneste satt opp ennå: åpne e-postprogram med ferdig melding. */
        var navn = encodeURIComponent(form.navn.value || '');
        var tlf = encodeURIComponent(form.telefon.value || '');
        var epost = encodeURIComponent(form.epost.value || '');
        var tjeneste = encodeURIComponent(form.tjeneste.value || '');
        var melding = encodeURIComponent(form.melding.value || '');
        var body = 'Navn: ' + navn + '%0D%0A' +
                   'Telefon: ' + tlf + '%0D%0A' +
                   'E-post: ' + epost + '%0D%0A' +
                   'Tjeneste: ' + tjeneste + '%0D%0A%0D%0A' +
                   'Melding:%0D%0A' + melding;
        var subject = encodeURIComponent('Forespørsel fra nettsiden' + (form.navn.value ? ' – ' + form.navn.value : ''));
        window.location.href = 'mailto:[E-POST]?subject=' + subject + '&body=' + body;
        setStatus('Vi åpner e-postprogrammet ditt med en ferdig melding. Send den, så hører du fra oss.', true);
      }
    });
  }
})();
