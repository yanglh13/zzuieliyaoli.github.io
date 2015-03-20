---
layout: post
title:  "基本包装类型等概念辨析"
date:   2015-3-19 
categories: [javascript学习]
---
书读百遍，其义自现。

好歹学习JavaScript小半年了，连一些基础的概念都没完全弄懂，也不知道看的书都去哪了。话说今天看《基于MVC的JavaScript富文本应用开发》，实在是难以忍受基础概念模糊不清的状态。必须再次认真的看书啦！

以下是读书笔记：

##数据类型
ECMA中有5种简单的数据类型（也称作基本数据类型）：Undefine、Null、Boolean、Number、String，还有一种复杂数据类型——**引用类型**。

吐槽一下，来看高程（《JavaScript高级程序设计》，下同）是怎么说的：

>还有一种复杂数据类型——Object，Object本质上是由一组无序的名值对组成的。

Object这是个什么鬼！？？这与第五章将的“引用类型”有什么区别于联系？？。。

虽然书中也说道：Object类型是所有它的实例的基础，换句话说，Object类型所具有的任何属性和方法也同样存在于更具体的对象中。

喵的，被搞迷糊了哇。。。。

综上，我觉得这样理解比较好：

ECMA中有5种简单的数据类型（也称作基本数据类型）：Undefine、Null、Boolean、Number、String，还有一种复杂数据类型——**引用类型**。而引用类型除了Object类型、Array类型、Date类型、RegExp类型、Function类型外，还有基本包装类型：Boolean、Number和String，单体内置对象：Global对象、Math对象。
其中，Object类型很重要，所有引用类型的值都是Object的实例，如下代码所示：

{% highlight JavaScript %}

new Object() instanceof Object // true
new Array() instanceof Object // true
new RegExp() instanceof Object // true
new String() instanceof Object // true
new Function() instanceof Object // true

{% endhighlight %}

##基本包装类型
实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从让我们能够调用一些方法来操作数据。

{% highlight JavaScript %}

var s1 = "some text";
var s2 = s1.substring(2);

{% endhighlight %}

如代码所示，s1包含一个字符串，是基本类型值。下一行调用了s1的substring()方法，并将返回的结果保存在了s2中。基本类型不是对象，因为从逻辑上是不能有刚发的。但是为了让我们实现这种直观的操作，后台已经自动完成了一系列的处理。P119

引用类型与基本包装类型的主要区别就是**对象的生存期**。使用`new`操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销毁。这意味着我们不能在运行时为基本类型值添加属性和方法。比如下面的例子：

{% highlight JavaScript %}

var s1 = "some text";
s1.color = "red";
console.log(s1.color); // undefined

{% endhighlight %}

代码所示，在第二行代码试图为字符串s1添加一个color属性。但是，当第三行代码再次访问s1时，其color属性不见了。问题的原因就是第二行创建的String对象在执行第三行代码时已经被销毁了。第三行代码又创建了自己的String对象，而该对象没有color属性。


以上。

