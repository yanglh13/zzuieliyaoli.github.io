---
layout: post
title:  "清除浮动的一些方法和BFC知识"
date:   2014-12-17 
categories: [CSS学习]
---




##一、清除浮动的方法

####基础知识
[http://css.doyoe.com/properties/layout/clear.htm](http://css.doyoe.com/properties/layout/clear.htm "clear")

1. one：
允许两边都可以有浮动对象
2. both：
不允许有浮动对象
3. left：
不允许左边有浮动对象
4. right：
不允许右边有浮动对象

###清除浮动的方法，摘取如下：
[http://www.iyunlu.com/view/css-xhtml/55.html](http://www.iyunlu.com/view/css-xhtml/55.html)

[http://css-tricks.com/snippets/css/clear-fix/](http://css-tricks.com/snippets/css/clear-fix/)

####1.IE6+

{% highlight CSS %}
.clear:before,
.clear:after {
    content: "";
    display: table;
} 
.clear:after {
    clear: both;
}
.clear {
    zoom: 1; /* For IE 6/7 (trigger hasLayout) */
}
{% endhighlight %}

####2.IE8+

{% highlight CSS %}

.clear:after {
  content: "";
  display: table;
  clear: both;
}
{% endhighlight %}

##二、BFC（Block Formatting Contexts）

清除浮动方法无非是两种：

其一，通过在浮动元素的末尾添加一个空元素，设置`clear：both`属性,`after`伪元素其实也可以通过`content`在元素的后面生成了内容为一个点`.`的块级元素；

其二，通过设置父元素`overflow`或`display：table`属性来闭合浮动。

####1.为什么`overflow：hidden` 或者`overflow：auto`可以闭合浮动

答：触发了BFC。

####2.如何触发BFC


- float 除了none以外的值 
 
- overflow 除了visible 以外的值（hidden，auto，scroll ） 
 
- display (table-cell，table-caption，inline-block) 
 
- position（absolute，fixed） 
 
- fieldset元素

需要注意的是，display:table 本身并不会创建BFC，但是它会产生匿名框(anonymous boxes)，而匿名框中的display:table-cell可以创建新的BFC，换句话说，触发块级格式化上下文的是匿名框，而不是display:table。所以通过display:table和display:table-cell创建的BFC效果是不一样的。

####3.BFC特性
- 块级格式化上下文会阻止外边距叠加

- 块级格式化上下文不会重叠浮动元素

- 块级格式化上下文通常可以包含浮动

####4.总结
1.通俗地来说：创建了 BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素，反之亦然，同时BFC任然属于文档中的普通流。

2.为什么overflow:hidden或者auto可以闭合浮动了，是因为父元素创建了新的BFC。

##三、 hasLayout
[http://www.qianduan.net/comprehensive-haslayout.html](http://www.qianduan.net/comprehensive-haslayout.html)

####1.什么是 haslayout

haslayout 是Windows Internet Explorer渲染引擎的一个内部组成部分。在Internet Explorer中，一个元素要么自己对自身的内容进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。为了调节这两个不同的概念，渲染引擎采用了 hasLayout 的属性，属性值可以为true或false。当一个元素的 hasLayout 属性值为true时，我们说这个元素有一个布局（layout)。

当一个元素有一个布局时，它负责对自己和可能的子孙元素进行尺寸计算和定位。简单来说，这意味着这个元素需要花更多的代价来维护自身和里面的内容，而不是依赖于祖先元素来完成这些工作。因此，一些元素默认会有一个布局。当我们说一个元素“拥有layout”或“得到layout”，或者说一个元素“has layout” 的时候，我们的意思是指它的微软专有属性 hasLayout 被设为了 true 。一个“layout元素”可以是一个默认就拥有 layout 的元素或者是一个通过设置某些 CSS 属性得到 layout 的元素。如果某个HTML元素拥有 haslayout 属性，那么这个元素的 haslayout 的值一定只有 true，haslayout 为只读属性 一旦被触发，就不可逆转。通过 IE Developer Toolbar 可以查看 IE 下 HTML 元素是否拥有haslayout，在 IE Developer Toolbar 下，拥有 haslayout 的元素，通常显示为“haslayout = -1”。

##四、何时使用before

before伪元素是用来处理margin边距重叠的，由于内部元素 float 创建了BFC，导致内部元素的margin-top和 上一个盒子的margin-bottom 发生叠加。如果这不是你所希望的，那么就可以加上before，如果只是单纯的闭合浮动，after就够了！只使用clearfix:after时在跨浏览器兼容问题会存在一个垂直边距叠加的bug，这不是bug，是BFC应该有的特性。


##参考文章：



> [http://css.doyoe.com/properties/layout/clear.htm](http://css.doyoe.com/properties/layout/clear.htm "clear")



> [http://www.iyunlu.com/view/css-xhtml/55.html](http://www.iyunlu.com/view/css-xhtml/55.html)



> [http://css-tricks.com/snippets/css/clear-fix/](http://css-tricks.com/snippets/css/clear-fix/)



> [http://www.qianduan.net/comprehensive-haslayout.html](http://www.qianduan.net/comprehensive-haslayout.html)

