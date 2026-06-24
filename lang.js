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
  document.addEventListener('DOMContentLoaded',function(){
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
