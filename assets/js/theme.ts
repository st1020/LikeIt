import type { default as FuseType } from "fuse.js";
import type { default as ClipboardJSType } from "clipboard";
import type { default as renderMathInElementType } from "katex/contrib/auto-render";
declare const ClipboardJS: typeof ClipboardJSType;
declare const autocomplete: any;
declare const Fuse: typeof FuseType;
declare const renderMathInElement: typeof renderMathInElementType;

interface Index {
  uri: string;
  title: string;
  date: string;
  content: string;
}

interface SearchIndex {
  uri: string;
  title: string;
  date: string;
  context: string;
}

interface Config {
  data?: { [index: string]: string };
  search?: any;
  code?: any;
  math?: any;
  mermaid?: any;
  comment?: any;
}

function getScrollTop() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

function isMobileWindow() {
  return window.matchMedia("only screen and (max-width: 680px)").matches;
}

function isTocStatic() {
  return window.matchMedia("only screen and (max-width: 960px)").matches;
}

function animateCSS(element: HTMLElement, animation: string | string[], reserved?: boolean, callback?: () => void) {
  if (!Array.isArray(animation)) animation = [animation];
  element.classList.add("animate__animated", ...animation);
  const handler = () => {
    element.classList.remove("animate__animated", ...animation);
    element.removeEventListener("animationend", handler);
    if (typeof callback === "function") callback();
  };
  if (!reserved) element.addEventListener("animationend", handler, false);
}

class Theme {
  config: Config;
  data: { [index: string]: string };
  isDark: boolean;
  newScrollTop: number;
  oldScrollTop: number;
  scrollEventSet: Set<() => void>;
  resizeEventSet: Set<() => void>;
  switchThemeEventSet: Set<() => void>;
  clickMaskEventSet: Set<() => void>;

  constructor() {
    // @ts-ignore
    this.config = window.config;
    this.data = this.config.data || {};
    this.isDark = document.body.getAttribute("theme") === "dark";
    this.newScrollTop = getScrollTop();
    this.oldScrollTop = this.newScrollTop;
    this.scrollEventSet = new Set();
    this.resizeEventSet = new Set();
    this.switchThemeEventSet = new Set();
    this.clickMaskEventSet = new Set();
  }

  initRaw() {
    document.querySelectorAll("[data-raw]").forEach(($raw) => {
      // @ts-ignore
      $raw.innerHTML = this.data[$raw.id];
    });
  }

