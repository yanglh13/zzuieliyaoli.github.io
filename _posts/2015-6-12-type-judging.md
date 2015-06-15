---
layout: post
title:  "JavaScript中变量类型的判断"
date:   2015-6-12
categories: [JavaScript学习]
---

我曾经有过疑问：为什么那么多框架都会封装各种isFunction、isArray等方法。经过一段时间的学习，这个问题的答案渐渐清楚。但是呢，有了答案也不行，俺要把相关函数整理一下。故有此文。


##问题的答案

首先，是浏览器的原因，一些类型判断的函数，如typeof、instanceof，判断出来的结果很不靠谱。（具体哪不靠谱，请翻阅《JavaScript框架设计》1.4类型的判断）

其次：由于JavaScript本身的动态性，每个变量仅仅是一个用于保存值的占位符而已。

在代码运行的过程中，变量可能会被改变类型。夸张点说，不到运行前的最后一刻，谁也没办法保证变量的类型是自己需要的那种。所以我们不能寄希望于运行环境或者程序员不去改变变量的类型，而是要在必要的时候进行变量类型的判定。

##变量类型判断总结

这不判断不知道，一判断吓一跳。需要判断的东西是在是多啊！除了基本的变量：Boolean、Undefined、Null、Number、String，引用类型Object、Array、Function，还有NaN、Array-Like、Window、Document、PlainObject、arguments、nodeList等。

天啦噜，还能不能让人好好写JavaScript了！

###Boolean、Number、String

	// 因为typeof不靠谱
	typeof new Boolean(false); // object
	typeof new Number(123); // object
	typeof new String("haha"); // object
	// 所以
	function isBoolean(para){
		return Object.prototype.toString.call(para) === "[object Boolean]"
	}
	function isNumber(para){
		return Object.prototype.toString.call(para) === "[object Number]"
	}
	function isString(para){
		return Object.prototype.toString.call(para) === "[object String]"
	}

	isBoolean(new Boolean(false)); // true
	isNumber(new Number(123)); // true
	isString(new String("haha"); // true
	
> 关于toString [Object.prototype.toString()-MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

###undefined

由于typeof对未定义变量和未初始化的变量都会返回undefined，所以我们需要另外找一个方法。

	// 注意，下面这个变量未定义
	// var age
	var name;
	typeof name; // undefined
	typeof age;  // undefined  

	function isUndefined(para){
		return void(0) === para;
	}
	isUndefined(age); // false
	isUndefined(name); // true



> 关于void（0） [void 运算符-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

从ES5开始，也可以在undefined上调用toString（）方法，会返回[object Undefined]。

	Object.prototype.toString.call(undefined); // [object Undefined]

###Null

	typeof null; // object（因为null是空对象指针）

null的判定很简单，就是和null进行对比就可以

	function isNull(para){
		return null === para;
	}

从ES5开始，也可以在null上调用toString（）方法，会返回[object Null]。

	Object.prototype.toString.call(null); // [object Null]

###Array

	typeof []; // object

ES5上有一个原生的判断方法。

	Array.isArray([]); // true
	 
依旧可以使用toString()方法

	Object.prototype.toString.call([]) // [object Array]

不使用 `[] instanceof Array`的原因在于跨框架（cross-frame）时，iframe里面的数组实例不是父窗口的Array的实例。

###Function

	// 方法一：直接使用typeof
	typeof new Function(); // function
	
我们知道，函数（Function）在JavaScript中是对象，而使得函数不同于其他对象的原因在于其内部有一个[[Call]]属性。ECMAScript定义typeof操作符对任何具有[[Call]]属性的对象返回“function”。所以，可以直接用咯~

	// 方法二：toString()
	Object.prototype.toString.call(new Function()); // function

> 关于[call] [http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html](http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html)

###isPlainObject、isEmptyObject

jQuery.isPlainObject 是用来判定是否为纯净的JavaScript对象。既不是DOM、BOM对象，也不是自定义“类”的实例对象，制造该函数的最初目的是用于深拷贝，避开像window那样引用自己的对象。

	function isPlainObject(obj) {
	  	// 首先排除基础类型不为Object的类型
	  	// 再排除DOM节点和Window对象
	  	if (!obj || toString.call(obj) !== "[object Object]" 
			|| obj.nodeType || jQuery.isWindow( obj ) ) {
	    	return false;
	  	}
	
		// 判断obj是否为自定义“类”的实例对象
	  	if (obj.constructor && !hasOwnProperty.call(obj, "constructor") 
			&& !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
	    	return false;
	  	}
		
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

	  	var key;
	  	for (key in obj) {}
	
	  	return key === undefined || hasOwnProperty.call(obj, key);
	}

`isEmptyObject`用于数据缓存系统，当对象为空时，可以删除它。

	function isEmptyObject(obj) {
	  	for (var name in obj) {
	    	return false;
	  	}
	  	return true;
	}

###NaN

传统的方法是isNaN（），它在接收到一个值以后，会尝试将这个值转换为数值。任何不能被转换为数值的值都会返回true。

	isNaN("NaN") // true
	isNaN(NaN) // true
	isNaN(10) // false

而在ES6中，在Number对象上添加了isNuN方法，即Number.isNaN()。该方法只对数值有效，而对非数值一律返回false；

	Number.isNaN("ss"); // false
	Number.isNaN(NaN); // true
	Number.isNaN("NaN"); // false

###arguments

在非严格模式下：

	function isArguments(para){
		return para.callee !== undefined;
	}

不得不佩服toString的高效，严格与非严格都可以用。

	function isArguments( para ) {
    	return Object.prototype.toString.call( para ) === '[object Arguments]';
	}

> [http://stackoverflow.com/questions/7656280/how-do-i-check-whether-an-object-is-an-arguments-object-in-javascript/](http://stackoverflow.com/questions/7656280/how-do-i-check-whether-an-object-is-an-arguments-object-in-javascript/)

###Array-Like

	function isArraylike( obj ) {
		var length = obj.length,
			type = jQuery.type( obj );
		if ( jQuery.isWindow( obj ) ) {
			return false;
		}
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
		return type === "array" || type !== "function" &&
			( length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj );
	}

[http://stackoverflow.com/questions/21115849/is-isarraylike](http://stackoverflow.com/questions/21115849/is-isarraylike)


###NodeList

	function isNodeList(nodes) {
	    var stringRepr = Object.prototype.toString.call(nodes);
	
	    return typeof nodes === 'object' &&
	        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
	        nodes.hasOwnProperty('length') &&
	        (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
	}

> http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript/

###Window

    function isWindow(obj) {
  	 return ['[object global]', '[object Window]', '[object DOMWindow]'].indexOf(Object.prototype.toString.call(obj)) >= 0
	}

> [http://stackoverflow.com/questions/9576283/jquerys-iswindow-method](http://stackoverflow.com/questions/9576283/jquerys-iswindow-method)


###Document

	function isDocument(para){
		return para.nodeType === 9;
	}

而`Object.prototype.toString.call(document)`则返回的是[object HTMLDocument]



##结束语

对于大部分类型，Object.prototype.toString.call()可破。如果考虑兼容性，则需要写一些奇形怪状的函数。

以上。