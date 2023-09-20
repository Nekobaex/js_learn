# nodejs-polars 教程
分 3 个部分:   
  - 介绍  
  - 类型 
  - 结构  

## 介绍

#### 简要说明  
polars 原生代码是一个由 Rust 写的模块,  
主要功能是大数据处理与分析,
本文介绍它在 服务端 js 上实现的模块 
> ps: 主流服务端 js 环境有 Node, Bun, Deno, 而 `nodejs-polars` 在上面都可以运行  

#### 与其他类似模块的关系  
polars 功能类似于 Python 里的 Pandas,  
与类似的数据分析模块兼容性比较好, 上手快, 
但由于 polars 底层是由 Rust 实现的,  
且采用了同样由 Rust 实现的 Arrow2 数据结构,  
所以处理数据的速度非常快.  

而它拥有独特的 懒加载模式, 以及表达式结构,  
让它的能力更为强大

#### 开始使用
```bash
> yarn add nodejs-polars
```
> 注意不要用 `yarn add polars`
```javascript
import { pl } from 'nodejs-polars'

console.log(pl) 
```

> 期中使用的 `{ pl }` 说明 `pl` 是其中的子模块,  
> 但其他同层级的子模块,
> 要么是从 pl 中重导出的, 要么是其他功能的中间业务层.  
> 所以只用导出其中的 `pl` 这一个子模块,
> 需要用到的函数, 变量等也都是通过 `pl.` 来访问.

## 类型  
分 3 个部分:
  - 数字
  - 特殊值
  - 结构  

### 数字  
  - 4 个 `Int`: `Int8`, `Int16`, `Int32`, `Int64`
  - 4 个 `UInt`: `UInt8`, `UInt16`, `UInt32`, `UInt64`
  - 2 个 `Float`: `Float32`, `Float64`

### 特殊值
  - 最重要: `Utf8`, `Bool`
  - 次重要: `Date`, `Null`
  - 不重要: `Categorical`

### 结构
  - `List`
  - `Struct`
> 以上所有类型都可通过 `pl.` 访问, 以下是对某些类型的解释  

> `Utf8` 即字符串  
> `Date` 可直接使用 js 原生的 `Date()` 类
> `Null` 即 `null` 值
> `Categorial` 表示特征值, 主要用于数据排序, 暂无太大用途  
> `List` 即数组结构  
> `Struct` 即对象结构, 但在 polars 中具体表现为, 用上大括号的数组, 且有一些位置问题, 故暂无太大用途

## 结构
分 3 个部分:
  - Series
  - DataFrame
  - Expr

### 说明 
> 第 0 部分

对于一般数据结构的 功能与用途,  
可以通过一个四字词语来拓展, 即 "增删改查",  
而我具体划分如下:
  - 特性
  - 初始化
  - 访问 (查)
    - 值 (单个值)
    - 截取 (部分值)
    - 遍历 (多个值)
    - 坐标 (反查值)
    - 属性 (特殊值)
  - 插入 (增)
  - 删除 (删)
  - 更改 (改)
  - 运算
> 将 "查" 放到了前面, 并新增了 3 个功能: 特性, 初始化, 计算

> 后面对 `Series`, `DataFrame`, `Expr` 的相关功能,  
> 也会按照上面的说明,让其更利于归类和记忆

### Series
**特性 :**  
类似于数组, 是最基础的结构,  
DataFrame 中的每一列都由 Series 构成,  
DataFrame 的每个列名即为各个 Series 的名字,  
为了和 DataFrame 按照行列匹配,   
所以 Series 实际上应该是 竖着的序列,

