# `Number`

`Number` 类型的数字, 理论上为 64位的双精度浮点数.  
但如果小数部分为 `0`, 则以整数的形式储存, 运算和输出.  

一般数字:
  ```js
  let billion = 1000000000;
  let micro = 0.0000001;
  ```

下划线分隔符:
  ```js
  // 下划线(_)没有实际含义, 但可以增强数字的可读性
  let billion = 1_000_000_000;
  let micro = 0.000_000_1;
  ```

科学计数法:
  ```js
  // 表示 1 * (10 ** 9)
  let billion = 1e9;

  // 表示 1 * (10 ** -6)
  let micro = 1e-6;
  ```

常用进制: 10, 2, 8, 16
  ```js
  // 下面的数字, 储存的值都为 255
  // 若直接 console.log(), 得到的结果也只有 255
  // 前缀的大小写不敏感, 0b 和 0B 表达的意思是一样的, 但尽量用小写
  let dec = 255;
  let bin = 0b11111111; // 2  进制, 前缀为 0b
  let oct = 0o377;      // 8  进制, 前缀为 0o
  let hex = 0xFF;       // 16 进制, 前缀为 0x
  let hexLower = 0xff;  // 在 16 进制数字中的字母, 大小写不敏感, 但尽量用大写

  ```

特殊值: `Infinity` 和 `NaN`
  ```js
    // Infinity 表示无穷大, 也可用 -Infinity 表示负无穷大
    let infinity      =  Infinity;
    let minusInfinity = -Infinity;

    // Infinity 也可通过计算得出;
    infinity      =  233/0; // 值为  Infinity
    minusInfinity = -233/0; // 值为 -Infinity

    // NaN 是 Not a Number 的缩写, 表示不是数字
    // 一般出现在类型转换的过程中, 将其他类型强制转换为数字, 但转换失败, 只能得到 NaN
    let nan = NaN;

    nan = Number('neko')  // 转换失败, 得到 NaN
  ```

运算:
  ```js
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

运算精度损失:
  ```js
  // 由于 js 中数字的底层原理 是按照 IEEE-754 格式存储的 64位浮点数
  // 所以在有浮点数参与的运算过程中, 不可避免地会出现精度损失问题
  // js 中有一个概念叫 `安全整数(safe integer)`, 可以解决一部分.

  let foo = 0;

  // 下面的这个循环永远不会结束
  /* while (foo != 2) {
    foo += 0.2;
  } */

  // 可以从下面这个循环看出来结果
  while (foo < 2.1) {
    foo += 0.2;
    console.log(foo);
  }

  
  ```

常用属性和方法:
- `Number`
  - 静态方法
    - `isNaN(value)`
    - `isFinite(value)`
    - `isInteger(value)`
    - 
    - `parseInt(string, radix?)`
    - `parseFloat(string)`
  - 动态方法
    - `toString(radix?)`
      ```js
        function printByRadix(number, radix) {

          // 可通过 toString 将数字转换为对应进制的字符串数字
          // radix 用数字表示进制
          // 取值范围: [2, 36]. 其中, 36 表示用 10个数字加上 26个英文字母
          let resultString = number.toString(radix);
          console.log(resultString)
        }

        // 将数字 255 转换为不同进制的字符串数字后, 再进行输出
        printByRadix(255, 10);
        printByRadix(255, 2);
        printByRadix(255, 8);
        printByRadix(255, 16);
        printByRadix(255, 36);
      ```
    - `toFixed(digits?)`
      ```js
      // 将数字转换 到对应"小数位"的数字字符串
      ```
    - `toPrecision(precision?)`
      ```js
      // 将数字转换 到对应"精确度"的数字字符串
      ```
  
- `Math`
  - 静态属性
    - `E`
    - `PI`
  - 静态方法
    - `abs()`
    - `sign()`
    - 
    - `random()`
    - 
    - `sqrt()`
    - `cbrt()`
    - 
    - `max()`
    - `min()`
    - 
    - 小数取整
      - `round()`
      - `ceil()`
      - `floor()`
      - `trunc()`
