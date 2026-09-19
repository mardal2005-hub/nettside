(function(){
  "use strict";
  var d=document;

  var yr=d.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  /* mobile nav */
  var burger=d.getElementById('burger'), mnav=d.getElementById('mnav');
  if(burger&&mnav){
    burger.addEventListener('click',function(){
      var o=mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded',o?'true':'false');
    });
    mnav.addEventListener('click',function(e){ if(e.target.closest('a')){mnav.classList.remove('open');burger.setAttribute('aria-expanded','false');}});
  }

  /* sticky header shadow */
  var hdr=d.querySelector('.hdr');
  function onScroll(){ if(hdr) hdr.classList.toggle('stuck', window.scrollY>6); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* reveal */
  var rvs=d.querySelectorAll('.rv');
  if('IntersectionObserver' in window && rvs.length){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -40px 0px'});
    rvs.forEach(function(el){io.observe(el);});
  } else { rvs.forEach(function(el){el.classList.add('in');}); }

  /* services accordion */
  function toggleRow(row){
    var open=row.getAttribute('aria-expanded')==='true';
    d.querySelectorAll('.svc-row[aria-expanded=true]').forEach(function(r){
      r.setAttribute('aria-expanded','false');
      r.querySelector('.panel').style.maxHeight=null;
    });
    if(!open){
      row.setAttribute('aria-expanded','true');
      var p=row.querySelector('.panel');
      p.style.maxHeight=p.scrollHeight+'px';
    }
  }
  d.querySelectorAll('.svc-row').forEach(function(row){
    row.addEventListener('click',function(){toggleRow(row);});
    row.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleRow(row);}
    });
  });
  // reflow open panels on resize
  window.addEventListener('resize',function(){
    d.querySelectorAll('.svc-row[aria-expanded=true] .panel').forEach(function(p){p.style.maxHeight=p.scrollHeight+'px';});
  });

  /* contact form */
  var form=d.getElementById('cform'), st=d.getElementById('fstatus');
  function status(msg){ if(st){st.className='fstatus ok';st.textContent=msg;} }
  function mail(x){
    var s='Forespørsel fra nettside – '+(x.tjeneste||'Tak');
    var b='Navn: '+x.navn+'\nTelefon: '+x.telefon+'\nE-post: '+x.epost+'\nGjelder: '+x.tjeneste+'\n\nMelding:\n'+x.melding+'\n';
    window.location.href='mailto:glc@haugesundtakterrasse.no?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(b);
  }
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return;}
      var x={navn:form.navn.value.trim(),telefon:form.telefon.value.trim(),epost:(form.epost.value||'').trim(),tjeneste:form.tjeneste.value,melding:(form.melding.value||'').trim()};
      var action=form.getAttribute('action')||'';
      if(action.indexOf('your-form-id')===-1){
        var btn=form.querySelector('button[type=submit]'); if(btn){btn.disabled=true;btn.textContent='Sender …';}
        fetch(action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
          .then(function(r){ if(r.ok){form.reset();status('Takk! Vi har mottatt forespørselen og tar kontakt så snart vi kan.');} else {throw 0;} })
          .catch(function(){ mail(x); status('Vi åpner e-postprogrammet ditt så du kan sende forespørselen.'); })
          .finally(function(){ if(btn){btn.disabled=false;btn.innerHTML='Send forespørsel <span class="ar">→</span>';} });
        return;
      }
      mail(x); status('Vi åpner e-postprogrammet ditt så du kan sende forespørselen. Foretrekker du telefon, ring 917 09 446.');
    });
  }
})();
