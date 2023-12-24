# `BigInt`
BigInt 是一个可以有着无限长度的整数

创建:
  ```js
  // 字面值
  // BigInt 前半部分, 除了没有小数部分外, 可以完全使用 Number 的格式
  let foo1 = 123456n;
  let foo2 = 1000_000n;
  let foo3 = 9e5n;   

  // 构造函数
  // 注意, 构造函数不能加 new
  let bar = BigInt(123_456);  
  ```

运算: 
  ```js
  // 方式和 Number 完全一样
  // 但结果得到的只有 BigInt 形式的"整数"

  // 四则运算
  let a = 1 + 2;
  let b = 3 - 4;
  let c = 5 * 6;
  let d = 7 / 8;

  // mod
  let e = 9 % 2;
  // pow
  let f = 10 ** 3;
  ```

和 `Number` 互动:
  ```js
  let foo = 123;
  let bar;

  // 互相转换
  bar = BigInt(foo);
  foo = Number(bar);

  // 相等比较 ("不等比较" 完全没问题)
  123 == 123n  // true
  123 === 123n // false

  ```
