---
layout: post
title: "给 Python 实习生的 Bootstrap3 讲座"
date: 2018-01-08
categories: [CSS]
---

## 2.1 基础的 CSS 知识

Cascading Style Sheets (CSS) 层叠样式表

[http://www.w3school.com.cn/css/css_jianjie.asp](http://www.w3school.com.cn/css/css_jianjie.asp)

### 2.1.1 种类

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
  <!-- 内部 -->
  <style>
    #test {
      color: red;
    }
  </style>
</head>
<body>
  <!-- 内联 -->
  <p style="color: red;">Test</p>
</body>
</html>
```

#### 问题

- 维护性？

### 2.2.2 语法

[http://www.w3school.com.cn/css/css_syntax.asp](http://www.w3school.com.cn/css/css_syntax.asp)

```css
selector {declaration1; declaration2; ... declarationN }
```

### 2.2.3 选择器

[CSS 基础语法](http://www.w3school.com.cn/css/css_syntax.asp)
[CSS 类选择器](http://www.w3school.com.cn/css/css_syntax_class_selector.asp)
[CSS 选择器参考手册](http://www.w3school.com.cn/cssref/css_selectors.asp)

#### 问题

- 批量性：`id 选择器` 与 `HTML`：选择器通常是需要改变样式的 HTML 元素

### 2.2.4 `层叠`

[CSS 层叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)

#### `层叠顺序` 与 `层叠优先级`

- [https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
- `important`：百度分享

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

### 2.2.5 盒模型

[盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

- `content-box`
- `border-box`

### 2.2.5 元素类型

[https://zhuanlan.zhihu.com/p/23207229](https://zhuanlan.zhihu.com/p/23207229)

- inline
- block
- inline-block

## 2.2 Bootstrap

[https://v3.bootcss.com/](https://v3.bootcss.com/)

### 2.2.1 简单介绍

- 栅格系统、响应式
- 使用层次
  - 预定义类
  - 整体使用

### 2.2.2 响应式原理

- [MediaQuery](https://v3.bootcss.com/css/#grid-media-queries)
- border-box
- [百分比 width](https://v3.bootcss.com/css/#grid-options)
- 浮动

### 常见布局

[Bootstrap 优站精选](http://www.youzhan.org/)
[实例精选](https://v3.bootcss.com/getting-started/#examples-navbars)

- [两列布局](http://www.ghostchina.com/)
- [左侧固定，右侧自适应]()
- 居中
