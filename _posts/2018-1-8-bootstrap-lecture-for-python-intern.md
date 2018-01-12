---
layout: post
title: "给 Python 实习生的 Bootstrap3 讲座"
date: 2018-01-08
categories: [CSS]
---

## 2.1 基础的 CSS 知识

### 2.1.1 简介

- CSS 指层叠样式表 (Cascading Style Sheets)
- 样式定义如何显示 HTML 元素
- 样式通常存储在样式表中
- 为了解决内容与表现分离的问题

```html
<!-- bad -->
<H2><font color="red" bgcolor="white"><i>使用 CSS</i></font></H2>
```

```html
<!-- good -->
<style>
h2 {
  color: red;
  background-color: red;
}
</style>
<h2>使用 CSS</h2>
```

### 2.1.2 CSS 简介

#### 版本

- CSS2.1：整体规范，包含多个模块：`CSS 语法`、`CSS 颜色`等
- CSS3：是一个非正式的集合，它包括 CSS 规范 level3 再加上 level1 的新规范
  - 各个模块拆分，形成独立的规范文档
  - level2.1 -> level3：`CSS 语法`、`CSS 颜色`
  - level1：`CSS 变形`、`CSS 伸缩盒布局`

#### 类型

- 外部
- 内部
- 内联

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>css-type.html</title>
  <!-- 外部 -->
  <link rel="stylesheet" href="./css-type.css">
  <link rel="stylesheet" href="./css-type2.css">
  <!-- 内部 -->
  <style>
    #test {
      color: red;
    }
  </style>
  <style>
    #demo {
      color: red;
    }
  </style>
</head>
<body>
  <link rel="stylesheet" href="./css-type2.css">
  <style>
    #demo2 {
      color: red;
    }
  </style>
  <!-- 内联 -->
  <p style="color: red;">Test</p>
</body>
</html>
```

#### 问题

- 维护性？

### 2.2.3 语法

```css
selector {
  declaration1;
  property: value;
  color: red;
}

selector1，
selector2 {
  color: red;
}

@media (min-width: 700px) {
  selector1，
  selector2 {
    color: red;
  }
}
```

- 选择器：需要改变样式的 HTML 元素
- 声明：由一个属性和一个值组成

### 2.2.4 选择器

[CSS 选择器参考手册](http://www.w3school.com.cn/cssref/css_selectors.asp)

简单看一些例子，使用时要思路开阔

```css
/* 通用选择器 */
* {
  margin: 0;
  padding: 0;
}

/* ID 选择器 */
#test {
  color: red;
}

/* class 选择器 */
.test {
  color: red;
}
```

#### 问题

- 批量性：`ID 选择器` 与 `HTML`：选择器通常是需要改变样式的 HTML 元素

```html
<style>
#test {
  color: red;
}
</style>
<!-- bad to js -->
<p id="test">123123</p>
<p id="test">123123</p>

<script>
document.getElementById("test"); // 哪一个？
</script>
```

- `ID 选择器` 与 `class 选择器` 大小写敏感

```css
#test {}
#Test {}
.test {}
.Test {}
```

### 2.2.5 层叠

[CSS 层叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)

#### `层叠` 的意义

- 合并

```css
#test {
  font-size: 20px;
}
#test {
  color: red;
}

/* 等于 */
#test {
  font-size: 20px;
  color: red;
}
```

- 覆盖

```css
#test {
  font-size: 20px;
  color: red;
}
#test {
  font-size: 40px;
}

/* 等于 */
#test {
  font-size: 40px;
  color: red;
}
```

#### 层叠优先级

[层叠优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

```html
<style>
div#test span {
  color: green
}
span {
  color: red;
}
div span {
  color: blue;
}
</style>
<div id="test">
  <span>Text</span>
</div>
```

- 优先级：相等时，前面被后面覆盖
- 类型选择器：`h1`、`p`
- 类选择器、属性选择器：`.test`、`[type="radio"]`
- ID 选择器：`#test`
- 内联样式/`important`

```html
<style>
div#test span {
  color: green
}
span {
  color: red;
}
div span {
  color: blue;
}
</style>
<div id="test">
  <span style="color: yellow;">Text</span>
</div>
```

简单来说：更具体的胜出

- `important`：百度分享

```css
.bd__share a {
  color: #888;
}
```

### 2.2.6 盒模型

[盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

- `content-box`

```css
.box {
  with: 100px;
}
```

- `border-box`

```css
.box {
  box-sizing: border-box;
  width: 100px;
  padding: 20px;
  border: 10px solid red;
}
```

### 2.2.7 元素 display

[CSS 布局的基本原理：盒模型、display、postion 和 float](https://zhuanlan.zhihu.com/p/23207229)

```css
default {
  display: inline;
  display: block;
  display: inline-block;
}
```

- inline
  - 和其他行内元素都在一行上
  - 元素的高度、宽度、行高及顶部和底部边距等属性不可设置
  - 元素不能设置高度，宽度就是它包含的文字或图片的宽度
  - 行内元素只能容纳文本或者其他行内元素
  - 比如 `<a>、<span>、<br>、<em>、<strong>` 等元素都是行内元素。

- block
  - 每个块元素都从新的一行开始，独占一行
  - 元素的高度、宽度、行高以及顶和底边距等属性都可设置
  - 默认的宽度与父元素的宽度一致，即 width 默认为 100%
  - 可以容纳行内元素和其他块元素
  - 比如 `<div>、<p>、<ol>、<ul>、<table>、<form>` 等元素都是块元素。

- inline-block
  - 和其他行内元素都在一行上
  - 元素的高度、宽度、行高以及顶和底边距等属性都可设置

## 2.2 Bootstrap

[https://v3.bootcss.com/](https://v3.bootcss.com/)

### 2.2.1 简单介绍

- 栅格系统、响应式
- 使用层次
  - 预定义类
  - 整体使用

### 2.2.2 响应式原理

- [MediaQuery](https://v3.bootcss.com/css/#grid-media-queries)
- [百分比 width](https://v3.bootcss.com/css/#grid-options) + `border-box`
- 浮动

### 2.2.3 教程中注意的地方

- [基本模板](https://v3.bootcss.com/getting-started/#template)
- [实例精选](https://v3.bootcss.com/getting-started/#examples)
- [栅格系统](https://v3.bootcss.com/css/#grid)

### 常见布局

[Bootstrap 优站精选](http://www.youzhan.org/)

- [两列布局](http://www.ghostchina.com/)
- [左侧固定，右侧自适应](https://v3.bootcss.com/examples/dashboard/)
- [水平居中](https://v3.bootcss.com/examples/jumbotron-narrow/)

```css
#box1 {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
```

```css
.container {
  text-align: center;
}
#box2 {
  display: inline-block;
  width: 200px;
  height: 200px;
}
```
