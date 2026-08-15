(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var eserler = window.ESERLER || [];
  var deck = document.getElementById('deck');
  var corridor = document.querySelector('.corridor');
  var hudIndex = document.getElementById('hudIndex');
  var hudTotal = document.getElementById('hudTotal');
  var hudFill = document.getElementById('hudFill');
  var gate = document.getElementById('gate');
  var doorL = document.querySelector('.door-l');
  var doorR = document.querySelector('.door-r');
  var gateBg = document.querySelector('.gate-bg');
  var sahne = document.querySelector('.corridor-sticky');

  var iki = function (n) { return n < 10 ? '0' + n : '' + n; };
  function kelepce(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function aralik(v, a, b) { return kelepce((v - a) / (b - a), 0, 1); }

  /* ---- renk yardımcıları: koridorun havası esere göre değişir ---- */
  function hex(r) {
    r = r.replace('#', '');
    return [parseInt(r.slice(0, 2), 16), parseInt(r.slice(2, 4), 16), parseInt(r.slice(4, 6), 16)];
  }
  function karistir(a, b, t) {
    var x = hex(a), y = hex(b);
    return 'rgb(' + Math.round(x[0] + (y[0] - x[0]) * t) + ',' +
                    Math.round(x[1] + (y[1] - x[1]) * t) + ',' +
                    Math.round(x[2] + (y[2] - x[2]) * t) + ')';
  }
  function basamakli(t, adet) {
    adet = adet || 4;
    var k = Math.floor(t * adet), kesir = t * adet - k;
    return kelepce((k + kesir * kesir * (3 - 2 * kesir)) / adet, 0, 1);
  }

  /* ---- her nesnenin sahneye giriş yönü ---- */
  var GIRIS = {
    motosiklet: { x: -0.55, y: 0.06, r: -7 },   // yandan gelir
    telefon:    { x: 0.10, y: 0.45, r: 5 },     // cepten çıkar gibi alttan
    bardak:     { x: 0, y: 0.5, r: 0 },         // masaya konur gibi alttan
    defter:     { x: 0.45, y: 0.12, r: 6 },     // sağdan açılır
    dizustu:    { x: 0, y: 0.35, r: 0 },        // masaya konur
    sunucu:     { x: -0.06, y: -0.5, r: -3 },   // yukarıdan iner
    sera:       { x: 0.35, y: 0.2, r: 0 },      // ufuktan gelir
    kutu:       { x: -0.4, y: 0.18, r: 4 },     // sokaktan
    ayna:       { x: 0.3, y: -0.25, r: -4 },
    hoparlor:   { x: -0.3, y: -0.2, r: 3 },
    tablet:     { x: 0.25, y: 0.3, r: -6 }
  };

  var Z = 4;              // her adımda kaç kat yakınlaşılıyor (ekran boşluğu 1/4)
  var onKart = null;      // şu an önümüzde duran eser

  /* ---- sahneler: her eser bir nesne ---- */
  deck.innerHTML = '';
  var sahneler = eserler.map(function (e, i) {
    var el = document.createElement('div');
    el.className = 'nesne';
    el.innerHTML = window.eserNesnesi(e.ad);
    el.style.zIndex = String(10 + i);
    el._renk = window.eserRengi(e.ad);
    el._giris = GIRIS[window.eserNesneTipi(e.ad)] || { x: 0, y: 0.3, r: 0 };
    el._eser = e;
    if (e.adres && e.adres.indexOf('localhost') === -1) el._adres = e.adres;
    deck.appendChild(el);
    return el;
  });

  /* ---- yazı katmanı: tomar yok, serbest tipografi ---- */
  var yazi = document.createElement('div');
  yazi.className = 'yazi';
  sahne.appendChild(yazi);
  var yaziIndeks = -1;

  function yaziYaz(i) {
    if (i === yaziIndeks) return;
    yaziIndeks = i;
    var e = eserler[i];
    if (!e) { yazi.classList.remove('gorunur'); return; }
    // yalnızca gerçekten yayında olan adresler bağlantı olur, kalanlar "yakında"
    var acikAdres = (e.adres && e.adres.indexOf('localhost') === -1) ? e.adres : null;
    var durumSinif = 'd-' + (e.durum || '').toLowerCase().replace(/[^a-zçğıöşü]/g, '');
    yazi.style.setProperty('--tema', window.eserRengi(e.ad).vurgu);
    yazi.style.setProperty('--tema2', window.eserRengi(e.ad).vurgu2);
    yazi.innerHTML =
      '<span class="kunye">Eser ' + iki(i + 1) + ' / ' + iki(eserler.length) +
        '<em>' + e.yil + '</em><b class="' + durumSinif + '">' + e.durum + '</b></span>' +
      '<h3>' + e.ad + '</h3>' +
      '<p class="rumuz">' + e.rumuz + ' · ' + e.lonca + ' Loncası</p>' +
      '<p class="kivilcim">' + e.kivilcim + '</p>' +
      '<p class="hikaye">' + e.hikaye + '</p>' +
      '<div class="etiketler">' + e.etiket.map(function (t) { return '<i>' + t + '</i>'; }).join('') +
        (acikAdres
          ? '<a class="bag" href="' + acikAdres + '" target="_blank" rel="noopener" data-miknatis>' +
            (e.baglanti || acikAdres.replace(/^https?:\/\//, '')) + '</a>'
          : '<span class="yakinda">Yakında</span>') +
      '</div>';
    yazi.classList.add('gorunur');
  }

  hudTotal.textContent = iki(eserler.length);

  // Her esere bir tam yakınlaşma turu
  var ADIM_VH = 95;
  corridor.style.height = (eserler.length * ADIM_VH + 100) + 'vh';

  function guncelle() {
    var vh = window.innerHeight, vw = window.innerWidth;

    // Kapı açılışı
    var gRect = gate.getBoundingClientRect();
    var gp = kelepce(-gRect.top / (gate.offsetHeight - vh || 1), 0, 1);
    var acilma = aralik(gp, 0.08, 0.85);
    doorL.style.transform = 'perspective(1200px) rotateY(' + (-acilma * 88) + 'deg)';
    doorR.style.transform = 'perspective(1200px) rotateY(' + (acilma * 88) + 'deg)';
    gateBg.style.transform = 'scale(' + (1 + acilma * 0.35) + ')';
    gateBg.style.opacity = (1 - aralik(gp, 0.7, 1)).toFixed(3);

    // Yakınlaşma
    var cRect = corridor.getBoundingClientRect();
    var toplam = corridor.offsetHeight - vh;
    var p = kelepce(-cRect.top / (toplam || 1), 0, 1);
    var n = sahneler.length;
    var t = p * n;

    hudFill.style.width = (p * 100).toFixed(1) + '%';
    hudIndex.textContent = iki(kelepce(Math.floor(t) + 1, 1, n));

    onKart = null;
    var enNet = 0, enRenk = null, enIndeks = 0;

    for (var i = 0; i < n; i++) {
      var el = sahneler[i];
      var e = t - i;                         // 0 iken tam karşımızda

      if (e < -2.25 || e > 1.1) {
        if (el.style.display !== 'none') el.style.display = 'none';
        continue;
      }
      if (el.style.display === 'none') el.style.display = '';

      var olcek = Math.pow(Z, e);
      // gelirken sürüklenme: nesne kendi yönünden süzülerek yerine oturur
      var suruk = 1 - aralik(e, -0.9, 0.02);
      var g = el._giris;
      var dx = g.x * vw * suruk;
      var dy = g.y * vh * suruk;
      var don = g.r * suruk;

      var op = Math.min(aralik(e, -2.2, -1.65), 1 - aralik(e, 0.55, 1.05));
      var netlik = Math.min(aralik(e, -1.6, -0.7), 1 - aralik(e, 0.3, 0.9));

      var yeniTr =
        'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) ' +
        'scale(' + olcek.toFixed(4) + ') rotate(' + don.toFixed(2) + 'deg)';
      if (el._tr !== yeniTr) { el.style.transform = yeniTr; el._tr = yeniTr; }
      var yeniOp = op.toFixed(3);
      if (el._op !== yeniOp) { el.style.opacity = yeniOp; el._op = yeniOp; }
      // bulanıklık pahalı bir işlem: yalnızca içinden geçerken uygulanır
      var bulanik = aralik(e, 0.55, 1.05) * 9;
      var yeniFil = bulanik > 0.2 ? 'blur(' + bulanik.toFixed(1) + 'px)' : '';
      if (el._fil !== yeniFil) { el.style.filter = yeniFil; el._fil = yeniFil; }

      if (netlik > enNet) { enNet = netlik; enRenk = el._renk; enIndeks = i; }
      if (e > -0.45 && e < 0.5) onKart = el;
    }

    yaziYaz(enIndeks);

    // Koridorun havası: dört basamakta bir sonraki eserin rengine devreder
    var kesir = kelepce(t, 0, n - 1);
    var alt = Math.min(n - 1, Math.max(0, Math.floor(kesir)));
    var ust = Math.min(n - 1, alt + 1);
    var k = basamakli(kelepce(kesir - alt, 0, 1));
    var ra = sahneler[alt]._renk, rb = sahneler[ust]._renk;
    sahne.style.setProperty('--arka', karistir(ra.arka, rb.arka, k));
    sahne.style.setProperty('--duvar', karistir(ra.bar, rb.bar, k));
    sahne.style.setProperty('--duvar2', karistir(ra.kart, rb.kart, k));
    sahne.style.setProperty('--vurgu', karistir(ra.vurgu, rb.vurgu, k));
    sahne.style.setProperty('--vurgu2', karistir(ra.vurgu2, rb.vurgu2, k));
  }

  /* ---- Loncalar: yan yana asılı sancaklar, dokununca açılır ---- */
  var grid = document.getElementById('guildGrid');
  var loncalar = window.LONCALAR || {};
  var sancakSira = [];

  Object.keys(loncalar).forEach(function (ad, sira) {
    var uyeler = eserler.filter(function (e) { return e.lonca === ad; });
    if (!uyeler.length) return;
    var renk = window.eserRengi(uyeler[0].ad);

    var el = document.createElement('div');
    el.className = 'sancak' + (sira === 0 ? ' acik' : '');
    el.style.setProperty('--tema', renk.vurgu);
    el.style.setProperty('--tema2', renk.vurgu2);
    el.innerHTML =
      '<div class="sancak-sirt"><span class="sancak-ad">' + ad + '</span>' +
        '<span class="sancak-sayi">' + iki(uyeler.length) + '</span></div>' +
      '<div class="sancak-ic">' +
        '<p class="sancak-tarif">' + loncalar[ad] + '</p>' +
        '<ul>' + uyeler.map(function (e) {
          var ic = '<b>' + e.ad + '</b><span>' + e.rumuz + '</span>';
          // bağlantı ve "açık" işareti yalnızca gerçekten yayında olanlara
          var yayinda = e.adres && e.adres.indexOf('localhost') === -1;
          if (!yayinda) return '<li class="bekliyor">' + ic + '</li>';
          return '<li class="acik"><a href="' + e.adres + '" target="_blank" rel="noopener">' +
                 ic + '</a></li>';
        }).join('') + '</ul>' +
      '</div>';

    el.addEventListener('click', function (olay) {
      if (olay.target.closest('a')) return;
      sancakSira.forEach(function (s) { s.classList.remove('acik'); });
      el.classList.add('acik');
    });
    el.addEventListener('mouseenter', function () {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      sancakSira.forEach(function (s) { s.classList.remove('acik'); });
      el.classList.add('acik');
    });

    grid.appendChild(el);
    sancakSira.push(el);
  });

  /* ---- Sahne etkileşimi: öndeki esere tıklayınca sitesi açılır ---- */
  sahne.addEventListener('mousemove', function (olay) {
    sahne.style.cursor = (onKart && onKart._adres) ? 'pointer' : 'default';
  });
  sahne.addEventListener('click', function (olay) {
    if (olay.target.closest('a')) return;
    if (onKart && onKart._adres) window.open(onKart._adres, '_blank', 'noopener');
  });

  /* Kaydırma olayı saniyede yüzlerce kez gelir; çizimi ekranın kendi karesine
     hizalayınca hem daha akıcı olur hem de gereksiz iş yapılmaz. */
  var bekleyen = false;
  function istek() {
    if (bekleyen) return;
    bekleyen = true;
    (window.requestAnimationFrame || function (f) { setTimeout(f, 16); })(function () {
      bekleyen = false;
      guncelle();
    });
  }
  window.addEventListener('scroll', istek, { passive: true });
  window.addEventListener('resize', istek);
  guncelle();
  window.__guncelle = guncelle;
})();
