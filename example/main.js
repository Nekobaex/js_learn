import { pl } from 'nodejs-polars'

let s = pl.Series('a', [1, 2, 3, 1]);

let d = pl.DataFrame({
    'a': [1, 2, 3],
    'b': [4, 5, 6]
}, {
    schema: {
        'a': pl.Int8,
        'b': pl.Int8
    }
})


console.log(d.std())