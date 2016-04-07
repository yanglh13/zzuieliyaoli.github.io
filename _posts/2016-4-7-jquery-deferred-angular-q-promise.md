---
layout: post
title:  "jQuery Deferred、Angular $q、ES6 Promise"
date:   2016-4-7
categories: [promise]
---

jQuery中的Deferred()、Angular中的$q()、ES6中的Promise都是为了解决异步而各自实现或定义的方法。

## jQuery Deferred()

#### 直接通过调用`$.Deferred()`可以返回一个新的deferred对象。

<a class="jsbin-embed" href="http://jsbin.com/ruwoso/embed?js,console">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>


#### 调用`$.Deferred()`时是可以传入一个函数，这个函数会先于`$.Deferred()`返回（A function that is called just before the constructor returns.）。

```JavaScript
var deferred = $.Deferred(before);
function before() {
  console.log('before function runs!');
  setTimeout(function(){
    deferred.resolve('a');
  }, 1000);
}

deferred.then(function(para){
  console.log(para);
  console.log('then function runs');
});
```

<a class="jsbin-embed" href="http://jsbin.com/kepuba/embed?js,console">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>


#### Deferred.promise()

<a class="jsbin-embed" href="http://jsbin.com/loseta/embed?js,console">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>

The Promise exposes only the Deferred methods needed to attach additional handlers or determine the state (`then`, `done`, `fail`, `always`, `pipe`, `progress`, `state` and `promise`).

<a class="jsbin-embed" href="http://jsbin.com/powofi/embed?js,console">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>


But not ones that change the state (`resolve`, `reject`, `notify`, `resolveWith`, `rejectWith`, and `notifyWith`).

<a class="jsbin-embed" href="http://jsbin.com/zeqevoy/4/embed?js,console">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>

If `target` is provided, `deferred.promise()` will attach the methods onto it and then return this object rather than create a new one. This can be useful to attach the Promise behavior to an object that already exists.

If you are creating a Deferred, keep a reference to the Deferred so that it can be resolved or rejected at some point. Return only the Promise object via `deferred.promise()` so other code can register callbacks or inspect the current state.

<a class="jsbin-embed" href="http://jsbin.com/gicavo/embed?js,console">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.12"></script>
