# `Array`

因为数组 `Array` 继承自对象 `Object`, 
所以数组的键理论上都是 字符串.  
但如果数组的键都为从 0 开始按顺序的整数形式, 且中间几乎没有空元素,   
那么 js 引擎会在底层对数组进行优化, 让它变得类似 c/c++ 形式的数组. 但从外部直接访问, 键仍是字符串.

## 创建
```js
  let a = [1, 2, 3];          // [1, 2, 3]        快速简单创建
  let b = new Array(1, 2, 3); // [1, 2, 3]
  let c = new Array(999);     // (999)[空 x999]   创建指定长度数组, 并可用 fill 填充
  let d = Array.of(1, 2, 3);  // [1, 2, 3]        函数式
  let e = Array.of(1);        // [1]
  let f = Array.from('foo')   // ['f', 'o', 'o']  拆解可迭代对象
```
## 结构分析
- 长度
  可动态变化, `length` 属性表示其长度

- 坐标  
  相当于对象里的 `key`, 理论上为字符串, 但常用数字访问, 底层也可能为数字
  从 0 开始, 若使用 `.at(index)` 方法, 可访问负数坐标, 即从右侧开始索引
  相当于对象里的 `key`, 理论上为字符串(底层优化可能为整数), 但常用数字访问.
  for(let i in [0]) { console.log(typeof i); }

- 元素
  相当于对象里的 `value`, 按照坐标顺序排布, 可以储存任意数据类型

- 空槽与稀疏数组  
  以下情况会产生空槽: 使用 `delete` 删除数组中的元素, 或对一个大于 `length` 的坐标赋值, 直接赋值 length 让他变大.  
  有空槽的数组被称为 "稀疏数组".  
  有些数组方法会跳过空槽, 有些则将他们视为 `undefined`, 故尽量不要生成稀疏数组.


- 引用
  和对象同理, 数组本身是一个空间引用

## 访问
- 查询  
  通过坐标查元素: 方括号运算符(`[]`), 不能使用点元素符, 因为数字形式的坐标只能通过数字或字符串访问.
  坐标从 `0` 开始. 但利用 `array.at(index)` 方法, 可从利用负数访问尾端元素.

  通过元素查找坐标: `array.indexOf/lastIndexOf(item)`,  若查找失败, 返回 `-1`.
  查找元素是否存在: `array.includes(item)`, 返回 `true/false`.
  
  ```js
  let foo = ['a', 'b', 'c', 'd'];

  console.log(foo[0]);
  console.log(foo.at(0));
  console.log(foo.at(-1));
  // 输出:
  /*
    a
    a
    d
  */

  // indexOf

  // includes

  ```
- 更改  
  与对象类似, 和读取同理, 直接赋值修改.
  但 `array.at(index)` 是只读的方法, 不能更改值, 只能通过方括号运算符(`[]`)更改值.

  数组自带了类似栈和队列的操作方法: `push(), pop(), shift(), unshift()`, 其中 `shift(), unshift()` 由于是在开头增减元素, 会导致所有元素坐标整体的改变, 所以性能较差.
  ```js
    // 直接赋值修改
    let foo = ['a', 'b', 'c'];
    foo[1] = 666;
    // foo.at(2) = true  // 报错
    console.log(foo);
    // 输出: ['a', 666, 'c']

    // 栈和队列 (会改变原数组)
    let result1 = foo.pop()         // 移除了末尾的 'c', 存放到 result1 中
    let result2 = foo.push(true)    // 向末尾增加一个元素 true, 并返回数组长度到 result2 中
    let result3 = foo.shift()       // 与 pop 类似, 但移除开头的元素
    let result4 = foo.unshift(123n) // 与 push 类似, 但向开头添加元素
  ```
- 删除  
  可以使用对象的 `delete`, 但被删除的位置会留下空槽, 形成稀疏数组, 尽量不要使用.  
  使用上一节(更改)中的 `pop(), shift()` 更好.  
  也可直接赋值 `length`, 使其变小, 便可以删掉尾端的元素.
  ```js
  let foo = ['a', 'b', 'c', 'd', 'e'];

  // delete
  delete foo[0];  // foo = [空, 'b', 'c', 'd', 'e'];

  // pop(), shift()
  foo.pop();      // foo = [空, 'b', 'c', 'd'];
  foo.shift();    // foo = ['b', 'c', 'd'];

  // length
  foo.length = 1; // foo = ['b'];

  ``` 
- 复制  
  `array.slice(start?, end?)` 切片, 参数左闭右开, 浅层复制.  若不带参数, 默认复制全部.

  `array.concat(...values)` 拼接, 将 `values` 中的所有数组, 向前浅层复制并合并, 最终合并到调用函数的 `array`, 并产生一个浅层复制的返回值, 但不会更改 `array`.
  ```js
  // slice
  let foo = ['a', 'b', 'c', ['d', 'e']];
  let bar1 = foo.slice();
  let bar2 = foo.slice(2, 4);
  bar1[3][0] = true;
  console.log(foo);
  console.log(bar1);
  console.log(bar2);
  // 输出:
  /*
    ['a', 'b', 'c', [true, 'e']]
    ['a', 'b', 'c', [true, 'e']]
    ['c', [true, 'e']]
  */

  // concat
  let a = [1, 2, 3];
  let b = a.concat([3, 4], [4, 5]);
  console.log(a);
  console.log(b);
  // 输出:
  /*
    [1, 2, 3]
    [1, 2, 3, 3, 4, 4, 5]
  */
  ```

- 遍历  
  `for in` 遍历所有坐标.  
  `for of` 遍历所有元素.  
  `array.forEach((item, index, array) => {})`,  
  中途不会停止, 且外部返回值为 `undefined`.  
  `array.map((item, index, array) => {})`,  
  将内部的所有返回值组合成一个数组, 返回到外部.  
  `array.filter((item, index, array) => {})`,  
  将内部返回 `true` 时的 `item` 组成一个数组, 返回到外部.  
  `array.reduce/reduceRight((accumulator, item, index, array) => {}, initial?)`,  
  每一次遍历的内部返回值, 会成为下一次遍历 `accumulator` 的值, 第一次的值由 `initial` 提供.
  `array.find/findLast((item, index, array) => {})`,  
  内部返回 `true` 时停止, 外部返回停止时的 `item`.  
  `array.findIndex/findLastIndex((item, index, array) => {})`,  
  内部返回 `true` 时停止, 外部返回停止时的 `index`.  
  `array.some((item) => {})`, 内部至少有一个 `true`, 则外部返回 `true`, 否则返回 `false`.  
  `array.every((item) => {})`, 内部全部为 `true`, 则外部返回 `true`, 否则返回 `false`.  
- 排序  
  `array.sort((left, right) => {})`,  
  内部返回 1 表示左侧应向右排, 返回 0 表示同等次序, 返回 -1 表示左侧应向左排,  
  会改变调用的数组 `array`.

- 其他  
  翻转数组: `array.reverse()`, 会改变调用的数组 `array`.

- 其他属性和方法
- Array
  - 动态属性
    - `length` 数组的长度
  - 静态方法
    - `isArray()`
  - 动态方法
    - `keys()`
    - `values()`
    - `entries()` 
    - 
    - `fill()`
    - `flat()`
    - `flatMap()`
    - `join()`
    - `reverse()`
    - `splice()`
    - `toReversed()`
    - `toSorted()`
    - `toSpliced()`
    - `with()`