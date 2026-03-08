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

### Yöntem 1: NPM Paketi Olarak Kurulum (Önerilen)

Başlamanın en kolay yolu:

```bash
# npm ile
npm install -D bunshelf

# bun ile
bun add -d bunshelf

# yarn ile
yarn add -D bunshelf
```

Ardından `bunx bunshelf` ile çalıştırın veya `package.json` dosyanıza script ekleyin.

### Yöntem 2: Depoyu Klonlama

Geliştirme veya özelleştirme için:

```bash
git clone https://github.com/speretta/bunshelf.git
cd bunshelf
bun install
```

## Proje Yapısı

Kurulumdan sonra projeniz şu şekilde görünmelidir:

```
my-docs/
├── docs/
│   ├── config.yaml         # Site yapılandırması
│   ├── en/                 # İngilizce içerik
│   │   ├── intro.md
│   │   └── getting-started/
│   └── tr/                 # Türkçe içerik
│       ├── intro.md
│       └── getting-started/
├── out/                    # Build çıktısı (statik site)
└── package.json
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
bunx bunshelf dev
```

Dokümantasyon siteniz `http://localhost:3000` adresinde kullanılabilir olacaktır.

### Mevcut Komutlar

| Komut | Açıklama |
|-------|----------|
| `bunx bunshelf dev` | Hot reload ile geliştirme sunucusunu başlat |
| `bunx bunshelf build` | Üretim için statik site oluştur |
| `bunx bunshelf preview` | Üretim build'ini yerel olarak önizle |
| `bunx bunshelf clean` | Build çıktı dizinini sil |
| `bunx bunshelf --help` | Yardım mesajını göster |
| `bunx bunshelf --version` | Sürüm numarasını göster |

### NPM Script'leri (İsteğe Bağlı)

`package.json` dosyanıza şu script'leri ekleyebilirsiniz:

```json
{
  "scripts": {
    "docs:dev": "bunshelf dev",
    "docs:build": "bunshelf build",
    "docs:preview": "bunshelf preview",
    "docs:clean": "bunshelf clean"
  }
}
```

Ardından `npm run docs:dev` veya `bun run docs:dev` ile çalıştırın.

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

::: tip İpucu
Paket kurulumu için `npm install` yerine `bun install` kullanın - çok daha hızlıdır! Bun, paketleri 20 kata kadar daha hızlı kurabilir!
:::

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
