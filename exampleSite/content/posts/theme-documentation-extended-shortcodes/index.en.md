---
weight: 4
title: "Theme Documentation - Extended Shortcodes"
date: 2020-03-03T16:29:41+08:00
lastmod: 2020-06-12T10:10:13+03:00
draft: false
author: "Dillon"
authorLink: "https://dillonzq.com"
description: "LikeIt theme provides multiple shortcodes on top of built-in ones in Hugo."
images: []
resources:
- name: "featured-image"
  src: "featured-image.jpg"
- name: "featured-image-preview"
  src: "featured-image-preview.jpg"

tags: ["shortcodes"]
categories: ["documentation"]

math:
  enable: true
---

**LikeIt** theme provides multiple shortcodes on top of built-in ones in Hugo.

<!--more-->

## 1 admonition

The `admonition` shortcode supports **12** types of banners to help you put notice in your page.

*Markdown or HTML format in the content is supported.*

{{< admonition >}}
A **note** banner
{{< /admonition >}}

{{< admonition abstract >}}
An **abstract** banner
{{< /admonition >}}

{{< admonition info >}}
A **info** banner
{{< /admonition >}}

{{< admonition tip >}}
A **tip** banner
{{< /admonition >}}

{{< admonition success >}}
A **success** banner
{{< /admonition >}}

{{< admonition question >}}
A **question** banner
{{< /admonition >}}

{{< admonition warning >}}
A **warning** banner
{{< /admonition >}}

{{< admonition failure >}}
A **failure** banner
{{< /admonition >}}

{{< admonition danger >}}
A **danger** banner
{{< /admonition >}}

{{< admonition bug >}}
A **bug** banner
{{< /admonition >}}

{{< admonition example >}}
An **example** banner
{{< /admonition >}}

{{< admonition quote >}}
A **quote** banner
{{< /admonition >}}

The `admonition` shortcode has the following named parameters:

* **type** *[optional]* (**first** positional parameter)

    Type of the `admonition` banner, default value is `note`.

* **title** *[optional]* (**second** positional parameter)

    Title of the `admonition` banner, default value is the value of **type** parameter.

* **open** *[optional]* (**third** positional parameter)

    Whether the content will be expandable by default, default value is `true`.

Example `admonition` input:

```markdown
{{</* admonition type=tip title="This is a tip" open=false */>}}
A **tip** banner
{{</* /admonition */>}}
Or
{{</* admonition tip "This is a tip" false */>}}
A **tip** banner
{{</* /admonition */>}}
```

The rendered output looks like this:

{{< admonition tip "This is a tip" false >}}
A **tip** banner
{{< /admonition >}}

## 2 style

{{< admonition >}}
Hugo **extended** version is necessary for `style` shortcode.
{{< /admonition >}}

`style` is a shortcode to insert custom style in your post.

The `style` shortcode has two positional parameters.

The **first** one is the custom style content,
which supports nesting syntax in [:(fab fa-sass fa-fw): SASS](https://sass-lang.com/documentation/style-rules/declarations#nesting)
and `&` referring to this parent HTML element.

And the **second** one is the tag name of the HTML element wrapping the content you want to change style, and whose default value is `div`.

Example `style` input:

```markdown
{{</* style "text-align:right; strong{color:#00b1ff;}" */>}}
This is a **right-aligned** paragraph.
{{</* /style */>}}
```

The rendered output looks like this:

{{< style "text-align:right; strong{color:#00b1ff;}" >}}
This is a **right-aligned** paragraph.
{{< /style >}}

## 3 script

`script` is a shortcode to insert custom **:(fab fa-js fa-fw): Javascript** in your post.

{{< admonition >}}
The script content can be guaranteed to be executed in order after all third-party libraries are loaded. So you are free to use third-party libraries.
{{< /admonition >}}

Example `script` input:

```markdown
{{</* script */>}}
console.log('Hello LikeIt!');
{{</* /script */>}}
```

You can see the output in the console of the developer tool.

{{< script >}}
console.log('Hello LikeIt!');
{{< /script >}}

## 4 raw

`raw` is a shortcode to insert raw **:(fab fa-html5 fa-fw): HTML** content in your post.
This is useful when you want to include some Markdown content to **avoid being rendered or escaped** by Hugo.

Example `raw` input:

```markdown
Inline Formula: {{</* raw */>}}\(\mathbf{E}=\sum_{i} \mathbf{E}_{i}=\mathbf{E}_{1}+\mathbf{E}_{2}+\mathbf{E}_{3}+\cdots\){{</* /raw */>}}

Block Formula:

{{</* raw */>}}
\[ a=b+c \\ d+e=f \]
{{</* /raw */>}}

Raw content using Markdown syntax: {{</* raw */>}}**Hello**{{</* /raw */>}}
```

The rendered output looks like this:

Inline Formula: {{< raw >}}\(\mathbf{E}=\sum_{i} \mathbf{E}_{i}=\mathbf{E}_{1}+\mathbf{E}_{2}+\mathbf{E}_{3}+\cdots\){{< /raw >}}

Block Formula:

{{< raw>}}
\[ a=b+c \\ d+e=f \]
{{< /raw >}}

{{< script >}}
console.log('Hello LikeIt!');
{{< /script >}}

Raw content using Markdown syntax: {{< raw >}}**Hello**{{< /raw >}}
