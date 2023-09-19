import polars from 'nodejs-polars'
const {
    pl,
    DataType
} = polars;
let s = polars.Series('a', [1, 2, 3, 1]);

console.log(DataType);