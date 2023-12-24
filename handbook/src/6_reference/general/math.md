# `Math`

## 静态属性
- `E`
- `PI`
- 
- `LN10`
- `LN2`
- `LOG10E`
- `LOG2E`
- `SQRT1_2`
- `SQRT2`

## 静态方法
- `abs()`
- `sign()`
- 
- `random()`
- 
- `sqrt()`
- `cbrt()`
- 
- `max()`
- `min()`
- 
- 
  ```js
  imul()    // 高性能整数乘法
  clz32()   // 32 位整数的前导 0 个数
  fround()  // 将数字转换为 单精度浮点数, 即 32位浮点数
  ```
- 
- 
  ```js
  atan2()  // "(0, 0) 到 (x, y)"线段与 x 正半轴之间夹角的弧度
  hypot()  // 几何平均数
  ```
- 
- 
  ```js
  pow(x, y) // x ** y
  exp(x)    // e ** x    == Math.pow(e, x)
  expm1(x)  // e ** x -1 == Math.pow(e, x) - 1 == Math.exp(x) - 1
  ```
- 
- 小数取整
  - `round()`
  - `ceil()`
  - `floor()`
  - `trunc()`
- 
- 三角函数
  - `sin()`
  - `cos()`
  - `tan()`
  - 
  - `asin()`
  - `acos()`
  - `atan()`
  - 
  - `sinh()`
  - `cosh()`
  - `tanh()`
  - 
  - `asinh()`
  - `acosh()`
  - `atanh()`
- 
- 对数
  - 
    ```js  
    log(x)    // ln(x)
    log1p(x)  // ln(x + 1)
    log10(x)  // ln(x) / ln(10)
    log2(x)   // ln(x) / ln(2)
    ```
