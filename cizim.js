// Her eser için elde üretilen SVG ekran çizimi. Gerçek ekran görüntüsü yerine
// uygulamanın kendi rengiyle çizilmiş üsluplu bir maket.
(function () {
  var A = 320, B = 200; // çizim ölçüsü

  function svg(ic, arka) {
    return '<svg viewBox="0 0 ' + A + ' ' + B + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="' + A + '" height="' + B + '" fill="' + arka + '"/>' + ic + '</svg>';
  }
  function r(x, y, w, h, f, rd) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rd || 2) + '" fill="' + f + '"/>';
  }
  function c(x, y, rad, f, op) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + rad + '" fill="' + f + '"' + (op ? ' opacity="' + op + '"' : '') + '/>';
  }
  function t(x, y, s, f, w, an) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + s + '" fill="' + f + '" font-family="Helvetica,Arial,sans-serif"' +
      (w ? ' font-weight="' + w + '"' : '') + (an ? ' text-anchor="' + an + '"' : '') + '>';
  }
  function satirlar(x, y, gen, adet, f, ara) {
    var o = '';
    for (var i = 0; i < adet; i++) o += r(x, y + i * (ara || 9), gen * (i % 3 === 2 ? 0.6 : 1), 3, f, 1.5);
    return o;
  }
  function ustCubuk(p, baslik) {
    return r(0, 0, A, 22, p.bar) +
      c(12, 11, 3, p.vurgu) +
      t(22, 14.5, 8, p.yazi, 700) + baslik + '</text>';
  }

  var sablon = {
    // Harita ve rota
    harita: function (p, ad) {
      var o = r(0, 0, A, B, p.arka);
      o += '<path d="M-10 150 C 60 120, 90 60, 160 70 S 260 40, 340 20" stroke="' + p.vurgu + '" stroke-width="3" fill="none" opacity=".9"/>';
      o += '<path d="M-10 180 C 80 165, 120 110, 200 115 S 300 90, 340 70" stroke="' + p.vurgu2 + '" stroke-width="2" fill="none" opacity=".5" stroke-dasharray="5 4"/>';
      for (var i = 0; i < 7; i++) o += '<path d="M' + (i * 48 - 10) + ' 0 L' + (i * 48 + 30) + ' 200" stroke="' + p.cizgi + '" stroke-width="1" opacity=".35"/>';
      o += c(160, 70, 7, p.vurgu) + c(160, 70, 13, p.vurgu, .25);
      o += c(60, 128, 4, p.vurgu2);
      o += r(104, 132, 112, 34, p.kart, 9);
      o += t(130, 150, 13, p.yazi, 700, 'middle') + '128' + '</text>' + t(130, 160, 6, p.soluk, 400, 'middle') + 'KM</text>';
      o += t(190, 150, 13, p.yazi, 700, 'middle') + '4.2' + '</text>' + t(190, 160, 6, p.soluk, 400, 'middle') + 'SAAT</text>';
      o += r(112, 176, 96, 14, p.vurgu, 7);
      o += r(0, 0, A, 22, p.bar) + t(12, 14.5, 8, p.yazi, 700) + ad + '</text>';
      return svg(o, p.arka);
    },
    // Yönetim paneli
    panel: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(0, 22, 62, B - 22, p.bar);
      o += satirlar(10, 36, 42, 6, p.cizgi, 13);
      o += r(10, 36, 42, 6, p.vurgu, 3);
      var y = 34;
      o += r(74, y, 72, 40, p.kart, 6) + t(84, y + 24, 15, p.vurgu, 700) + '18' + '</text>';
      o += r(154, y, 72, 40, p.kart, 6) + t(164, y + 24, 15, p.yazi, 700) + '96%' + '</text>';
      o += r(234, y, 72, 40, p.kart, 6) + t(244, y + 24, 15, p.vurgu2, 700) + '3' + '</text>';
      o += r(74, 86, 232, 100, p.kart, 6);
      var h = [26, 44, 30, 62, 48, 76, 58, 84, 40, 68];
      for (var i = 0; i < h.length; i++) {
        o += r(86 + i * 22, 174 - h[i], 13, h[i], i % 3 === 0 ? p.vurgu : p.vurgu2, 2);
      }
      return svg(o, p.arka);
    },
    // Not defteri
    not: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(0, 22, 86, B - 22, p.bar);
      o += r(8, 32, 70, 12, p.kart, 3) + r(8, 50, 70, 12, p.kart, 3) + r(8, 68, 70, 12, p.vurgu, 3);
      o += satirlar(8, 90, 70, 5, p.cizgi, 11);
      o += r(98, 34, 150, 12, p.yazi, 3);
      o += satirlar(98, 58, 200, 8, p.cizgi, 13);
      o += r(98, 58, 200, 5, p.vurgu2, 2);
      o += r(250, 150, 56, 28, p.vurgu, 6);
      return svg(o, p.arka);
    },
    // Sohbet ve takvim
    takvim: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(12, 32, 140, 22, p.kart, 11) + r(20, 40, 90, 6, p.cizgi, 3);
      o += r(168, 62, 140, 22, p.vurgu, 11) + r(178, 70, 90, 6, p.arka, 3);
      o += r(12, 92, 120, 22, p.kart, 11) + r(20, 100, 70, 6, p.cizgi, 3);
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 3; j++) {
          var vur = (i === 3 && j === 1) || (i === 5 && j === 2);
          o += r(14 + i * 43, 126 + j * 24, 36, 18, vur ? p.vurgu : p.kart, 3);
        }
      }
      return svg(o, p.arka);
    },
    // Oyun
    oyun: function (p, ad) {
      var o = r(0, 0, A, B, p.arka);
      o += c(160, 100, 74, p.vurgu, .16) + c(160, 100, 56, p.vurgu, .3) + c(160, 100, 40, p.vurgu);
      o += t(160, 106, 20, p.arka, 700, 'middle') + 'ÇAY</text>';
      o += t(160, 34, 17, p.yazi, 700, 'middle') + '1.284.900</text>';
      o += t(160, 46, 7, p.soluk, 400, 'middle') + 'BARDAK</text>';
      for (var i = 0; i < 4; i++) o += r(232, 40 + i * 28, 74, 22, p.kart, 4) + r(240, 48 + i * 28, 40, 6, p.vurgu2, 3);
      for (var k = 0; k < 4; k++) o += r(14, 40 + k * 28, 74, 22, p.kart, 4) + r(22, 48 + k * 28, 34, 6, p.cizgi, 3);
      return svg(o, p.arka);
    },
    // Alışveriş
    ticaret: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(210, 5, 100, 12, p.kart, 6);
      for (var i = 0; i < 4; i++) {
        var x = 12 + i * 76;
        o += r(x, 34, 66, 84, p.kart, 5);
        o += r(x + 8, 42, 50, 44, p.cizgi, 3);
        o += r(x + 8, 92, 40, 6, p.yazi, 3);
        o += r(x + 8, 102, 26, 8, p.vurgu, 3);
      }
      o += r(12, 132, 296, 54, p.kart, 5);
      o += r(24, 146, 120, 8, p.yazi, 3) + r(24, 162, 80, 8, p.cizgi, 3);
      o += r(240, 152, 56, 20, p.vurgu, 10);
      return svg(o, p.arka);
    },
    // Randevu
    randevu: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(12, 34, 180, 152, p.kart, 6);
      for (var i = 0; i < 5; i++) for (var j = 0; j < 4; j++) {
        var s = (i === 2 && j === 1);
        o += r(22 + i * 34, 46 + j * 34, 28, 26, s ? p.vurgu : p.cizgi, 3);
      }
      o += r(204, 34, 104, 152, p.kart, 6);
      for (var k = 0; k < 5; k++) o += r(214, 46 + k * 28, 84, 20, k === 1 ? p.vurgu2 : p.cizgi, 4);
      return svg(o, p.arka);
    },
    // Sunucu ve izleme
    sunucu: function (p, ad) {
      var o = ustCubuk(p, ad);
      for (var i = 0; i < 5; i++) {
        var y = 34 + i * 30;
        o += r(12, y, 296, 24, p.kart, 4);
        o += c(26, y + 12, 5, i === 3 ? p.vurgu2 : p.vurgu);
        o += r(40, y + 8, 90, 7, p.cizgi, 3);
        o += r(150, y + 9, 100, 5, p.cizgi, 2);
        o += r(150, y + 9, (i * 17 + 30), 5, i === 3 ? p.vurgu2 : p.vurgu, 2);
        o += t(298, y + 15, 7, p.soluk, 400, 'end') + (i === 3 ? 'BEKLE' : 'AYAKTA') + '</text>';
      }
      return svg(o, p.arka);
    },
    // Sensör ve tarla
    sensor: function (p, ad) {
      var o = ustCubuk(p, ad);
      var e = [['NEM', '62%'], ['ISI', '24°'], ['SU', '18L']];
      for (var i = 0; i < 3; i++) {
        var cx = 60 + i * 100;
        o += '<circle cx="' + cx + '" cy="72" r="26" fill="none" stroke="' + p.cizgi + '" stroke-width="6"/>';
        o += '<circle cx="' + cx + '" cy="72" r="26" fill="none" stroke="' + (i === 1 ? p.vurgu2 : p.vurgu) + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + (100 + i * 20) + ' 400" transform="rotate(-90 ' + cx + ' 72)"/>';
        o += t(cx, 75, 11, p.yazi, 700, 'middle') + e[i][1] + '</text>';
        o += t(cx, 112, 7, p.soluk, 400, 'middle') + e[i][0] + '</text>';
      }
      o += r(12, 124, 296, 62, p.kart, 6);
      o += '<path d="M24 174 C 60 140, 80 178, 116 156 S 180 130, 220 158 S 274 176, 300 140" stroke="' + p.vurgu + '" stroke-width="3" fill="none"/>';
      return svg(o, p.arka);
    },
    // Ders yolu
    yol: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += '<path d="M60 190 C 140 170, 40 130, 120 106 S 220 70, 170 34" stroke="' + p.cizgi + '" stroke-width="10" fill="none" stroke-linecap="round"/>';
      var d = [[60, 186], [104, 150], [120, 106], [156, 74], [170, 38]];
      for (var i = 0; i < d.length; i++) {
        var bit = i < 3;
        o += c(d[i][0], d[i][1], 13, bit ? p.vurgu : p.kart) + c(d[i][0], d[i][1], 13, p.arka, bit ? 0 : .0);
        if (bit) o += t(d[i][0], d[i][1] + 4, 10, p.arka, 700, 'middle') + '✓</text>';
      }
      o += r(210, 40, 96, 26, p.kart, 5) + r(218, 50, 60, 7, p.vurgu2, 3);
      o += r(210, 76, 96, 26, p.kart, 5) + r(218, 86, 44, 7, p.cizgi, 3);
      o += r(210, 112, 96, 26, p.kart, 5) + r(218, 122, 70, 7, p.cizgi, 3);
      return svg(o, p.arka);
    },
    // El yazısı
    elyazisi: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(0, 22, A, B - 22, p.arka);
      for (var i = 0; i < 6; i++) o += r(24, 48 + i * 24, 272, 1, p.cizgi, 0);
      o += '<path d="M34 46 C 60 26, 74 62, 100 42 S 150 24, 176 48" stroke="' + p.vurgu + '" stroke-width="2.5" fill="none"/>';
      o += '<path d="M34 94 C 70 74, 90 108, 130 88 S 210 80, 250 96" stroke="' + p.yazi + '" stroke-width="2" fill="none"/>';
      o += '<path d="M34 142 C 62 128, 84 156, 118 140 S 170 132, 196 146" stroke="' + p.yazi + '" stroke-width="2" fill="none"/>';
      o += '<path d="M210 128 l 60 -34 l 14 12 l -60 34 z" fill="' + p.vurgu2 + '" opacity=".85"/>';
      return svg(o, p.arka);
    },
    // Seviye ve plan
    plan: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(12, 36, 296, 40, p.kart, 6);
      o += r(22, 52, 200, 8, p.cizgi, 4) + r(22, 52, 132, 8, p.vurgu, 4);
      o += t(298, 60, 9, p.yazi, 700, 'end') + 'B1</text>';
      var s = ['A1', 'A2', 'B1', 'B2', 'C1'];
      for (var i = 0; i < 5; i++) {
        var akt = i < 3;
        o += r(12 + i * 60, 92, 52, 52, akt ? p.vurgu : p.kart, 6);
        o += t(38 + i * 60, 123, 12, akt ? p.arka : p.soluk, 700, 'middle') + s[i] + '</text>';
      }
      o += r(12, 156, 296, 30, p.kart, 6) + r(22, 166, 150, 8, p.vurgu2, 3);
      return svg(o, p.arka);
    },
    // Kamera ile tespit
    kamera: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += r(12, 34, 176, 152, p.kart, 6);
      o += '<rect x="46" y="66" width="70" height="92" fill="none" stroke="' + p.vurgu + '" stroke-width="2.5" stroke-dasharray="8 5"/>';
      o += r(50, 116, 62, 38, p.vurgu, .0);
      o += r(50, 112, 62, 42, p.vurgu2, 2);
      o += t(56, 60, 8, p.vurgu, 700) + '%78 DOLU</text>';
      o += r(126, 66, 52, 92, p.cizgi, 3);
      o += r(204, 34, 104, 70, p.kart, 6);
      o += '<rect x="228" y="48" width="56" height="42" fill="' + p.yazi + '"/>';
      for (var i = 0; i < 6; i++) for (var j = 0; j < 6; j++) if ((i + j) % 2 === 0) o += r(232 + i * 8, 52 + j * 6, 6, 5, p.kart, 0);
      o += r(204, 116, 104, 70, p.kart, 6);
      o += satirlar(214, 130, 84, 4, p.cizgi, 13);
      return svg(o, p.arka);
    },
    // Sesli asistan
    ses: function (p, ad) {
      var o = ustCubuk(p, ad);
      o += c(160, 104, 46, p.vurgu, .12) + c(160, 104, 32, p.vurgu, .22) + c(160, 104, 20, p.vurgu);
      var yuk = [10, 22, 34, 20, 44, 28, 52, 30, 40, 18, 30, 12];
      for (var i = 0; i < yuk.length; i++) {
        o += r(24 + i * 8, 104 - yuk[i] / 2, 4, yuk[i], p.vurgu2, 2);
        o += r(216 + i * 8, 104 - yuk[yuk.length - 1 - i] / 2, 4, yuk[yuk.length - 1 - i], p.vurgu2, 2);
      }
      o += r(84, 168, 152, 18, p.kart, 9) + r(94, 174, 90, 6, p.cizgi, 3);
      return svg(o, p.arka);
    },
    // Ustanın mührü
    imza: function (p, ad) {
      var o = r(0, 0, A, B, p.arka);
      o += c(160, 96, 62, p.vurgu, .12) + c(160, 96, 46, p.vurgu, .2);
      o += '<circle cx="160" cy="96" r="46" fill="none" stroke="' + p.vurgu + '" stroke-width="2"/>';
      o += t(160, 106, 34, p.yazi, 700, 'middle') + 'DNZ</text>';
      o += t(160, 158, 8, p.soluk, 400, 'middle') + 'ANNO DOMINI MMXXVI</text>';
      o += r(96, 30, 128, 1, p.vurgu, 0) + r(96, 168, 128, 1, p.vurgu, 0);
      return svg(o, p.arka);
    },

    // Mutfak
    mutfak: function (p, ad) {
      var o = ustCubuk(p, ad);
      for (var i = 0; i < 3; i++) {
        var x = 12 + i * 100;
        o += r(x, 34, 92, 66, p.kart, 6);
        o += c(x + 46, 62, 18, p.vurgu, .35) + c(x + 46, 62, 11, p.vurgu2);
        o += r(x + 16, 86, 60, 6, p.cizgi, 3);
      }
      o += r(12, 112, 296, 74, p.kart, 6);
      o += r(24, 124, 120, 9, p.yazi, 3);
      o += satirlar(24, 144, 200, 3, p.cizgi, 12);
      o += r(244, 148, 52, 22, p.vurgu, 11);
      return svg(o, p.arka);
    }
  };

  // Eser adına göre şablon ve renk
  var kayit = {
    "Atlas":            { s: 'not',      p: pal('#0f1115', '#171a21', '#1f242e', '#e6e9ef', '#7c8698', '#4c8dff', '#8b5cf6') },
    "Atlas Mobil":      { s: 'not',      p: pal('#0f1115', '#171a21', '#1f242e', '#e6e9ef', '#7c8698', '#8b5cf6', '#4c8dff') },
    "Questigo":         { s: 'harita',   p: pal('#0a0a0f', '#12121a', '#1c1c28', '#f2f0ff', '#8a86a3', '#a855f7', '#22d3ee') },
    "Moto":             { s: 'harita',   p: pal('#0b0a08', '#141210', '#201d18', '#fdf6e8', '#9a9184', '#f97316', '#eab308') },
    "MotoKesif Sunucusu": { s: 'sunucu', p: pal('#08090c', '#101319', '#181d26', '#dfe6f2', '#7d8798', '#34d399', '#fbbf24') },
    "Notçu Sunucusu":   { s: 'sunucu',   p: pal('#08090c', '#101319', '#181d26', '#dfe6f2', '#7d8798', '#38bdf8', '#f472b6') },
    "Nöbetçi":          { s: 'sunucu',   p: pal('#0a0e14', '#111823', '#18212e', '#e2eaf5', '#7b8798', '#3b82f6', '#f59e0b') },
    "SeraSensor":       { s: 'sensor',   p: pal('#07110c', '#0e1b14', '#16281d', '#e8f5ec', '#7d9789', '#22c55e', '#38bdf8') },
    "Sekreter":         { s: 'takvim',   p: pal('#0d0c14', '#15141f', '#1e1c2b', '#eeecf7', '#84809a', '#6366f1', '#ec4899') },
    "Jarvis":           { s: 'ses',      p: pal('#08080a', '#101014', '#181820', '#e9eaf0', '#7e8090', '#06b6d4', '#a78bfa') },
    "KodYolu":          { s: 'yol',      p: pal('#0a0f0c', '#111a14', '#18261d', '#e9f6ee', '#7f9a8a', '#58cc02', '#ffc800') },
    "UniDefter":        { s: 'elyazisi', p: pal('#12100c', '#1b1813', '#2a251c', '#f6efe2', '#9b9080', '#f59e0b', '#ef4444') },
    "Defter":           { s: 'elyazisi', p: pal('#0f1115', '#171a21', '#242a35', '#eef1f6', '#828b9c', '#38bdf8', '#f472b6') },
    "Hazırlık":         { s: 'plan',     p: pal('#0b0d14', '#131725', '#1c2233', '#e8ecf7', '#7d859b', '#6366f1', '#22d3ee') },
    "AtıkTakip":        { s: 'kamera',   p: pal('#0a0f0d', '#121a17', '#1a2621', '#e6f2ed', '#7c9188', '#10b981', '#f43f5e') },
    "Mağaza":           { s: 'ticaret',  p: pal('#0d0b12', '#16131d', '#201c2b', '#f1eef7', '#867f99', '#f97316', '#8b5cf6') },
    "DNZ Dijital":      { s: 'panel',    p: pal('#08090d', '#101218', '#181b24', '#e9ecf4', '#7c8496', '#0ea5e9', '#a855f7') },
    "Randevu":          { s: 'randevu',  p: pal('#100c0c', '#1a1414', '#261d1d', '#f6eeee', '#9b8686', '#e11d48', '#f59e0b') },
    "Çay İmparatorluğu":{ s: 'oyun',     p: pal('#140d08', '#1f1610', '#2b1f16', '#fbeedd', '#a8907a', '#e8a33d', '#c2410c') },
    "M. Deniz":         { s: 'imza',     p: pal('#0d0b08', '#171209', '#241c10', '#f6ecd6', '#a2937a', '#c9a227', '#e3c765') },
    "Dolaptan Nefis Ziyafete": { s: 'mutfak', p: pal('#120e08', '#1d1710', '#282017', '#fdf3e3', '#a9917d', '#f59e0b', '#84cc16') }
  };

  function pal(arka, bar, kart, yazi, soluk, vurgu, vurgu2) {
    return { arka: arka, bar: bar, kart: kart, yazi: yazi, soluk: soluk, cizgi: kart, vurgu: vurgu, vurgu2: vurgu2 };
  }

  // Eserin kendi rengi: koridorun ışığı ve geçiş efektleri bunu kullanır.
  window.eserRengi = function (ad) {
    var k = kayit[ad];
    return k ? k.p : pal('#0b0b0f', '#141418', '#1e1e26', '#eceef4', '#7f8494', '#c9a227', '#e3c765');
  };

  window.eserCizimi = function (ad) {
    var k = kayit[ad];
    if (!k) k = { s: 'panel', p: pal('#0b0b0f', '#141418', '#1e1e26', '#eceef4', '#7f8494', '#c9a227', '#e3c765') };
    return sablon[k.s](k.p, ad);
  };
})();
