---
layout: post
title:  "「译」JavaScript’s new #private class fields"
date:   2017-5-6
categories: [JavaScript]
---

> 它们（指类的私有字段）是什么，它们怎么工作，以及它们为什么是这样

这首歌 [“Noise Pollution” — Portugal. The Man](“Noise Pollution” — Portugal. The Man) 和这篇文章更配哦！

## 正文

[类的私有字段](https://github.com/tc39/proposal-class-fields#private-fields)（private class fields，下同）
这个 JavaScript 语言新特性的提案已经处在第二阶段了（Stage 2）（[JavaScript 语言新特性的演进流程](http://2ality.com/2015/11/tc39-process.html)）。
虽然这个提案还没完全确定下来，但是 JavaScript 标准委员会期望这个特性能够最终被加入到标准内。
也就是说，虽然该提案有调整的可能，但是极大可能不会被废弃。


类的私有字段的语法看起来是这个样子的：

```js
class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  equals(point) {
    return this.#x === point.#x && this.#y === point.#y;
  }
}
```

这个语法有两个重点：

- 定义私有字段
- 引用（Referencing）私有字段

### 定义私有字段

定义私有字段和定义共有字段（defining public fields）几乎一样：

```js
class Foo {
  publicFieldName = 1;
  #privateFieldName = 2;
}
```

在使用私有字段的时候，你必须先定义它。也可以只定义字段，但不初始化字段的值。

```js
class Foo {
  #privateFieldName;
}
```

### 引用私有字段

除了有一点特别的语法外，引用私有字段和获取其它属性没有什么区别。

```js
class Foo {
  publicFieldName = 1;
  #privateFieldName = 2;
  add() {
    return this.publicFieldName + this.#privateFieldName;
  }
}
```

`this.#` 可以被简写为 `#`：

```js
method() {
  #privateFieldName;
}
```

等同于：

```js
method() {
  this.#privateFieldName;
}
```

### 引用实例的私有字段

获得私有字段的引用不只局限于类中的 `this`。
你同样可以通过类的实例来获得私有字段的值：

```js
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}
Foo.getPrivateValue(new Foo()); // >> 42
```

`foo` 是 `Foo` 的一个实例，所以我们可以在 `Foo` 定义内查找到 `#privateValue`。

### 类的私有方法的提案（敬请期待？）

类的私有方法的提案作为 [类的字段提案](https://github.com/tc39/proposal-class-fields) 的一部分，目的只是完善类的相关特性，不会对现有类方法做任何修改。
类的私有方法的提案会紧跟着[类的私有字段提案](https://github.com/tc39/proposal-private-fields/blob/master/METHODS.md)
