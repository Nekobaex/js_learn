# `tsconfig.json`

## 初始配置
```js
{
  "compilerOptions": {
    "strict": true,             // 开启所有严格模式
    "alwaysStrict": true,       // 等效于 "use strict"
    "strictNullChecks": true,   // 让 undefined 和 null 各自独立
    "noImplicitAny": true,      // 不允许出现隐式的 any 类型, 但可以显式使用 any
  }
}
```