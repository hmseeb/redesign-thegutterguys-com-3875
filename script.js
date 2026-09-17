/* =========================================================================
   The Gutter Guys® — interaction layer
   Vanilla JS, no dependencies.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- Year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------- Mobile nav */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    if (!nav || !burger) return;
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeNav();
      else openNav();
    });

    // Close when a nav link is tapped
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        burger.focus();
      }
    });

    // Close when tapping the backdrop
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      closeNav();
    });

    // Reset when resizing back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ------------------------------------------------- Sticky header state */
  var masthead = document.getElementById('masthead');
  var totop = document.getElementById('totop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (masthead) masthead.classList.toggle('is-stuck', y > 12);
    if (totop) totop.classList.toggle('is-visible', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (totop) {
    totop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------ Scroll reveal effect */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------ Active nav link on scroll */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__list a[href^="#"]')
  );
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle(
            'is-active',
            a.getAttribute('href') === '#' + entry.target.id
          );
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* ------------------------------ Billing address toggle (estimate form) */
  var billingSame = document.getElementById('billing-same');
  var billingFields = document.getElementById('billing-fields');

  function syncBilling() {
    if (!billingSame || !billingFields) return;
    billingFields.hidden = billingSame.checked;
  }
  if (billingSame) {
    billingSame.addEventListener('change', syncBilling);
    syncBilling();
  }

  /* ------------------------------------------------- Form validation */
  var form = document.getElementById('estimate-form');
  var status = document.getElementById('form-status');

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    var next = input.parentNode.querySelector('.field__error');
    if (next) next.remove();
  }

  function setError(input, message) {
    clearError(input);
    input.setAttribute('aria-invalid', 'true');
    var msg = document.createElement('span');
    msg.className = 'field__error';
    msg.textContent = message;
    input.parentNode.appendChild(msg);
  }

  function validateField(input) {
    var value = (input.value || '').trim();

    if (!value) {
      setError(input, 'This field is required.');
      return false;
    }
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(input, 'Please enter a valid email address.');
      return false;
    }
    if (input.type === 'tel' && value.replace(/\D/g, '').length < 10) {
      setError(input, 'Please enter a 10-digit phone number.');
      return false;
    }
    clearError(input);
    return true;
  }

  if (form) {
    var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));

    required.forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstBad = null;
      var ok = true;

      required.forEach(function (input) {
        if (!validateField(input)) {
          ok = false;
          if (!firstBad) firstBad = input;
        }
      });

      if (!ok) {
        if (status) {
          status.className = 'form__status is-err';
          status.textContent = 'Please fix the highlighted fields and try again.';
        }
        if (firstBad) firstBad.focus();
        return;
      }

      var name = (document.getElementById('first-name') || {}).value || '';

      if (status) {
        status.className = 'form__status is-ok';
        status.textContent =
          'Thanks' + (name ? ', ' + name.trim() : '') +
          '! Your free estimate request is ready to send. For the fastest response, ' +
          'call us now at 1-800-488-8371 or +1 (302) 683-9385.';
      }

      form.reset();
      syncBilling();
      required.forEach(clearError);
      if (status) status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* -------------------------------- Smooth anchor scroll with header offset */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href');
    if (!id || id === '#' || id.length < 2) return;

    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    var header = masthead ? masthead.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - header - 16;

    window.scrollTo({
      top: top < 0 ? 0 : top,
      behavior: 'smooth'
    });

    if (history.replaceState) history.replaceState(null, '', id);
  });
})();
