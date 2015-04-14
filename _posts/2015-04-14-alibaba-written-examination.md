---
layout: post
title:  "阿里巴巴的一道笔试题目"
date:   2015-4-14 
categories: [css学习]
---

![](/images/posts/2015041401.png)

为实现图示效果，请根据下面的HTML结构，给出相应的CSS

###HTML
    
	<main>
	 <div>
	  A
	 </div>
	 <div>
	  B
	 </div>
	 <div>
	  C
	 </div>
	</main>


###题目分析

考查：

1. div元素水平居中
2. div元素内文字垂直水平居中

div元素水平居中有多种方法，而div元素内文字垂直水平居中同样也有多种方法，所以两者一组合，完成如图的效果的解法就会有很多啦。

###CSS

####一
	main{
	  text-align: center; /*使文字水平居中,配合inline-block使div水平居中*/
	}
	main div{
	  width:100px;
	  height:100px;
	  background-color: black;
	  color: white;

	  display: inline-block; /*使div居中*/
	  line-height: 100px; /*使div内文字垂直居中*/
	}

**[请点击此链接查看效果](./../demo/alibaba/CSS-1.html)**

方法总结：因为文字垂直居中通过`line-height`完成的，所以使用此方法需要知道div的高度。而使用`inline-block`自带空白，就不需要设置div之间的间隔了。

无兼容性问题。

####二

此方法更改了让main居中的方法，用了一点CSS3中flexbox的知识。

	main{
	  display: -webkit-box;
	  -webkit-box-orient: horizontal;
	  -webkit-box-pack: center;
	  display: -moz-box;
	  -moz-box-orient: horizontal;
	  -moz-box-pack: center;
	  display: -o-box;
	  -o-box-orient: horizontal;
	  -o-box-pack: center;
	  display: -ms-box;
	  -ms-box-orient: horizontal;
	  -ms-box-pack: center;
	  display: box;
	  box-orient: horizontal;
	  box-pack: center;
	}

	main div{
	  width:100px;
	  height:100px;
	  background-color: black;
	  color: white;
	  
	  margin: 0px 10px; /* div之间的间隔 */
	  display: inline-block; /*使div居中*/
	  line-height: 100px; /*使div内文字垂直居中*/
	}

方法总结:关键就在于flexbox相关属性的使用，这方面了解不是很多，需要加油啦。

兼容性：很差。。。

**[请点击此链接查看效果](./../demo/alibaba/CSS-2.html)**

####三

	main{
	  display:table; /*让main按照table效果展现*/
	  margin: 0 auto; /* main水平居中，进而是div水平居中 */

	  border-collapse: separate; /* 表格分割边框模型 */
	  border-spacing: 0px 10px; /* table-cell的边框间隔 */
	}

	main div{
	  height: 100px;
	  width: 100px;
	  background-color:black;
	  
	  display:table-cell; /* div按照table-cell效果展现 */
	  text-align: center; /* 文字水平居中 */
	  vertical-align: middle; /* 文字垂直居中 */
	}

**效果展示**

方法总结：模拟表格的效果，这样垂直居中就很简单了。`border-collapse`、`border-spacing`是关键，起到分割table-cell的效果。我在笔试的时候就卡在这一点了。

兼容性：IE8+。

**[请点击此链接查看效果](./../demo/alibaba/CSS-3.html)**

嗯，暂时就写这几种方法吧。先把欠的的知识补上再说 T__T....

####参考文章

> [六种实现元素水平居中](http://www.w3cplus.com/css/elements-horizontally-center-with-css.html)




> [大小不固定的图片、多行文字的水平垂直居中](http://www.zhangxinxu.com/wordpress/2009/08/%E5%A4%A7%E5%B0%8F%E4%B8%8D%E5%9B%BA%E5%AE%9A%E7%9A%84%E5%9B%BE%E7%89%87%E3%80%81%E5%A4%9A%E8%A1%8C%E6%96%87%E5%AD%97%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/)

> [小tip: margin:auto实现绝对定位元素的水平垂直居中](http://www.zhangxinxu.com/wordpress/2013/11/margin-auto-absolute-%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D-%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/)

> [CSS制作水平垂直居中对齐](http://www.w3cplus.com/css/vertically-center-content-with-css)

> [我所知道的几种display:table-cell的应用](http://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)


> [深入了解 Flexbox 伸缩盒模型](http://www.w3cplus.com/blog/666.html)