  initSVGIcon() {
    document.querySelectorAll("[data-svg-src]").forEach(($icon) => {
      const svgSrc = $icon.getAttribute("data-svg-src")!;
      fetch(svgSrc)
        .then((response) => response.text())
        .then((svg) => {
          const $temp = document.createElement("div");
          $temp.insertAdjacentHTML("afterbegin", svg);
          const $svg = <HTMLElement>$temp.firstChild!;
          $svg.setAttribute("data-svg-src", svgSrc);
          $svg.classList.add("icon");
          const $titleElements = $svg.getElementsByTagName("title");
          if ($titleElements.length) $svg.removeChild($titleElements[0]);
          $icon.parentElement!.replaceChild($svg, $icon);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  _menuMobileOnClickMask?: () => void;
  initMenuMobile() {
    const $menuToggleMobile = document.getElementById("menu-toggle-mobile")!;
    const $menuMobile = document.getElementById("menu-mobile")!;
    $menuToggleMobile.addEventListener(
      "click",
      () => {
        document.body.classList.toggle("blur");
        $menuToggleMobile.classList.toggle("active");
        $menuMobile.classList.toggle("active");
      },
      false
    );
    this._menuMobileOnClickMask ??= () => {
      $menuToggleMobile.classList.remove("active");
      $menuMobile.classList.remove("active");
    };
    this.clickMaskEventSet.add(this._menuMobileOnClickMask);
  }

  initSwitchTheme() {
    Array.from(document.getElementsByClassName("theme-switch")).forEach(($themeSwitch) => {
      $themeSwitch.addEventListener(
        "click",
        () => {
          if (document.body.getAttribute("theme") === "dark") document.body.setAttribute("theme", "light");
          else document.body.setAttribute("theme", "dark");
          this.isDark = !this.isDark;
          window.localStorage && localStorage.setItem("theme", this.isDark ? "dark" : "light");
          for (const event of this.switchThemeEventSet) event();
        },
        false
      );
    });
  }

  _index?: FuseType<Index>;
  _searchMobileOnce?: boolean;
  _searchDesktopOnce?: boolean;
  _searchMobile?: any;
  _searchDesktop?: any;
  _searchDesktopOnClickMask?: () => void;
  _searchMobileOnClickMask?: () => void;
  initSearch() {
    const searchConfig = this.config.search;
    const isMobile = isMobileWindow();
    if (!searchConfig || (isMobile && this._searchMobileOnce) || (!isMobile && this._searchDesktopOnce)) return;

    const maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
    const highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : "em";

    const suffix = isMobile ? "mobile" : "desktop";
    const $header = document.getElementById(`header-${suffix}`)!;
    const $searchInput = <HTMLInputElement>document.getElementById(`search-input-${suffix}`)!;
    const $searchToggle = document.getElementById(`search-toggle-${suffix}`)!;
    const $searchLoading = document.getElementById(`search-loading-${suffix}`)!;
    const $searchClear = document.getElementById(`search-clear-${suffix}`)!;
    if (isMobile) {
      this._searchMobileOnce = true;
      $searchInput.addEventListener(
        "focus",
        () => {
          document.body.classList.add("blur");
          $header.classList.add("open");
        },
        false
      );
      document.getElementById("search-cancel-mobile")!.addEventListener(
        "click",
        () => {
          $header.classList.remove("open");
          document.body.classList.remove("blur");
          document.getElementById("menu-toggle-mobile")!.classList.remove("active");
          document.getElementById("menu-mobile")!.classList.remove("active");
          $searchLoading.style.display = "none";
          $searchClear.style.display = "none";
          this._searchMobile && this._searchMobile.autocomplete.setVal("");
        },
        false
      );
      $searchClear.addEventListener(
        "click",
        () => {
          $searchClear.style.display = "none";
          this._searchMobile && this._searchMobile.autocomplete.setVal("");
        },
        false
      );
      this._searchMobileOnClickMask ??= () => {
        $header.classList.remove("open");
        $searchLoading.style.display = "none";
        $searchClear.style.display = "none";
        this._searchMobile && this._searchMobile.autocomplete.setVal("");
      };
      this.clickMaskEventSet.add(this._searchMobileOnClickMask);
    } else {
      this._searchDesktopOnce = true;
      $searchToggle.addEventListener(
        "click",
        () => {
          document.body.classList.add("blur");
          $header.classList.add("open");
          $searchInput.focus();
        },
        false
      );
      $searchClear.addEventListener(
        "click",
        () => {
          $searchClear.style.display = "none";
          this._searchDesktop && this._searchDesktop.autocomplete.setVal("");
        },
        false
      );
      this._searchDesktopOnClickMask ??= () => {
        $header.classList.remove("open");
        $searchLoading.style.display = "none";
        $searchClear.style.display = "none";
        this._searchDesktop && this._searchDesktop.autocomplete.setVal("");
      };
      this.clickMaskEventSet.add(this._searchDesktopOnClickMask);
    }
    $searchInput.addEventListener(
      "input",
      () => {
        if ($searchInput.value === "") $searchClear.style.display = "none";
        else $searchClear.style.display = "inline";
      },
      false
    );

    const autosearch = autocomplete(
      `#search-input-${suffix}`,
      {
        hint: false,
        autoselect: true,
        dropdownMenuContainer: `#search-dropdown-${suffix}`,
        clearOnSelected: true,
        cssClasses: { noPrefix: true },
        debug: true,
      },
      {
        name: "search",
        source: (query: string, callback: (arg: SearchIndex[]) => void) => {
          $searchLoading.style.display = "inline";
          $searchClear.style.display = "none";
          const finish = (results: SearchIndex[]) => {
            $searchLoading.style.display = "none";
            $searchClear.style.display = "inline";
            callback(results);
          };
          const search = () => {
            const results: { [index: string]: SearchIndex } = {};
            this._index!.search(query).forEach(({ item, matches }) => {
              matches!.forEach(({ key, value, indices }) => {
                if (key == "title" || key == "content") {
                  let text = "";
                  let offset = 0;
                  indices.forEach((region) => {
                    const temp = region[1] + 1;
                    text +=
                      value!.substring(offset, region[0]) +
                      `<${highlightTag}>` +
                      value!.substring(region[0], temp) +
                      `</${highlightTag}>`;
                    offset = temp;
                  });
                  text += value!.substring(offset);
                  item[key] = text;
                }
              });
              results[item["uri"]] = {
                uri: item["uri"],
                title: item["title"],
                date: item["date"],
                context: item["content"],
              };
            });
            return Object.values(results).slice(0, maxResultLength);
          };
          if (!this._index) {
            fetch(searchConfig.indexURL)
              .then((response) => response.json())
              .then((data) => {
                console.log(searchConfig);
                this._index = new Fuse(data, {
                  isCaseSensitive: false,
                  includeMatches: true,
                  minMatchCharLength: 2,
                  shouldSort: true,
                  findAllMatches: false,
                  location: 0,
                  threshold: 0.1,
                  distance: 100,
                  ignoreLocation: true,
                  keys: ["title", "content"],
                  ...searchConfig.fuse,
                });
                finish(search());
              })
              .catch((err) => {
                console.error(err);
                finish([]);
              });
          } else finish(search());
        },
        templates: {
          suggestion: ({ title, date, context }: SearchIndex) =>
            `<div><span class="suggestion-title">${title}</span><span class="suggestion-date">${date}</span></div><div class="suggestion-context">${context}</div>`,
          empty: ({ query }: { query: string }) =>
            `<div class="search-empty">${searchConfig.noResultsFound}: <span class="search-query">"${query}"</span></div>`,
          footer: () =>
            `<div class="search-footer">Search by <a href="https://fusejs.io/" rel="noopener noreffer" target="_blank">Fuse.js</a></div>`,
        },
      }
    );
    autosearch.on("autocomplete:selected", (_event: any, suggestion: { uri: string | URL }) => {
      window.location.assign(suggestion.uri);
    });
    if (isMobile) this._searchMobile = autosearch;
    else this._searchDesktop = autosearch;
  }

  initDetails() {
    Array.from(document.getElementsByClassName("details")).forEach(($details) => {
      const $summary = $details.getElementsByClassName("details-summary")[0];
      const $content = <HTMLElement>$details.getElementsByClassName("details-content")[0];
      if ($details.classList.contains("open")) {
        $content.style.maxHeight = $content.scrollHeight + "px";
      }
      $summary.addEventListener(
        "click",
        () => {
          if ($details.classList.contains("open")) {
            $content.style.maxHeight = "";
          } else {
            $content.style.maxHeight = $content.scrollHeight + "px";
          }
          $details.classList.toggle("open");
        },
        false
      );
    });
  }

  initHighlight() {
    document.querySelectorAll(".code-wrapper").forEach(($codeWrapper) => {
      const $highlight = <HTMLElement>$codeWrapper.querySelectorAll(".highlight")[0];
      const $codeElements = <NodeListOf<HTMLElement>>$highlight.querySelectorAll("pre.chroma > code");
      if ($codeElements.length) {
        const $code = $codeElements[$codeElements.length - 1];
        const $header = document.createElement("div");
        $header.className = "code-header " + $code.className.toLowerCase();
        const $title = document.createElement("span");
        $title.classList.add("code-title");
        $title.insertAdjacentHTML("afterbegin", '<i class="arrow fas fa-chevron-right fa-fw" aria-hidden="true"></i>');
        $title.addEventListener(
          "click",
          () => {
            if ($codeWrapper.classList.contains("open")) {
              $highlight.style.maxHeight = "";
            } else {
              $highlight.style.maxHeight = $highlight.scrollHeight + "px";
            }
            $codeWrapper.classList.toggle("open");
          },
          false
        );
        $header.appendChild($title);
        const $ellipses = document.createElement("span");
        $ellipses.insertAdjacentHTML("afterbegin", '<i class="fas fa-ellipsis-h fa-fw" aria-hidden="true"></i>');
        $ellipses.classList.add("ellipses");
        $ellipses.addEventListener(
          "click",
          () => {
            $codeWrapper.classList.add("open");
          },
          false
        );
        $header.appendChild($ellipses);
        const $copy = document.createElement("span");
        $copy.insertAdjacentHTML("afterbegin", '<i class="far fa-copy fa-fw" aria-hidden="true"></i>');
        $copy.classList.add("copy");
        const code = $code.textContent ?? "";
        if (this.config.code.maxShownLines < 0 || code.split("\n").length < this.config.code.maxShownLines + 2) {
          $highlight.style.maxHeight = $highlight.scrollHeight + "px";
        } else {
          $codeWrapper.classList.remove("open");
        }
        if (this.config.code.copyTitle) {
          $copy.setAttribute("data-clipboard-text", code);
          $copy.title = this.config.code.copyTitle;
          const clipboard = new ClipboardJS($copy);
          clipboard.on("success", () => {
            animateCSS($code, "animate__flash");
          });
          $header.appendChild($copy);
        }
        $codeWrapper.insertBefore($header, $codeWrapper.firstChild);
      }
    });
  }

  initHeaderLink() {
    for (let num = 1; num <= 6; num++) {
      document.querySelectorAll(".single .content > h" + num).forEach(($header) => {
        $header.classList.add("headerLink");
        $header.insertAdjacentHTML("afterbegin", `<a href="#${$header.id}" class="header-mark"></a>`);
      });
    }
  }

  _tocOnScroll?: () => void;
  initToc() {
    const $tocCore = document.getElementById("TableOfContents");
    if ($tocCore === null) return;
    if (document.getElementById("toc-static")!.getAttribute("data-kept") || isTocStatic()) {
      const $tocContentStatic = document.getElementById("toc-content-static")!;
      if ($tocCore.parentElement !== $tocContentStatic) {
        $tocCore.parentElement!.removeChild($tocCore);
        $tocContentStatic.appendChild($tocCore);
      }
      if (this._tocOnScroll) this.scrollEventSet.delete(this._tocOnScroll);
    } else {
      const $tocContentAuto = document.getElementById("toc-content-auto")!;
      if ($tocCore.parentElement !== $tocContentAuto) {
        $tocCore.parentElement!.removeChild($tocCore);
        $tocContentAuto.appendChild($tocCore);
      }
      const $toc = document.getElementById("toc-auto")!;
      const $page = document.getElementsByClassName("page")[0];
      const rect = $page.getBoundingClientRect();
      $toc.style.left = `${rect.left + rect.width + 20}px`;
      $toc.style.maxWidth = `${$page.getBoundingClientRect().left - 20}px`;
      $toc.style.visibility = "visible";
      const $tocLinkElements = $tocCore.querySelectorAll("a:first-child");
      const $tocLiElements = $tocCore.getElementsByTagName("li");
      const $headerLinkElements = document.getElementsByClassName("headerLink");
      const headerIsFixed = document.body.getAttribute("data-header-desktop") !== "normal";
      const headerHeight = document.getElementById("header-desktop")!.offsetHeight;
      const TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
      const minTocTop = $toc.offsetTop;
      const minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
      this._tocOnScroll ??= () => {
        const footerTop = document.getElementById("post-footer")!.offsetTop;
        const maxTocTop = footerTop - $toc.getBoundingClientRect().height;
        const maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
        if (this.newScrollTop < minScrollTop) {
          $toc.style.position = "absolute";
          $toc.style.top = `${minTocTop}px`;
        } else if (this.newScrollTop > maxScrollTop) {
          $toc.style.position = "absolute";
          $toc.style.top = `${maxTocTop}px`;
        } else {
          $toc.style.position = "fixed";
          $toc.style.top = `${TOP_SPACING}px`;
        }

        $tocLinkElements.forEach(($tocLink) => {
          $tocLink.classList.remove("active");
        });
        Array.from($tocLiElements).forEach(($tocLi) => {
          $tocLi.classList.remove("has-active");
        });
        const INDEX_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
        let activeTocIndex = $headerLinkElements.length - 1;
        for (let i = 0; i < $headerLinkElements.length - 1; i++) {
          const thisTop = $headerLinkElements[i].getBoundingClientRect().top;
          const nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;
          if ((i == 0 && thisTop > INDEX_SPACING) || (thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING)) {
            activeTocIndex = i;
            break;
          }
        }
        if (activeTocIndex !== -1) {
          $tocLinkElements[activeTocIndex].classList.add("active");
          let $parent = $tocLinkElements[activeTocIndex].parentElement!;
          while ($parent !== $tocCore) {
            $parent.classList.add("has-active");
            $parent = $parent.parentElement!.parentElement!;
          }
        }
      };
      this._tocOnScroll();
      this.scrollEventSet.add(this._tocOnScroll);
    }
  }

  initMath() {
    if (this.config.math) renderMathInElement(document.body, this.config.math);
  }

  _mermaidReload?: () => void;
  initMermaid() {
    if (this.config.mermaid) {
      import(this.config.mermaid.source).then(({ default: mermaid }) => {
        this._mermaidReload ??= () => {
          const $mermaidElements = document.getElementsByClassName("mermaid");
          if ($mermaidElements.length) {
            mermaid.initialize({
              startOnLoad: false,
              theme: this.isDark ? "dark" : "default",
            });
            Array.from($mermaidElements).forEach(async ($mermaid) => {
              const { svg } = await mermaid.render("svg-" + $mermaid.id, this.data[$mermaid.id], $mermaid);
              $mermaid.innerHTML = svg;
            });
          }
        };
        this.switchThemeEventSet.add(this._mermaidReload);
        this.resizeEventSet.add(this._mermaidReload);
        this._mermaidReload();
      });
    }
  }

  _utterancesOnSwitchTheme?: () => void;
  _giscusOnSwitchTheme?: () => void;
  initComment() {
    if (this.config.comment) {
      if (this.config.comment.utterances) {
        const utterancesConfig = this.config.comment.utterances;
        const script = document.createElement("script");
        script.src = "https://utteranc.es/client.js";
        script.type = "text/javascript";
        script.setAttribute("repo", utterancesConfig.repo);
        script.setAttribute("issue-term", utterancesConfig.issueTerm);
        if (utterancesConfig.label) script.setAttribute("label", utterancesConfig.label);
        script.setAttribute("theme", this.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme);
        script.crossOrigin = "anonymous";
        script.async = true;
        document.getElementById("utterances")!.appendChild(script);
        this._utterancesOnSwitchTheme ??= () => {
          const message = {
            type: "set-theme",
            theme: this.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme,
          };
          const iframe = <HTMLIFrameElement>document.querySelector(".utterances-frame");
          if (iframe === null) return;
          iframe.contentWindow!.postMessage(message, "https://utteranc.es");
        };
        this.switchThemeEventSet.add(this._utterancesOnSwitchTheme);
      }

      if (this.config.comment.giscus) {
        const giscusConfig = this.config.comment.giscus;
        const giscusScript = document.createElement("script");
        giscusScript.src = "https://giscus.app/client.js";
        giscusScript.type = "text/javascript";
        giscusScript.setAttribute("data-repo", giscusConfig.repo);
        giscusScript.setAttribute("data-repo-id", giscusConfig.repoId);
        giscusScript.setAttribute("data-category", giscusConfig.category);
        giscusScript.setAttribute("data-category-id", giscusConfig.categoryId);
        giscusScript.setAttribute("data-lang", giscusConfig.lang);
        giscusScript.setAttribute("data-mapping", giscusConfig.mapping);
        giscusScript.setAttribute("data-reactions-enabled", giscusConfig.reactionsEnabled);
        giscusScript.setAttribute("data-emit-metadata", giscusConfig.emitMetadata);
        giscusScript.setAttribute("data-input-position", giscusConfig.inputPosition);
        if (giscusConfig.lazyLoading) giscusScript.setAttribute("data-loading", "lazy");
        giscusScript.setAttribute("data-theme", this.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme);
        giscusScript.crossOrigin = "anonymous";
        giscusScript.async = true;
        document.getElementById("giscus")!.appendChild(giscusScript);
        this._giscusOnSwitchTheme ??= () => {
          const message = {
            setConfig: {
              theme: this.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme,
              reactionsEnabled: false,
            },
          };
          const iframe = <HTMLIFrameElement>document.querySelector("iframe.giscus-frame");
          if (iframe === null) return;
          iframe.contentWindow!.postMessage({ giscus: message }, "https://giscus.app");
        };
        this.switchThemeEventSet.add(this._giscusOnSwitchTheme);
      }
    }
  }

  onScroll() {
    const $headers: HTMLElement[] = [];
    if (document.body.getAttribute("data-header-desktop") === "auto")
      $headers.push(document.getElementById("header-desktop")!);
    if (document.body.getAttribute("data-header-mobile") === "auto")
      $headers.push(document.getElementById("header-mobile")!);
    if (document.getElementById("comments")) {
      const $viewComments = <HTMLAnchorElement>document.getElementById("view-comments")!;
      $viewComments.href = `#comments`;
      $viewComments.style.display = "block";
    }
    const $fixedButtons = document.getElementById("fixed-buttons")!;
    const ACCURACY = 20;
    const MINIMUM = 100;
    window.addEventListener(
      "scroll",
      () => {
        this.newScrollTop = getScrollTop();
        const scroll = this.newScrollTop - this.oldScrollTop;
        const isMobile = isMobileWindow();
        $headers.forEach(($header) => {
          if (scroll > ACCURACY) {
            $header.classList.remove("animate__fadeInDown");
            animateCSS($header, ["animate__fadeOutUp", "animate__faster"], true);
          } else if (scroll < -ACCURACY) {
            $header.classList.remove("animate__fadeOutUp");
            animateCSS($header, ["animate__fadeInDown", "animate__faster"], true);
          }
        });
        if (this.newScrollTop > MINIMUM) {
          if (isMobile && scroll > ACCURACY) {
            $fixedButtons.classList.remove("animate__fadeIn");
            animateCSS($fixedButtons, ["animate__fadeOut", "animate__faster"], true);
          } else if (!isMobile || scroll < -ACCURACY) {
            $fixedButtons.style.display = "block";
            $fixedButtons.classList.remove("animate__fadeOut");
            animateCSS($fixedButtons, ["animate__fadeIn", "animate__faster"], true);
          }
        } else {
          if (!isMobile) {
            $fixedButtons.classList.remove("animate__fadeIn");
            animateCSS($fixedButtons, ["animate__fadeOut", "animate__faster"], true);
          }
          $fixedButtons.style.display = "none";
        }
        for (const event of this.scrollEventSet) event();
        this.oldScrollTop = this.newScrollTop;
      },
      false
    );
  }

  _resizeTimeout?: number;
  onResize() {
    window.addEventListener(
      "resize",
      () => {
        if (!this._resizeTimeout) {
          this._resizeTimeout = window.setTimeout(() => {
            this._resizeTimeout = undefined;
            for (const event of this.resizeEventSet) event();
            this.initToc();
            this.initSearch();
          }, 100);
        }
      },
      false
    );
  }

  onClickMask() {
    document.getElementById("mask")!.addEventListener(
      "click",
      () => {
        for (const event of this.clickMaskEventSet) event();
        document.body.classList.remove("blur");
      },
      false
    );
  }

  init() {
    try {
      this.initRaw();
      this.initSVGIcon();
      this.initMenuMobile();
      this.initSwitchTheme();
      this.initSearch();
      this.initHighlight();
      this.initDetails();
      this.initHeaderLink();
      this.initMath();
      this.initMermaid();
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

if (document.readyState !== "loading") {
  themeInit();
} else {
  document.addEventListener("DOMContentLoaded", themeInit, false);
}
