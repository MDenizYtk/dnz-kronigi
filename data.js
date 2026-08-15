// Eserlerin kütüğü. Her tomarda bir kıvılcım, bir hikâye ve bir durum vardır.
// kivilcim: bu işi başlatan an. hikaye: neyi çözdüğü ve kime dokunduğu.
window.ESERLER = [
  {
    ad: "Atlas", lonca: "Kalem", rumuz: "Notların Şehri", yil: "2025", durum: "Canlı",
    adres: "https://atlasnot.com",
    kivilcim: "Aynı notu üç ayrı yerde arayıp hiçbirinde bulamamak.",
    hikaye: "Dersler, fikirler ve yapılacaklar üç ayrı uygulamaya dağılmıştı. Hepsini tek bir şehirde toplamak istedim: sayfalar sokak, bağlantılar cadde oldu. Bugün atlasnot.com adresinde ayakta duruyor ve her gün kullanıyorum.",
    baglanti: "atlasnot.com",
    etiket: ["Web", "Mobil", "Canlı"]
  },
  {
    ad: "Questigo", lonca: "Yol", rumuz: "Haritanın Efendisi", yil: "2025", durum: "Geliştiriliyor",
    adres: "http://localhost:4535",
    kivilcim: "Güzel bir rotayı arkadaşına anlatmaya çalışıp beceremeyince.",
    hikaye: "Motosikletle çıkılan bir yolun hikâyesi, telefondaki ham bir çizgiden ibaret kalıyordu. Questigo o çizgiyi anlatılabilir hale getiriyor: rota, hız, manzara ve o rotayı yürüyen insanlar. Motosikletçi de koşucu da bisikletçi de aynı haritada buluşuyor.",
    baglanti: "questigo.net",
    etiket: ["iOS", "Harita", "Topluluk"]
  },
  {
    ad: "Moto", lonca: "Yol", rumuz: "Demir At", yil: "2026", durum: "Geliştiriliyor",
    adres: "http://localhost:4536",
    kivilcim: "Her sporu tek uygulamaya sığdırmanın motorcuya haksızlık olması.",
    hikaye: "Motosiklet sürücüsünün derdi başkadır: yakıt, viraj, hava, mola. Bu yüzden Questigo'dan ayrı, sadece motosiklete adanmış bir kardeş uygulama çıktı. Aynı sunucuyu paylaşıyorlar ama Moto yalnız tek bir insanı düşünüyor: kaskın altındakini.",
    etiket: ["iOS", "Motosiklet"]
  },
  {
    ad: "MotoKesif Sunucusu", lonca: "Sur", rumuz: "Kalenin Temeli", yil: "2025", durum: "Canlı",
    kivilcim: "İki uygulamanın aynı veriyi iki kere saklamaya başlaması.",
    hikaye: "Görünmeyen ama olmazsa hiçbir şeyin yürümediği katman. Rotalar, hesaplar ve gruplar burada duruyor. Hetzner'daki bir sunucuda, kimsenin farkına varmadığı bir sessizlikle nöbet tutuyor. En iyi iltifat, kimsenin ondan söz etmemesi.",
    etiket: ["Node", "Sunucu", "Hetzner"]
  },
  {
    ad: "SeraSensor", lonca: "Toprak", rumuz: "Tarlanın Gözü", yil: "2026", durum: "Pilot",
    adres: "http://localhost:4602",
    kivilcim: "Bir çiftçinin tarlayı görmek için her sabah yola çıkması.",
    hikaye: "Toprağın nemini bilmeden sulamak, ya suyu ya ürünü israf etmek demek. Tarlaya konan LoRaWAN sensörleri toprağı dinliyor, panel de suyun ne zaman ve ne kadar açılacağını söylüyor. Amaç teknoloji göstermek değil, bir insanın kilometrelerce yolunu ve suyunu geri vermek.",
    etiket: ["IoT", "LoRaWAN", "SaaS"]
  },
  {
    ad: "Sekreter", lonca: "Kalem", rumuz: "Sadık Kâtip", yil: "2025", durum: "Canlı",
    adres: "http://localhost:4900",
    kivilcim: "Sesli mesajda konuşulan buluşmanın unutulup gitmesi.",
    hikaye: "Planlar konuşmaların içinde saklı kalıyor. Sekreter, ses kaydını ve yazışmayı dinleyip içinden takvimi çıkarıyor: kim, ne zaman, nerede. Ders programını da bildiği için boş saatlerin nereye denk geldiğini kendisi buluyor.",
    etiket: ["Yapay zeka", "Takvim", "Ses"]
  },
  {
    ad: "Jarvis", lonca: "Kalem", rumuz: "Duvardaki Ses", yil: "2025", durum: "Canlı",
    kivilcim: "Klavyeye uzanmadan bir şey sorabilmek isteği.",
    hikaye: "Menü çubuğunda duran, Türkçe konuşulunca Türkçe cevap veren bir asistan. Modeller kendi bilgisayarında çalışıyor, yani söylenenler odadan dışarı çıkmıyor. Yardım istemek için bir tuşa basmak yetiyor.",
    etiket: ["macOS", "Ses", "Yerel model"]
  },
  {
    ad: "KodYolu", lonca: "Kalem", rumuz: "Çıraklık Yolu", yil: "2026", durum: "Geliştiriliyor",
    adres: "http://localhost:4950",
    kivilcim: "Üniversitede dersi geçmek ile kod yazmayı öğrenmenin aynı şey olmaması.",
    hikaye: "Müfredat sırayla ilerliyor ama öğrenci pratiği bulamıyor. KodYolu müfredatı oyuna çeviriyor: on iki yol, her adımda küçük bir görev, sonunda gerçekten yazabilen bir el. Hesap ve senkron sayesinde telefonda kalınan yerden bilgisayarda devam ediliyor.",
    etiket: ["Eğitim", "Web", "iOS", "Android"]
  },
  {
    ad: "UniDefter", lonca: "Kalem", rumuz: "Talebe Tomarı", yil: "2026", durum: "Geliştiriliyor",
    kivilcim: "Aynı anda hem videoyu izleyip hem not tutmanın imkânsızlığı.",
    hikaye: "Mühendislik derslerinde anlatım bir yerde, defter başka yerde kalıyor. UniDefter ikisini yan yana koyuyor: solda ders videosu, sağda Apple Pencil ile yazılan sayfa. Sınav haftasında aranan not, ait olduğu dersin içinde duruyor.",
    etiket: ["iPad", "SwiftUI", "PencilKit"]
  },
  {
    ad: "Defter", lonca: "Kalem", rumuz: "Boş Sayfa", yil: "2025", durum: "Canlı",
    adres: "http://localhost:4540",
    kivilcim: "Bir fikri yazmak için uygulama indirmek zorunda kalmak.",
    hikaye: "Tarayıcıyı aç, yaz, kapat. Kurulum yok, hesap yok, bekleme yok. El yazısı doğrudan tarayıcının kendi sandığında kalıyor. Bazen en iyi araç, kendini unutturandır.",
    etiket: ["Web", "El yazısı"]
  },
  {
    ad: "Hazırlık", lonca: "Kalem", rumuz: "Lisan Pusulası", yil: "2026", durum: "Canlı",
    adres: "http://localhost:4990",
    kivilcim: "Hazırlık sınıfında bir yılın nasıl geçeceğini kimsenin söylememesi.",
    hikaye: "Seviyeni giriyorsun, ne kadar yolun kaldığını ve haftada kaç saatle biteceğini söylüyor. Belirsizlik en çok yoran şeydir; bu küçük araç belirsizliği takvime çeviriyor.",
    etiket: ["Web", "Planlama"]
  },
  {
    ad: "AtıkTakip", lonca: "Toprak", rumuz: "Şehrin Temizliği", yil: "2026", durum: "Geliştiriliyor",
    adres: "http://localhost:4700",
    kivilcim: "Dolmamış kutuyu boşaltmaya giden çöp kamyonu.",
    hikaye: "Kamera kutunun doluluğunu görüyor, sistem hangi kutunun gerçekten sıra beklediğini söylüyor. Karekod ile saha görevlisi kontrolü onaylıyor, panelde bütün şehir tek ekranda duruyor. Kazanan yakıt, zaman ve sokak.",
    etiket: ["Görüntü işleme", "Panel", "Karekod"]
  },
  {
    ad: "Nöbetçi", lonca: "Sur", rumuz: "Kule Bekçisi", yil: "2025", durum: "Canlı",
    adres: "http://localhost:4850",
    kivilcim: "Kendi sitenin çöktüğünü müşteriden öğrenmek.",
    hikaye: "Bütün siteleri ve sunucuları belirli aralıklarla yokluyor. Biri düşerse haber veriyor, Telegram borusu bunun için hazır bekliyor. Küçük bir panel ama gece rahat uyutuyor.",
    etiket: ["İzleme", "Panel", "Telegram"]
  },
  {
    ad: "Mağaza", lonca: "Çarşı", rumuz: "Tek Kişilik Pazar", yil: "2026", durum: "Tohum",
    kivilcim: "Küçük satıcının pazaryerine ödediği komisyon.",
    hikaye: "Trendyol tarzı bir vitrin ama tek kişinin yönetebileceği kadar sade. Ürün, sepet ve sipariş akışı hazır; ödeme kısmı bilerek sonraya bırakıldı. Amaç, kendi dükkânını kurmanın büyük bir ekip gerektirmediğini göstermek.",
    etiket: ["Next.js", "Prisma", "Ticaret"]
  },
  {
    ad: "DNZ Dijital", lonca: "Çarşı", rumuz: "Ustanın Dükkânı", yil: "2025", durum: "Canlı",
    adres: "http://localhost:4800",
    kivilcim: "Her müşteriye fiyatı tek tek anlatmaktan yorulmak.",
    hikaye: "Yapılan işler, fiyatlar ve randevu tek sayfada. Müşteri kendi gününü seçiyor, pazarlık yerine takvim konuşuyor. Fiyatlar tek bir dosyada durduğu için güncellemek beş saniye sürüyor.",
    etiket: ["Hizmet", "Randevu", "Satış"]
  },
  {
    ad: "Randevu", lonca: "Çarşı", rumuz: "Berber Kütüğü", yil: "2025", durum: "Satışa hazır",
    adres: "http://localhost:4750",
    kivilcim: "Berberin defterine kurşun kalemle yazdığı isimler.",
    hikaye: "Küçük esnafın randevusu hâlâ kâğıtta ve telefonda. Bu şablon o defteri ekrana taşıyor: gün, saat, müşteri ve iptal. Bir dükkâna kurulup teslim edilecek kadar hazır, on dakikada devreye giriyor.",
    etiket: ["Şablon", "Randevu", "Esnaf"]
  },
  {
    ad: "Dolaptan Nefis Ziyafete", lonca: "Toprak", rumuz: "Mutfak Simyası", yil: "2025", durum: "Geliştiriliyor",
    kivilcim: "Akşam altıda buzdolabını açıp öylece bakmak.",
    hikaye: "Elde ne varsa onunla yemek çıkarmak, tarif bulmaktan zordur. Uygulama malzemeleri alıp bu akşam yapılabilecek olanı öneriyor. Alışverişe çıkmadan, israf etmeden.",
    etiket: ["Web", "Mobil", "Yemek"]
  },
  {
    ad: "Çay İmparatorluğu", lonca: "Çarşı", rumuz: "Sonsuz Demlik", yil: "2025", durum: "Canlı",
    adres: "http://localhost:4650",
    kivilcim: "Bir öğleden sonrası ve şu soru: en sade oyun ne kadar bağımlılık yapar.",
    hikaye: "Tıkla, çay birikir; birikeni yatır, kendiliğinden demlenir. Kütüphane yok, tek bir dosyada saf JavaScript var. Yapılış amacı eğlenceydi ama en çok ders veren proje oldu: sadelik, oyunun kendisidir.",
    etiket: ["Oyun", "JavaScript"]
  },
  {
    ad: "Notçu Sunucusu", lonca: "Sur", rumuz: "Sessiz Hizmetkâr", yil: "2025", durum: "Canlı",
    kivilcim: "Notların yalnız tek bir cihazda kalması.",
    hikaye: "Not uygulamalarının arkasındaki taşıyıcı kat. Yazılan her satırı alıp diğer cihaza ulaştırıyor. Görünmeyen işlerin en iyi yanı, iyi çalıştığında kimsenin fark etmemesi.",
    etiket: ["Node", "Sunucu", "Senkron"]
  },
  {
    ad: "Atlas Mobil", lonca: "Kalem", rumuz: "Cepteki Şehir", yil: "2026", durum: "Geliştiriliyor",
    adres: "https://atlasnot.com",
    kivilcim: "Aklına gelen fikrin masaya oturana kadar kaçması.",
    hikaye: "Atlas'ın telefondaki hali. Yolda, otobüste, sırada beklerken açılıp iki satır yazmak için var. Aynı notlar, aynı bağlantılar, sadece avuç içine sığdırılmış hali.",
    etiket: ["Mobil", "Atlas", "Senkron"]
  }
];

window.LONCALAR = {
  "Kalem": "Yazı, not, öğrenme ve düşünce eserleri.",
  "Yol": "Harita, rota ve gezginlere ait olanlar.",
  "Sur": "Sunucular, izleme ve kalenin görünmeyen taşları.",
  "Çarşı": "Satış, randevu ve para kazandıran tezgâhlar.",
  "Toprak": "Tarla, şehir ve mutfak, yani maddi dünya."
};
