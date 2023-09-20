import { pl, DataType } from 'nodejs-polars'

let s = pl.Series([1, 2, 3, 4, 5, 6, 7])

function seriesDelete(series = pl.Series(), index = -1) {
    index = index < 0 ? series.len() + index: index;

    let head = series.slice(0, index);
    let tail = series.slice(index + 1, series.len());

    let newSeries = head.concat(tail);

    return newSeries;
  }

function seriesInsert(series = pl.Series(), index= -1, value = 0) {
    // 可不要像 可怜的数组一样, 下标不能直接支持负数

    // 下标若为负数, 这转为对应的正数
    index = index < 0 ? series.len() + index + 1 : index;

    let head = series.slice(0, index);
    let tail = series.slice(index + 1, series.len());

    let newSeries = head
      .concat(pl.Series([value]))
      .concat(tail);

    return newSeries;
}

console.log(seriesInsert())