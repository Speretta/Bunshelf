---
title: Yapılandırma
description: Bunshelf için tam yapılandırma referansı
order: 1
---

# Yapılandırma

Bu rehber, Bunshelf'te bulunan tüm yapılandırma seçeneklerini kapsar.

## Yapılandırma Dosyası

Ana yapılandırma `docs/config.yaml` dosyasındadır:

```yaml
title: Dokümanlarım
description: Dokümantasyon sitem
defaultLocale: tr
locales:
  - en
  - tr
theme:
  default: light
sidebar:
  tr:
    - label: Bölüm
      href: /bolum
```

## Yapılandırma Seçenekleri

### Site Meta Verileri

| Seçenek | Tür | Varsayılan | Açıklama |
|---------|-----|------------|----------|
| `title` | string | "Bunshelf" | Site başlığı |
| `description` | string | - | SEO için site açıklaması |
| `defaultLocale` | string | "en" | Varsayılan dil |
| `locales` | string[] | ["en"] | Kullanılabilir diller |

### Tema Yapılandırması

```yaml
theme:
  default: light  # light, dark veya hacker
```

::: tip İpucu
Kullanıcılar hala navbar'daki tema değiştiriciyi kullanarak temaları değiştirebilir. `default` seçeneği sadece başlangıç temasını belirler.
:::

### Sidebar Yapılandırması

Sidebar iç içe navigasyonu destekler:

```yaml
sidebar:
  tr:
    - label: Bölüm Başlığı
      collapsed: true
      items:
        - label: Sayfa Başlığı
          href: /sayfa-slug
```

#### Sidebar Öğesi Özellikleri

| Özellik | Tür | Açıklama |
|---------|-----|----------|
| `label` | string | Görüntülenecek metin |
| `href` | string | Bağlantı URL'si (bölümler için isteğe bağlı) |
| `items` | array | İç içe öğeler |
| `collapsed` | boolean | Daraltılmış başla |

## Özel Temalar

`public/assets/css/themes.css` dosyasındaki CSS değişkenlerini değiştirerek temaları özelleştirebilirsiniz:

```css
[data-theme="custom"] {
  --bg-primary: #arka-plan-renginiz;
  --text-primary: #metin-renginiz;
  --accent-primary: #vurgu-renginiz;
}
```

### Kullanılabilir CSS Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `--bg-primary` | Ana arka plan |
| `--bg-secondary` | İkincil arka plan (sidebar vb.) |
| `--text-primary` | Ana metin rengi |
| `--text-secondary` | İkincil metin |
| `--accent-primary` | Birincil vurgu rengi |
| `--border-color` | Kenarlık rengi |
| `--code-bg` | Kod bloğu arka planı |

## Ortam Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `PORT` | Sunucu portu (varsayılan: 3000) |

## Sayfa Frontmatter'ı

Her markdown sayfasının kendi yapılandırması olabilir:

```yaml
---
title: Sayfa Başlığı
description: Sayfa açıklaması
order: 1
sidebar_label: Özel Etiket
hide: false
---
```

::: warning Uyarı
Eğer `hide` `true` olarak ayarlanırsa, sayfa sidebar'da görünmez ancak doğrudan URL ile erişilebilir olmaya devam eder.
:::

## Gelişmiş Özelleştirme

### Özel CSS

`public/assets/css/` dizininde yeni CSS dosyaları oluşturarak ve bunları şablonunuza aktararak özel stiller ekleyin.

### Özel JS

`public/assets/js/main.js` dosyasını değiştirerek işlevselliği genişletin.

### Markdown Uzantıları

Özel söz dizimi veya eklentiler eklemek için `src/markdown/parser.ts` dosyasında markdown ayrıştırıcıyı genişletebilirsiniz.
