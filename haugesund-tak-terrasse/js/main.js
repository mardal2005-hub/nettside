/* Haugesund Tak & Terrasse – demo interaksjoner */
(function () {
  'use strict';

  var doc = document;

  /* ---------- Årstall i footer ---------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobilmeny ---------- */
  var toggle = doc.getElementById('navToggle');
  var nav = doc.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Åpne meny');
      }
    });
  }

  /* ---------- Header skygge ved scroll ---------- */
  var header = doc.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ trekkspill ---------- */
  doc.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      doc.querySelectorAll('.faq-item.open').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Bruk ekte hero-foto hvis det finnes ---------- */
  var heroMedia = doc.getElementById('heroMedia');
  if (heroMedia) {
    var probe = new Image();
    probe.onload = function () { heroMedia.classList.add('has-photo'); };
    probe.src = 'assets/img/hero-photo.jpg?v=1';
  }

  /* ---------- Kontaktskjema ---------- */
  var form = doc.getElementById('contactForm');
  var status = doc.getElementById('formStatus');

  function showStatus(type, msg) {
    if (!status) return;
    status.className = 'form-status ' + type;
    status.textContent = msg;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = {
        navn: (form.navn.value || '').trim(),
        telefon: (form.telefon.value || '').trim(),
        epost: (form.epost.value || '').trim(),
        tjeneste: form.tjeneste.value,
        melding: (form.melding.value || '').trim()
      };

      var action = form.getAttribute('action') || '';
      var configured = action.indexOf('your-form-id') === -1;

      // Hvis Formspree (e.l.) er konfigurert: send i bakgrunnen
      if (configured) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sender …'; }
        fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        }).then(function (res) {
          if (res.ok) {
            form.reset();
            showStatus('ok', 'Takk! Vi har mottatt forespørselen din og tar kontakt så snart som mulig.');
          } else {
            throw new Error('Nettverksfeil');
          }
        }).catch(function () {
          openMail(data);
          showStatus('ok', 'Vi åpner e-postprogrammet ditt så du kan sende forespørselen.');
        }).finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = 'Send forespørsel'; }
        });
        return;
      }

      // Fallback uten skjematjeneste: åpne e-post ferdig utfylt
      openMail(data);
      showStatus('ok', 'Vi åpner e-postprogrammet ditt så du kan sende forespørselen. Foretrekker du telefon, ring gjerne 917 09 446.');
    });
  }

  function openMail(d) {
    var subject = 'Forespørsel fra nettside – ' + (d.tjeneste || 'Tak/terrasse');
    var body =
      'Navn: ' + d.navn + '\n' +
      'Telefon: ' + d.telefon + '\n' +
      'E-post: ' + d.epost + '\n' +
      'Gjelder: ' + d.tjeneste + '\n\n' +
      'Melding:\n' + d.melding + '\n';
    window.location.href = 'mailto:glc@haugesundtakterrasse.no' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }
})();
