---
weight: 1
title: "Theme Documentation - Basics"
date: 2020-03-06T21:29:01+08:00
lastmod: 2020-03-06T21:29:01+08:00
draft: false
author: "Dillon"
authorLink: "https://dillonzq.com"
description: "Discover what the Hugo - LikeIt theme is all about and the core-concepts behind it."
images: []
resources:
- name: "featured-image"
  src: "featured-image.jpg"

tags: ["installation", "configuration"]
categories: ["documentation"]

toc:
  auto: false
---

Discover what the Hugo - **LikeIt** theme is all about and the core-concepts behind it.

<!--more-->

## 1 Requirements

Thanks to the simplicity of Hugo, [Hugo](https://gohugo.io/) is the only dependency of this theme.

Just install latest version of [:(far fa-file-archive fa-fw): Hugo (> 0.62.0)](https://gohugo.io/getting-started/installing/) for your OS (**Windows**, **Linux**, **macOS**).

{{< admonition note "Why not support earlier versions of Hugo?" >}}
Since [Markdown Render Hooks](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks) was introduced in the [Hugo Christmas Edition](https://gohugo.io/news/0.62.0-relnotes/), this theme only supports Hugo versions above **0.62.0**.
{{< /admonition >}}

{{< admonition tip "Hugo extended version is needed" >}}
Since some features of this theme need to processes :(fab fa-sass fa-fw): SCSS to :(fab fa-css3 fa-fw): CSS, it needs to use Hugo **extended** version.
{{< /admonition >}}

## 2 Installation

The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you learn more about it by following this [great documentation for beginners](https://gohugo.io/getting-started/quick-start/).

### 2.1 Create Your Project

Hugo provides a `new` command to create a new website:

```bash
hugo new site my_website
cd my_website
```

### 2.2 Install the Theme

The **LikeIt** theme’s repository is: [https://github.com/st1020/LikeIt](https://github.com/st1020/LikeIt).

You can download the [latest release :(far fa-file-archive fa-fw): .zip file](https://github.com/st1020/LikeIt/releases) of the theme and extract it in the `themes` directory.

Alternatively, clone this repository to the `themes` directory:

```bash
git clone https://github.com/st1020/LikeIt.git themes/LikeIt
```

Or, create an empty git repository and make this repository a submodule of your site directory:

```bash
git init
git submodule add https://github.com/st1020/LikeIt.git themes/LikeIt
```

### 2.3 Basic Configuration {#basic-configuration}

The following is a basic configuration for the LikeIt theme:

```toml
baseURL = "http://example.org/"

# Change the default theme to be use when building the site with Hugo
theme = "LikeIt"

# website title
title = "My New Hugo Site"

# language code ["en", "zh-CN", "fr", "pl", ...]
languageCode = "en"
# language name ["English", "简体中文", "Français", "Polski", ...]
languageName = "English"

# Author config
[author]
  name = "xxxx"
  email = ""
  link = ""

# Menu config
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # you can add extra information before the name (HTML format is supported), such as icons
    pre = ""
    # you can add extra information after the name (HTML format is supported), such as icons
    post = ""
    name = "Posts"
    url = "/posts/"
    # title will be shown when you hover on this menu link
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "Tags"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "Categories"
    url = "/categories/"
    title = ""

# Markup related configuration in Hugo
[markup]
  # Syntax Highlighting (https://gohugo.io/content-management/syntax-highlighting)
  [markup.highlight]
    # false is a necessary configuration (https://github.com/dillonzq/LoveIt/issues/158)
    noClasses = false
```

{{< admonition >}}
When building the website, you can set a theme by using `--theme` option. However, we suggest you modify the configuration file (**config.toml**) and set the theme as the default.
{{< /admonition >}}

### 2.4 Create Your First Post

Here is the way to create your first post:

```bash
hugo new posts/first_post.md
```

Feel free to edit the post file by adding some sample content and replacing the title value in the beginning of the file.

{{< admonition >}}
By default all posts and pages are created as a draft. If you want to render these pages, remove the property `draft: true` from the metadata, set the property `draft: false` or add `-D`/`--buildDrafts` parameter to `hugo` command.
{{< /admonition >}}

### 2.5 Launching the Website Locally

Launch by using the following command:

```bash
hugo serve
```

Go to `http://localhost:1313`.

![Basic configuration preview](basic-configuration-preview.png "Basic configuration preview")

{{< admonition tip >}}
When you run `hugo serve`, when the contents of the files change, the page automatically refreshes with the changes.
{{< /admonition >}}

{{< admonition >}}
Since the theme use `.Scratch` in Hugo to implement some features,
it is highly recommended that you add `--disableFastRender` parameter to `hugo server` command for the live preview of the page you are editing.

```bash
hugo serve --disableFastRender
```
{{< /admonition >}}

### 2.6 Build the Website

When your site is ready to deploy, run the following command:

```bash
hugo
```

A `public` folder will be generated, containing all static content and assets for your website. It can now be deployed on any web server.

{{< admonition tip >}}
The website can be automatically published and hosted with [Netlify](https://www.netlify.com/) (Read more about [Automated HUGO deployments with Netlify](https://www.netlify.com/blog/2015/07/30/hosting-hugo-on-netlifyinsanely-fast-deploys/)).
Alternatively, you can use [AWS Amplify](https://gohugo.io/hosting-and-deployment/hosting-on-aws-amplify/), [Github pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/), [Render](https://gohugo.io/hosting-and-deployment/hosting-on-render/) and more...
{{< /admonition >}}

## 3 Configuration

### 3.1 Site Configuration {#site-configuration}

In addition to [Hugo global configuration](https://gohugo.io/overview/configuration/) and [menu configuration](#basic-configuration), **LikeIt** lets you define the following parameters in your site configuration (here is a `config.toml`, whose values are default).

Please open the code block below to view the complete sample configuration :(far fa-hand-point-down fa-fw)::

```toml
baseURL = "http://example.org/"

# Change the default theme to be use when building the site with Hugo
theme = "LikeIt"

# website title
title = "My New Hugo Site"

# language code ["en", "zh-CN", "fr", "pl", ...]
languageCode = "en"
# language name ["English", "简体中文", "Français", "Polski", ...]
languageName = "English"
# whether to include Chinese/Japanese/Korean
hasCJKLanguage = false

# default amount of posts in each pages
paginate = 12
# google analytics code [UA-XXXXXXXX-X]
googleAnalytics = ""
# copyright description used only for seo schema
copyright = ""

# whether to use robots.txt
enableRobotsTXT = true
# whether to use git commit log
enableGitInfo = true
# whether to use emoji code
enableEmoji = true

# ignore some build errors
ignoreErrors = ["error-remote-getjson", "error-missing-instagram-accesstoken"]

# Author config
[author]
  name = "xxxx"
  email = ""
  link = ""

# Menu config
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # you can add extra information before the name (HTML format is supported), such as icons
    pre = ""
    # you can add extra information after the name (HTML format is supported), such as icons
    post = ""
    name = "Posts"
    url = "/posts/"
    # title will be shown when you hover on this menu link
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "Tags"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "Categories"
    url = "/categories/"
    title = ""

[params]
  # site default theme ["auto", "light", "dark"]
  defaultTheme = "auto"
  # public git repo url only then enableGitInfo is true
  gitRepo = ""
  # which hash function used for SRI, when empty, no SRI is used
  # ["sha256", "sha384", "sha512", "md5"]
  fingerprint = ""
  # date format
  dateFormat = "2006-01-02"
  # website title for Open Graph and Twitter Cards
  title = "My cool site"
  # website description for RSS, SEO, Open Graph and Twitter Cards
  description = "This is my cool site"
  # website images for Open Graph and Twitter Cards
  images = ["/logo.png"]

  # Header config
  [params.header]
    # desktop header mode ["fixed", "normal", "auto"]
    desktopMode = "fixed"
    # mobile header mode ["fixed", "normal", "auto"]
    mobileMode = "auto"
    # Header title config
    [params.header.title]
      # URL of the LOGO
      logo = ""
      # title name
      name = ""
      # you can add extra information before the name (HTML format is supported), such as icons
      pre = ""
      # you can add extra information after the name (HTML format is supported), such as icons
      post = ""

  # Footer config
  [params.footer]
    enable = true
    # Custom content (HTML format is supported)
    custom = ''
    # whether to show Hugo and theme info
    hugo = true
    # whether to show copyright info
    copyright = true
    # whether to show the author
    author = true
    # Site creation time
    since = 2019
    # ICP info only in China (HTML format is supported)
    icp = ""
    # license info (HTML format is supported)
    license = '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'

  # Section (all posts) page config
  [params.section]
    # special amount of posts in each section page
    paginate = 20
    # date format (month and day)
    dateFormat = "01-02"
    # amount of RSS pages
    rss = 10

  # List (category or tag) page config
  [params.list]
    # special amount of posts in each list page
    paginate = 20
    # date format (month and day)
    dateFormat = "01-02"
    # amount of RSS pages
    rss = 10

  # App icon config
  [params.app]
    # optional site title override for the app when added to an iOS home screen or Android launcher
    title = "My cool site"
    # whether to omit favicon resource links
    noFavicon = false
    # modern SVG favicon to use in place of older style .png and .ico files
    svgFavicon = ""
    # Android browser theme color
    themeColor = "#ffffff"
    # Safari mask icon color
    iconColor = "#5bbad5"
    # Windows v8-10 tile color
    tileColor = "#da532c"

  # Search config
  [params.search]
    enable = true
    # max index length of the chunked content
    contentLength = 4000
    # placeholder of the search bar
    placeholder = ""
    # max number of results length
    maxResultLength = 10
    # HTML tag name of the highlight part in results
    highlightTag = "em"
    # whether to use the absolute URL based on the baseURL in search index
    absoluteURL = false

  # Home page config
  [params.home]
    # amount of RSS pages
    rss = 10
    # Home page profile
    [params.home.profile]
      enable = true
      # Gravatar Email for preferred avatar in home page
      gravatarEmail = ""
      # URL of avatar shown in home page
      avatarURL = "/images/avatar.png"
      # title shown in home page (HTML format is supported)
      title = ""
      # subtitle shown in home page (HTML format is supported)
      subtitle = "This is My New Hugo Site"
      # whether to show social links
      social = true
      # disclaimer (HTML format is supported)
      disclaimer = ""
    # Home page posts
    [params.home.posts]
      enable = true
      # special amount of posts in each home posts page
      paginate = 6
      # replaced with hiddenFromHomePage in params.page
      # default behavior when you don't set "hiddenFromHomePage" in front matter
      defaultHiddenFromHomePage = false

  # Social config about the author
  [params.social]
    GitHub = "xxxx"
    Linkedin = ""
    Twitter = "xxxx"
    Instagram = "xxxx"
    Facebook = "xxxx"
    Telegram = "xxxx"
    Medium = ""
    Gitlab = ""
    Youtubelegacy = ""
    Youtubecustom = ""
    Youtubechannel = ""
    Tumblr = ""
    Quora = ""
    Keybase = ""
    Pinterest = ""
    Reddit = ""
    Codepen = ""
    FreeCodeCamp = ""
    Bitbucket = ""
    Stackoverflow = ""
    Weibo = ""
    Odnoklassniki = ""
    VK = ""
    Flickr = ""
    Xing = ""
    Snapchat = ""
    Soundcloud = ""
    Spotify = ""
    Bandcamp = ""
    Paypal = ""
    Fivehundredpx = ""
    Mix = ""
    Goodreads = ""
    Lastfm = ""
    Foursquare = ""
    Hackernews = ""
    Kickstarter = ""
    Patreon = ""
    Steam = ""
    Twitch = ""
    Strava = ""
    Skype = ""
    Whatsapp = ""
    Zhihu = ""
    Douban = ""
    Angellist = ""
    Slidershare = ""
    Jsfiddle = ""
    Deviantart = ""
    Behance = ""
    Dribbble = ""
    Wordpress = ""
    Vine = ""
    Googlescholar = ""
    Researchgate = ""
    Mastodon = ""
    Thingiverse = ""
    Devto = ""
    Gitea = ""
    XMPP = ""
    Matrix = ""
    Bilibili = ""
    Discord = ""
    DiscordInvite = ""
    Lichess = ""
    ORCID = ""
    Pleroma = ""
    Kaggle = ""
    MediaWiki= ""
    HackTheBox = ""
    Phone = ""
    Email = "xxxx@xxxx.com"
    RSS = true 
  # Page global config
  [params.page]
    # whether to hide a page from home page
    hiddenFromHomePage = false
    # whether to hide a page from search results
    hiddenFromSearch = false
    # whether to enable twemoji
    twemoji = false
    # whether to enable the ruby extended syntax
    ruby = true
    # whether to enable the fraction extended syntax
    fraction = true
    # whether to enable the fontawesome extended syntax
    fontawesome = true
    # whether to show link to Raw Markdown content of the content
    linkToMarkdown = true
    # whether to show the full text content in RSS
    rssFullText = false
    # Table of the contents config
    [params.page.toc]
      # whether to enable the table of the contents
      enable = true
      # whether to keep the static table of the contents in front of the post
      keepStatic = true
      # whether to make the table of the contents in the sidebar automatically collapsed
      auto = true
    # mathematical formulas
    [params.page.math]
      enable = true
      # default inline delimiter is $ ... $ and \( ... \)
      inlineLeftDelimiter = ""
      inlineRightDelimiter = ""
      # default block delimiter is $$ ... $$, \[ ... \], \begin{equation} ... \end{equation} and some other functions
      blockLeftDelimiter = ""
      blockRightDelimiter = ""
      # KaTeX extension copy_tex
      copyTex = true
      # KaTeX extension mhchem
      mhchem = true
    # Code config
    [params.page.code]
      # whether to show the copy button of the code block
      copy = true
      # the maximum number of lines of displayed code by default
      maxShownLines = 50
    # Comment config
    [params.page.comment]
      enable = false
      # https://disqus.com/ comment config
      [params.page.comment.disqus]
        enable = false
        # Disqus shortname to use Disqus in posts
        shortname = ""
      # https://developers.facebook.com/docs/plugins/comments config
      [params.page.comment.facebook]
        enable = false
        width = "100%"
        numPosts = 10
        appId = ""
        # automatically adapt the current theme i18n configuration when empty
        languageCode = ""
      # config
      [params.page.comment.telegram]
        enable = false
        siteID = ""
        limit = 5
        height = ""
        color = ""
        colorful = true
        dislikes = false
        outlined = false
      # comment config
      [params.page.comment.commento]
        enable = false
      # comment config
      [params.page.comment.utterances]
        enable = false
        # owner/repo
        repo = ""
        issueTerm = "pathname"
        label = ""
        lightTheme = "github-light"
        darkTheme = "github-dark"
      # giscus comment config (https://giscus.app/)
      [params.page.comment.giscus]
        # You can refer to the official documentation of giscus to use the following configuration.
        enable = false
        repo = ""
        repoId = ""
        category = "Announcements"
        categoryId = ""
        # automatically adapt the current theme i18n configuration when empty
        lang = ""
        mapping = "pathname"
        reactionsEnabled = "1"
        emitMetadata = "0"
        inputPosition = "bottom"
        lazyLoading = false
        lightTheme = "light"
        darkTheme = "dark"
    # Third-party library config
    [params.page.library]
      [params.page.library.css]
        # someCSS = "some.css"
        # located in "assets/"
        # Or
        # someCSS = "https://cdn.example.com/some.css"
      [params.page.library.js]
        # someJavascript = "some.js"
        # located in "assets/"
        # Or
        # someJavascript = "https://cdn.example.com/some.js"
    # Page SEO config
    [params.page.seo]
      # image URL
      images = []
      # Publisher info
      [params.page.seo.publisher]
        name = ""
        logoUrl = ""

  # Site verification code config for Google/Bing/Yandex/Pinterest/Baidu
  [params.verification]
    google = ""
    bing = ""
    yandex = ""
    pinterest = ""
    baidu = ""

  # Site SEO config
  [params.seo]
    # image URL
    image = ""
    # thumbnail URL
    thumbnailUrl = ""

  # Analytics config
  [params.analytics]
    enable = false
    # Google Analytics
    [params.analytics.google]
      id = ""
      # whether to anonymize IP
      anonymizeIP = true
    # Fathom Analytics
    [params.analytics.fathom]
      id = ""
      # server url for your tracker if you're self hosting
      server = ""
    # Plausible Analytics
    [params.analytics.plausible]
      dataDomain = ""
    # Yandex Metrica
    [params.analytics.yandexMetrica]
      id = ""

  # CDN config for third-party library files
  [params.cdn]
    # CDN data file name, disabled by default
    # ["jsdelivr.yml"]
    # located in "themes/LikeIt/assets/data/cdn/" directory
    # you can store your own data files in the same path under your project:
    # "assets/data/cdn/"
    data = ""

# Markup related config in Hugo
[markup]
  # https://gohugo.io/content-management/syntax-highlighting
  [markup.highlight]
    codeFences = true
    guessSyntax = true
    lineNos = true
    lineNumbersInTable = true
    # false is a necessary configuration
    # (https://github.com/dillonzq/LoveIt/issues/158)
    noClasses = false
  # Goldmark is from Hugo 0.60 the default library used for Markdown
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList = true
      footnote = true
      linkify = true
      strikethrough = true
      table = true
      taskList = true
      typographer = true
    [markup.goldmark.renderer]
      # whether to use HTML tags directly in the document
      unsafe = true
  # Table Of Contents settings
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 6

# Sitemap config
[sitemap]
  changefreq = "weekly"
  filename = "sitemap.xml"
  priority = 0.5

# https://gohugo.io/content-management/urls#permalinks
[Permalinks]
  # posts = ":year/:month/:filename"
  posts = ":filename"

# https://gohugo.io/about/hugo-and-gdpr/
[privacy]
  # privacy of the Google Analytics (replaced by params.analytics.google)
  [privacy.googleAnalytics]
    # ...
  [privacy.twitter]
    enableDNT = true
  [privacy.youtube]
    privacyEnhanced = true

# Options to make output .md files
[mediaTypes]
  [mediaTypes."text/plain"]
    suffixes = ["md"]

# Options to make output .md files
[outputFormats.MarkDown]
  mediaType = "text/plain"
  isPlainText = true
  isHTML = false

# Options to make hugo output files
[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML", "MarkDown"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
  taxonomyTerm = ["HTML"]
```

{{< admonition >}}
Note that some of these parameters are explained in details in other sections of this documentation.
{{< /admonition >}}

{{< admonition note "Hugo environments" >}}
Default environments are `development` with `hugo serve` and `production` with `hugo`.

Due to limitations in the local `development` environment,
the **comment system**, **CDN** and **fingerprint** will not be enabled in the `development` environment.

You could enable these features with `hugo serve -e production`.
{{< /admonition >}}

{{< admonition tip "Tips about CDN Configuration" >}}

```toml
[params.cdn]
  # CDN data file name, disabled by default
  # ["jsdelivr.yml"]
  data = ""
````

The default CDN data file is located in `themes/LikeIt/assets/data/cdn/` directory.
You can store your own data file in the same path under your project: `assets/data/cdn/`.
{{< /admonition >}}

{{< admonition tip "Tips about social Configuration" >}}

You can directly set your ID to get a default social link and its icon:

```toml
[params.social]
  Mastodon = "@xxxx"
```

The social link generated is `https://mastodon.technology/@xxxx`.

Or You can set more options through a dict:

```toml
[params.social]
  [params.social.Mastodon]
    # weight when arranging icons (the greater the weight, the later the icon is positioned)
    weight = 0
    # your social ID
    id = "@xxxx"
    # prefix of your social link
    prefix = "https://mastodon.social/"
    # content hovering on the icon
    title = "Mastodon"
```

The default data of all supported social links is located in `themes/LikeIt/assets/data/social.yaml`,
which is you can refer to.
{{< /admonition >}}

![Complete configuration preview](complete-configuration-preview.png "Complete configuration preview")

### 3.2 Favicons, Browserconfig, Manifest

It is recommended to put your own favicons:

* apple-touch-icon.png (180x180)
* favicon-32x32.png (32x32)
* favicon-16x16.png (16x16)
* mstile-150x150.png (150x150)
* android-chrome-192x192.png (192x192)
* android-chrome-512x512.png (512x512)

into `/static`. They’re easily created via [https://realfavicongenerator.net/](https://realfavicongenerator.net/).

Customize `browserconfig.xml` and `site.webmanifest` to set theme-color and background-color.

### 3.3 Style Customization


{{< admonition >}}
Hugo **extended** version is necessary for the style customization.
{{< /admonition >}}

**LikeIt** theme has been built to be as configurable as possible by defining custom `.scss` style files.

The directory including the custom `.scss` style files is `assets/css` relative to **your project root directory**.

In `assets/css/_override.scss`, you can override the variables in `themes/LikeIt/assets/css/_variables.scss` to customize the style.

Here is a example:

```scss
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700&display=swap&subset=latin-ext');
$code-font-family: Fira Mono, Source Code Pro, Menlo, Consolas, Monaco, monospace;
```

In `assets/css/_custom.scss`, you can add some css style code to customize the style.

## 4 Multilingual and i18n

**LikeIt** theme is fully compatible with Hugo multilingual mode, which provides in-browser language switching.

![Language Switch](language-switch.gif "Language Switch")

### 4.1 Compatibility {#language-compatibility}


| Language             | Hugo Code | HTML `lang` Attribute | Theme Docs                    |
|:-------------------- |:---------:|:---------------------:|:-----------------------------:|
| English              | `en`      | `en`                  | :(far fa-check-square fa-fw): |
| Simplified Chinese   | `zh-cn`   | `zh-CN`               | :(far fa-check-square fa-fw): |
| Traditional Chinese  | `zh-tw`   | `zh-TW`               | :(far fa-square fa-fw):       |
| French               | `fr`      | `fr`                  | :(far fa-square fa-fw):       |
| Polish               | `pl`      | `pl`                  | :(far fa-square fa-fw):       |
| Brazilian Portuguese | `pt-br`   | `pt-BR`               | :(far fa-square fa-fw):       |
| Italian              | `it`      | `it`                  | :(far fa-square fa-fw):       |
| Spanish              | `es`      | `es`                  | :(far fa-square fa-fw):       |
| German               | `de`      | `de`                  | :(far fa-square fa-fw):       |
| German               | `de`      | `de`                  | :(far fa-square fa-fw):       |
| Serbian              | `sr`      | `sr`                  | :(far fa-square fa-fw):       |
| Russian              | `ru`      | `ru`                  | :(far fa-square fa-fw):       |
| Romanian             | `ro`      | `ro`                  | :(far fa-square fa-fw):       |
| Vietnamese           | `vi`      | `vi`                  | :(far fa-square fa-fw):       |
| Arabic               | `ar`      | `ar`                  | :(far fa-square fa-fw):       |
| Catalan              | `ca`      | `ca`                  | :(far fa-square fa-fw):       |
| Thai                 | `th`      | `th`                  | :(far fa-square fa-fw):       |
| Telugu               | `te`      | `te`                  | :(far fa-square fa-fw):       |
| Indonesian           | `id`      | `id`                  | :(far fa-square fa-fw):       |
| Turkish              | `tr`      | `tr`                  | :(far fa-square fa-fw):       |
| Korean               | `ko`      | `ko`                  | :(far fa-square fa-fw):       |
| Hindi                | `hi`      | `hi`                  | :(far fa-square fa-fw):       |

### 4.2 Basic Configuration

After learning [how Hugo handle multilingual websites](https://gohugo.io/content-management/multilingual), define your languages in your [site configuration](#site-configuration).

For example with English, Chinese and French website:

```toml
# determines default content language ["en", "zh-cn", "fr", "pl", ...]
defaultContentLanguage = "en"

[languages]
  [languages.en]
    weight = 1
    title = "My New Hugo Site"
    languageCode = "en"
    languageName = "English"
    [[languages.en.menu.main]]
      weight = 1
      identifier = "posts"
      pre = ""
      post = ""
      name = "Posts"
      url = "/posts/"
      title = ""
    [[languages.en.menu.main]]
      weight = 2
      identifier = "tags"
      pre = ""
      post = ""
      name = "Tags"
      url = "/tags/"
      title = ""
    [[languages.en.menu.main]]
      weight = 3
      identifier = "categories"
      pre = ""
      post = ""
      name = "Categories"
      url = "/categories/"
      title = ""

  [languages.zh-cn]
    weight = 2
    title = "我的全新 Hugo 网站"
    languageCode = "zh-CN"
    languageName = "简体中文"
    hasCJKLanguage = true
    [[languages.zh-cn.menu.main]]
      weight = 1
      identifier = "posts"
      pre = ""
      post = ""
      name = "文章"
      url = "/posts/"
      title = ""
    [[languages.zh-cn.menu.main]]
      weight = 2
      identifier = "tags"
      pre = ""
      post = ""
      name = "标签"
      url = "/tags/"
      title = ""
    [[languages.zh-cn.menu.main]]
      weight = 3
      identifier = "categories"
      pre = ""
      post = ""
      name = "分类"
      url = "/categories/"
      title = ""

  [languages.fr]
    weight = 3
    title = "Mon nouveau site Hugo"
    languageCode = "fr"
    languageName = "Français"
    [[languages.fr.menu.main]]
      weight = 1
      identifier = "posts"
      pre = ""
      post = ""
      name = "Postes"
      url = "/posts/"
      title = ""
    [[languages.fr.menu.main]]
      weight = 2
      identifier = "tags"
      pre = ""
      post = ""
      name = "Balises"
      url = "/tags/"
      title = ""
    [[languages.fr.menu.main]]
      weight = 3
      identifier = "categories"
      name = "Catégories"
      pre = ""
      post = ""
      url = "/categories/"
      title = ""
```

Then, for each new page, append the language code to the file name.

Single file `my-page.md` is split in three files:

* in English: `my-page.en.md`
* in Chinese: `my-page.zh-cn.md`
* in French: `my-page.fr.md`

{{< admonition >}}
Be aware that only translated pages are displayed in menu. It’s not replaced with default language content.
{{< /admonition >}}

{{< admonition tip >}}
Use [Front Matter parameter](https://gohugo.io/content-management/multilingual#translate-your-content) to translate urls too.
{{< /admonition >}}

### 4.3 Overwrite Translation Strings

Translations strings are used for common default values used in the theme. Translations are available in [some languages](#language-compatibility), but you may use another language or want to override default values.

To override these values, create a new file in your local i18n folder `i18n/<languageCode>.toml` and inspire yourself from `themes/LikeIt/i18n/en.toml`.

By the way, as these translations could be used by other people, please take the time to propose a translation by [:(fas fa-code-branch fa-fw): making a PR](https://github.com/st1020/LikeIt/pulls) to the theme!

## 5 Search


Based on [Lunr.js](https://lunrjs.com/) or [algolia](https://www.algolia.com/), searching is supported in **LikeIt** theme.

### 5.1 Output Configuration

In order to generate `index.json` for searching, add `JSON` output file type to the `home` of the `outputs` part in your [site configuration](#site-configuration).

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

### 5.2 Search Configuration

Based on `index.json` generated by Hugo, you could activate searching.

Here is the search configuration in your [site configuration](#site-configuration):

```toml
[params.search]
  enable = true
  # max index length of the chunked content
  contentLength = 4000
  # placeholder of the search bar
  placeholder = ""
  # max number of results length
  maxResultLength = 10
  # HTML tag name of the highlight part in results
  highlightTag = "em"
  # whether to use the absolute URL based on the baseURL in search index
  absoluteURL = false
```