**初始化 :**
  - 1 个参数:  
    - (`字符串`), 得到有确定名称的 空 `Series`
      ```js
      let s = pl.Series('foo')
      console.log(s)

      // 输出:
      // shape: (0,)
      // Series: 'foo' [f64]
      // [
      // ]
      ```
      > `shape` 表示 Series 的形状,  
      > 第一个数字为 Series 的高度 (前面说明了 Series 是竖向的),  
      > 第二个数字在 DataFrame 表示列宽,  
      > `Series` 列数固定为 1, 故第二个数字空缺 
    - (`数组`), 得到没有名称, 有值的 `Series`
      ```js
      let s = pl.Series([1, 2, 3])
      console.log(s)

      // 输出:
      // shape: (3,)
      // Series: '' [f64]
      // [
      //         1.0
      //         2.0
      //         3.0
      // ]
      ```

  - 2 个参数:  
    (`字符串`, `数组`), 得到有确定名称, 有值的 `Series`
      ```js
      // 省略
      ```

  - 3 个参数:  
    (`字符串`, `数组`, `数据类型`), 得到有确定名称, 有值, 有确定类型的 `Series`
    ```js
    let s = pl.Series('foo', [1, 2, 3], pl.Int8)
    console.log(s)

    // 输出:
    // shape: (3,)
    // Series: 'foo' [i8]
    // [
    //         1
    //         2
    //         3
    // ]
    ```
    > 若不确定具体类型, 则数字默认为 `pl.Float64`  

    > `数据类型` 部分, 只能用 `pl.` 形式的类型, 
    > 而不要用 `String`, `Data` 之类的类型


**访问 :**
  - 值  
    通过和数组一样的下表形式访问值
    > 但可怜的 `数组`, 下标使用 '负数' 只会得到 `undefined`,  
    > 除非使用 `arr.at(index)`, 才能通过下表逆顺序访问元素

    > 而高贵的 `Series`, 下表可以直接使用 '负数' 逆顺序访问元素
    
    ```js
    let arr = [1, 2, 3]
    let s = pl.Series('foo', arr, pl.Int8)
    console.log(arr[-1])
    console.log(arr.at(-1))
    console.log(s[-1])

    // 输出
    // undefined
    // 3
    // 3
    ```
 
  - 截取  
    - 取样: `.sample()`, `.head()`, `.tail()`
    - 条件截取 `.filter()`, `.slice()`, `.take()`, `.takeEvery()`, `.unique()`
    > filter() 参数为数组掩码, 但可以在其中放一个函数, 返回数组
    > take() 参数为坐标数组, 返回对应坐标的值
    > takeEvery(n) 返回一个从第一个值开始的, 坐标差为 n 的等差数列

  - 遍历  
    由于 `for in` 循环会返回对应变量里的所有属性与方法,   
    故不适用用于 `Series`, 所以应该使用 `for of` 遍历器
    ```js
    let s = pl.Series([1, 2, 3])
    for (let i of s){
        console.log(i)
    }

    // 输出
    // 1
    // 2
    // 3
    ```
    > 至于使用 `for in` 是什么体验, 可以自己去试一下

  - 找坐标

  - 属性
    - 名称: `.name`  
    - 类型: `.dtype`  
    - 长度(高度): `.len()`

**插入 :**
  - 直接插入  
    没有具体的实现方法, 可以自己按照数组的原理进行实现, 下面给出一个例子  
    ```js
    function seriesInsert(series, index, value) {
      // 可不要像 可怜的数组一样, 下标不能直接支持负数

      // 下标若为负数, 这转为对应的正数
      index = index < 0 ? series.len() + index + 1 : index;

      let head = series.slice(0, index);
      let tail = series.slice(index + 1, series.len());

      let newSeries = head
        .concat(pl.Series([value]))
        .concat(tail);

      return newSeries;
    }
    ```
  - 尾部快速插入相同值
    `.extendConstant()`

**删除 :**  
  - 直接删除   
    也没有具体的实现方法, 下面自己实现一个
    ```js
    function seriesDelete(series, index) {
      index = index < 0 ? series.len() + index: index;

      let head = series.slice(0, index);
      let tail = series.slice(index + 1, series.len());

      let newSeries = head.concat(tail);

      return newSeries;
    }
    ```
  - 删除后留下 `null`  
    即把要删除的值变为 `null`
    `.shift()`
  - 删除 `null`  
    即去掉带 `null` 值的位置
    `.dropNulls()`
  

**更改 :**
  - 直接替换值
    `.shiftAndFill()`
  - 填充 `null`  
    把 `null` 都填充为其它值
    `.fillNull()`, `.interpolate()`

**运算 :**
  - 数学运算
    - 四则和取模
    - 小数取整
    - 统计
    - 累积
  
  - 比较运算
    

### DataFrame