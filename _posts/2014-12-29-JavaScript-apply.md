---
layout: post
title:  "apply()的应用"
date:   2014-12-29
categories: [javascript学习]
---
写在前面的吐槽：头晕哦~每次跟`this`相关的知识点都是晕的一笔。本以为掌握了，但是看书发现大牛把`apply()`方法玩得太溜了，自己只得灰溜溜的总结一下，以期获得更深的理解和更高的提升。

## 基础知识

apply() 方法可以在使用一个指定的 this 值和一个参数数组（或类数组对象）的前提下调用某个函数或方法。也就是说：用于在特定的作用域中调用函数。实际上，等于设置函数体内`this`对象的值。**简而言之：切换函数的作用域**

注:该方法的作用和 call() 方法类似，只有一个区别就是，call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组（或类数组对象）。

## 语法
{% highlight JavaScript %}

fun.apply(thisArg[, argsArray])

{% endhighlight %}

相当于：
{% highlight JavaScript %}

thisArg.fun([argsArray])

{% endhighlight %}

- 第一个参数: 在其中运行函数的作用域，也就是设置this的值。

	需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

- 第二个参数（可选）： 参数数组，Array的实例或者arguments对象。

	其中的元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。


## 用法

### 基本用法
{% highlight JavaScript %}

window.color = "red";
var o = {color: "blue"};

function sayColor(){
  alert(this.color);
}

sayColor(); // red ==> window.sayColor()

sayColor.call(this); // red ==> window.sayColor()
sayColor.call(o);   // blur ==> o.sayColor()
sayColor.call(window); // red ==> window.sayColor()

{% endhighlight %}

### 函数绑定
{% highlight JavaScript %}

//在bind()中创建了闭包，闭包使用apply()调用传入的函数
//并给apply()传递context对象和参数。

//arguments对象是内部函数的，而非bind()的
//当调用返回的函数时，它会在给定环境中执行被传入的函数
//并给出所有的参数

function bind(fn, context){
  return function(){
    return fn.apply(context, arguments);
  };
}

{% endhighlight %}

### [函数柯里化](/../../../2014-12-30/function-curried.html)

这个坑终于添上了。。。

以上。
