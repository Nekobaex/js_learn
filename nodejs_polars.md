# nodejs-polars 教程
分 3 个部分:   
  - 介绍  
  - 数据类型 
  - 数据结构  

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

## 数据类型  
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

## 数据结构
分 4 个部分:
  - Series
  - DataFrame
  - Expr
  - LazyDataFrame

### 说明 
> 第 0 部分

对于一般数据结构的 功能与用途,  
可以通过一个四字词语来拓展, 即 "增删改查",  
而我具体划分如下:
  - 初始化
  - 访问 (查)
    - 值 (单个值)
    - 截取 (部分值)
    - 遍历 (多个值)
    - 坐标 (反查值)
    - 属性 (特殊值)
  - 插入 (增)
    - 直接插入 (正常)
    - 尾部插入 (快速)
  - 删除 (删)
    - 直接删除 (正常)
    - 删除后留空 (快速)
    - 删除空位 (批量处理)
  - 更改 (改)
    - 直接替换值
    - 批量填空位
  - 运算
    - 数学运算
      - 四则与取模
      - 小数
      - 统计
      - 累积
    - 比较运算
  - 转换
> 将 "查" 放到了前面, 并新增了 3 个功能: 初始化, 运算 与 转换

> 后面对 `Series`, `DataFrame`, `Expr` 的相关功能,  
> 也会按照上面的说明,让其更利于归类和记忆

### Series
**说明** 
类似于数组, 是最基础的结构,  
DataFrame 中的每一列都由 Series 构成,  
DataFrame 的每个列名即为各个 Series 的名字,  
为了和 DataFrame 按照行列匹配,   
所以 Series 实际上应该是 竖着的序列

**初始化**
  - 0 个参数:  
    得到没有名称的空 `Series`
    
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


**访问**
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

**插入** 
  - 中间插入  
    没有具体的实现方法, 可以自己按照数组的原理进行实现, 下面给出一个例子  
    ```js
    function seriesDelete(series = pl.Series(), index = -1) {
    index = index < 0 ? series.len() + index: index;
      
        let head = series.slice(0, index);
        let tail = series.slice(index + 1, series.len());
      
        let newSeries = head.concat(tail);
      
        return newSeries;
    }
    ```
  - 尾部插入
    `.extendConstant()`

**删除**  
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
  - 删除后留空  
    即把要删除的值变为 `null`
    `.shift()`
  - 删除空位  
    即去掉带 `null` 值的位置
    `.dropNulls()`
  

**更改**
  - 直接替换值
    `.shiftAndFill()`
  - 填充 `null`  
    把 `null` 都填充为其它值
    `.fillNull()`, `.interpolate()`

**运算**
  - 数学运算
    - 四则和取模
    - 小数
    - 统计
    - 累积
  
  - 比较运算
    
**转换**

### DataFrame

**说明**  
前面说到 Series 是最 Polars 里基础的的结构,  
那 DataFram 就是最常用且最方便的结构,  
可以把它看作是 excel 表格, 且每一列都由一个 Series 构成.  
DataFrame 与 Series, Expr 的一个比较大的区别,  
就是 DataFrame 可以直接从文件读取, 也可以写入为文件,  
在后面的 `转换` 部分会详细解释.

**初始化**
  


**访问**  

**插入**  
**删除**  
**更改**  
**运算**  

**转换**
  - io  
    - 概述  
    - 读取  
      `pl.readIPC()`,  
      `pl.readParquet`,  
      `pl.readAvro()`,  
      `pl.readJSON({format: 'json'})`, 
      `pl.readCSV()`
    - 写入  
      `df.writeIPC()`,  
      `df.writeParquet`,  
      `df.writeAvro()`,  
      `df.writeJSON({format: 'json'})`, 
      `df.writeCSV()`
    > 读取的方法, 是以 `pl.` 开头, 表示这是一个 `pl` 模块的工具,  
    > 将数据读出来, 然后可以赋值给变量

    > 而写入的方法, 是以 `df.` 开头, 这里指的是一个名字叫 `df` 的 `DataFrame` 变量,   
    > 而 `df.` 的那些方法, 表示将 `df` 中的数据, 写入到特定地方 

    > `ipc`, `parquet`, `avro` 都是二进制格式  
    > `JSON`, `CSV` 都是字符串格式

    > 如果不考虑广泛的兼容性, 只考虑性能的话,  
    > 建议使用 `ipc` 格式的文件进行写入和读取, 
    > 这里的 `ipc` 其实指的是 `Feather` 格式, 底层和 `Arrow` 格式相通, 
    > 读取写入的过程中, 占用内存比较小, 且速度极快,    
    > 并且对一些特定的数据类型可以压缩储存, 即除字符串外的其他类型

### Expr
**说明**
**初始化**

**访问**  

**插入**  
**删除**  
**更改**  
**运算**  

**转换**