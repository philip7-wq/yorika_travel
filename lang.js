(function(){
  var KEY='yorika-lang', SUPPORTED=['de','en','ar','tr'], RTL=['ar'];
  var LABEL={de:'DE',en:'EN',ar:'AR',tr:'TR'};
  var T={
    de:{'nav.home':'Startseite','nav.about':'Über uns','nav.offers':'Reiseangebote','nav.pilgrimage':'Pilgerreisen & Umrah','nav.contact':'Kontakt','cta.book':'Beratung buchen'},
    en:{'nav.home':'Home','nav.about':'About Us','nav.offers':'Travel Offers','nav.pilgrimage':'Pilgrimage & Umrah','nav.contact':'Contact','cta.book':'Book Consultation'},
    ar:{'nav.home':'الرئيسية','nav.about':'من نحن','nav.offers':'عروض السفر','nav.pilgrimage':'الحج والعمرة','nav.contact':'اتصل بنا','cta.book':'احجز استشارة'},
    tr:{'nav.home':'Ana Sayfa','nav.about':'Hakkımızda','nav.offers':'Seyahat Teklifleri','nav.pilgrimage':'Hac & Umre','nav.contact':'İletişim','cta.book':'Danışmanlık Randevusu'}
  };
  function get(){var s=localStorage.getItem(KEY);return SUPPORTED.indexOf(s)>-1?s:'de';}
  function apply(lang){
    if(SUPPORTED.indexOf(lang)<0)lang='de';
    var d=T[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'); if(d&&d[k])el.textContent=d[k];
    });
    var h=document.documentElement;
    h.setAttribute('lang',lang); h.setAttribute('dir',RTL.indexOf(lang)>-1?'rtl':'ltr');
    document.querySelectorAll('[data-lang-current]').forEach(function(e){e.textContent=LABEL[lang];});
    document.querySelectorAll('.lang-option').forEach(function(o){
      o.classList.toggle('active',o.getAttribute('data-lang')===lang);
    });
  }
  function set(lang){localStorage.setItem(KEY,lang);apply(lang);}

  // Mobile-Navigation (Hamburger) – baut aus den Desktop-Nav-Links ein aufklappbares Panel
  function buildMobileNav(){
    if(document.getElementById('ymnav-panel'))return;
    var langSw=document.querySelector('[data-lang-switcher]');
    if(!langSw)return;
    var topbar=langSw.closest('header,nav');
    if(!topbar)return;
    var links=topbar.querySelectorAll('a[data-i18n^="nav."]');
    if(!links.length)return;

    // Toggle-Button: vorhandenen Hamburger wiederverwenden oder einen erzeugen
    var btn=topbar.querySelector('button.md\\:hidden');
    if(!btn){
      btn=document.createElement('button');
      btn.type='button';
      var ic=document.createElement('span');
      ic.className='material-symbols-outlined text-3xl';
      ic.setAttribute('aria-hidden','true');
      ic.textContent='menu';
      btn.appendChild(ic);
      (langSw.parentElement||topbar).appendChild(btn);
    }
    btn.classList.add('ymnav-toggle');
    btn.setAttribute('aria-label','Menü');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls','ymnav-panel');
    var icon=btn.querySelector('.material-symbols-outlined');

    // Panel aus den Nav-Links (+ CTA) bauen
    var panel=document.createElement('div');
    panel.className='ymnav-panel';
    panel.id='ymnav-panel';
    links.forEach(function(a){
      var l=document.createElement('a');
      l.className='ymnav-link';
      l.href=a.getAttribute('href')||'#';
      var k=a.getAttribute('data-i18n'); if(k)l.setAttribute('data-i18n',k);
      l.textContent=a.textContent.trim();
      if(a.getAttribute('aria-current')){l.setAttribute('aria-current',a.getAttribute('aria-current'));l.classList.add('active');}
      panel.appendChild(l);
    });
    var cta=topbar.querySelector('a[data-i18n="cta.book"]');
    if(cta){
      cta.classList.add('ymnav-hide-sm'); // im Header auf Mobile ausblenden – ist im Panel enthalten
      var c=document.createElement('a');
      c.className='ymnav-link ymnav-cta';
      c.href=cta.getAttribute('href')||'#';
      c.setAttribute('data-i18n','cta.book');
      c.textContent=cta.textContent.trim();
      panel.appendChild(c);
    }
    document.body.appendChild(panel);

    function position(){var r=topbar.getBoundingClientRect();panel.style.top=Math.max(0,r.bottom)+'px';}
    function close(){panel.classList.remove('open');btn.classList.remove('open');btn.setAttribute('aria-expanded','false');if(icon)icon.textContent='menu';}
    function open(){position();panel.classList.add('open');btn.classList.add('open');btn.setAttribute('aria-expanded','true');if(icon)icon.textContent='close';}

    btn.addEventListener('click',function(e){e.stopPropagation();panel.classList.contains('open')?close():open();});
    panel.addEventListener('click',function(e){if(e.target.closest('a'))close();});
    document.addEventListener('click',function(e){if(panel.classList.contains('open')&&!panel.contains(e.target)&&!btn.contains(e.target))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    window.addEventListener('resize',function(){if(window.innerWidth>=768)close();else if(panel.classList.contains('open'))position();});
  }

  document.addEventListener('DOMContentLoaded',function(){
    buildMobileNav();
    apply(get());
    document.querySelectorAll('[data-lang-switcher]').forEach(function(sw){
      var trg=sw.querySelector('.lang-trigger');
      trg.addEventListener('click',function(e){
        e.stopPropagation();
        var open=sw.classList.contains('open');
        document.querySelectorAll('[data-lang-switcher].open').forEach(function(s){s.classList.remove('open');});
        if(!open)sw.classList.add('open');
        trg.setAttribute('aria-expanded',!open);
      });
      sw.querySelectorAll('.lang-option').forEach(function(o){
        o.addEventListener('click',function(e){e.stopPropagation();set(o.getAttribute('data-lang'));sw.classList.remove('open');});
      });
    });
    document.addEventListener('click',function(){document.querySelectorAll('[data-lang-switcher].open').forEach(function(s){s.classList.remove('open');});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('[data-lang-switcher].open').forEach(function(s){s.classList.remove('open');});});
  });
})();
