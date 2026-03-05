---
title: Temalar
description: Dokümantasyonunuzu güzel temalarla özelleştirin
order: 2
---

# Temalar

Bunshelf kutudan çıktığı gibi üç güzel tema ile gelir ve bunları özelleştirebilir veya kendi temanızı oluşturabilirsiniz.

## Yerleşik Temalar

### Açık Tema (Light)

Temiz, profesyonel bir görünüm:

- Ana içerik için {blue}Beyaz arka plan{/}
- {gray}Açık gri kenar çubuğu{/}
- {blue}Mavi vurgu renkleri{/}
- {green}Gündüz okuma{/} için en iyi

### Koyu Tema (Dark)

Gözleri yormaz, geç kodlama için mükemmel:

- {purple}Koyu mavi arka plan{/}
- Azalmış göz yorgunluğu için daha yumuşak kontrast
- {blue}Daha parlak vurgu renkleri{/}
- {green}Düşük ışıklı ortamlar{/} için ideal

### Hacker Teması

Terminalden ilham alan yeşil üzerinde siyah:

- {green}Siyah arka plan{/}
- {green}Yeşil metin{/} ve vurgular
- Matrix tarzı estetik
- {green}Terminalleri seven geliştiriciler{/} için mükemmel

## Varsayılan Tema Ayarı

`docs/config.yaml` dosyasında varsayılan temayı yapılandırın:

```yaml
theme:
  default: light  # Seçenekler: light, dark, hacker
```

::: note Not
Kullanıcılar her zaman gezinme çubuğundaki geçiş düğmesini kullanarak temaları değiştirebilirler. `default` seçeneği sadece ilk temayı ayarlar.
:::

## Tema CSS Değişkenleri

Her tema CSS değişkenleri kullanılarak tanımlanır. İşte mevcut değişkenler:

```css
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f7f8fa;
  --text-primary: #1e293b;
  --accent-primary: #2563eb;
  --border-color: #e2e8f0;
}
```

### Değişken Referansı

| Değişken | Açıklama |
|----------|----------|
| `--bg-primary` | Ana içerik arka planı |
| `--bg-secondary` | Kenar çubuğu, kartlar arka planı |
| `--text-primary` | Ana metin rengi |
| `--text-secondary` | İkincil metin |
| `--accent-primary` | Birincil vurgu (butonlar, bağlantılar) |
| `--border-color` | Kenarlık rengi |
| `--code-bg` | Kod bloğu arka planı |

## Özel Tema

`public/assets/css/themes.css` dosyasına CSS değişkenleri ekleyerek özel bir tema oluşturun:

```css
[data-theme="ozel"] {
  --bg-primary: #1a1a2e;
  --text-primary: #eaeaea;
  --accent-primary: #e94560;
  --border-color: #0f3460;
}
```

## Otomatik Tema Algılama

Bunshelf kullanıcının sistem tercihini otomatik olarak algılar:

```javascript
// İlk ziyarette sistem tercihin kontrol eder
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Koyu tema kullanır
}
```

::: info Tema Kalıcılığı
Kullanıcının tema seçimi localStorage'a kaydedilir ve oturumlar arasında kalıcı olur.
:::

## Tema Geçişi

Kullanıcılar gezinme çubuğundaki açılır menüyü kullanarak temaları değiştirebilir:

1. Tema simgesine tıklayın (güneş/ay/terminal)
2. Tercih ettiğiniz temayı seçin
3. Seçim otomatik olarak kaydedilir
