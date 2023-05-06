"use strict";

class Util {
  forEach(elements, handler) {
    elements = elements || [];
    for (let i = 0; i < elements.length; i++) handler(elements[i]);
  }
  getScrollTop() {
    return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
  }
  isMobile() {
    return window.matchMedia('only screen and (max-width: 680px)').matches;
  }
  isTocStatic() {
    return window.matchMedia('only screen and (max-width: 960px)').matches;
  }
  animateCSS(element, animation, reserved, callback) {
    if (!Array.isArray(animation)) animation = [animation];
    element.classList.add('animate__animated', ...animation);
    const handler = () => {
      element.classList.remove('animate__animated', ...animation);
      element.removeEventListener('animationend', handler);
      if (typeof callback === 'function') callback();
    };
    if (!reserved) element.addEventListener('animationend', handler, false);
  }
}
class Theme {
  constructor() {
    this.config = window.config;
    this.data = this.config.data;
    this.isDark = document.body.getAttribute('theme') === 'dark';
    this.util = new Util();
    this.newScrollTop = this.util.getScrollTop();
    this.oldScrollTop = this.newScrollTop;
    this.scrollEventSet = new Set();
    this.resizeEventSet = new Set();
    this.switchThemeEventSet = new Set();
    this.clickMaskEventSet = new Set();
    if (window.objectFitImages) objectFitImages();
  }
  initRaw() {
    this.util.forEach(document.querySelectorAll('[data-raw]'), $raw => {
      $raw.innerHTML = this.data[$raw.id];
    });
  }
  initSVGIcon() {
    this.util.forEach(document.querySelectorAll('[data-svg-src]'), $icon => {
      fetch($icon.getAttribute('data-svg-src')).then(response => response.text()).then(svg => {
        const $temp = document.createElement('div');
        $temp.insertAdjacentHTML('afterbegin', svg);
        const $svg = $temp.firstChild;
        $svg.setAttribute('data-svg-src', $icon.getAttribute('data-svg-src'));
        $svg.classList.add('icon');
        const $titleElements = $svg.getElementsByTagName('title');
        if ($titleElements.length) $svg.removeChild($titleElements[0]);
        $icon.parentElement.replaceChild($svg, $icon);
      }).catch(err => {
        console.error(err);
      });
    });
  }
  initMenuMobile() {
    const $menuToggleMobile = document.getElementById('menu-toggle-mobile');
    const $menuMobile = document.getElementById('menu-mobile');
    $menuToggleMobile.addEventListener('click', () => {
      document.body.classList.toggle('blur');
      $menuToggleMobile.classList.toggle('active');
      $menuMobile.classList.toggle('active');
    }, false);
    this._menuMobileOnClickMask = this._menuMobileOnClickMask || (() => {
      $menuToggleMobile.classList.remove('active');
      $menuMobile.classList.remove('active');
    });
    this.clickMaskEventSet.add(this._menuMobileOnClickMask);
  }
  initSwitchTheme() {
    this.util.forEach(document.getElementsByClassName('theme-switch'), $themeSwitch => {
      $themeSwitch.addEventListener('click', () => {
        if (document.body.getAttribute('theme') === 'dark') document.body.setAttribute('theme', 'light');else document.body.setAttribute('theme', 'dark');
        this.isDark = !this.isDark;
        window.localStorage && localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        for (let event of this.switchThemeEventSet) event();
      }, false);
    });
  }
  initSearch() {
    const searchConfig = this.config.search;
    const isMobile = this.util.isMobile();
    if (!searchConfig || isMobile && this._searchMobileOnce || !isMobile && this._searchDesktopOnce) return;
    const maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
    const snippetLength = searchConfig.snippetLength ? searchConfig.snippetLength : 50;
    const highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : 'em';
    const suffix = isMobile ? 'mobile' : 'desktop';
    const $header = document.getElementById("header-".concat(suffix));
    const $searchInput = document.getElementById("search-input-".concat(suffix));
    const $searchToggle = document.getElementById("search-toggle-".concat(suffix));
    const $searchLoading = document.getElementById("search-loading-".concat(suffix));
    const $searchClear = document.getElementById("search-clear-".concat(suffix));
    if (isMobile) {
      this._searchMobileOnce = true;
      $searchInput.addEventListener('focus', () => {
        document.body.classList.add('blur');
        $header.classList.add('open');
      }, false);
      document.getElementById('search-cancel-mobile').addEventListener('click', () => {
        $header.classList.remove('open');
        document.body.classList.remove('blur');
        document.getElementById('menu-toggle-mobile').classList.remove('active');
        document.getElementById('menu-mobile').classList.remove('active');
        $searchLoading.style.display = 'none';
        $searchClear.style.display = 'none';
        this._searchMobile && this._searchMobile.autocomplete.setVal('');
      }, false);
      $searchClear.addEventListener('click', () => {
        $searchClear.style.display = 'none';
        this._searchMobile && this._searchMobile.autocomplete.setVal('');
      }, false);
      this._searchMobileOnClickMask = this._searchMobileOnClickMask || (() => {
        $header.classList.remove('open');
        $searchLoading.style.display = 'none';
        $searchClear.style.display = 'none';
        this._searchMobile && this._searchMobile.autocomplete.setVal('');
      });
      this.clickMaskEventSet.add(this._searchMobileOnClickMask);
    } else {
      this._searchDesktopOnce = true;
      $searchToggle.addEventListener('click', () => {
        document.body.classList.add('blur');
        $header.classList.add('open');
        $searchInput.focus();
      }, false);
      $searchClear.addEventListener('click', () => {
        $searchClear.style.display = 'none';
        this._searchDesktop && this._searchDesktop.autocomplete.setVal('');
      }, false);
      this._searchDesktopOnClickMask = this._searchDesktopOnClickMask || (() => {
        $header.classList.remove('open');
        $searchLoading.style.display = 'none';
        $searchClear.style.display = 'none';
        this._searchDesktop && this._searchDesktop.autocomplete.setVal('');
      });
      this.clickMaskEventSet.add(this._searchDesktopOnClickMask);
    }
    $searchInput.addEventListener('input', () => {
      if ($searchInput.value === '') $searchClear.style.display = 'none';else $searchClear.style.display = 'inline';
    }, false);
    const initAutosearch = () => {
      const autosearch = autocomplete("#search-input-".concat(suffix), {
        hint: false,
        autoselect: true,
        dropdownMenuContainer: "#search-dropdown-".concat(suffix),
        clearOnSelected: true,
        cssClasses: {
          noPrefix: true
        },
        debug: true
      }, {
        name: 'search',
        source: (query, callback) => {
          $searchLoading.style.display = 'inline';
          $searchClear.style.display = 'none';
          const finish = results => {
            $searchLoading.style.display = 'none';
            $searchClear.style.display = 'inline';
            callback(results);
          };
          const search = () => {
            if (lunr.queryHandler) query = lunr.queryHandler(query);
            const results = {};
            this._index.search(query).forEach(_ref => {
              let {
                ref,
                matchData: {
                  metadata
                }
              } = _ref;
              const matchData = this._indexData[ref];
              let {
                uri,
                title,
                content: context
              } = matchData;
              if (results[uri]) return;
              let position = 0;
              Object.values(metadata).forEach(_ref2 => {
                let {
                  content
                } = _ref2;
                if (content) {
                  const matchPosition = content.position[0][0];
                  if (matchPosition < position || position === 0) position = matchPosition;
                }
              });
              position -= snippetLength / 5;
              if (position > 0) {
                position += context.substr(position, 20).lastIndexOf(' ') + 1;
                context = '...' + context.substr(position, snippetLength);
              } else {
                context = context.substr(0, snippetLength);
              }
              Object.keys(metadata).forEach(key => {
                title = title.replace(new RegExp("(".concat(key, ")"), 'gi'), "<".concat(highlightTag, ">$1</").concat(highlightTag, ">"));
                context = context.replace(new RegExp("(".concat(key, ")"), 'gi'), "<".concat(highlightTag, ">$1</").concat(highlightTag, ">"));
              });
              results[uri] = {
                'uri': uri,
                'title': title,
                'date': matchData.date,
                'context': context
              };
            });
            return Object.values(results).slice(0, maxResultLength);
          };
          if (!this._index) {
            fetch(searchConfig.lunrIndexURL).then(response => response.json()).then(data => {
              const indexData = {};
              this._index = lunr(function () {
                if (searchConfig.lunrLanguageCode) this.use(lunr[searchConfig.lunrLanguageCode]);
                this.ref('objectID');
                this.field('title', {
                  boost: 50
                });
                this.field('tags', {
                  boost: 20
                });
                this.field('categories', {
                  boost: 20
                });
                this.field('content', {
                  boost: 10
                });
                this.metadataWhitelist = ['position'];
                data.forEach(record => {
                  indexData[record.objectID] = record;
                  this.add(record);
                });
              });
              this._indexData = indexData;
              finish(search());
            }).catch(err => {
              console.error(err);
              finish([]);
            });
          } else finish(search());
        },
        templates: {
          suggestion: _ref3 => {
            let {
              title,
              date,
              context
            } = _ref3;
            return "<div><span class=\"suggestion-title\">".concat(title, "</span><span class=\"suggestion-date\">").concat(date, "</span></div><div class=\"suggestion-context\">").concat(context, "</div>");
          },
          empty: _ref4 => {
            let {
              query
            } = _ref4;
            return "<div class=\"search-empty\">".concat(searchConfig.noResultsFound, ": <span class=\"search-query\">\"").concat(query, "\"</span></div>");
          },
          footer: _ref5 => {
            let {} = _ref5;
            return "<div class=\"search-footer\">Search by <a href=\"https://lunrjs.com/\" rel=\"noopener noreffer\" target=\"_blank\">Lunr.js</a></div>";
          }
        }
      });
      autosearch.on('autocomplete:selected', (_event, suggestion, _dataset, _context) => {
        window.location.assign(suggestion.uri);
      });
      if (isMobile) this._searchMobile = autosearch;else this._searchDesktop = autosearch;
    };
    if (searchConfig.lunrSegmentitURL && !document.getElementById('lunr-segmentit')) {
      const script = document.createElement('script');
      script.id = 'lunr-segmentit';
      script.type = 'text/javascript';
      script.src = searchConfig.lunrSegmentitURL;
      script.async = true;
      if (script.readyState) {
        script.onreadystatechange = () => {
          if (script.readyState == 'loaded' || script.readyState == 'complete') {
            script.onreadystatechange = null;
            initAutosearch();
          }
        };
      } else {
        script.onload = () => {
          initAutosearch();
        };
      }
      document.body.appendChild(script);
    } else initAutosearch();
  }
  initDetails() {
    this.util.forEach(document.getElementsByClassName('details'), $details => {
      const $summary = $details.getElementsByClassName('details-summary')[0];
      $summary.addEventListener('click', () => {
        $details.classList.toggle('open');
      }, false);
    });
  }
  initHighlight() {
    this.util.forEach(document.querySelectorAll('.highlight > pre.chroma'), $preChroma => {
      const $chroma = document.createElement('div');
      $chroma.className = $preChroma.className;
      const $table = document.createElement('table');
      $chroma.appendChild($table);
      const $tbody = document.createElement('tbody');
      $table.appendChild($tbody);
      const $tr = document.createElement('tr');
      $tbody.appendChild($tr);
      const $td = document.createElement('td');
      $tr.appendChild($td);
      $preChroma.parentElement.replaceChild($chroma, $preChroma);
      $td.appendChild($preChroma);
    });
    this.util.forEach(document.querySelectorAll('.highlight > .chroma'), $chroma => {
      const $codeElements = $chroma.querySelectorAll('pre.chroma > code');
      if ($codeElements.length) {
        const $code = $codeElements[$codeElements.length - 1];
        const $header = document.createElement('div');
        $header.className = 'code-header ' + $code.className.toLowerCase();
        const $title = document.createElement('span');
        $title.classList.add('code-title');
        $title.insertAdjacentHTML('afterbegin', '<i class="arrow fas fa-chevron-right fa-fw" aria-hidden="true"></i>');
        $title.addEventListener('click', () => {
          $chroma.classList.toggle('open');
        }, false);
        $header.appendChild($title);
        const $ellipses = document.createElement('span');
        $ellipses.insertAdjacentHTML('afterbegin', '<i class="fas fa-ellipsis-h fa-fw" aria-hidden="true"></i>');
        $ellipses.classList.add('ellipses');
        $ellipses.addEventListener('click', () => {
          $chroma.classList.add('open');
        }, false);
        $header.appendChild($ellipses);
        const $copy = document.createElement('span');
        $copy.insertAdjacentHTML('afterbegin', '<i class="far fa-copy fa-fw" aria-hidden="true"></i>');
        $copy.classList.add('copy');
        const code = $code.innerText;
        if (this.config.code.maxShownLines < 0 || code.split('\n').length < this.config.code.maxShownLines + 2) $chroma.classList.add('open');
        if (this.config.code.copyTitle) {
          $copy.setAttribute('data-clipboard-text', code);
          $copy.title = this.config.code.copyTitle;
          const clipboard = new ClipboardJS($copy);
          clipboard.on('success', _e => {
            this.util.animateCSS($code, 'animate__flash');
          });
          $header.appendChild($copy);
        }
        $chroma.insertBefore($header, $chroma.firstChild);
      }
    });
  }
  initTable() {
    this.util.forEach(document.querySelectorAll('.content table'), $table => {
      const $wrapper = document.createElement('div');
      $wrapper.className = 'table-wrapper';
      $table.parentElement.replaceChild($wrapper, $table);
      $wrapper.appendChild($table);
    });
  }
  initHeaderLink() {
    for (let num = 1; num <= 6; num++) {
      this.util.forEach(document.querySelectorAll('.single .content > h' + num), $header => {
        $header.classList.add('headerLink');
        $header.insertAdjacentHTML('afterbegin', "<a href=\"#".concat($header.id, "\" class=\"header-mark\"></a>"));
      });
    }
  }
  initToc() {
    const $tocCore = document.getElementById('TableOfContents');
    if ($tocCore === null) return;
    if (document.getElementById('toc-static').getAttribute('data-kept') || this.util.isTocStatic()) {
      const $tocContentStatic = document.getElementById('toc-content-static');
      if ($tocCore.parentElement !== $tocContentStatic) {
        $tocCore.parentElement.removeChild($tocCore);
        $tocContentStatic.appendChild($tocCore);
      }
      if (this._tocOnScroll) this.scrollEventSet.delete(this._tocOnScroll);
    } else {
      const $tocContentAuto = document.getElementById('toc-content-auto');
      if ($tocCore.parentElement !== $tocContentAuto) {
        $tocCore.parentElement.removeChild($tocCore);
        $tocContentAuto.appendChild($tocCore);
      }
      const $toc = document.getElementById('toc-auto');
      const $page = document.getElementsByClassName('page')[0];
      const rect = $page.getBoundingClientRect();
      $toc.style.left = "".concat(rect.left + rect.width + 20, "px");
      $toc.style.maxWidth = "".concat($page.getBoundingClientRect().left - 20, "px");
      $toc.style.visibility = 'visible';
      const $tocLinkElements = $tocCore.querySelectorAll('a:first-child');
      const $tocLiElements = $tocCore.getElementsByTagName('li');
      const $headerLinkElements = document.getElementsByClassName('headerLink');
      const headerIsFixed = document.body.getAttribute('data-header-desktop') !== 'normal';
      const headerHeight = document.getElementById('header-desktop').offsetHeight;
      const TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
      const minTocTop = $toc.offsetTop;
      const minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
      this._tocOnScroll = this._tocOnScroll || (() => {
        const footerTop = document.getElementById('post-footer').offsetTop;
        const maxTocTop = footerTop - $toc.getBoundingClientRect().height;
        const maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
        if (this.newScrollTop < minScrollTop) {
          $toc.style.position = 'absolute';
          $toc.style.top = "".concat(minTocTop, "px");
        } else if (this.newScrollTop > maxScrollTop) {
          $toc.style.position = 'absolute';
          $toc.style.top = "".concat(maxTocTop, "px");
        } else {
          $toc.style.position = 'fixed';
          $toc.style.top = "".concat(TOP_SPACING, "px");
        }
        this.util.forEach($tocLinkElements, $tocLink => {
          $tocLink.classList.remove('active');
        });
        this.util.forEach($tocLiElements, $tocLi => {
          $tocLi.classList.remove('has-active');
        });
        const INDEX_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
        let activeTocIndex = $headerLinkElements.length - 1;
        for (let i = 0; i < $headerLinkElements.length - 1; i++) {
          const thisTop = $headerLinkElements[i].getBoundingClientRect().top;
          const nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;
          if (i == 0 && thisTop > INDEX_SPACING || thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING) {
            activeTocIndex = i;
            break;
          }
        }
        if (activeTocIndex !== -1) {
          $tocLinkElements[activeTocIndex].classList.add('active');
          let $parent = $tocLinkElements[activeTocIndex].parentElement;
          while ($parent !== $tocCore) {
            $parent.classList.add('has-active');
            $parent = $parent.parentElement.parentElement;
          }
        }
      });
      this._tocOnScroll();
      this.scrollEventSet.add(this._tocOnScroll);
    }
  }
  initMath() {
    if (this.config.math) renderMathInElement(document.body, this.config.math);
  }
  initComment() {
    if (this.config.comment) {
      if (this.config.comment.utterances) {
        const utterancesConfig = this.config.comment.utterances;
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.type = 'text/javascript';
        script.setAttribute('repo', utterancesConfig.repo);
        script.setAttribute('issue-term', utterancesConfig.issueTerm);
        if (utterancesConfig.label) script.setAttribute('label', utterancesConfig.label);
        script.setAttribute('theme', this.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme);
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.getElementById('utterances').appendChild(script);
        this._utterancesOnSwitchTheme = this._utterancesOnSwitchTheme || (() => {
          const message = {
            type: 'set-theme',
            theme: this.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme
          };
          const iframe = document.querySelector('.utterances-frame');
          iframe.contentWindow.postMessage(message, 'https://utteranc.es');
        });
        this.switchThemeEventSet.add(this._utterancesOnSwitchTheme);
      }
      if (this.config.comment.giscus) {
        const giscusConfig = this.config.comment.giscus;
        const giscusScript = document.createElement('script');
        giscusScript.src = 'https://giscus.app/client.js';
        giscusScript.type = 'text/javascript';
        giscusScript.setAttribute('data-repo', giscusConfig.repo);
        giscusScript.setAttribute('data-repo-id', giscusConfig.repoId);
        giscusScript.setAttribute('data-category', giscusConfig.category);
        giscusScript.setAttribute('data-category-id', giscusConfig.categoryId);
        giscusScript.setAttribute('data-lang', giscusConfig.lang);
        giscusScript.setAttribute('data-mapping', giscusConfig.mapping);
        giscusScript.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled);
        giscusScript.setAttribute('data-emit-metadata', giscusConfig.emitMetadata);
        giscusScript.setAttribute('data-input-position', giscusConfig.inputPosition);
        if (giscusConfig.lazyLoading) giscusScript.setAttribute('data-loading', 'lazy');
        giscusScript.setAttribute('data-theme', this.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme);
        giscusScript.crossOrigin = 'anonymous';
        giscusScript.async = true;
        document.getElementById('giscus').appendChild(giscusScript);
        this._giscusOnSwitchTheme = this._giscusOnSwitchTheme || (() => {
          const message = {
            setConfig: {
              theme: this.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme,
              reactionsEnabled: false
            }
          };
          const iframe = document.querySelector('iframe.giscus-frame');
          if (!iframe) return;
          iframe.contentWindow.postMessage({
            giscus: message
          }, 'https://giscus.app');
        });
        this.switchThemeEventSet.add(this._giscusOnSwitchTheme);
      }
    }
  }
  onScroll() {
    const $headers = [];
    if (document.body.getAttribute('data-header-desktop') === 'auto') $headers.push(document.getElementById('header-desktop'));
    if (document.body.getAttribute('data-header-mobile') === 'auto') $headers.push(document.getElementById('header-mobile'));
    if (document.getElementById('comments')) {
      const $viewComments = document.getElementById('view-comments');
      $viewComments.href = "#comments";
      $viewComments.style.display = 'block';
    }
    const $fixedButtons = document.getElementById('fixed-buttons');
    const ACCURACY = 20,
      MINIMUM = 100;
    window.addEventListener('scroll', () => {
      this.newScrollTop = this.util.getScrollTop();
      const scroll = this.newScrollTop - this.oldScrollTop;
      const isMobile = this.util.isMobile();
      this.util.forEach($headers, $header => {
        if (scroll > ACCURACY) {
          $header.classList.remove('animate__fadeInDown');
          this.util.animateCSS($header, ['animate__fadeOutUp', 'animate__faster'], true);
        } else if (scroll < -ACCURACY) {
          $header.classList.remove('animate__fadeOutUp');
          this.util.animateCSS($header, ['animate__fadeInDown', 'animate__faster'], true);
        }
      });
      if (this.newScrollTop > MINIMUM) {
        if (isMobile && scroll > ACCURACY) {
          $fixedButtons.classList.remove('animate__fadeIn');
          this.util.animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
        } else if (!isMobile || scroll < -ACCURACY) {
          $fixedButtons.style.display = 'block';
          $fixedButtons.classList.remove('animate__fadeOut');
          this.util.animateCSS($fixedButtons, ['animate__fadeIn', 'animate__faster'], true);
        }
      } else {
        if (!isMobile) {
          $fixedButtons.classList.remove('animate__fadeIn');
          this.util.animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
        }
        $fixedButtons.style.display = 'none';
      }
      for (let event of this.scrollEventSet) event();
      this.oldScrollTop = this.newScrollTop;
    }, false);
  }
  onResize() {
    window.addEventListener('resize', () => {
      if (!this._resizeTimeout) {
        this._resizeTimeout = window.setTimeout(() => {
          this._resizeTimeout = null;
          for (let event of this.resizeEventSet) event();
          this.initToc();
          this.initSearch();
        }, 100);
      }
    }, false);
  }
  onClickMask() {
    document.getElementById('mask').addEventListener('click', () => {
      for (let event of this.clickMaskEventSet) event();
      document.body.classList.remove('blur');
    }, false);
  }
  init() {
    try {
      this.initRaw();
      this.initSVGIcon();
      this.initMenuMobile();
      this.initSwitchTheme();
      this.initSearch();
      this.initDetails();
      this.initHighlight();
      this.initTable();
      this.initHeaderLink();
      this.initMath();
    } catch (err) {
      console.error(err);
    }
    window.setTimeout(() => {
      this.initToc();
      this.initComment();
      this.onScroll();
      this.onResize();
      this.onClickMask();
    }, 100);
  }
}
const themeInit = () => {
  const theme = new Theme();
  theme.init();
};
if (document.readyState !== 'loading') {
  themeInit();
} else {
  document.addEventListener('DOMContentLoaded', themeInit, false);
}
