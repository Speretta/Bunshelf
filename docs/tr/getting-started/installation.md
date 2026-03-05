---
title: Kurulum
description: Bunshelf nasıl kurulur ve yapılandırılır
order: 1
---

# Kurulum

Bunshelf ile başlamak hızlı ve kolaydır. Dokümantasyon sitenizi kurmak için bu adımları izleyin.

## Ön Koşullar

Başlamadan önce sisteminizde {green}Bun{/} kurulu olduğundan emin olun:

```bash
bun --version
```

Bun yüklü değilse, çalıştırın:

```bash
curl -fsSL https://bun.sh/install | bash
```

::: info Bun Nedir?
Bun, Node.js'ten önemli ölçüde daha hızlı modern bir JavaScript çalışma zamanıdır. Kutudan çıktığı gibi paket yöneticisi, test koşucusu ve bundler içerir.
:::

## Kurulum Yöntemleri

### Yöntem 1: Depoyu Klonlama

Başlamanın en hızlı yolu:

```bash
git clone https://github.com/speretta/bunshelf.git
cd bunshelf
bun install
```

### Yöntem 2: Manuel Kurulum

Sıfırdan yeni bir proje oluşturun:

```bash
mkdir my-docs
cd my-docs
bun init
```

Bağımlılıkları yükleyin:

```bash
bun add markdown-it yaml front-matter fuse.js highlight.js
bun add -d @types/bun @types/markdown-it @types/highlight.js
```

::: tip İpucu
Paket kurulumu için `npm install` yerine `bun install` kullanın - çok daha hızlıdır! Bun, paketleri 20 kata kadar daha hızlı kurabilir!
:::

## Proje Yapısı

Kurulumdan sonra projeniz şu şekilde görünmelidir:

```
bunshelf/
├── src/
│   ├── core/
│   │   ├── constants/      # Varsayılan değerler, CDN URL'leri
│   │   └── renderer/       # Sayfa render mantığı
│   ├── templates/          # HTML bileşenleri
│   │   └── components/     # Navbar, sidebar vb.
│   ├── markdown/           # Markdown ayrıştırma
│   │   ├── parser.ts
│   │   ├── callouts.ts
│   │   └── colored-text.ts
│   ├── themes/             # Tema sistemi
│   ├── i18n/               # Çeviriler
│   ├── utils/              # Yardımcı araçlar
│   ├── server.ts           # Geliştirme sunucusu
│   └── ssg/                # Statik site oluşturucu
├── public/
│   └── assets/
│       ├── css/            # Stil dosyaları
│       ├── js/             # İstemci tarafı JS
│       └── images/         # Logo, ikonlar
├── docs/
│   ├── config.yaml         # Site yapılandırması
│   ├── en/                 # İngilizce içerik
│   └── tr/                 # Türkçe içerik
└── dist/                   # Build çıktısı
```

## Yapılandırma

Bir `docs/config.yaml` dosyası oluşturun:

```yaml
title: Dokümantasyonum
description: Harika dokümantasyon sitem
defaultLocale: tr
locales:
  - en
  - tr
theme:
  default: light
```

### Yapılandırma Seçenekleri

| Seçenek | Tür | Varsayılan | Açıklama |
|---------|-----|------------|----------|
| `title` | string | "Bunshelf" | Navbar'da görünen site başlığı |
| `description` | string | - | SEO için meta açıklaması |
| `defaultLocale` | string | "en" | Varsayılan dil kodu |
| `locales` | string[] | ["en"] | Mevcut yerel ayarların listesi |
| `theme.default` | string | "light" | Varsayılan tema (light/dark/hacker) |

## Geliştirme Sunucusunu Çalıştırma

Hot reload ile geliştirme sunucusunu başlatın:

```bash
bun run dev
```

Dokümantasyon siteniz `http://localhost:3000` adresinde kullanılabilir olacaktır.

### Mevcut Komutlar

| Komut | Açıklama |
|-------|----------|
| `bun run dev` | Hot reload ile geliştirme sunucusunu başlat |
| `bun run build` | Üretim için statik site oluştur |
| `bun run preview` | Üretim build'ini yerel olarak önizle |

::: warning Port Kullanımda
Eğer 3000 portu zaten kullanılıyorsa, farklı bir port belirtebilirsiniz:

```bash
PORT=3001 bun run dev
```
:::

## Kurulumu Doğrulama

1. Tarayıcınızı açın ve `http://localhost:3000` adresine gidin
2. Bunshelf logosu ile karşılama sayfasını görmelisiniz
3. `docs/tr/intro.md` dosyasını düzenlemeyi deneyin - değişiklikler anında görünmelidir

## Sorun Giderme

### Bulunamadı Hatası

"bun: command not found" hatası alırsanız:

```bash
# Bun'ı PATH'e ekleyin
export PATH="$HOME/.bun/bin:$PATH"

# Veya terminalinizi yeniden başlatın
source ~/.bashrc  # veya ~/.zshrc
```

### Port Zaten Kullanımda

```bash
# 3000 portunu neyin kullandığını bulun
lsof -i :3000

# İşlemi sonlandırın
kill -9 <PID>
```

### Modül Bulunamadı

```bash
# Bağımlılıkları yeniden yükleyin
rm -rf node_modules bun.lockb
bun install
```

## Sonraki Adımlar

Artık Bunshelf kurulu olduğuna göre, ilk dokümantasyon sayfalarınızı yazmayı öğrenmek için [Hızlı Başlangıç Rehberi](/tr/getting-started/quick-start)'ne geçin.

::: tip Sırada Ne Var?
- [Hızlı Başlangıç](/tr/getting-started/quick-start) - İlk sayfalarınızı oluşturun
- [Yapılandırma](/tr/advanced/configuration) - Sitenizi özelleştirin
- [Dağıtım](/tr/advanced/deployment) - Üretime dağıtın
:::
