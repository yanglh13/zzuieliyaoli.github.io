---
layout: post
title:  "写出更好的 JavaScript 代码（四）——《Clean Code》笔记"
date:   2017-9-2
categories: [JavaScript]
---

在本文是关于 `写出更好的 JavaScript 代码` 的第四篇文章，也是 《Clean Code》第六章与第七章的笔记，也做了 Java 到 JavaScript 的转换。

## 对象和数据结构

- 将变量设置为私有（Private）有一个理由：我们不想其他人依赖这些变量。我们还想在心血来潮时能够自由修改其类型或实现。
那么，为什么还是有那么多程序员给对象自动添加赋值器（setter）和取值器（getter），将私有变量公之于众、如同它们根本就是公共变量一般呢？

- 隐藏实现并非只是在变量之间放上一个函数层那么简单。隐藏实现关乎抽象！类并不简单地用取值器和赋值器将其变量推向外间，
而是暴露抽象接口，以便用户无需了解数据的实现就能操作数据本体。

  ```js
  // bad
  class Vehicle {
    getFuelTankCapacityInGallons() {}
    getGallOnsOfFasoline() {}
  }

  // good
  class Vehicle {
    getPercentFuelRemaining() {}
  }
  ```

  前者使用具象手段与机动车的燃料层通信，而后者则采用百分比抽象。你能确定前者里面都是些变量存取器，而却无法得知后者中的数据形态。

  我们不愿意暴露数据细节，更愿意以抽象形态表述数据。这并不是用接口/或赋值器、取值器就万事大吉。
  要以最好的方式呈现某个对象包含的数据，需要做严肃的思考。傻乐着乱加取值器和赋值器，是最坏的选择。


- 对象把数据隐藏于抽象，暴露操作数据的函数。数据结构暴露其数据，没有提供有意义的函数。

```js
// 过程式形状代码
// Geometry 类操作三个形状类。形状类都是简单的数据结构，没有任何行为。
// 行为都在 Geometry 类中
class Square {
  topLest;
  side;
}

class Rectangle {
  topLeft;
  height;
  width;
}

class Circle {
  center;
  radius;
}

class Geometry {

}
```



## 错误处理
