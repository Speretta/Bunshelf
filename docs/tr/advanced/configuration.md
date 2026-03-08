---
title: Yapılandırma
description: Bunshelf için tam yapılandırma referansı
order: 1
---

# Yapılandırma

Bu rehber, Bunshelf'te mevcut tüm yapılandırma seçeneklerini kapsar.

## Yapılandırma Dosyası

Ana yapılandırma `docs/config.yaml` dosyasındadır:

```yaml
title: Dokümanlarım
description: Dokümantasyon sitem
defaultLocale: tr
base: ""
logo: false
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
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
| `title` | string | "Bunshelf" | Gezinme çubuğunda görünen site başlığı |
| `description` | string | - | SEO için meta açıklama |
| `defaultLocale` | string | "en" | Varsayılan dil kodu |
| `locales` | object | { en: {} } | Dil yapılandırması (`indexPage` ve `localePrefix` ile) |
| `base` | string | "" | Alt dizin dağıtımı için temel URL yolu |
| `logo` | string \| false | - | Logo resmi yolu, veya varsayılan logo için `false` |

### Temel URL (Base)

Kök dizin dağıtımı için `base` seçeneği `""` (boş dize) olarak ayarlanmalıdır:

```yaml
base: ""
```

Alt dizin dağıtımı için (ör. GitHub Pages), depo adınızı yazın:

```yaml
base: /repo-adim
```

::: note Otomatik Tespit
GitHub Actions ile dağıtım yaparken, `base` URL'si `GITHUB_REPOSITORY` ortam değişkeninden otomatik olarak tespit edilir.
:::

### Logo Yapılandırması

Varsayılan Bunshelf logosunu kullanmak için `logo: false` ayarlayın:

```yaml
logo: false
```

Özel logo kullanmak için yolu belirtin:

```yaml
logo: /assets/images/benim-logom.webp
```

Özel logonuzu `public/assets/images/` dizinine yerleştirin.

### Locales Yapılandırması

`locales` seçeneği artık her dil için ayarları içeren object formatını kullanıyor:

```yaml
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
```

#### Dil Seçenekleri

| Seçenek | Tür | Varsayılan | Açıklama |
|---------|-----|------------|----------|
| `indexPage` | string | "/intro" | Bu dil için ana sayfa yolu |
| `localePrefix` | string | dil kodu | URL öneki (ör. `tr` yerine `turkish`) |

#### Varsayılan Davranış

- {green}Varsayılan dil{/} - URL öneki eklenmez (ör. `/intro`)
- {green}Diğer diller{/} - URL'de `localePrefix` kullanılır (ör. `/turkish/intro`)
- {green}Eksik ayarlar{/} - Uyarı gösterilir ve varsayılan değerler atanır

#### URL Yapısı Örneği

Bu yapılandırma ile:

```yaml
defaultLocale: en
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
```

URL'ler şu şekilde olur:
- İngilizce (varsayılan): `/intro`, `/getting-started/installation`
- Türkçe: `/turkish/intro`, `/turkish/getting-started/installation`

### Temel URL Yapılandırması

`base` seçeneği, bir alt dizine dağıtım yaparken (ör. GitHub Pages, GitLab Pages) gereklidir:

```yaml
# GitHub Pages için: https://kullanici.github.io/repo-adi/
base: /repo-adi

# GitLab Pages için: https://kullanici.gitlab.io/proje/
base: /proje

