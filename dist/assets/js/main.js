window.copyCode = function(btn) {
  const codeBlock = btn.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    }, 2000);
  });
};

window.changeCodeLanguage = function(select) {
  const codeBlock = select.closest('.code-block');
  const code = decodeHtmlEntities(codeBlock.dataset.code);
  const lang = select.value;
  
  if (window.hljs && window.hljs.getLanguage(lang)) {
    try {
      const highlighted = window.hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
      codeBlock.querySelector('code').innerHTML = highlighted;
      codeBlock.querySelector('code').className = `hljs language-${lang}`;
      
      const lineCount = (code.match(/\n/g) || []).length + 1;
      const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join("");
      codeBlock.querySelector('.code-lines').innerHTML = lineNumbers;
    } catch (e) {
      console.error('Failed to highlight:', e);
    }
  }
};

function decodeHtmlEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

const themeIcons = {
  light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="5"></circle>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
  </svg>`,
  dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`,
  hacker: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>`
};

class ThemeManager {
  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.dropdown = document.getElementById("theme-dropdown");
    this.btn = document.getElementById("theme-toggle-btn");
    this.iconContainer = this.btn?.querySelector(".theme-icon-main");
    
    this.init();
  }
  
  getInitialTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }
  
  init() {
    this.applyTheme(this.currentTheme, false);
    
    this.btn?.addEventListener("click", () => this.toggleDropdown());
    
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const theme = btn.dataset.theme;
        if (theme) {
          this.setTheme(theme);
        }
      });
    });
    
    document.addEventListener("click", (e) => {
      if (!this.btn?.contains(e.target) && !this.dropdown?.contains(e.target)) {
        this.closeDropdown();
      }
    });
    
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.applyTheme(e.matches ? "dark" : "light", false);
      }
    });
  }
  
  applyTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (save) localStorage.setItem("theme", theme);
    this.currentTheme = theme;
    
    if (this.btn) {
      this.btn.dataset.theme = theme;
    }
    
    if (this.iconContainer && themeIcons[theme]) {
      this.iconContainer.innerHTML = themeIcons[theme];
    }
    
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.toggle("active", option.dataset.theme === theme);
    });
  }
  
  setTheme(theme) {
    this.applyTheme(theme);
    this.closeDropdown();
  }
  
  toggleDropdown() {
    this.dropdown?.classList.toggle("open");
  }
  
  closeDropdown() {
    this.dropdown?.classList.remove("open");
  }
}

class SearchManager {
  constructor() {
    this.input = document.getElementById("search-input");
    this.results = document.getElementById("search-results");
    this.fuse = null;
    this.debounceTimer = null;
    this.currentLang = window.LOCALE || "en";
    this.i18n = window.I18N || {};
    
    this.init();
  }
  
  setLanguage(locale) {
    this.currentLang = locale;
    this.initFuse();
    window.LOCALE = locale;
    
    if (this.input?.value.trim()) {
      this.search(this.input.value.trim());
    }
  }
  
  init() {
    this.initFuse();
    
    this.input?.addEventListener("input", () => this.handleInput());
    this.input?.addEventListener("focus", () => this.handleInput());
    
    document.addEventListener("click", (e) => {
      if (!this.input?.contains(e.target) && !this.results?.contains(e.target)) {
        this.closeResults();
      }
    });
    
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        this.input?.focus();
      }
      
      if (e.key === "Escape") {
        this.closeResults();
        this.input?.blur();
      }
    });
  }
  
  initFuse() {
    if (window.SEARCH_INDEX && window.Fuse) {
      const filteredIndex = window.SEARCH_INDEX.filter(item => item.locale === this.currentLang);
      this.fuse = new window.Fuse(filteredIndex, {
        keys: ["title", "content"],
        threshold: 0.3,
        includeMatches: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
        findAllMatches: true,
      });
    }
  }
  
  handleInput() {
    const query = this.input?.value.trim();
    
    if (!query) {
      this.closeResults();
      return;
    }
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      this.search(query);
    }, 150);
  }
  
  search(query) {
    this.initFuse();
    
    if (!this.fuse || !this.results) return;
    
    const matches = this.fuse.search(query, { limit: 8 });
    const noResultsText = this.i18n.search?.noResults || "No results found for";
    const resultsText = this.i18n.search?.results || "Results";
    
    if (matches.length === 0) {
      this.results.innerHTML = `<div class="search-empty">${noResultsText} "<strong>${this.escapeHtml(query)}</strong>"</div>`;
    } else {
      let html = `<div class="search-category">${resultsText}</div>`;
      
      matches.forEach((match) => {
        const item = match.item;
        const highlightedTitle = this.highlightMatch(item.title, query);
        const excerpt = this.createExcerpt(item.content, query, match.matches, 150);
        const highlightedExcerpt = this.highlightMatch(excerpt, query);
        
        html += `
          <a href="${item.href}" class="search-result-item">
            <div class="search-result-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>${highlightedTitle}</span>
            </div>
            <div class="search-result-excerpt">${highlightedExcerpt}</div>
          </a>
        `;
      });
      
      this.results.innerHTML = html;
    }
    
    this.openResults();
  }
  
  createExcerpt(content, query, matches, maxLength = 150) {
    if (!content) return "";
    
    const lowerContent = content.toLocaleLowerCase(this.currentLang);
    const lowerQuery = query.toLocaleLowerCase(this.currentLang);
    
    let matchIndex = lowerContent.indexOf(lowerQuery);
    
    if (matchIndex === -1 && matches) {
      for (const m of matches) {
        if (m.key === "content" && m.indices && m.indices.length > 0) {
          matchIndex = m.indices[0][0];
          break;
        }
      }
    }
    
    if (matchIndex === -1) {
      return content.slice(0, maxLength) + (content.length > maxLength ? "..." : "");
    }
    
    const contextStart = Math.max(0, matchIndex - 40);
    const contextEnd = Math.min(content.length, matchIndex + maxLength - 40);
    
    let excerpt = content.slice(contextStart, contextEnd);
    
    if (contextStart > 0) excerpt = "..." + excerpt;
    if (contextEnd < content.length) excerpt = excerpt + "...";
    
    return excerpt;
  }
  
  highlightMatch(text, query) {
    if (!query) return this.escapeHtml(text);
    
    const lowerText = text.toLocaleLowerCase(this.currentLang);
    const lowerQuery = query.toLocaleLowerCase(this.currentLang);
    
    if (!lowerText.includes(lowerQuery)) return this.escapeHtml(text);
    
    let result = "";
    let startIndex = 0;
    let index = lowerText.indexOf(lowerQuery, startIndex);
    
    while (index !== -1) {
      result += this.escapeHtml(text.substring(startIndex, index));
      result += `<mark>${this.escapeHtml(text.substring(index, index + lowerQuery.length))}</mark>`;
      startIndex = index + lowerQuery.length;
      index = lowerText.indexOf(lowerQuery, startIndex);
    }
    result += this.escapeHtml(text.substring(startIndex));
    
    return result;
  }
  
  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  openResults() {
    this.results?.classList.add("active");
  }
  
  closeResults() {
    this.results?.classList.remove("active");
  }
}

class SidebarManager {
  constructor() {
    this.sidebar = document.getElementById("sidebar");
    this.toggle = document.getElementById("sidebar-toggle");
    this.mobileToggle = document.getElementById("mobile-sidebar-toggle");
    
    this.init();
  }
  
  init() {
    this.toggle?.addEventListener("click", () => this.toggleSidebar());
    this.mobileToggle?.addEventListener("click", () => this.toggleSidebar());
    
    document.querySelectorAll(".sidebar-category-header").forEach((header) => {
      header.addEventListener("click", (e) => {
        const category = e.currentTarget.closest(".sidebar-category");
        category?.classList.toggle("collapsed");
      });
    });
    
    const activeLink = document.querySelector(".sidebar-link.active");
    if (activeLink) {
      const category = activeLink.closest(".sidebar-category");
      category?.classList.remove("collapsed");
    }
    
    requestAnimationFrame(() => {
      document.querySelectorAll(".sidebar-link.preload, .sidebar-category-header.preload").forEach((el) => {
        el.classList.remove("preload");
      });
    });
  }
  
  toggleSidebar() {
    this.sidebar?.classList.toggle("open");
  }
}

class LocaleSwitcher {
  constructor(searchManager) {
    this.searchManager = searchManager;
    this.container = document.querySelector(".locale-switcher");
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    this.container.querySelectorAll(".locale-segment").forEach((segment) => {
      segment.addEventListener("click", (e) => {
        e.preventDefault();
        const newLocale = segment.dataset.locale;
        const href = segment.getAttribute("href");
        
        this.container.querySelectorAll(".locale-segment").forEach((s) => {
          s.classList.remove("active");
        });
        segment.classList.add("active");
        
        this.container.dataset.currentLocale = newLocale;
        
        if (this.searchManager) {
          this.searchManager.setLanguage(newLocale);
        }
        
        setTimeout(() => {
          window.location.href = href;
        }, 150);
      });
    });
  }
}

let searchManagerInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  searchManagerInstance = new SearchManager();
  new ThemeManager();
  new SidebarManager();
  new LocaleSwitcher(searchManagerInstance);
  new KeyboardNav();
});

class KeyboardNav {
  constructor() {
    this.init();
  }
  
  init() {
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        return;
      }
      
      if (e.key === "ArrowLeft" && window.PREV_PAGE) {
        window.location.href = window.PREV_PAGE.href;
      }
      
      if (e.key === "ArrowRight" && window.NEXT_PAGE) {
        window.location.href = window.NEXT_PAGE.href;
      }
    });
  }
}
