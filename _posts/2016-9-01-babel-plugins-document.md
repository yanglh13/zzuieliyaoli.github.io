---
layout: post
title:  "Babel-Plugins-Document"
date:   2016-09-01
categories: [Babel]
---

> http://babeljs.io/docs/plugins/

1. Babel is a compiler. At a high level, it has 3 stages that it runs code in: `parsing`, `transforming`, and `generation` (like many other compilers).
2.
    - Now, out of the box Babel doesn’t do anything. It basically acts like `const babel = code => code; ` by parsing the code and then generating the same code back out again.
    - You will need to add some plugins for Babel to do anything (they affect the 2nd stage, transformation).
3. Presets are sharable `.babelrc` configs or simply an array of babel plugins.
4. 
    - Ordering matters for each visitor in the plugin. This means if two transforms both visit “Program”, the transforms will run in either plugin or preset order.
    - Plugins run before Presets.
    - Plugin ordering is first to last.
