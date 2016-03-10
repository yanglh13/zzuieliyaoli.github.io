---
layout: post
title:  "zhimg.com引起的知识点总结"
date:   2015-03-09
categories: [http学习]
---
今天不知怎么滴突然翻看了知乎的代码，发现如下URI ![My helpful screenshot](/images/posts/2015030802.png)

脑子里出现如下想法："这URI应该跟CDN有关吧？这不应该是跨域么？这么厉害？我得看看是如何跨域的。"

依旧谷歌关键词“CDN 跨域”，突然打开了一大片处（不）女（懂）地。发现问题不在CDN，而在cookie的相关内容。不过收获颇丰，学习了一些关于CDN的基础知识，顺道复习了cookie的一些知识。

以下是读书笔记。


## 问题的答案

1. 使用zhimg.com域名的原因如下:

    1.1 如果 Cookie 的数据量很大，那么用单独的图片域名就不会需要在每一个图片请求时都包括 cookie 数据，可以节约流量，提高性能；

	小实验： [http://bbs.chinaunix.net/forum.php?mod=viewthread&tid=1516896](http://bbs.chinaunix.net/forum.php?mod=viewthread&tid=1516896 "Cookie对网站流量影响测试报告")

    1.2如果有一个子域名下出现不和谐内容可能导致整个挂掉，用不同主域名可以规避这样的问题；

    1.3 浏览器对同一个域的并发请求数有限制；

    1.4 防止子网站出现漏洞，整个站点的session被劫持的影响；

    1.5 一些较小资源可以快速返回，使网页渲染更加迅速。

2. 弊端

    2.1 DNS解析时间，多一个域名，浏览器就要多解析一下；

    2.2 HTTP需要重新启动握手请求需要时间。

## cookie
1. cookie是绑定在特定的域名下的，当设定了一个cookie后，再给创建它的域名发送请求时，都会包含这个cookie；

2. cookie对于哪个域是有效的。所有向该域发送的请求中都会包含这个cookie信息。可以包含子域，比如 .liyaoli.com 对于liyaoli.com的所有子域都有效。如果没有明确设定，那么这个域会被认作来自设置cookie的那个域；

3. cookie与图片的缓存无关

    3.1 cookie用来唯一验证客户来自于发送的哪个请求。

    3.2 图片等资源的缓存是为浏览器更快的渲染（呈现）出页面。




## CDN
1. CDN(Content Delivery Network)内容分发网络，简单的说就是通过在不同的地点缓存内容，然后通过负载平衡等技术将用户请求定向到最近的缓存服务器上获取内容，提高用户访问网站的响应速度

2. CDN包括分布式存储、负载均衡、网络请求的重定向和内容管理，其中内容管理和全局的网络流量管理(Traffic Management)是CDN的核心所在。内容服务基于缓存服务器，也称作代理缓存(Surrogate)，这样的缓存服务器分布在各地，为就近用户提供服务，缓存内容从数据中心自动获取，对用户透明。

3. 流程  
   ![My helpful screenshot](/images/posts/2015030901.jpg)

    3.1 用户请求页面，域名解析的请求发送到网站的DNS域名解析服务器；

    3.2 网站的DNS服务器将请求指向到智能DNS负载均衡系统；

    3.3 智能DNS负载均衡系统对域名进行智能解析，将响应速度最快的CDN节点IP返回给用户；

    3.4 浏览器向速度最快的CDN节点发出访问请求；

    3.5 如果请求的内容是第一次访问，CDN节点将回到数据中心获取用户请求的数据，缓存并发给用户；

    3.6 当有其他用户再次访问同样内容时，CDN将直接将缓存数据返回给客户，完成请求/服务过程。

4. 好处

    4.1 加速网页浏览效能：因为已经将缓存资料放在最近的机房中，不需要重新向服务器读取；

    4.2 有效分流(频宽)：当所有用户都不再向同一个服务器读取资料，大幅降低集中流量；

    4.3 网站稳定度：网站流量分散后，网站的稳定度大幅提高，即使短暂当机也不怕用户无法使用；

    4.4 安全性增加：因网站透过CDN分散出去，较难直接攻击网站本体原文地址。

**参考文章：**

[http://www.ningoo.net/html/2008/what_is_cdn.html](http://www.ningoo.net/html/2008/what_is_cdn.html)

[http://newaurora.pixnet.net/blog/post/128995999-cdn ](http://newaurora.pixnet.net/blog/post/128995999-cdn )


## 跨域
1. 同域：要求两个站点同协议、同端口、同域名。

    比如：`http://www.liyaoli.com`

    ![My helpful screenshot](/images/posts/2015030801.png) （表格参考自《Web前端黑客技术揭秘》）
2. 什么情况下会产生跨域？

     ![My helpful screenshot](/images/posts/2015030902.png) （引自 [http://targetkiller.net/cross-domain/](http://targetkiller.net/cross-domain/)）


以上。

**参考资料：**

> [http://www.v2ex.com/t/170974](http://www.v2ex.com/t/170974)
