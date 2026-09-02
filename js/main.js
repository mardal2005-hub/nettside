/* ============================================================
   BJ Kran og Transport AS – main.js
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Åpne meny');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Header state on scroll ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) { header.classList.add('scrolled'); }
      else { header.classList.remove('scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll(
    '.section-head, .service-card, .spec-row, .crane-chip, .equip__media, .feature__box, ' +
    '.about__media, .about__text, .gallery__item, .info-card, .contact__form, .contact__cta'
  );
  if (revealEls.length && 'IntersectionObserver' in window && !prefersReduced) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Scroll-spy ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.main-nav a[href^="#"]')
  );
  if (navLinks.length && 'IntersectionObserver' in window) {
    var linkById = {};
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = id && document.getElementById(id);
      if (section) { linkById[id] = link; }
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          var active = linkById[entry.target.id];
          if (active) { active.classList.add('active'); }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(linkById).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) { spy.observe(s); }
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var lbCount = document.getElementById('lbCount');
  var current = 0;

  function srcFor(item) {
    var img = item.querySelector('img');
    // Use the loaded image src (already falls back to SVG if the JPG is missing)
    return img ? img.currentSrc || img.src : item.getAttribute('data-full');
  }
  function altFor(item) {
    var img = item.querySelector('img');
    return img ? img.getAttribute('alt') : '';
  }
  function show(i) {
    if (!items.length) { return; }
    current = (i + items.length) % items.length;
    lbImg.src = srcFor(items[current]);
    lbImg.alt = altFor(items[current]);
    lbCount.textContent = (current + 1) + ' / ' + items.length;
  }
  function open(i) {
    show(i);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lb && items.length) {
    items.forEach(function (item, i) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('click', function () { open(i); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', function () { show(current - 1); });
    lbNext.addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) { return; }
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(current - 1); }
      else if (e.key === 'ArrowRight') { show(current + 1); }
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function setStatus(msg, type) {
    if (!status) { return; }
    status.textContent = msg;
    status.className = 'form-status ' + type;
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

      // Fallback: no live form service configured -> open e-mail client
      if (!usesFormspree) {
        var d = {
          navn: (form.navn.value || '').trim(),
          firma: (form.firma.value || '').trim(),
          telefon: (form.telefon.value || '').trim(),
          epost: (form.epost.value || '').trim(),
          oppdrag: form.oppdrag.value || '',
          melding: (form.melding.value || '').trim()
        };
        var body =
          'Navn: ' + d.navn + '\n' +
          'Firma: ' + d.firma + '\n' +
          'Telefon: ' + d.telefon + '\n' +
          'E-post: ' + d.epost + '\n' +
          'Oppdrag: ' + d.oppdrag + '\n\n' +
          'Melding:\n' + d.melding + '\n';
        var mailto = 'mailto:post@bjkran.no' +
          '?subject=' + encodeURIComponent('Forespørsel: ' + d.oppdrag + ' – ' + d.navn) +
          '&body=' + encodeURIComponent(body);
        window.location.href = mailto;
        setStatus('Takk! E-postprogrammet ditt åpnes med forespørselen – trykk send for å sende den til oss.', 'ok');
        return;
      }

      // Live submit via Formspree
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sender …'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus('Takk for henvendelsen! Vi tar kontakt med deg så snart som mulig.', 'ok');
        } else {
          setStatus('Noe gikk galt. Ring oss gjerne på 982 04 372, så hjelper vi deg.', 'err');
        }
      }).catch(function () {
        setStatus('Noe gikk galt. Ring oss gjerne på 982 04 372, så hjelper vi deg.', 'err');
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = orig; }
      });
    });
  }
})();
