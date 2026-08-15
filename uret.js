// Arama motorları için statik içerik ve dosya üretici.
// Kullanım: node uret.js
// data.js'teki eserlerden index.html içine sabit metin, ayrıca sitemap ve
// yapılandırılmış veri üretir. JavaScript çalıştığında bu metnin yerini
// sancaklar alır; çalışmadığında da bütün eserler okunabilir kalır.
const fs = require('fs');

const ADRES = 'https://dnzdijital.work/';

global.window = {};
eval(fs.readFileSync('data.js', 'utf8'));
const eserler = global.window.ESERLER;
const loncalar = global.window.LONCALAR;

const kacis = (m) => String(m).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* 1) Loncalar bölümüne sabit içerik */
const statik = Object.keys(loncalar).map(function (ad) {
  const uyeler = eserler.filter((e) => e.lonca === ad);
  if (!uyeler.length) return '';
  return '<section class="statik-lonca">\n' +
    '  <h3>' + kacis(ad) + ' Loncası</h3>\n' +
    '  <p>' + kacis(loncalar[ad]) + '</p>\n' +
    uyeler.map((e) =>
      '  <article>\n' +
      '    <h4>' + kacis(e.ad) + ' — ' + kacis(e.rumuz) + '</h4>\n' +
      '    <p><strong>Kıvılcım:</strong> ' + kacis(e.kivilcim) + '</p>\n' +
      '    <p>' + kacis(e.hikaye) + '</p>\n' +
      '    <p><small>' + kacis(e.yil) + ' · ' + kacis(e.durum) + ' · ' + e.etiket.map(kacis).join(', ') + '</small></p>\n' +
      '  </article>\n').join('') +
    '</section>\n';
}).join('');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  /(<div class="sancaklar" id="guildGrid">)[\s\S]*?(<\/div>)/,
  '$1\n<!-- statik icerik: JavaScript calisinca yerini sancaklar alir -->\n' + statik + '$2'
);

/* 2) Yapılandırılmış veri */
const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': ADRES + '#kisi',
      name: 'M. Deniz',
      url: ADRES,
      email: 'mailto:mdenizytk@gmail.com',
      jobTitle: 'Yazılım geliştirici',
      knowsAbout: ['Web geliştirme', 'iOS uygulamaları', 'Yapay zeka', 'IoT', 'Node.js']
    },
    {
      '@type': 'CollectionPage',
      '@id': ADRES,
      name: 'DNZ Kroniği',
      inLanguage: 'tr',
      description: 'Yirmi uygulamanın kütüğü: her birinin doğuş hikâyesi ve ne işe yaradığı.',
      author: { '@id': ADRES + '#kisi' },
      hasPart: eserler.map((e) => ({
        '@type': 'SoftwareApplication',
        name: e.ad,
        alternateName: e.rumuz,
        description: e.hikaye,
        applicationCategory: e.etiket[0],
        dateCreated: e.yil,
        author: { '@id': ADRES + '#kisi' },
        url: (e.adres && e.adres.indexOf('localhost') === -1) ? e.adres : undefined
      }))
    }
  ]
};
const blok = '<script type="application/ld+json">\n' + JSON.stringify(jsonld, null, 1) + '\n</script>';
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/, '');
html = html.replace('</head>', blok + '\n</head>');
fs.writeFileSync('index.html', html);

/* 3) Site haritası ve robots */
const bugun = process.argv[2] || '2026-08-15';
fs.writeFileSync('sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  '  <url>\n    <loc>' + ADRES + '</loc>\n    <lastmod>' + bugun + '</lastmod>\n' +
  '    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n' +
  '</urlset>\n');

fs.writeFileSync('robots.txt',
  'User-agent: *\nAllow: /\n\nSitemap: ' + ADRES + 'sitemap.xml\n');

console.log('Hazır: index.html (statik içerik + yapılandırılmış veri), sitemap.xml, robots.txt');
