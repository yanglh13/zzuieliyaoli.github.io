---
layout: post
title:  "HTML-iframe标签总结"
date:   2015-3-12 
categories: [HTML学习]
---

本文乃是知识点整理，侵权立删。 ：）

##iframe是什么##

HTML中的<iframe\>标签（又称**内联框架元素**）表示了一个嵌套的浏览上下文(browsing context)，实际上是用来在当前页面中内嵌另一个HTML页面。

在HTML4.0.1中，文档(document)可以包含一个head和一个body组合或者包含一个head和一个框架集(frame-set)组合,但不能同时包含body和frame-set。然而<iframe\>标签可以插入到一个正常的文档体中(document body)。

每个浏览上下文(browsing context)都有自己的会话历史和活动文档。包含其它嵌入内容的浏览上下文(browsing context)称作父级浏览上下文(parent browsing context)。顶层的(top-level)浏览上下文(不再拥有父窗体的)一般就是浏览器的window对象。

## 基础知识 ##

###属性###
  
该[元素的属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)很多，有的只在HTML4（HTML4 Only）被支持，而有一些属性是HTML5新加的（HTML5 Only），所以本文只把一些重要的属性梳理一下。

- height ： 该元素的高度，以CSS像素格式HTML5，或像素格式HTML 4.01，或百分比格式指定frame的高度。
- width ： 该元素的宽度，以CSS像素格式HTML5，或以像素格式HTML 4.01，或以百分比格式指定frame的宽度。
- name ： 嵌入的浏览上下文（框架）的名称。该名称可以用作<a\>标签，<form\>标签的target属性值，或<input\> 标签和 <button\>标签的formtaget属性值。
- src ： 嵌套页面的URL地址。可以为图片网址，也可为页面地址。

  [例子](http://www.w3school.com.cn/tiy/t.asp?f=html_frame_rows)
  ![w3school](/images/posts/20150312230221.png)


###脚本###

1. 如果页面中包含框架，则每个框架都有自己的window对象，并且保存在[frames集合](https://developer.mozilla.org/en-US/docs/DOM/window.frames)中。在frames集合中，可以通过数值所以（从0开始，从左至右，从上到下）或者框架名称来访问相应的window对象。每个window对象都有一个name属性，其中包含框架的名称。如下图所示：

   ![w3school](/images/posts/20150312233140.png)

   **以上代码创建了一个框架集，其中一个框架居上，两个框架居下。**如下图所示：

   ![w3school](/images/posts/20150312233006.png)
 
   **对这个例子来说，可以通过window.frames[0]或者window.frames["topFrame"]来引用上方的框架。**

2. 通过contentWindow属性，脚本可以访问iframe元素所包含的HTML页面的window对象。

   contentDocument属性则引用了iframe中的文档元素（等同于使用contentWindow.document），但IE8-不支持。

   通过访问window.parent，脚本可以从框架中引用它的父框架的window。

   脚本试图访问的框架内容必须遵守[同源策略](https://developer.mozilla.org/en-US/docs/Same_origin_policy_for_JavaScript)，并且无法访问非同源的window对象的几乎所有属性。同源策略同样适用于子窗体访问父窗体的window对象。跨域通信可以通过window.postMessage来实现。

   [这里是例子代码](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#.E6.A1.88.E4.BE.8B)
  	

##实际应用##

整理到这发现，以我现在的能力，还无法理解下面链接里所列的大部分iframe用法，还需学习，所以只把链接里出来吧，不再整理。

[Iframe 有什么好处，有什么坏处？国内还有哪些知名网站仍用Iframe，为什么？有哪些原来用的现在抛弃了？又是为什么？](http://www.zhihu.com/question/20653055)


###参考资料###

> https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#.E6.A1.88.E4.BE.8B

> 《JavaScript高级程序设计》