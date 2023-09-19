
function foo(){
    let a = 1
    function bar(){
        let b = 1
        a ++
        b ++
        console.log(a)
        console.log(b)
    }

    return bar
}
let barClosure = foo()
barClosure()
// 输出:
// 2
// 2

barClosure()
// 输出:
// 3
// 2