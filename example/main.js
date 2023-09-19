import pl from 'nodejs-polars'
let s = pl.Series('a', [1, 2, 3, 1], pl.Int8)

console.log(s)