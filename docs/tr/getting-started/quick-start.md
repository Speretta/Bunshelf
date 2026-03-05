---
title: Hızlı Başlangıç
description: Bunshelf ile dakikalar içinde başlayın
order: 2
---

# Hızlı Başlangıç

Birkaç dakika içinde ilk dokümantasyon sayfanızı oluşturalım!

## İlk Sayfanızı Oluşturma

`docs/tr/` dizininde yeni bir markdown dosyası oluşturun:

```bash
touch docs/tr/ilk-sayfam.md
```

İçerik ekleyin:

```markdown
---
title: İlk Sayfam
description: İlk dokümantasyon sayfam
---

# İlk Sayfam

{blue}İlk dokümantasyon sayfama{/} hoş geldiniz!

## Özellikler

- Yazması kolay
- Hızlı render
- Varsayılan olarak güzel

::: tip İpucu
Tüm özel söz dizimi özelliklerini hemen kullanabilirsiniz!
:::
```

## Frontmatter Referansı

Her sayfanın üstünde frontmatter olabilir:

```yaml
---
title: Sayfa Başlığı
description: Kısa bir açıklama
order: 1
sidebar_label: Özel Etiket
hide: false
---
```

| Alan | Tür | Açıklama |
|------|-----|----------|
| `title` | string | Dokümanda gösterilen sayfa başlığı |
| `description` | string | SEO için meta açıklaması |
| `order` | number | Sidebar'daki sıralama (isteğe bağlı) |
| `sidebar_label` | string | Sidebar'da özel etiket |
| `hide` | boolean | Sidebar navigasyonundan gizle |

## Özel Markdown Söz Dizimi

### Renkli Metin

Basit bir söz dizimi ile vurgulama ekleyin:

```markdown
{red}Önemli hata mesajı{/}
{green}Başarılı! İşlem tamamlandı{/}
{blue}Detaylar için dokümantasyona bakın{/}
{#ff6b6b}Özel mercan rengi{/}
```

**Mevcut Renkler:**

| Söz Dizimi | Sonuç |
|------------|-------|
| `{red}metin{/}` | {red}Kırmızı metin{/} |
| `{green}metin{/}` | {green}Yeşil metin{/} |
| `{blue}metin{/}` | {blue}Mavi metin{/} |
| `{yellow}metin{/}` | {yellow}Sarı metin{/} |
| `{purple}metin{/}` | {purple}Mor metin{/} |
| `{cyan}metin{/}` | {cyan}Camgöbeği metin{/} |
| `{orange}metin{/}` | {orange}Turuncu metin{/} |
| `{pink}metin{/}` | {pink}Pembe metin{/} |
| `{gray}metin{/}` | {gray}Gri metin{/} |
| `{#hex}metin{/}` | Özel hex rengi |

### Uyarı Blokları

Farklı amaçlar için görsel olarak belirgin bloklar oluşturun:

```markdown
::: note Not
Genel bilgiler buraya gelir.
:::

::: tip İpucu
En iyi uygulamalar ve yararlı kısayollar.
:::

::: warning Uyarı
Dikkat edilmesi gereken olası sorunlar.
:::

::: error Hata
Dikkat gerektiren problemler.
:::
```

## Sidebar Yapılandırması

### Otomatik Oluşturulan Sidebar

Varsayılan olarak, sidebar klasör yapınızdan oluşturulur:

```
docs/tr/
├── intro.md           → /tr/intro
├── getting-started/
│   ├── installation.md
│   └── quick-start.md
└── advanced/
    └── configuration.md
```

### Manuel Sidebar Yapılandırması

Daha fazla kontrol için `docs/config.yaml` dosyasında yapılandırın:

```yaml
sidebar:
  tr:
    - label: Başlarken
      collapsed: false
      items:
        - label: Giriş
          href: /tr/intro
        - label: Kurulum
          href: /tr/getting-started/installation
        - label: Hızlı Başlangıç
          href: /tr/getting-started/quick-start
    - label: Gelişmiş
      items:
        - label: Yapılandırma
          href: /tr/advanced/configuration
```

#### Sidebar Öğesi Özellikleri

| Özellik | Tür | Açıklama |
|---------|-----|----------|
| `label` | string | Sidebar'da görünen metin |
| `href` | string | Bağlantı URL'si (bölüm başlıkları için isteğe bağlı) |
| `items` | array | İç içe navigasyon öğeleri |
| `collapsed` | boolean | Bölümü daraltılmış başlat (varsayılan: true) |

::: note Not
Sidebar yapılandırması belirttiğinizde, otomatik oluşturulan sidebar tamamen değiştirilir.
:::

## Yeni Dil Ekleme

1. `docs/` içinde yeni bir klasör oluşturun:

```bash
mkdir docs/de  # Almanca
```

2. Yerel ayarı `config.yaml` dosyasına ekleyin:

```yaml
locales:
  - en
  - tr
  - de
```

3. Çevrilmiş içerik oluşturun:

```bash
cp docs/tr/intro.md docs/de/intro.md
```

4. İçeriği çevirin ve frontmatter'ı güncelleyin.

## Üretim İçin Build

Statik site oluşturun:

```bash
bun run build
```

Çıktı `dist/` dizininde olacaktır:

```
dist/
├── index.html
├── tr/
│   ├── index.html
│   ├── intro/
│   │   └── index.html
│   └── getting-started/
│       ├── installation/
│       │   └── index.html
│       └── quick-start/
│           └── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── search-index.json
```

### Üretim Build'ini Önizleme

Üretim build'inizi yerel olarak test edin:

```bash
bun run preview
```

::: info Statik Site
Build süreci tamamen statik HTML dosyaları oluşturur. Sunucu tarafı render gerekmez - herhangi bir statik hosting servisine dağıtın!
:::

## Dağıtım Seçenekleri

### Vercel

```bash
vercel deploy dist
```

### Netlify

`dist/` klasörünü Netlify'a sürükleyip bırakın veya CLI kullanın:

```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages

`dist/` klasörünü `gh-pages` dalınıza push edin.

## Sırada Ne Var?

Artık temelleri bildiğinize göre:

- [Yapılandırma Rehberi](/tr/advanced/configuration) - Her yönüyle özelleştirin
- [Tema Özelleştirme](/tr/advanced/themes) - Özel temalar oluşturun
- [Dağıtım](/tr/advanced/deployment) - Üretime dağıtın

::: tip İpucu
Herhangi bir sayfayı hızlıca bulmak için navbar'daki arama özelliğini (Ctrl+K) kullanın!
:::
