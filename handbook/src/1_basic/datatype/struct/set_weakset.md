# `Set, WeakSet`

## 创建
```js
// 空 Set
let bar = new Set();
```
## 结构分析
集合, 可以存放任意类型, 但必须满足集合的基本要求.
`WeakSet` 弱合集, 和弱映射同理, 没有属性, 只有 `has(), add(), delete()` 方法.

## 访问
- 查询  
  - `set.size` 元素个数
  - `set.has(item)` 查询元素是否存在是否存在
- 更改  
    - `set.add(item)` 新增元素
- 删除  
    - `set.clear()` 清空
    - `set.delete(item)` 删除元素
- 遍历  
  - `set.forEach((item1, item2, set) => {})` 遍历, 使用方法和 `Array` 类似, 内部回调函数中, 前两个参数相等
  - `for of` 遍历每一个元素
## 属性和方法
- `Set`
    - `keys()`
    - `values()` 
    - `entries()`