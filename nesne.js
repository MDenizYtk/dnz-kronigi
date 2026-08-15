// Her eser bir nesne olarak gelir: telefon, motosiklet, çay bardağı, sunucu dolabı...
// Nesnenin tam ortasında bir ekran boşluğu vardır; bir sonraki eser oranın içinden çıkar.
// Bütün nesneler 1600x1000 alanına çizilir, boşluk hep aynı yerdedir (sonsuz yakınlaşma).
(function () {
  var W = 1600, H = 1000;
  var EX = 600, EY = 375, EW = 400, EH = 250;   // ekran boşluğu (1/4 ölçek)

  function ekran(r, ad) {
    var sanat = window.eserCizimi(ad).replace('<svg viewBox',
      '<svg x="' + EX + '" y="' + EY + '" width="' + EW + '" height="' + EH + '" viewBox');
    return sanat +
      '<rect x="' + EX + '" y="' + EY + '" width="' + EW + '" height="' + EH + '" fill="none" ' +
      'stroke="' + r.vurgu + '" stroke-width="3" opacity=".9"/>' +
      '<rect x="' + (EX - 6) + '" y="' + (EY - 6) + '" width="' + (EW + 12) + '" height="' + (EH + 12) + '" ' +
      'fill="none" stroke="' + r.vurgu + '" stroke-width="1" opacity=".35"/>';
  }

  function sar(ic, r, ad) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><filter id="par"><feGaussianBlur stdDeviation="18"/></filter></defs>' +
      '<ellipse cx="800" cy="500" rx="360" ry="230" fill="' + r.vurgu + '" opacity=".16" filter="url(#par)"/>' +
      '<g transform="translate(800 500) scale(1.18) translate(-800 -500)">' + ic + '</g>' + ekran(r, ad) + '</svg>';
  }

  var N = {

    /* telefon: elde tutulan bir cihaz */
    telefon: function (r) {
      return '<rect x="540" y="160" width="520" height="780" rx="56" fill="#14161c" stroke="' + r.vurgu + '" stroke-width="5"/>' +
        '<rect x="564" y="188" width="472" height="724" rx="40" fill="#05060a"/>' +
        '<rect x="748" y="200" width="104" height="14" rx="7" fill="#22252e"/>' +
        '<rect x="726" y="878" width="148" height="9" rx="5" fill="#2a2e39"/>' +
        '<rect x="528" y="300" width="9" height="70" rx="5" fill="' + r.vurgu + '" opacity=".7"/>' +
        '<rect x="1063" y="330" width="9" height="104" rx="5" fill="' + r.vurgu + '" opacity=".7"/>';
    },

    /* motosiklet: yandan gelen demir at */
    motosiklet: function (r) {
      return '<g stroke="' + r.vurgu + '" fill="none" stroke-width="7" stroke-linecap="round">' +
        '<circle cx="430" cy="760" r="150"/><circle cx="1180" cy="760" r="150"/>' +
        '<circle cx="430" cy="760" r="58" opacity=".5"/><circle cx="1180" cy="760" r="58" opacity=".5"/>' +
        '<path d="M430 760 L700 610 L1010 610 L1180 760"/>' +
        '<path d="M700 610 L640 430 L520 400"/>' +
        '<path d="M1010 610 L1080 470 L1210 452"/>' +
        '<path d="M470 402 L610 372"/>' +
        '</g>' +
        '<path d="M520 400 L470 402 L466 442 L520 440 Z" fill="' + r.vurgu2 + '" opacity=".85"/>' +
        '<ellipse cx="330" cy="470" rx="120" ry="70" fill="' + r.vurgu2 + '" opacity=".28"/>';
    },

    /* çay bardağı: ince belli, altta tabak */
    bardak: function (r) {
      return '<path d="M600 250 L1000 250 L940 800 L660 800 Z" fill="' + r.vurgu + '" opacity=".14"/>' +
        '<path d="M600 250 L1000 250 L940 800 L660 800 Z" fill="none" stroke="' + r.vurgu2 + '" stroke-width="6"/>' +
        '<path d="M640 560 L960 560 L940 800 L660 800 Z" fill="' + r.vurgu + '" opacity=".55"/>' +
        '<ellipse cx="800" cy="560" rx="160" ry="26" fill="' + r.vurgu2 + '" opacity=".55"/>' +
        '<ellipse cx="800" cy="838" rx="250" ry="42" fill="none" stroke="' + r.vurgu2 + '" stroke-width="6"/>' +
        '<path d="M1000 330 C 1110 340, 1120 470, 1000 500" fill="none" stroke="' + r.vurgu2 + '" stroke-width="6"/>' +
        '<path d="M740 190 C 770 150, 720 130, 750 90" fill="none" stroke="' + r.vurgu2 + '" stroke-width="5" opacity=".6"/>' +
        '<path d="M860 190 C 890 150, 840 130, 870 90" fill="none" stroke="' + r.vurgu2 + '" stroke-width="5" opacity=".45"/>';
    },

    /* açık defter: iki sayfa */
    defter: function (r) {
      return '<path d="M180 760 L790 640 L790 300 L180 400 Z" fill="#efe4c9" opacity=".9"/>' +
        '<path d="M1420 760 L810 640 L810 300 L1420 400 Z" fill="#e6d9b8" opacity=".9"/>' +
        '<path d="M790 300 L810 300 L810 640 L790 640 Z" fill="#8a6c2d"/>' +
        '<g stroke="#a08b5c" stroke-width="5" opacity=".55">' +
        '<path d="M250 470 L700 396"/><path d="M250 540 L700 466"/><path d="M250 610 L560 560"/>' +
        '<path d="M1350 470 L900 396"/><path d="M1350 540 L900 466"/></g>';
    },

    /* dizüstü bilgisayar */
    dizustu: function (r) {
      return '<path d="M420 820 L1180 820 L1300 900 L300 900 Z" fill="#171a20" stroke="' + r.vurgu + '" stroke-width="4"/>' +
        '<rect x="470" y="230" width="660" height="590" rx="18" fill="#12151b" stroke="' + r.vurgu + '" stroke-width="5"/>' +
        '<rect x="500" y="262" width="600" height="526" rx="8" fill="#05070b"/>' +
        '<rect x="700" y="856" width="200" height="10" rx="5" fill="' + r.vurgu + '" opacity=".6"/>';
    },

    /* sunucu dolabı */
    sunucu: function (r) {
      var ic = '<rect x="440" y="140" width="720" height="760" rx="16" fill="#101319" stroke="' + r.vurgu + '" stroke-width="5"/>';
      for (var i = 0; i < 4; i++) {
        var y = 180 + i * 90;
        if (y > 380 && y < 620) continue;
        ic += '<rect x="480" y="' + y + '" width="640" height="62" rx="8" fill="#181d26"/>' +
              '<circle cx="520" cy="' + (y + 31) + '" r="9" fill="' + r.vurgu + '"/>' +
              '<rect x="560" y="' + (y + 24) + '" width="300" height="14" rx="7" fill="' + r.vurgu2 + '" opacity=".45"/>';
      }
      ic += '<rect x="480" y="700" width="640" height="62" rx="8" fill="#181d26"/>' +
            '<circle cx="520" cy="731" r="9" fill="' + r.vurgu2 + '"/>' +
            '<rect x="560" y="724" width="220" height="14" rx="7" fill="' + r.vurgu + '" opacity=".45"/>';
      return ic;
    },

    /* sera ve tarla */
    sera: function (r) {
      return '<path d="M240 860 L240 520 L800 260 L1360 520 L1360 860 Z" fill="' + r.vurgu + '" opacity=".08"/>' +
        '<path d="M240 860 L240 520 L800 260 L1360 520 L1360 860" fill="none" stroke="' + r.vurgu + '" stroke-width="6"/>' +
        '<path d="M800 260 L800 860 M520 390 L520 860 M1080 390 L1080 860" stroke="' + r.vurgu + '" stroke-width="3" opacity=".45"/>' +
        '<path d="M240 860 L1360 860" stroke="' + r.vurgu2 + '" stroke-width="8"/>' +
        '<g stroke="' + r.vurgu2 + '" stroke-width="5" fill="none" opacity=".8">' +
        '<path d="M330 860 C 330 780, 380 760, 380 700"/><path d="M1260 860 C 1260 780, 1210 760, 1210 700"/></g>';
    },

    /* kamera ve çöp kutusu */
    kutu: function (r) {
      return '<path d="M520 900 L560 480 L1040 480 L1080 900 Z" fill="#141a17" stroke="' + r.vurgu + '" stroke-width="5"/>' +
        '<rect x="520" y="420" width="560" height="60" rx="14" fill="#1b241f" stroke="' + r.vurgu + '" stroke-width="4"/>' +
        '<path d="M300 200 L470 200 L470 300 L300 300 Z" fill="#121815" stroke="' + r.vurgu + '" stroke-width="4"/>' +
        '<circle cx="470" cy="250" r="26" fill="' + r.vurgu + '"/>' +
        '<path d="M496 250 L640 400" stroke="' + r.vurgu + '" stroke-width="3" stroke-dasharray="10 8" opacity=".7"/>';
    },

    /* berber aynası ve koltuk */
    ayna: function (r) {
      return '<rect x="520" y="180" width="560" height="620" rx="280" fill="#160f0f" stroke="' + r.vurgu + '" stroke-width="6"/>' +
        '<path d="M600 900 L1000 900 L960 820 L640 820 Z" fill="#1c1414" stroke="' + r.vurgu + '" stroke-width="4"/>' +
        '<path d="M780 820 L780 760 M700 760 L900 760" stroke="' + r.vurgu2 + '" stroke-width="6"/>' +
        '<rect x="560" y="330" width="480" height="340" rx="14" fill="#0d0808" opacity=".9"/>';
    },

    /* menü çubuğundaki ses: dalga ve mikrofon */
    hoparlor: function (r) {
      var ic = '<rect x="430" y="250" width="740" height="500" rx="26" fill="#0d0f14" stroke="' + r.vurgu + '" stroke-width="5"/>' +
        '<rect x="430" y="250" width="740" height="52" rx="26" fill="#171b22"/>' +
        '<circle cx="470" cy="276" r="8" fill="' + r.vurgu + '"/><circle cx="498" cy="276" r="8" fill="' + r.vurgu2 + '" opacity=".6"/>';
      for (var i = 0; i < 16; i++) {
        var h = 30 + Math.abs(Math.sin(i * 1.1)) * 130;
        ic += '<rect x="' + (300 + i * 68) + '" y="' + (860 - h / 2) + '" width="16" height="' + h + '" rx="8" fill="' + r.vurgu + '" opacity=".7"/>';
      }
      return ic;
    },

    /* ustanın atölyesi: masa lambası, sandalye, defter ve ekran */
    atolye: function (r) {
      return '<path d="M170 720 L1430 720 L1430 752 L170 752 Z" fill="#1b1610" stroke="' + r.vurgu + '" stroke-width="4"/>' +
        '<path d="M250 752 L250 900 M1350 752 L1350 900" stroke="' + r.vurgu + '" stroke-width="8" stroke-linecap="round"/>' +
        '<g stroke="' + r.vurgu + '" stroke-width="6" fill="none" stroke-linecap="round">' +
        '<path d="M300 720 L300 560 L420 470"/><path d="M300 620 L390 560"/></g>' +
        '<path d="M370 430 L470 430 L440 500 L400 500 Z" fill="' + r.vurgu2 + '" opacity=".85"/>' +
        '<ellipse cx="420" cy="600" rx="210" ry="130" fill="' + r.vurgu2 + '" opacity=".12"/>' +
        '<path d="M1120 720 L1120 610 L1300 610 L1300 720" fill="none" stroke="' + r.vurgu + '" stroke-width="6"/>' +
        '<path d="M1150 610 L1150 500 L1270 500 L1270 610" fill="none" stroke="' + r.vurgu + '" stroke-width="6"/>' +
        '<rect x="1046" y="672" width="70" height="48" rx="8" fill="none" stroke="' + r.vurgu + '" stroke-width="4"/>' +
        '<circle cx="1010" cy="700" r="20" fill="none" stroke="' + r.vurgu2 + '" stroke-width="4"/>' +
        '<path d="M600 690 L860 690 L860 718 L600 718 Z" fill="#241c10" stroke="' + r.vurgu + '" stroke-width="3"/>' +
        '<rect x="470" y="250" width="660" height="440" rx="18" fill="#12100b" stroke="' + r.vurgu + '" stroke-width="5"/>';
    },

    /* kalemli tablet */
    tablet: function (r) {
      return '<rect x="430" y="200" width="740" height="620" rx="28" fill="#14161c" stroke="' + r.vurgu + '" stroke-width="5"/>' +
        '<rect x="462" y="232" width="676" height="556" rx="14" fill="#f4ecd8" opacity=".07"/>' +
        '<path d="M1210 240 L1290 300 L980 700 L900 730 L930 650 Z" fill="' + r.vurgu2 + '" opacity=".85"/>' +
        '<path d="M900 730 L930 650 L980 700 Z" fill="#f6efe2"/>';
    }
  };

  var eslesme = {
    "Sekreter": 'telefon', "Atlas Mobil": 'telefon', "Dolaptan Nefis Ziyafete": 'telefon',
    "Moto": 'motosiklet', "Questigo": 'motosiklet',
    "Çay İmparatorluğu": 'bardak',
    "Atlas": 'defter', "Defter": 'defter',
    "UniDefter": 'tablet',
    "KodYolu": 'dizustu', "Mağaza": 'dizustu', "DNZ Dijital": 'dizustu', "Hazırlık": 'dizustu',
    "MotoKesif Sunucusu": 'sunucu', "Notçu Sunucusu": 'sunucu', "Nöbetçi": 'sunucu',
    "M. Deniz": 'atolye',
    "SeraSensor": 'sera', "AtıkTakip": 'kutu', "Randevu": 'ayna', "Jarvis": 'hoparlor'
  };

  window.eserNesnesi = function (ad) {
    var r = window.eserRengi(ad);
    var tip = eslesme[ad] || 'dizustu';
    return sar(N[tip](r), r, ad);
  };
  window.eserNesneTipi = function (ad) { return eslesme[ad] || 'dizustu'; };
})();
