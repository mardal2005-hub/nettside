/* ============================================================
   Mardal Utleie – main.js
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
    });

    // Close menu when a link is clicked (mobile)
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Åpne meny');
      }
    });
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Scroll reveal (subtle fade-in) ---------- */
  var revealSelectors = '.section-head, .product-card, .package-card, .why-card, .step-card, .stat-tile, .testimonial-card, .area-chip, .gallery-item, .about-text, .about-stats, .contact-info, .contact-form-wrap, .contact-map, .cta-inner, .faq-item';
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll(revealSelectors);

  if (revealEls.length && 'IntersectionObserver' in window && !prefersReduced) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header: compact/blur state on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) { header.classList.add('scrolled'); }
      else { header.classList.remove('scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.main-nav a[href^="#"]')
  );
  if (navLinks.length && 'IntersectionObserver' in window) {
    var linkById = {};
    var spySections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = id && document.getElementById(id);
      if (section) { linkById[id] = link; spySections.push(section); }
    });

    var setActive = function (id) {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      if (linkById[id]) { linkById[id].classList.add('active'); }
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    spySections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Hide floating call button near contact/footer ---------- */
  var fab = document.querySelector('.call-fab');
  if (fab && 'IntersectionObserver' in window) {
    var zones = [
      document.getElementById('kontakt'),
      document.querySelector('.cta'),
      document.querySelector('.site-footer')
    ].filter(Boolean);
    var zoneVisible = zones.map(function () { return false; });
    var fabObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var idx = zones.indexOf(entry.target);
        if (idx > -1) { zoneVisible[idx] = entry.isIntersecting; }
      });
      var anyVisible = zoneVisible.some(function (v) { return v; });
      fab.classList.toggle('is-hidden', anyVisible);
    }, { threshold: 0 });
    zones.forEach(function (z) { fabObs.observe(z); });
  }

  /* ---------- Hero scroll parallax (image + text depth) ---------- */
  var hero = document.querySelector('.hero');
  var heroMedia = document.querySelector('.hero-media');
  var heroContent = document.querySelector('.hero-content');

  if (hero && heroMedia && !prefersReduced) {
    var heroH = hero.offsetHeight || 1;
    var getConf = function () {
      // Weaker, cheaper effect on smaller screens
      return window.matchMedia('(max-width: 768px)').matches
        ? { mediaShift: 0.06, scaleFrom: 1.04, scaleAdd: 0.05, textShift: 0.03, fade: 0.9 }
        : { mediaShift: 0.12, scaleFrom: 1.05, scaleAdd: 0.07, textShift: 0.06, fade: 0.7 };
    };
    var conf = getConf();
    var ticking = false;

    var render = function () {
      ticking = false;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom <= 0) { return; }               // hero fully scrolled away
      var p = Math.min(Math.max(-rect.top / heroH, 0), 1);

      // Background: drifts down slightly + subtle zoom => appears to move up slowly
      var mediaY = (p * heroH * conf.mediaShift).toFixed(1);
      var scale = (conf.scaleFrom + p * conf.scaleAdd).toFixed(3);
      heroMedia.style.transform = 'translate3d(0,' + mediaY + 'px,0) scale(' + scale + ')';

      // Foreground text: moves a touch faster + fades => depth + glides into next section
      if (heroContent) {
        var textY = (-p * heroH * conf.textShift).toFixed(1);
        var op = Math.max(0, 1 - p / conf.fade).toFixed(2);
        heroContent.style.transform = 'translate3d(0,' + textY + 'px,0)';
        heroContent.style.opacity = op;
      }
    };

    var onScrollHero = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(render); }
    };

    window.addEventListener('scroll', onScrollHero, { passive: true });
    window.addEventListener('resize', function () {
      heroH = hero.offsetHeight || 1;
      conf = getConf();
      render();
    }, { passive: true });
    render();
  }

  /* ---------- Prefill product in contact form ---------- */
  var productSelect = document.getElementById('product');
  var messageField = document.getElementById('message');

  document.querySelectorAll('[data-product]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var product = btn.getAttribute('data-product');
      if (productSelect) {
        for (var i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].value === product) {
            productSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (messageField && !messageField.value.trim()) {
        messageField.value = 'Hei! Jeg ønsker et tilbud på ' + product + '. ';
      }
    });
  });

  /* ---------- Contact form handling ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var action = form.getAttribute('action') || '';
      var usingPlaceholder = action.indexOf('your-form-id') !== -1 || action === '';

      // Fallback: open the user's e-mail client with a prefilled message.
      if (usingPlaceholder) {
        var data = new FormData(form);
        var lines = [
          'Navn: ' + (data.get('navn') || ''),
          'E-post: ' + (data.get('epost') || ''),
          'Telefon: ' + (data.get('telefon') || ''),
          'Produkt: ' + (data.get('produkt') || ''),
          'Dato: ' + (data.get('dato') || ''),
          '',
          'Melding:',
          (data.get('melding') || '')
        ];
        var subject = 'Forespørsel om utleie' + (data.get('produkt') ? ' – ' + data.get('produkt') : '');
        var mailto = 'mailto:kontakt@mardalutleie.no'
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(lines.join('\n'));
        window.location.href = mailto;
        setStatus('Åpner e-postprogrammet ditt … Får du ikke opp noe, send oss en e-post direkte til kontakt@mardalutleie.no.', 'success');
        return;
      }

      // Real submission (e.g. Formspree) via fetch.
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; }
      setStatus('Sender …', '');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus('Takk! Forespørselen din er sendt. Vi tar kontakt så snart som mulig.', 'success');
        } else {
          setStatus('Beklager, noe gikk galt. Prøv igjen eller send en e-post til kontakt@mardalutleie.no.', 'error');
        }
      }).catch(function () {
        setStatus('Beklager, noe gikk galt. Prøv igjen eller send en e-post til kontakt@mardalutleie.no.', 'error');
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; }
      });
    });
  }
})();
