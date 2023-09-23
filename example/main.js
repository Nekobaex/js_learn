import { pl, DataType } from 'nodejs-polars'

let s = pl.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])

function seriesDelete(series = pl.Series(), index = -1) {

  // 处理下标
  index = index < 0 ? series.len() + index: index;

  let head = series.slice(0, index);
  let tail = series.slice(index + 1, series.len() - index - 1);

  let newSeries = head.concat(tail);

  return newSeries;
}
// console.log(
//   seriesDelete(s, 3)
// )


let d = pl.DataFrame({
  'a': [1, 2, null],
  'b': [3, 4, 5]
})

d.map((item)=>{
  console.log(item)
})

console.log(s.shiftAndFill(3, 999))
console.log(d.shiftAndFill(3, 3))