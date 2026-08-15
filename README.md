# DNZ Kroniği

Yapılmış işlerin kütüğü. Yirmi uygulamayı ortaçağ temalı, aşağı kaydırdıkça
sonsuz yakınlaşan bir sahnede tanıtan tek sayfalık site.

Her eser bir nesne olarak gelir (telefon, motosiklet, çay bardağı, sera, sunucu
dolabı...), nesnenin ekranının içine girilir ve içeriden bir sonraki uygulama
çıkar. Koridorun rengi her eserde o uygulamanın paletine döner.

## Yapı

- `index.html` — sayfa iskeleti
- `style.css` — tüm görsel tanımlar
- `data.js` — eserlerin künyesi, kıvılcımı ve hikâyesi
- `cizim.js` — her uygulama için üretilen SVG ekran maketi
- `nesne.js` — eserlerin geldiği nesneler ve içlerindeki ekran boşluğu
- `app.js` — kaydırmaya bağlı yakınlaşma, kapı ve loncalar
- `hareket.js` — yükleme perdesi, imleç, belirme animasyonları, sayaçlar

Kütüphane kullanılmadı; saf HTML, CSS ve JavaScript.

## Yerelde çalıştırmak

```bash
python3 -m http.server 4560
```
