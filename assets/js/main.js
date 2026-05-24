/* JPE Civil & Environmental Engineers, v12 interaction layer.
   Mobile nav, scroll reveal, smooth anchors, contact form preview behavior. */
(function(){
  'use strict';

  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function(){
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.classList.toggle('is-open', !expanded);
      mobileNav.classList.toggle('is-open', !expanded);
    });
    mobileNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
      });
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    var updateHeader = function(){ header.classList.toggle('scrolled', window.scrollY > 8); };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive:true });
  }

  var contactForm = document.getElementById('jpe-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var confirmation = document.getElementById('cf-confirmation') || document.getElementById('form-preview-warning');
      if (confirmation) {
        contactForm.style.display = 'none';
        confirmation.textContent = 'Preview only. Form layout tested. Final sending endpoint still needs to be connected.';
        confirmation.style.display = 'block';
        confirmation.scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });

  var revealTargets = document.querySelectorAll('.section, .service-card, .credential-card, .timeline-step, .process-step, .faq-accordion, .cta-banner');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function(el){ el.classList.add('reveal'); });
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.08, rootMargin:'0px 0px -8% 0px' });
    revealTargets.forEach(function(el){ observer.observe(el); });
  }
})();
