---
layout: post
title:  "this 值的总结"
date:   2014-12-22
categories: [JavaScript]
---

### 一、函数字面量（function literal）

      //创建一个名为 add 的变量，并用来把两个数字相加的函数值赋值给它
	  var add = function (a, b) {
		  return a + b;
	  }


##### 函数字面量分为四个部分：

1. 保留字**function**
2. 函数名，可以被省略
  - 作用：可以通过自己的名字来调用自己，也可以被调试器和开发工具用来识别函数。
  - 省略函数名后，被称为**匿名函数（anonymous）**
3. 包围在圆括号中的一组参数
4. 包围在花括号中的一组语句

##### 总结：函数字面量可以出现在任何允许表达式出现的地方。函数也可以被定义在其他函数中，一个内部函数除了可以访问自己的参数和变量，同时它也能自由访问把它嵌套阿紫其中的父函数中的参数和变量。

#### 二、函数调用

在JavaScript中，函数一共有4种调用模式，这些模式在如何初始化**this**存在差异：

1. 对象的方法调用方式

	当一个函数被保存为对象的一个属性时，称为**方法**

		//创建 objectExample对象，其拥有name属性，sayName()方法
		//sayName()方法中，this为自己所属的对象（objectExample）
		var objectExample = {
			name: "test",
			sayName: function(){
				return this.name;
			}
		};
		console.log(objectExample.sayName()); // test

2. 函数调用模式

	**this被绑定到全局对象**

		//全局变量name
		//创建 objectExample对象，其拥有name属性，sayName()方法
		var name = "The Window";
		var objectExample = {
			name: "The Object",
			sayName: function(){
				var innerFun = function(){
					alert(this.name);
				}();
			}
		};

		objectExample.sayName();  // The Window



3. 构造器调用模式

	如果在函数前面带上**new**调用则会创建一个连接到该函数的**prototype**成员的新对象，同时**this**会被绑定到新对象上。

		//创建 Example对象，其拥有name属性，为其原型添加sayName()方法
		var Example = function(string){
			this.name = string;
		};

		Example.prototype.sayName = function(){
			console.log(this.name);
		}

		var nE = new Example("Surprise");
		nE.sayName(); //   Surprise


4. **apply**调用模式

		//创建 Example对象，其拥有name属性，为其原型添加sayName()方法
		var Example = function(string){
			this.name = string;
		};

		Example.prototype.sayName = function(){
			console.log(this.name);
		}

		//构造一个包含status成员的对象
		var nameObject = {
			name: "Jim"
		};

		//nameObject并没有继承自Example.prototype,但是可以在nameStatus上
		//调用sayName()方法，尽管nameObject并没有一个名为sayName()的方法

		var name = Example.prototype.sayName.apply(nameObject);
		console.log(name);  // Jim


#### 三、this指向全局变量

1. 匿名函数

		var name = "The Window";
		var objectExample = {
			name: "The Object",
			sayName: function(){
				return function(){        // 匿名
					return this.name	  // 函数
				};
			}
		};
		console.log(objectExample.sayName()()); // The Window

2. 全局作用域

		var name = "The Window";
		function sayName(){
			alert(this.name);
		}
		sayName(); // The Window

####参考图书

> 《JavaScript语言精粹》

> 《JavaScript高级程序设计》
