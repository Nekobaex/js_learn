# `BigInt`
`BigInt` 是一个可以有着无限长度的整数, 但在表达形式上, 为了和整数形式的 `Number` 产生区分, `BigInt` 类型的数字, 需要在最后面加上一个字母 `n`

创建:
  ```js
  // 字面值
  // BigInt 前半部分, 除了没有小数部分外, 可以完全使用 Number 的格式
  let foo1 = 123456n;     // 一般整数
  let foo2 = 1000_000n;   // 加上下划线 _ 分隔
  let foo3 = 9e5n;        // 科学计数法
  ```

运算: 
  ```js
  // 方式和 Number 完全一样
  // 但结果得到的只有 BigInt 形式的"整数"

  // 四则运算
  let a = 1n + 2n;
  let b = 3n - 4n;
  let c = 5n * 6n;
  let d = 7n / 8n;

  // mod
  let e = 9n % 2n;
  // pow
  let f = 10n ** 3n;
  ```

和 `Number` 互相转换:
  ```js
  let foo = 123;
  let bar;

  // 互相转换
  // 实际上是利用了各自的构造函数, 但不能加上 new
  bar = BigInt(foo);
  foo = Number(bar);

  // 相等比较 ("不等比较" 同理)
  123 == 123n  // true
  123 === 123n // false
  ```
