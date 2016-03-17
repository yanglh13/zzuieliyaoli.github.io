---
layout: post
title:  "Mobile Touch Event"
date:   2016-3-17
categories: [Mobile]
---

The touchend are not fired properly on Android if event.preventDefault() is not used on touchstart and touchmove.

[This is a demo, test with mobile](../demo/touch-event.html)

In other words, if you want to the touchend fired properly, you'd better add event.preventDefault() in touchstart or touchend handlers. However, it will prevent page scrolling. If you want the page effect is same as `One Page Scroll`, you can add event.preventDefault() in touchstart or touchend handlers.

Usually, I would like to add scroll event listener on window.

```

var tId = null;

document.addEventListener('scroll', function (event) {
    clearTimeout(tId);
    tId = setTimeout(function () {
        // do something...
    }, 100);
}, false);

```

### Reference

1. [安卓平台的浏览器 touchend 事件触发失效？](https://www.zhihu.com/question/24730319)
2. [Android - Google](https://code.google.com/p/android/issues/detail?id=19827)
3. [working-with-touch-events](http://blog.mobiscroll.com/working-with-touch-events/)
4. [SafariWebContent - Apple]( https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW6)
5. [如何修复移动浏览器上 touchend 事件不触发的bug](https://www.douban.com/note/425950082/)
