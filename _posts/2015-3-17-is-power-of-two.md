---
layout: post
title:  "Power of two - Codewars"
date:   2015-3-17 
categories: [Codewars]
---


题目：Write a function that determines if given number is a power of two. A power of two means a number of the form 2^n where n is an integer, i.e. the result of exponentiation with number two as the base and integer n as the exponent. I.e. 1024 is a power of two: it 2^10.


examples:

isPowerOfTwo(4096) // -> true

isPowerOfTwo(333)  // -> false

翻译：判断一个非负整数 n 是不是 2的非负 整数次幂（题目很绕）。

##我的解法：
{% highlight JavaScript %}

function isPowerOfTwo(n){
	var tag = false;
  	for (var i=0; i < n; i++){
  		if (Math.pow(2,i) == n ) {
  			tag = true;
  			break;
  		}
  	}
  	return tag;
}

{% endhighlight %}

**思路分析：依旧简单 ←_←，for循环n次，让2的i次方与n对比**

##来看别人怎么写：

解法一：
{% highlight JavaScript %}

function isPowerOfTwo(n) {
  return !(n & (n - 1));
}

{% endhighlight %}

解法二：
{% highlight JavaScript %}

function isPowerOfTwo(n){
  return Math.log(n)/Math.log(2) % 1==0;
}

{% endhighlight %}

解法三：
{% highlight JavaScript %}
function isPowerOfTwo(n){
  if (n < 2) return false;
  if (n == 2) return true;
  return isPowerOfTwo(n / 2);
}

{% endhighlight %}

解法四：
{% highlight JavaScript %}
function isPowerOfTwo(n){
  return /^10*$/.test(n.toString(2));
}

{% endhighlight %}

解法五：

{% highlight JavaScript %}
function isPowerOfTwo(x){
   return (
   x == 1 || x == 2 || x == 4 || x == 8 || x == 16 || x == 32 ||
   x == 64 || x == 128 || x == 256 || x == 512 || x == 1024 ||
   x == 2048 || x == 4096 || x == 8192 || x == 16384 ||
   x == 32768 || x == 65536 || x == 131072 || x == 262144 ||
   x == 524288 || x == 1048576 || x == 2097152 ||
   x == 4194304 || x == 8388608 || x == 16777216 ||
   x == 33554432 || x == 67108864 || x == 134217728 ||
   x == 268435456 || x == 536870912 || x == 1073741824 ||
   x == 2147483648);
}

{% endhighlight %}

还有[更多解法](http://www.codewars.com/kata/534d0a229345375d520006a0)

##分析：

解法一：见识到了**位运算**的用处，真厉害啊！长见识了。

二进制的满足题意的n有以下特点（第一行）：

![](/images/posts/20150317230856.png)

也就是说位运算的结果始终为0。而对于不满足题意n（不为2的非负整数幂）的数，位运算后始终为非0（还没想好怎么证明）。

解法二：数学知识，推导出**以2为底n的对数**的公式`Math.log(n)/Math.log(2)` 

![](/images/posts/20150317224203.png)

最后当且仅当m为整数时满足题意，所以用到求余运算符`%`。

解法三：递归，既然是2的非负整数幂，那我就一直一直往下除2呗。粗暴！我喜欢。

解法四: toString()方法，转换为二进制（见解法一图）。再正则表达式配合test()方法，直接返回true或false。机制！

解法五：就问你怕不怕！够简单，够粗暴！不过在这里有一个疑问，为什么只列举到2的31次方？[JavaScript最大数](https://cnodejs.org/topic/4fb3722c1975fe1e132b5a9a)？

##知识点：
1. test()方法，接受一个字符串参数，在模式与该参数匹配的情况下返回true，否则返回false。在只想知道其文本内容的情况下，使用这个方法非常方便。
2. [JavaScript中位运算的应用](http://www.zhihu.com/question/21592697)

以上。



