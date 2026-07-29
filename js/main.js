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
        var mailto = 'mailto:booking@mardalutleie.no'
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(lines.join('\n'));
        window.location.href = mailto;
        setStatus('Åpner e-postprogrammet ditt … Får du ikke opp noe, send oss en e-post direkte til booking@mardalutleie.no.', 'success');
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
          setStatus('Beklager, noe gikk galt. Prøv igjen eller send en e-post til booking@mardalutleie.no.', 'error');
        }
      }).catch(function () {
        setStatus('Beklager, noe gikk galt. Prøv igjen eller send en e-post til booking@mardalutleie.no.', 'error');
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; }
      });
    });
  }
})();
