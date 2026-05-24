/* JPE Civil & Environmental Engineers, v10 interaction layer.
   Mobile nav, scroll header, form preview behavior, and tasteful reveal effects. */
(function(){
  'use strict';
  var toggle=document.querySelector('.menu-toggle');
  var mobileNav=document.getElementById('mobile-nav');
  if(toggle&&mobileNav){
    toggle.addEventListener('click',function(){
      var expanded=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!expanded));
      toggle.classList.toggle('is-open',!expanded);
      mobileNav.classList.toggle('is-open',!expanded);
      document.body.classList.toggle('nav-open',!expanded);
    });
    mobileNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click',function(){
        toggle.setAttribute('aria-expanded','false');
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      });
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&mobileNav.classList.contains('is-open')){
        toggle.setAttribute('aria-expanded','false');
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.focus();
      }
    });
  }
  var header=document.querySelector('.site-header');
  if(header){
    var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>8);};
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }
  var contactForm=document.getElementById('jpe-contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',function(e){
      e.preventDefault();
      var confirmation=document.getElementById('cf-confirmation')||document.getElementById('form-preview-warning');
      if(confirmation){
        confirmation.textContent='Thanks. This preview form is ready for final connection before launch. For now, please call or email JPE directly.';
        confirmation.style.display='block';
        confirmation.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click',function(e){
      var id=this.getAttribute('href');
      if(id.length>1){var target=document.querySelector(id); if(target){e.preventDefault(); target.scrollIntoView({behavior:'smooth'});}}
    });
  });
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var items=document.querySelectorAll('.service-card,.process-step,.credential-card,.faq-accordion,.info-box,.timeline-step');
    items.forEach(function(el){el.classList.add('reveal');});
    var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el);});
  }
})();
