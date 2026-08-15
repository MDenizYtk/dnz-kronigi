// Modern hareket katmanı: yükleme perdesi, özel imleç, ışık takibi, kaydırma
// ilerlemesi, belirme animasyonları, sayaçlar, mıknatıslı düğmeler, 3B eğilme.
(function () {
  var dokunmatik = window.matchMedia('(pointer: coarse)').matches;

  /* 1. Yükleme perdesi */
  var perde = document.getElementById('perde');
  var perdeFill = document.getElementById('perdeFill');
  var perdeSayi = document.getElementById('perdeSayi');
  var oran = 0;
  var sayac = setInterval(function () {
    oran = Math.min(100, oran + 4 + Math.floor(oran / 12));
    perdeFill.style.width = oran + '%';
    perdeSayi.textContent = oran;
    if (oran >= 100) {
      clearInterval(sayac);
      setTimeout(function () {
        perde.classList.add('acildi');
        document.body.classList.add('hazir');
      }, 260);
    }
  }, 45);

  /* 2. Özel imleç ve ışık */
  var imlec = document.getElementById('imlec');
  var isik = document.getElementById('isik');
  var fx = window.innerWidth / 2, fy = window.innerHeight / 2, ix = fx, iy = fy;

  if (dokunmatik) {
    imlec.style.display = 'none';
  } else {
    document.addEventListener('mousemove', function (e) {
      fx = e.clientX; fy = e.clientY;
      isik.style.transform = 'translate3d(' + (fx - 300) + 'px,' + (fy - 300) + 'px,0)';
    });
    var kare = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
    (function dongu() {
      var dx = fx - ix, dy = fy - iy;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ix += dx * 0.18; iy += dy * 0.18;
        imlec.style.transform = 'translate3d(' + (ix - 16) + 'px,' + (iy - 16) + 'px,0)';
      }
      kare(dongu);
    })();
    document.addEventListener('mouseover', function (e) {
      var hedef = e.target.closest('a, .guild, .device, .seal');
      imlec.classList.toggle('buyu', !!hedef);
    });
  }

  /* 4. Belirme animasyonu (stagger) — kaydırma ile tetiklenir */
  var belirenler = [].slice.call(document.querySelectorAll('[data-reveal]'));
  belirenler.forEach(function (el, i) { el.style.transitionDelay = (i % 6) * 0.08 + 's'; });

  /* 5. Sayaçlar */
  var sayilar = [].slice.call(document.querySelectorAll('[data-say]'));
  var sayildi = false;
  function sayimBaslat() {
    if (sayildi) return;
    sayildi = true;
    sayilar.forEach(function (el) {
      var hedef = parseInt(el.getAttribute('data-say'), 10), n = 0;
      var t = setInterval(function () {
        n += Math.max(1, Math.round(hedef / 22));
        if (n >= hedef) { n = hedef; clearInterval(t); }
        el.textContent = n;
      }, 40);
    });
  }

  function kontrol() {
    var vh = window.innerHeight;
    for (var i = 0; i < belirenler.length; i++) {
      var r = belirenler[i].getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) belirenler[i].classList.add('gorundu');
    }
    var s = document.getElementById('sayilar');
    if (s && s.getBoundingClientRect().top < vh * 0.85) sayimBaslat();
  }
  var bekleyen = false;
  function istek() {
    if (bekleyen) return;
    bekleyen = true;
    (window.requestAnimationFrame || function (f) { setTimeout(f, 16); })(function () {
      bekleyen = false; kontrol();
    });
  }
  window.addEventListener('scroll', istek, { passive: true });
  window.addEventListener('resize', istek);
  kontrol();

  /* 6. Mıknatıslı düğmeler */
  if (!dokunmatik) {
    [].slice.call(document.querySelectorAll('[data-miknatis]')).forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.28 + 'px,' + y * 0.35 + 'px) scale(1.06)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* 7. İmleçle 3B eğilme */
  if (!dokunmatik) {
    document.addEventListener('mousemove', function (e) {
      var el = e.target.closest('[data-tilt]');
      if (!el) return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tx', (-y * 12).toFixed(2) + 'deg');
      el.style.setProperty('--ty', (x * 16).toFixed(2) + 'deg');
      el.style.setProperty('--px', ((x + 0.5) * 100).toFixed(1) + '%');
    });
    document.addEventListener('mouseout', function (e) {
      var el = e.target.closest('[data-tilt]');
      if (el) { el.style.setProperty('--tx', '0deg'); el.style.setProperty('--ty', '0deg'); }
    });
  }

  /* 8. Kayan şerit */
  var seritIc = document.getElementById('seritIc');
  if (seritIc && window.ESERLER) {
    var metin = window.ESERLER.map(function (e) { return e.ad; }).join('  •  ') + '  •  ';
    seritIc.innerHTML = '<span>' + metin + '</span><span>' + metin + '</span>';
  }

  /* 9. Başlık harflerinin sırayla belirmesi */
  var baslik = document.querySelector('.title');
  if (baslik) {
    var kelimeler = baslik.textContent.split(' ');
    baslik.innerHTML = kelimeler.map(function (k, ki) {
      return '<span class="kelime">' + k.split('').map(function (h, i) {
        return '<span class="harf" style="animation-delay:' + (0.9 + (ki * 5 + i) * 0.045) + 's">' + h + '</span>';
      }).join('') + '</span>';
    }).join(' ');
  }
})();
