# `Number`

## 静态属性
- `NaN`
- `POSITIVE_INFINITY`
- `NEGATIVE_INFINITY`
- `MAX_VALUE`
- `MIN_VALUE`
- `MAX_SAFE_INTEGER`
- `MIN_SAFE_INTEGER`
- `EPSILON`  
  1 与大于 1 的最小浮点数之间的差, 即 `2 ** -52`

## 静态方法
- `isNaN()`
- `isInfinity()`
- `isInteger()`
- `isSafeInteger()`
- 
- `parseInt(string, radix?)`
- `parseFloat(string)`
- 
- `toExponential(digits?)`  
  将数字转换为 "标准科学计数法" 形式的字符串, 并保留给定位数的小数

## 动态方法
-  
  ```js
  toString(radix?)
  toFixed(digits?)        // 将数字转换 到对应小数位的数字字符串
  toPrecision(precision?) // 将数字转换 到对应精确度的数字字符串
  toLocaleString(locales, options) // 将数字按照指定格式转换, 用途不大
  valueOf() // 由 new Number() 得到的数字, 可通过 `.valueOf()` 取得它的值
  ```