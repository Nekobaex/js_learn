# `Object`

`Object` 即对象, 是 js 中, 最重要的数据类型, 所有类型都继承自 `Object`.  
`Object` 内部不是完全空的, 有 3个继承的键: `valueOf`, `toString`, `toLocaleString`.  

创建:
  ```js
  // 下面两种方式都可以, 但第二种方法更常用, 更方便
  let a = new Object();
  let b = {};
  ```

结构分析:
  - 键 (key)
    ```js
    // 键名理论上只能是 String 和 Symbol, Symbol 情况后面再讨论.
    // 但实际上, 键名在"创建和访问"的时候, 可以用"所有原始类型"和"标识符".  
    // 只是储存的时候, 只以字符串的形式储存(不包括 Symbol).  

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
    // 输出结果: (键名全为字符串, 但输出时没有引号)
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
    ```js
    // 省略...
    ```

  - 值 (value)
    ```js
    // 值可以为任何类型的数据, 且不会自动转换.
    
    // 省略...
    ```

  - 引用
    ```js
    // js 中没有"指针和引用"的实质性概念.  
    // 但实际上, 每一个 Object 及其子类创建的对象, 都是一个对数据空间的引用
    
    // 因为每个新创建的对象, 都是新的空间引用, 所以各不相等
    // 但直接赋值, 则相等
    let a = {};
    let b = {};
    let c = b;
    a !== b;
    c === b;

    // 若两个对象的引用空间一样, 则两个对象的变化会同步
    let foo = {a: 123};
    let bar = foo;
    bar.a = 666;

    console.log(foo)
    // 输出: {a: 666}
    
    ```

访问:
  - 读取
    ```js
    // 点运算符
    // 可以为任何原始类型, 以及标识符, 除了字符串和数字
    // obj.123      // 报错
    obj.456n
    obj.true
    // obj.'hello'  // 报错, 但可以直接用 obj.hello
    obj.undefined
    obj.null
    obj.foo

    // 可空访问
    // js 中, 不能对 undefined 访问属性
    // 故若 abc, efg 都不存在的话, 第一种情况会报错
    // 但第二种情况, 一旦遇到一个 undefined, 就直接返回
    obj.abc.efg
    obj?.efg?.abc

    // 方括号运算符
    // 可以为任何原始类型, 以及标识符
    obj[123]
    obj[456n]
    obj[true]
    obj['hello']
    obj[undefined]
    obj[null]
    // obj[foo]     // 实际上访问的是 obj[foo的值]  
    ```
  
  - 更改
    ```js
    // 和读取同理, 可以当作变量, 直接赋值修改

    // 若有该键, 则为更改, 
    // 没有该键, 可直接新增
    obj.['newKey'] = 123

    // 将其他对象(origin)的所有 key, 复制到该对象(target)
    // 若有相同的 key, 则该对象中的 value 会被覆盖
    // (也可用于"浅层复制", 后面会提到)
    Object.assign(target, origin)
    ```

  - 删除:
    ```js
    // 删除对象自己的键,
    // 不能删继承得到的键
    delete obj.p
    ```

  - 检查
    ```js
    // 键是否存在
    // 检查键是否存在. (也可用于遍历, 后面会提到)
    a in foo

    // 大小
    Object.keys(obj).length

    ```

  - 遍历:
    ```js
    // 循环遍历
    // for in
    // 但不会遍历由继承得到的初始键
    for (let i in obj) {
      doSomething(i)
    }
    ```
  
  - 拷贝:
    ```js
    // 浅层拷贝
    let a = {};
    Object.assign(a, foo);

    // 深层拷贝 (使用 lodash 库)
    let a = _.cloneDeep(foo);
    ```

  - 面向对象:
    ```js
    // 现在基本使用 class 创建对象, 但有时需要一个独立的对象

    // 构造函数
    // new
    // this
    // prototype

    // 省略...
    ```