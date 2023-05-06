---
weight: 4
title: "主题文档 - 扩展 Shortcodes"
date: 2020-03-03T16:29:59+08:00
lastmod: 2020-06-12T10:10:13+03:00
draft: false
author: "Dillon"
authorLink: "https://dillonzq.com"
description: "LoveIt 主题在 Hugo 内置的 shortcode 的基础上提供多个扩展的 shortcode."
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

**LoveIt** 主题在 Hugo 内置的 shortcode 的基础上提供多个扩展的 shortcode.

<!--more-->

## 1 admonition

`admonition` shortcode 支持 **12** 种 帮助你在页面中插入提示的横幅.

*支持 Markdown 或者 HTML 格式.*

{{< admonition >}}
一个 **注意** 横幅
{{< /admonition >}}

{{< admonition abstract >}}
一个 **摘要** 横幅
{{< /admonition >}}

{{< admonition info >}}
一个 **信息** 横幅
{{< /admonition >}}

{{< admonition tip >}}
一个 **技巧** 横幅
{{< /admonition >}}

{{< admonition success >}}
一个 **成功** 横幅
{{< /admonition >}}

{{< admonition question >}}
一个 **问题** 横幅
{{< /admonition >}}

{{< admonition warning >}}
一个 **警告** 横幅
{{< /admonition >}}

{{< admonition failure >}}
一个 **失败** 横幅
{{< /admonition >}}

{{< admonition danger >}}
一个 **危险** 横幅
{{< /admonition >}}

{{< admonition bug >}}
一个 **Bug** 横幅
{{< /admonition >}}

{{< admonition example >}}
一个 **示例** 横幅
{{< /admonition >}}

{{< admonition quote >}}
一个 **引用** 横幅
{{< /admonition >}}

`admonition` shortcode 有以下命名参数:

* **type** *[可选]* (**第一个**位置参数)

    `admonition` 横幅的类型, 默认值是 `note`.

* **title** *[可选]* (**第二个**位置参数)

    `admonition` 横幅的标题, 默认值是 **type** 参数的值.

* **open** *[可选]* (**第三个**位置参数)

    横幅内容是否默认展开, 默认值是 `true`.

一个 `admonition` 示例:

```markdown
{{</* admonition type=tip title="This is a tip" open=false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
或者
{{</* admonition tip "This is a tip" false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
```

呈现的输出效果如下:

{{< admonition tip "This is a tip" false >}}
一个 **技巧** 横幅
{{< /admonition >}}

## 2 style

{{< admonition >}}
Hugo **extended** 版本对于 `style` shortcode 是必需的.
{{< /admonition >}}

`style` shortcode 用来在你的文章中插入自定义样式.

`style` shortcode 有两个位置参数.

第一个参数是自定义样式的内容. 它支持 [:(fab fa-sass fa-fw): SASS](https://sass-lang.com/documentation/style-rules/declarations#nesting) 中的嵌套语法,
并且 `&` 指代这个父元素.

第二个参数是包裹你要更改样式的内容的 HTML 标签, 默认值是 `div`.

一个 `style` 示例:

```markdown
{{</* style "text-align:right; strong{color:#00b1ff;}" */>}}
This is a **right-aligned** paragraph.
{{</* /style */>}}
```

呈现的输出效果如下:

{{< style "text-align:right; strong{color:#00b1ff;}" >}}
This is a **right-aligned** paragraph.
{{< /style >}}

## 3 script

`script` shortcode 用来在你的文章中插入 **:(fab fa-js fa-fw): Javascript** 脚本.

{{< admonition >}}
脚本内容可以保证在所有的第三方库加载之后按顺序执行.
所以你可以自由地使用第三方库.
{{< /admonition >}}

一个 `script` 示例:

```markdown
{{</* script */>}}
console.log('Hello LoveIt!');
{{</* /script */>}}
```

你可以在开发者工具的控制台中看到输出.

{{< script >}}
console.log('Hello LoveIt!');
{{< /script >}}

## 4 raw

`raw` shortcode 用来在你的文章中插入原始 **:(fab fa-html5 fa-fw): HTML** 内容.

一个 `raw` 示例:

```markdown
行内公式: {{</* raw */>}}\(\mathbf{E}=\sum_{i} \mathbf{E}_{i}=\mathbf{E}_{1}+\mathbf{E}_{2}+\mathbf{E}_{3}+\cdots\){{</* /raw */>}}

公式块:

{{</* raw */>}}
\[ a=b+c \\ d+e=f \]
{{</* /raw */>}}

原始的带有 Markdown 语法的内容: {{</* raw */>}}**Hello**{{</* /raw */>}}
```

呈现的输出效果如下:

行内公式: {{< raw >}}\(\mathbf{E}=\sum_{i} \mathbf{E}_{i}=\mathbf{E}_{1}+\mathbf{E}_{2}+\mathbf{E}_{3}+\cdots\){{< /raw >}}

公式块:

{{< raw>}}
\[ a=b+c \\ d+e=f \]
{{< /raw >}}

原始的带有 Markdown 语法的内容: {{< raw >}}**Hello**{{< /raw >}}
