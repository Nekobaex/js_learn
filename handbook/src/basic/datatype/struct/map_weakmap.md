# `Map, WeakMap`
## 创建
```js
// 空 Map
let bar = new Map();

// 以其他对象的 .entries() 结果作为参数
let foo = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);
console.log(foo);
```
## 结构分析
映射, 和对象类似, 可以使用键值对存储数据, 但 `Map` 可以使用任意类型的键与值, 且不会转换类型.  
`WeakMap` 弱映射, 没有属性, 只有 `has(), get(), set(), delete()` 方法, 若它的 `key` 被回收, 则对应的元素也会被回收.



## 访问
- 查询  
  - `map.size` 元素个数
  - `map.has(key)` 查询 `key` 是否存在
  - `map.get(key)` 通过 `key` 获取元素
- 更改  
  - `map.set(key, value)`
- 删除  
    - `map.clear()` 清空
    - `map.delete(key)` 通过 `key` 删除元素
- 遍历  
  - `map.forEach((item, key, map) => {})` 遍历, 使用方法和 `Array` 类似
  - `for of` 相当于使用 `map.entries()` 后进行 `for of`
## 属性和方法
- `Map`
    - `keys()`
    - `values()` 
    - `entries()`