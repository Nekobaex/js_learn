# `Map, WeakMap`
## 创建
```js
// 空 Map
let bar = new Map();

// 以对象或映射的 .entries() 结果作为参数
let foo = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);
console.log(foo);
```
## 结构分析
和对象类似, 可以使用键值对存储数据, 但 `Map` 可以使用任意类型的键与值, 且不会转换类型.  



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
## 属性和方法
- `Map`
    - `keys()`
    - `values()` 
    - `entries()`