---
layout: post
title:  "Mobile Touch Event"
date:   2016-3-17
categories: [生活随笔]
---

The touchend are not fired properly on Android if event.preventDefault() is not used on touchstart and touchmove.

[This is a demo](../../touch-event.html)

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

1. https://www.zhihu.com/question/24730319
2. https://code.google.com/p/android/issues/detail?id=19827
3. http://blog.mobiscroll.com/working-with-touch-events/
4. https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW6
5. https://www.douban.com/note/425950082/