# Özel alan adı veya kök dağıtım için
base: ""
```

::: note Otomatik Tespit
GitHub Actions ile dağıtım yaparken, `base` URL'si `GITHUB_REPOSITORY` ortam değişkeninden {green}otomatik olarak tespit edilir{/}. GitHub Pages dağıtımları için `config.yaml` dosyasında manuel olarak ayarlamanıza gerek yoktur.
:::

::: tip Manuel Geçersiz Kılma
Otomatik tespiti geçersiz kılmak için `BASE_URL` ortam değişkenini ayarlayın:
```bash
BASE_URL=/ozel-yol bun run build
```
:::

#### Temel URL Önceliği

Bunshelf, temel URL'yi bu sırayla belirler:

1. {accent}`BASE_URL` ortam değişkeni{/} (en yüksek öncelik)
2. {accent}`GITHUB_REPOSITORY` ortam değişkeni{/} (GitHub Actions için)
3. {accent}`config.yaml`'da `base`{/}
4. Boş dize (varsayılan)

::: note Önemli
`base` seçeneği, tüm dahili bağlantıları, varlıkları ve gezinme URL'lerini otomatik olarak önekler. Bu, dokümantasyonunuzun bir alt dizinde barındırıldığında doğru çalışmasını sağlar.
:::

#### GitHub Pages Örneği

GitHub Pages dağıtımı için:

1. `config.yaml` dosyanıza `base` ekleyin:
   ```yaml
   base: /RepoAdiniz
   ```

2. Depo adı, `base` değeriyle eşleşmelidir (büyük/küçük harf duyarlı)

3. Tüm URL'ler otomatik olarak öneklenecektir:
   - Varlıklar: `/RepoAdiniz/assets/css/style.css`
   - Sayfalar: `/RepoAdiniz/intro`
   - Gezinme: `/RepoAdiniz/getting-started/installation`

### Tema Yapılandırması

```yaml
theme:
  default: light  # light, dark, veya hacker
```

::: tip İpucu
Kullanıcılar gezinme çubuğundaki tema geçişini kullanarak temaları değiştirebilirler. `default` seçeneği sadece ilk temayı ayarlar.
:::

### Logo Yapılandırması

Özel logonuzu ekleyin:

```yaml
logo: /assets/images/benim-logom.webp
```

Logo şuralarda görünür:
- {green}Gezinme çubuğu{/} - Site başlığının yanında
- {green}Favicon{/} - Tarayıcı sekmesi simgesi

Logonuzu `public/assets/images/` dizinine yerleştirin.

### Kenar Çubuğu Yapılandırması

Kenar çubuğu iç içe gezinmeyi destekler:

```yaml
sidebar:
  tr:
    - label: Bölüm Başlığı
      collapsed: true
      items:
        - label: Sayfa Başlığı
          href: /sayfa-slug
```

#### Kenar Çubuğu Öğe Özellikleri

| Özellik | Tür | Açıklama |
|---------|-----|----------|
| `label` | string | Görüntü metni |
| `href` | string | Bağlantı URL'si (bölümler için isteğe bağlı) |
| `items` | array | İç içe öğeler |
| `collapsed` | boolean | Daraltılmış başla |

## Tam Yapılandırma Örneği

```yaml
# Site meta verileri
title: Dokümantasyonum
description: Ürünümüz için kapsamlı bir rehber
defaultLocale: en
base: ""
logo: false
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
  de:
    indexPage: /intro
    localePrefix: german

# Tema ayarları
theme:
  default: light

# Türkçe kenar çubuğu
sidebar:
  tr:
    - label: Başlarken
      collapsed: false
      items:
        - label: Giriş
          href: /intro
        - label: Kurulum
          href: /getting-started/installation
        - label: Hızlı Başlangıç
          href: /getting-started/quick-start
    - label: Özellikler
      items:
        - label: Markdown Sözdizimi
          href: /features/markdown-syntax
        - label: Temalar
          href: /features/themes
        - label: Arama
          href: /features/search
        - label: Çoklu Dil Desteği
          href: /features/i18n
    - label: Gelişmiş
      items:
        - label: Yapılandırma
          href: /advanced/configuration
        - label: Özelleştirme
          href: /advanced/customization
```

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
| `LOG_LEVEL` | Günlük düzeyi (error, warn, info, debug) |

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

| Alan | Tür | Açıklama |
|------|-----|----------|
| `title` | string | Sayfa başlığı |
| `description` | string | SEO için meta açıklama |
| `order` | number | Kenar çubuğundaki sıralama |
| `sidebar_label` | string | Kenar çubuğunda özel etiket |
| `hide` | boolean | Kenar çubuğundan gizle |

::: warning Uyarı
`hide` `true` olarak ayarlanırsa, sayfa kenar çubuğunda görünmez ancak doğrudan URL ile erişilebilir.
:::

## Gelişmiş Özelleştirme

### Özel CSS

`public/assets/css/` dizininde yeni CSS dosyaları oluşturarak özel stiller ekleyin.

### Özel JS

`public/assets/js/main.js` dosyasını değiştirerek işlevselliği genişletin.

### Markdown Uzantıları

Özel söz dizimi veya eklentiler eklemek için `src/markdown/parser.ts` dosyasında markdown ayrıştırıcıyı genişletebilirsiniz.
