---
title: Arama
description: Fuse.js ile yerleşik tam metin arama
order: 3
---

# Arama

Bunshelf, {blue}Fuse.js{/} tarafından desteklenen güçlü tam metin arama özelliğini kutudan çıktığı gibi içerir.

## Nasıl Çalışır

### Arama İndeksi

Derleme sırasında, Bunshelf şunları içeren bir arama indeksi oluşturur:

- Sayfa başlıkları
- Sayfa içeriği (sadece metin, HTML yok)
- Sayfa alıntıları
- Dil bilgisi

### Bulanık Arama

Arama bulanık eşleştirme kullanır:

- {green}Yazım hatası toleransı{/} - "kurlum" "kurulum"u bulur
- {green}Kısmi eşleşme{/} - "ayar" "yapılandırma"yı bulur
- {green}Alaka sıralaması{/} - En iyi eşleşmeler önce görünür

## Aramayı Kullanma

### Klavye Kısayolu

Aramayı açmak için {accent}Ctrl+K{/} tuşlarına basın.

### Arama Çubuğu

Aramaya başlamak için gezinme çubuğundaki arama girdisine tıklayın.

### Sonuçlar

Arama sonuçları şunları gösterir:

1. Sayfa başlığı
2. Eşleşen metnin vurgulandığı içerik alıntısı
3. Sayfaya gitmek için tıklayın

## Performans

### İndeks Boyutu

Arama indeksi hafiftir:

- JSON formatı
- Sadece metin içeriği (HTML yok)
- Derleme sırasında sıkıştırılır

### İstemci Taraflı

Tüm arama tarayıcıda gerçekleşir:

- {green}Sunucu isteği gerekmez{/}
- Yazarken {green}anlık sonuçlar{/}
- İlk yüklemeden sonra {green}çevrimdışı çalışır{/}

## En İyi Uygulamalar

### Aranabilir İçerik Yazma

- Açıklayıcı başlıklar kullanın
- İlgili anahtar kelimeleri doğal olarak ekleyin
- Açık, öz açıklamalar yazın
- İçeriği yapılandırmak için başlıkları kullanın

::: info Not
Arama, ham markdown değil, işlenmiş metin içeriğini indeksler. Bu, HTML öğelerinin ve kod yorumlarının aranabilir olmadığı anlamına gelir.
:::
