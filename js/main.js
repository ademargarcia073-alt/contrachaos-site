/* === HAMBURGER MENU === */
(function () {
  var btn = document.getElementById('nav-hamburger');
  var panel = document.getElementById('nav-mobile-panel');
  if (!btn || !panel) return;

  btn.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Cierra el panel al hacer clic en un link
  panel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      panel.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* === ACTIVE NAV === */
(function () {
  var path = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(function (el) {
    var href = el.getAttribute('href');
    if (href === '/' && (path === '/' || path === '/index.html')) {
      el.classList.add('active');
    } else if (href !== '/' && path.startsWith(href)) {
      el.classList.add('active');
    }
  });
})();

/* === SCROLL REVEAL === */
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  var i = 0;
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition =
      'opacity .7s cubic-bezier(.2,.7,.2,1) ' + (i % 4) * 0.06 + 's, ' +
      'transform .7s cubic-bezier(.2,.7,.2,1) ' + (i % 4) * 0.06 + 's';
    io.observe(el);
    i++;
  });
})();

/* === PRICING GATE === */
(function () {
  var btn = document.getElementById('gate-btn');
  var note = document.getElementById('gate-note');
  var formWrap = document.getElementById('gate-form-wrap');
  var formEl = document.getElementById('gate-form-el');
  var success = document.getElementById('gate-success');

  if (!btn || !formWrap) return;

  btn.addEventListener('click', function () {
    btn.style.display = 'none';
    if (note) note.style.display = 'none';
    formWrap.classList.add('open');
  });

  if (formEl) {
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = formEl.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = 'Enviando…';
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(formEl)
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          formWrap.classList.remove('open');
          if (success) success.classList.add('show');
        })
        .catch(function () {
          if (submitBtn) submitBtn.textContent = 'Enviar y ver tarifas';
          alert('Hubo un problema al enviar. Por favor escríbenos por WhatsApp: +591 68050981');
        });
    });
  }
})();

/* === CONTACT FORM SERVICE SELECTOR === */
(function () {
  var pills = document.querySelectorAll('.pill[data-svc]');
  var hiddenSvc = document.getElementById('selected-service');
  if (!pills.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      if (hiddenSvc) hiddenSvc.value = pill.getAttribute('data-svc');
    });
  });
})();

/* === CONTACT FORM SUBMISSION === */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) { submitBtn.textContent = 'Enviando…'; submitBtn.disabled = true; }
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function () {
        form.innerHTML =
          '<div style="padding:40px 0;text-align:center;">' +
          '<div style=\'font-family:"DM Serif Display",serif;font-size:32px;margin-bottom:12px;color:#1F1B16;\'>¡Mensaje enviado!</div>' +
          '<p style="color:#5b5346;font-size:16px;line-height:1.6;">Te respondemos en menos de 24 horas hábiles.</p>' +
          '</div>';
      })
      .catch(function () {
        if (submitBtn) { submitBtn.textContent = 'Enviar mensaje →'; submitBtn.disabled = false; }
        alert('Hubo un problema al enviar. Por favor escríbenos directamente por WhatsApp: +591 68050981');
      });
  });
})();
