---
title: Özelleştirme
description: Bunshelf için gelişmiş özelleştirme seçenekleri
order: 2
---

# Özelleştirme

Bunshelf'i markanıza ve gereksinimlerinize uyacak şekilde nasıl özelleştireceğinizi öğrenin.

## Logo

### Varsayılan Logo

Bunshelf varsayılan bir logo içerir. Kullanmak için yapılandırmada logo belirtmeyin.

### Özel Logo

`docs/config.yaml` dosyasına logonuzu ekleyin:

```yaml
title: Dokümanlarım
logo: /assets/images/benim-logom.webp
```

### Logo Gereksinimleri

| Format | Desteklenir |
|--------|-------------|
| WebP | {green}Önerilen{/} |
| PNG | {green}Evet{/} |
| SVG | {green}Evet{/} |
| ICO | {green}Favicon için{/} |

::: tip İpucu
En iyi sıkıştırma için WebP kullanın. Gezinme çubuğu için 32x32 ile 64x64 piksel boyutunda logo hedefleyin.
:::

### Logo Yerleştirme

1. Logonuzu `public/assets/images/` dizinine ekleyin:

```bash
cp benim-logom.webp public/assets/images/
```

2. Yapılandırmada referans verin:

```yaml
logo: /assets/images/benim-logom.webp
```

Logo şuralarda görünür:
- {green}Gezinme çubuğu{/} - Site başlığının yanında
- {green}Favicon{/} - Tarayıcı sekmesi simgesi

## Özel CSS

### Mevcut Stilleri Geçersiz Kılın

Özel bir CSS dosyası oluşturun:

```css
/* public/assets/css/custom.css */

.navbar {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.sidebar {
  width: 280px;
}

.doc-content {
  max-width: 900px;
}
```

### Yeni Stiller Ekleyin

Tamamen yeni stiller de ekleyebilirsiniz:

```css
/* Özel uyarı kutusu stilleri */
.my-custom-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
}
```

## Özel JavaScript

### İşlevselliği Genişletin

`public/assets/js/main.js` dosyasını değiştirin:

```javascript
// Özel klavye kısayolları ekleyin
document.addEventListener('keydown', (e) => {
  if (e.key === '?' && e.shiftKey) {
    showHelpModal();
  }
});

function showHelpModal() {
  // Özel modal mantığınız
}
```

## Tema Özelleştirme

### Mevcut Temayı Değiştirin

`public/assets/css/themes.css` dosyasını düzenleyin:

```css
[data-theme="light"] {
  --accent-primary: #marka-renginiz;
  --link-color: #marka-renginiz;
}
```

### Yeni Tema Oluşturun

Yeni bir tema girdisi ekleyin:

```css
[data-theme="marka"] {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-primary: #ff6b35;
  --link-color: #ff6b35;
}
```

## En İyi Uygulamalar

### Sürdürülebilirlik

- Özelleştirmeleri ayrı dosyalarda tutun
- Değişikliklerinizi yorumlayın
- Kolay tema oluşturma için CSS değişkenleri kullanın

### Yükseltilebilirlik

- Çekirdek dosyaları doğrudan değiştirmeyin
- Önce yapılandırma seçeneklerini kullanın
- Değişikliklerinizi takip edin

::: warning Uyarı
Bunshelf'i yükseltirken, `src/` dizinindeki özelleştirmelerinizin üzerine yazılabilir. Değişikliklerinizin yedeğini alın.
:::
