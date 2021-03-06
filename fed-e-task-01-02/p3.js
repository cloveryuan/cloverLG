/*
    代码题2
    基于下面提供的代码，完成后续的
    四个练习
*/
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let mayBe = Maybe.of([5, 6, 11])

/*练习1:
使用fp.add(x, y)和fp.map(f, x)创建一一个能让functor里的值增加的函数ex1
const fp = require('lodash/fp')
const { Maybe, Container }
require(' ./support')
let mayBe = Maybe.of([5, 6, 11])
let ex1 = // ...你需要实现的位置
*/
//let ex1 = mayBe.map(arr => fp.map(fp.add(1),arr))
let ex1 = mayBe.map(fp.map(fp.add(1)))
console.log(ex1)//Maybe { _value: [ 6, 7, 12 ] }







/*练习2:
实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = // ... 你需要实现的位置
*/
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
//let ex2 = xs.map(x => fp.first(x))
let ex2 = xs.map(fp.map(fp.first(x)))
console.log(ex2)// Container { _value: 'do' }



/*练习3:
实现-一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2，name: "Albert" }
let ex3 = // ...你需要实现的位置
*/
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2,name: "Albert" }
//let ex3 = safeProp('name',user).map(x=>fp.first(x))
//console.log(ex3)//A
let ex3 = fp.flowRight(fp.map(fp.first), safeProp('name'))
console.log(ex3(user))




/*练习4:
使用Maybe重写ex4，不要有if语句
let ex4 = function (n) {
    if (n) {
        return parseInt(n)
    }
}
*/
// let ex4 = function (n) {
//     return Maybe.of(n)
//         .map(x => parseInt(x))
// }
let ex4 = fp.flowRight(fp.map(parseInt), Maybe.of)
console.log(ex4(null))//null
