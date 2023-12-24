# 数据类型
目录
  - 基础类型
    - `Number`
    - `BigInt`
    - `String`
    - `Boolean`
    - `undefined`
    - `null`
    - `Symbol`
  - 基础结构
    - `Object`
    - `Array`
    - `Map, WeakMap`
    - `Set, WeakSet`
  - 判断
    - `typeof`
    - `instanceof`
    - `Object.prototype.toString`
  - 转换

## 原始类型
一共有 7个原始类型.  
其中 `undefined` 和 `null` 都是单独的值, 
即一个值为一个类型, 
后面统一称呼它们为 "空" 或 "空类型".  
其他类型的名称即为各自所对应的类, 
它们各自都有对应的方法, 
用来处理数据, 而空类型没有方法.

除了空类型和 `Symbol` 以及 `BigInt` 之外, 
原始类型也可用 `new 类名(值)` 的形式创建.  

由 `new` 得到的值, 是一个类似 java 中的对象, 
而由字面量创建的原始值是一个类似 c 中的值.  
原始值只在需要调用方法时, 生成一个临时包装对象.  
并由它去调用方法, 自己没有变化, 临时包装对象也会在方法调用结束后销毁 


### `Number`

### `BigInt`

### `Boolean`

### `String`
> 完成数组后, 回过头来完成 String
字符串, 原理类似数组, 但不直接继承自数组.

unicode 字符:
  ```js
  
  ```



常用属性和方法
  - `String`
    - 动态属性
      - `length`  
        字符串的长度 

    - 静态方法
    - 
    - 动态方法

### `Symbol`

  let id = Symbol('id')

### `undefined, null`


## 基础结构
基础结构的通用操作方法:
  - 创建
  - 结构分析
  - 访问
    - 读取
    - 更改
    - 删除
    - 检查
    - 遍历
    - 拷贝

### `Object`
### `Array`
### `Map, WeakMap`
### `Set, WeakSet`

## 二进制
### `ArrayBuffer`
### `Blob`

## 判断

## 转换

## 包装



