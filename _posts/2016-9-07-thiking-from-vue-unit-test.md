---
layout: post
title:  "由写Vue.js的单元测试所想到的"
date:   2016-09-07
categories: [Test]
---

虽然Vue.js代码越堆越多，但却没有写过测试。`写测试越来越重要`的想法越来越强烈，是因为发觉随着程序逻辑的增加，自己已经无法完全把握，不能预见一个小的修改可能会造成的影响。
好在 [Vue-cli](https://github.com/vuejs/vue-cli) 在项目初始化的时候便可以提供完备的测试框架。这篇文章便是记录自己第一次写测试的点滴与思考吧。

## 坑

### Vue-cli

Vue-cli用[isparta](https://github.com/douglasduteil/isparta)来统计测试代码覆盖率。遇到的问题是Node不能找的该模块。在尝试了各种花式重装、Google后，决定放弃代码覆盖率相关的功能，移除了相关代码。

{% highlight JavaScript %}
// test/unit/karma.conf.js
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'isparta',
  include: path.resolve(projectRoot, 'src')
})
{% endhighlight %}

### nextTick

> Vue.nextTick( callback ) 延迟回调在下次 DOM 更新循环之后执行。在修改数据之后立即使用这个方法，等待 DOM 更新。

在使用Vue.js操作数据时，会引起视图的变化。在写测试时，操作数据很直接，通过`Vue.$set(property, newValue)` 或者 `vm.property = newValue`。但是要用`Vue.nextTick`来断言视图更新后的内容。

{% highlight JavaScript %}
// 方式一
import Vue from 'vue'
Vue.nextTick(() => {
    // ...
})

// 方式二
$vm.nextTick(() => {
    // ...
})
{% endhighlight %}

> 官方测试代码 https://github.com/vuejs/vue/blob/e314db1af1869353ef1e45a8258d15690538bf8c/test/unit/specs/watcher_spec.js

如果测试代码依赖多次嵌套的`nextTick`方法，意味着代码前置状态太多，也意味着数据耦合很紧密。应该将不同状态切分，减少前后数据的耦合。同时可能会遇到测试环境视图无法更新的问题。

### `document.createElement` 和 `vm.$mount()`

> vm.$mount( [elementOrSelector] ) 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素或片断。可以使用 vm.$mount() 手动地开始挂载/编译未挂载的实例。

在写Vue.js的单元测试时，其实是将所需测试的组件从上下文环境（真实的使用环境）抽离出来，单独渲染。所以在写测试的时候，要把组件挂载到测试文件的文档内。

两种方式：

{% highlight JavaScript %}
// 方法一
import Vue from 'vue'
import Hello from 'src/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><hello></hello></div>',
      components: { Hello }
    }).$mount()
    expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!')
  })
})

// 方法二
describe('v-pre', function () {
  it('should work', function () {
    var vm = new Vue({
      el: document.createElement('div'),
      template: '<div v-pre>{{a}}</div>',
      data: {
        a: 123
      }
    })
    expect(vm.$el.firstChild.textContent).toBe('{{a}}')
  })
}
{% endhighlight %}

### mocha-jsdom

[mocha-jsdom](https://github.com/rstacruz/mocha-jsdom)提供了在Node环境下浏览器的一些全局变量及其属性，比如`window`、`document`、`history`等。进而我们可以做一些`cookie`、`history.pushstate`等相关的测试。

在实际的编写测试的过程中，所有`spec.js`是共享`mocha-jsdom`提供的变量的。换句话说，在`a.spec.js`修改的`cookie`可以在`b.spec.js`感知到。 

### TDD / BDD

> http://chaijs.com/guide/styles/

两种不同断言书写风格，都很简单。重要的是，在项目中应该使用同一种风格。

## 思考

对于Web前端来说，写测试要涉及到东西有很多：

- UI/样式
- AJAX
- 异步
- 事件

这么多的东西不可能事无巨细的全都写测试。很明显的情况，频繁迭代的样式，我要怎么写？所以这么多需要测试的东西，在进行一些取舍的同时，也要对代码覆盖率有一定的弹性。

## 结束

在写测试的过程中，其实对自己代码的一种提升。如果想要自己在写测试时简单直接些，要对自己代码进行合理的规划、解耦和优化。

官方为Vue.js测试所写的代码真漂亮，值得学习。