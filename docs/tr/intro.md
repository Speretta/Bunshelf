---
title: Giriş
description: Bunshelf'e hoş geldiniz - hızlı ve modüler dokümantasyon oluşturucu
order: 1
---

<img src="/assets/images/logo.webp" alt="Bunshelf Logo" style="width: 120px; height: 120px; margin-bottom: 1.5rem;" />

# Giriş

{blue}Bunshelf{/}'e hoş geldiniz! {green}Bun.js{/} ile güçlendirilmiş hafif ve hızlı bir dokümantasyon sitesi oluşturucu.

## Bunshelf Nedir?

Bunshelf, sadelik ve performansı ön planda tutan geliştiriciler için tasarlanmış {accent}modern bir dokümantasyon oluşturucudur{/}. Docusaurus gibi ağır alternatiflerin aksine, React veya karmaşık build süreçleri gerektirmez. Sadece Markdown yazın ve güzel bir dokümantasyon sitesine kavuşun.

### Neden Bunshelf?

| Özellik | Bunshelf | Docusaurus | mdBook |
|---------|----------|------------|--------|
| Derleme Hızı | {green}Ultra Hızlı{/} | Yavaş | Hızlı |
| Bağımlılıklar | {green}Minimal{/} | Ağır | Minimal |
| Framework | Yok | React | Rust |
| i18n Desteği | {green}Yerleşik{/} | Eklenti | Manuel |
| JS Bundle | {green}~13KB{/} | ~300KB | ~0KB |
| Paket Boyutu | {green}~3.3MB{/} | ~100MB | ~20MB |

## Önemli Özellikler

### {accent}Şimşek Hızında{/}

Bun.js ile oluşturulmuş, olağanüstü performans:

- **Hot Reload**: Değişiklikler geliştirme sırasında anında görünür
- **Hızlı Build**: Statik siteler milisaniyeler içinde oluşturulur
- **Minimal Bundle**: Sadece ~113KB JavaScript

### {yellow}Modüler Mimari{/}

Anlaması ve genişletmesi kolay, temiz ve ayrılmış kod yapısı:

```
src/
├── core/           # Temel render mantığı
├── templates/      # HTML bileşenleri
├── markdown/       # Markdown ayrıştırma
├── themes/         # Tema sistemi
└── utils/          # Yardımcı araçlar
```

### {green}Uluslararasılaştırma{/}

Otomatik yerel algılama ile yerleşik i18n desteği:

```yaml
locales:
  - en
  - tr
  - de
  - fr
```

### {purple}Tema Sistemi{/}

Kutudan çıktığı gibi üç güzel tema:

- **Light** - Temiz, profesyonel görünüm
- **Dark** - Gözleri yormayan karanlık mod
- **Hacker** - Terminal ilhamlı yeşil on siyah

### {cyan}Zengin Markdown Uzantıları{/}

Özel söz dizimi ile geliştirilmiş Markdown:

- **Renkli Metin**: Satır içi vurgulama için `{renk}metin{/}` söz dizimi
- **Uyarı Blokları**: Not, ipucu, uyarı ve hata blokları
- **Söz Dizimi Vurgulama**: Dil desteği ile kod blokları
- **Özel Renkler**: Hex renk desteği `{#ff6b6b}metin{/}`

## Hızlı Örnek

Özel markdown söz dizimi ile neler yapabileceğinize bir bakın:

::: tip İpucu
Dokümanlarınızda önemli bilgileri vurgulamak için `{color}metin{/}` söz dizimini kullanın!
:::

## Uyarı Türleri

Farklı amaçlar için çeşitli uyarı türlerini destekliyoruz:

::: note Not
Bu, genel bilgiler için standart bir nottur.
:::

::: info Bilgi
Bağlamsal bilgiler için bilgi bloklarını kullanın.
:::

::: tip İpucu
İpuçları, en iyi uygulamaları ve kısayolları paylaşmak içindir.
:::

::: warning Uyarı
Uyarılar, kullanıcıları olası sorunlar hakkında bilgilendirir.
:::

::: error Hata
Hata blokları, dikkat gerektiren sorunları vurgular.
:::

::: danger Tehlike
Tehlike blokları, veri kaybına veya güvenlik sorunlarına neden olabilecek kritik uyarılar içindir.
:::

## Renkli Metin Örnekleri

Basit bir söz dizimi kullanarak metninize renk ekleyebilirsiniz:

- {red}Kırmızı metin{/} hatalar veya önemli uyarılar için
- {green}Yeşil metin{/} başarı mesajları için
- {blue}Mavi metin{/} bağlantılar veya vurgular için
- {yellow}Sarı metin{/} dikkat çekmek için
- {purple}Mor metin{/} özel bahsetmeler için
- {cyan}Camgöbeği metin{/} kod ile ilgili notlar için
- {orange}Turuncu metin{/} uyarılar için
- {pink}Pembe metin{/} vurgular için
- {gray}Gri metin{/} soluk içerik için

Ayrıca özel hex renkleri de kullanabilirsiniz: {#ff6b6b}Özel mercan rengi{/} veya {#4ecdc4}Turkuaz renk{/}.

## Kod Blokları

Dil seçimi ve kopyalama butonu ile söz dizimi vurgulama:

```typescript
import { parseMarkdown } from "./markdown/parser.js";
import { renderPage } from "./core/renderer/index.js";

const content = await Bun.file("docs/intro.md").text();
const html = parseMarkdown(content);

console.log(html);
```

```python
def greet(name: str) -> str:
    """Return a greeting message."""
    return f"Hello, {name}!"

print(greet("Dünya"))
```

## Başlarken

Dokümantasyon sitenizi oluşturmaya hazır mısınız?

1. **Kurulum** - Bunshelf'i makinenize kurun
2. **Yapılandırma** - Site ayarlarınızı özelleştirin
3. **Yazın** - Dokümantasyon içeriğinizi oluşturun
4. **Dağıtın** - Dokümanlarınızı dünyayla paylaşın

## Sonraki Adımlar

Başlamaya hazır mısınız? İlk dokümantasyon sitenizi kurmak için [Kurulum Rehberi](/tr/getting-started/installation)'ne göz atın.

::: info Yardım mı Lazım?
Katkılar, tartışmalar ve sorunlar için GitHub deposunu ziyaret edin.
:::
