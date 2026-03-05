---
title: Markdown Sözdizimi
description: Bunshelf'in genişletilmiş markdown sözdizimi rehberi
order: 1
---

# Markdown Sözdizimi

Bunshelf, standart Markdown'ı güzel dokümantasyon oluşturmak için güçlü özel özelliklerle genişletir.

## Standart Markdown

Tüm standart Markdown sözdizimi desteklenir:

```markdown
# Başlık 1
## Başlık 2
### Başlık 3

**Kalın metin** ve *italik metin*

- Sırasız liste
- Başka öğe

1. Sıralı liste
2. İkinci öğe

[Bağlantı metni](https://ornek.com)

![Resim alt](/dosya/yolu/resim.png)

> Alıntı

`satır içi kod`
```

## Renkli Metin

Basit bir sözdizimi ile görsel vurgu ekleyin:

### İsimlendirilmiş Renkler

```markdown
{red}Kırmızı metin{/}
{green}Yeşil metin{/}
{blue}Mavi metin{/}
{yellow}Sarı metin{/}
{purple}Mor metin{/}
{cyan}Camgöbeği metin{/}
{orange}Turuncu metin{/}
{pink}Pembe metin{/}
{gray}Gri metin{/}
{accent}Vurgu rengi{/}
```

**Sonuç:**

- {red}Kırmızı metin{/} - hatalar veya kritik uyarılar için
- {green}Yeşil metin{/} - başarı mesajları için
- {blue}Mavi metin{/} - bağlantılar ve vurgular için
- {yellow}Sarı metin{/} - uyarılar için
- {purple}Mor metin{/} - özel bahsetmeler için
- {cyan}Camgöbeği metin{/} - kod ile ilgili notlar için
- {orange}Turuncu metin{/} - uyarılar için
- {pink}Pembe metin{/} - vurgular için
- {gray}Gri metin{/} - soluk içerik için
- {accent}Vurgu rengi{/} - temanızla eşleşir

### Özel Hex Renkleri

Herhangi bir hex renk kodu kullanın:

```markdown
{#ff6b6b}Mercan renk{/}
{#4ecdc4}Turkuaz renk{/}
{#9b59b6}Mor renk{/}
```

**Sonuç:**

{#ff6b6b}Mercan renk{/} • {#4ecdc4}Turkuaz renk{/} • {#9b59b6}Mor renk{/}

## Uyarı Kutuları (Callouts)

Farklı amaçlar için görsel olarak ayrı bloklar oluşturun:

### Not

```markdown
::: note Not
Bu genel bilgiler için standart bir nottur.
:::
```

::: note Not
Bu genel bilgiler için standart bir nottur.
:::

### Bilgi

```markdown
::: info Bilgi
Yararlı bağlamsal bilgiler için bilgi bloklarını kullanın.
:::
```

::: info Bilgi
Yararlı bağlamsal bilgiler için bilgi bloklarını kullanın.
:::

### İpucu

```markdown
::: tip İpucu
En iyi uygulamalar ve kısayollar için ipuçları.
:::
```

::: tip İpucu
En iyi uygulamalar ve kısayollar için ipuçları.
:::

### Uyarı

```markdown
::: warning Uyarı
Uyarılar potansiyel sorunları bildirir.
:::
```

::: warning Uyarı
Uyarılar potansiyel sorunları bildirir.
:::

### Hata

```markdown
::: error Hata
Hata blokları dikkat edilmesi gereken sorunları vurgular.
:::
```

::: error Hata
Hata blokları dikkat edilmesi gereken sorunları vurgular.
:::

### Tehlike

```markdown
::: danger Tehlike
Tehlike blokları veri kaybına veya güvenlik sorunlarına neden olabilecek kritik uyarılar içindir.
:::
```

::: danger Tehlike
Tehlike blokları veri kaybına veya güvenlik sorunlarına neden olabilecek kritik uyarılar içindir.
:::

### Özel Başlık

Tüm uyarı kutuları özel başlıkları destekler:

```markdown
::: tip Klavye Kısayolu
Arama penceresini açmak için Ctrl+K tuşlarına basın.
:::
```

::: tip Klavye Kısayolu
Arama penceresini açmak için Ctrl+K tuşlarına basın.
:::

## Kod Blokları

### Temel Kod Bloğu

````markdown
```javascript
const greeting = "Merhaba Dünya!";
console.log(greeting);
```
````

```javascript
const greeting = "Merhaba Dünya!";
console.log(greeting);
```

### Desteklenen Diller

Bunshelf 30+ dil için sözdizimi vurgulamayı destekler:

| Dil | Takma Adlar |
|-----|-------------|
| JavaScript | `js`, `javascript` |
| TypeScript | `ts`, `typescript` |
| Python | `py`, `python` |
| Rust | `rust` |
| Go | `go` |
| Java | `java` |
| C | `c` |
| C++ | `cpp` |
| C# | `csharp` |
| Ruby | `rb`, `ruby` |
| PHP | `php` |
| Swift | `swift` |
| Kotlin | `kotlin` |
| Bash | `bash`, `sh`, `shell` |
| SQL | `sql` |
| HTML | `html` |
| CSS | `css`, `scss` |
| JSON | `json` |
| YAML | `yaml`, `yml` |
| Markdown | `markdown`, `md` |

### Kod Bloğu Özellikleri

Tüm kod blokları şunları içerir:

- {green}Satır numaraları{/} - kolay referans için
- {green}Dil seçici{/} - açılır menü
- {green}Kopyala butonu{/} - hızlı kopyalama için
- {green}Sözdizimi vurgulama{/} - okunabilirlik için

## Tablolar

Standart Markdown sözdizimi ile tablolar oluşturun:

```markdown
| Özellik | Durum | Öncelik |
|---------|-------|---------|
| Arama | Bitti | Yüksek |
| Temalar | Bitti | Orta |
| i18n | Bitti | Yüksek |
```

| Özellik | Durum | Öncelik |
|---------|-------|---------|
| Arama | Bitti | Yüksek |
| Temalar | Bitti | Orta |
| i18n | Bitti | Yüksek |

## Özellikleri Birleştirme

Uyarı kutuları içinde renkli metin kullanabilirsiniz:

```markdown
::: tip Önemli
Uyarı kutuları içinde önemli noktaları vurgulamak için {blue}renkli metin{/} kullanın!
:::
```

::: tip Önemli
Uyarı kutuları içinde önemli noktaları vurgulamak için {blue}renkli metin{/} kullanın!
:::

## En İyi Uygulamalar

### Uyarı Kutusu Kullanımı

| Tür | Kullanım Alanı |
|-----|---------------|
| `note` | Genel bilgiler, açıklamalar |
| `info` | Yardımcı bağlam, ek detaylar |
| `tip` | En iyi uygulamalar, kısayollar |
| `warning` | Potansiyel sorunlar |
| `error` | Yaygın hatalar |
| `danger` | Güvenlik riskleri, veri kaybı |

### Renkli Metin Kullanımı

- {red}Kırmızı{/} - Hatalar, kritik uyarılar
- {green}Yeşil{/} - Başarı, tamamlama
- {blue}Mavi{/} - Bağlantılar, referanslar
- {yellow}Sarı{/} - Dikkat gerektiren durumlar
- {accent}Vurgu{/} - Marka renkleri

::: tip İpucu
Renkli metni aşırı kullanmayın. Gerçekten önemli ve öne çıkması gereken bilgiler için saklayın.
:::
