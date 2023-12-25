# `Object`

`Object` 即对象, 是 js 中, 最重要的数据类型, 所有类型都继承自 `Object`.  
`Object` 内部不是完全空的, 有 3个继承的键: `valueOf`, `toString`, `toLocaleString`.  

## 创建
  ```js
  // 下面两种方式都可以, 但第二种方法更常用, 更方便
  let a = new Object();
  let b = {};
  ```

## 结构分析
- 键 (key)  
  键名理论上只能是 `String` 和 `Symbol`(`Symbol` 情况后面再讨论)  
  但实际上, 键名在"创建和访问"的时候, 可以用 "所有原始类型"和"标识符"  
  只是储存的时候, 只以 `String` 的形式储存(不包括 `Symbol`)  

  ```js

  let obj = {
    123: 1,       // Number
    456n: 2,      // BigInt
    true: 3,      // Boolean
    'hello': 4    // String
    undefined: 5, // undefined
    null: 6,      // null
    foo: 7,       // 标识符, 即变量名, 函数名等
  };

  console.log(obj);
  // 输出结果: (键名全为字符串, 但这里输出时没有引号)
  /* {
    123: 1
    456n: 2     
    true: 3     
    hello: 4   
    undefined: 5
    null: 6    
    foo: 7      
  } */
  ```

- 临时计算键  
  将键名用中括号包裹, 表示键名由对应的变量的值表示
  ```js
  let key = 'foo' + 123;

  let obj = {
    [key]: 'neko'
  };

  console.log(obj);
  // 输出结果:
  /*
    {foo123: 'neko'}
  */
  ```

- 值 (value)  
  值可以为任何类型的数据, 且不会像键名一样自动转换.
  ```js
  let obj = {
    a: 123,
    b: 123n,
    c: true,
    e: '123',
    f: undefined,
    g: null,
    h: {'aa': 112233},
    i: [123, 456, [7, 8, 9]],
    j: new Set(3, 1, 4, 1)
  }

  // 123    '123'
  obj.c !== a.e

  ```

- 引用  
  js 中没有"指针和引用"的实质性概念.  
  但实际上, 每一个 Object 及其子类创建的对象, 都是一个对数据空间的引用.

  每个新创建的对象, 都是新的空间引用, 各不相等.
  但如果直接复制, 则会相等.

  若直接更改变量的值, 则原来空间及其内部的值不会改变
  ```js
  // 相同的对象, 不同的对象
  let a = {};
  let b = {};
  let c = b;
  a !== b;
  c === b;

  // 更改同一空间内部的值
  let foo1 = {a: 123};
  let bar1 = foo1;
  bar1.a = 456;
  console.log(foo1)
  // 输出: {a: 666}

  // 若直接更改变量的值
  let foo2 = {a: 123};
  let bar2 = foo2;
  foo2 = 456;
  console.log(bar2);
  // 输出: {a: 123}
  
  ```

## 访问
- 读取  
  包括点运算符(`.`)和方括号运算符(`[]`),  
  其中点运算符, 可访问的键名为任意原始类型的值, 以及标识符, 但不包括字符串和数字,  
  方括号运算符, 可访问的键名为任意原始类型的值, 若用标识符, 则表示以对应变量的值作为访问键名.  

  点运算符可以进行可空访问, 访问过程中, 只要遇到一个 `undefined` 或 `null` 即停止, 并返回 `undefined`.
  ```js
  // 点运算符
  // obj.123      // 报错
  obj.456n
  obj.true
  // obj.'hello'  // 报错, 但可以直接用 obj.hello
  obj.undefined
  obj.null
  obj.foo

  // 方括号运算符
  obj[123]
  obj[456n]
  obj[true]
  obj['hello']
  obj[undefined]
  obj[null]
  // obj[foo]     // 实际上访问的是 obj[foo的值]  

  // 可空访问
  // js 中, 由于不能对 undefined 访问属性
  // 故若 abc, efg 都不存在的话, 第一种情况会报错
  // 但第二种情况, 一旦遇到一个 undefined, 就直接返回
  obj.abc.efg
  obj?.efg?.abc

  ```

- 更改  
  和读取同理, 可以当作变量, 直接赋值修改

  若有该键, 则更改其值, 
  没有该键, 则直接新增一个键值对
  ```js
  obj.newKey1 = 123
  obj['newKey2'] = 456
  ```

- 删除  
  删除对象自己的键, 不能删继承得到的键.
  ```js
  delete obj.p
  ```

- 检查
  ```js
  // 检查键是否存在

  // 检查所有的键, 包括继承的键
  a in foo

  // 检查只属于自己的键, 
  // 但如果有了自定义 hasOwnProperty 属性, 就无法检查了, 即最好不要用对象存储不确定数据
  foo.hasOwnProperty('abc')
  ```

- 遍历:
  `for in` 只会遍历对象自己的键, 和'检查键是否存在'中的 `in` 不同
  ```js
  // 循环遍历
  // for in
  // 但不会遍历由继承得到的键
  for (let i in obj) {
    console.log(i)
  }
  ```

- 复制:
  ```js
  // 浅层复制
  // 将其他对象(origin)的所有 key, 复制到该对象(target)
  // 若有相同的 key, 则该对象中的 value 会被覆盖
  let origin = {
    a: 'aaa',
    b: 'bbb',
  }
  let target = {
    b: 'bbbbbb',
    c: 'cccccc'
  };
  Object.assign(target, origin);
  console.log(target)
  // 输出:
  /*
    {a: 'aaa', b: 'bbb', c: 'cccccc'}
  */

  // 深层复制 (使用 lodash 库)
  let a = _.cloneDeep(foo);
  ```

## 面向对象  
  在比较早的时候, js 对象和类是一体的, 对象可被对象继承, 对象也可被对象实现.  
  但现在基本使用 `class` 创建类, 并将对象自身的功能简化.  
  在进阶篇会讲到 `class`, 并简单介绍一下 js 的 `prototype`(即对象的类属性)

## 常用属性和方法
- `Object`
  - 静态方法
    - `assign()`
      (在上面的 '复制' 中讲过)
    - 
    - `keys(object)`  
      将对象的 key 复制提取出来, 组成一个数组
      ```js
      // 可以此获取对象的 key 数目
      Object.keys(obj).length

      // 下面的 values(), entries() 同理, 分别将 值, 键值对 提取出来
      ```
    - `values(object)`
    - `entries(object)`
    - 
    - `is(value1, value2)`  
      用来静态地判断两个值是否相等,  
      比 === 更表面化, 但引用不同, 值仍然不同
      ```js
      Object.is(NaN, NaN);  // true
      Object.is(0  , - 0);  // false
      NaN === NaN           // false
      0   === - 0           // true

      let a = {};
      let b = {};
      Object.is(a, b);  // false
      a === b;          // false
      ```
  - 动态方法  
    - `hasOwnProperty()`  
      (在上面的 '检查' 中讲过)
      