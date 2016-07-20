
## 需求描述

音乐人的歌曲，乐迷可以花钱来支持。要求如下：

1. 歌曲有最低价，即乐迷单次能够支持最低的钱；也有最高价，即乐迷能够单次支持最高的钱；

2. `input`输入框默认展示最低价。

3. 两种途径填写或者修改支付金额：`input`输入框和能够加或减的按钮。

4. 如果乐迷想要支持的钱数（money）低于最低价或者超出最高价时：

```JavaScript
if (money > Max) {
  mon
}
```

5. 不论乐迷如何更改input值，都需要在乐迷结束更改时，展示一个合理的值。
  - invalid value: 非数字、多个小数点
  - < min
  - > max

## 思考

初始值

状态值

value -> modify -> filter -> validate -> update view -> done