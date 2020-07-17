/**
 * 代码题1
 *  基于以下代码完成下面的四个练习
 */
const fp = require('lodash/fp')
//数据
// 1 horsepower 马力，dollar_ value价格，in_ stock 库存
const cars = [
    { name: "Ferrari FF", horsepower: 660,dollar_value: 700000, in_stock: true},
    { name: "Spyker C12 zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: " Audi R8", horsepower: 525 ,dollar_value: 114200, in_stock: false },
    { name: " Aston Martin One-77",horsepower: 750, dollar_value: 1850000,in_stock: true },
    { name: "Pagani Huayra", horsepower: 700,dollar_value: 1300000, in_stock: false }
]

/*练习1:
使用函数组合fp.flowRight()重新实现下面这个函数
let isLastInStock = function (cars) {
    //获取最后-条数据
    let last_ car = fp.1ast(cars)
    // 获取最后一 条数据的in_ stock 属性值
    return fp.prop('in_ stock', last_ car)
}
*/
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
let r1 = isLastInStock(cars);
console.log(r1)//false





/*练习2:
使用fp.flowRight() 、fp.prop() 和fp.first()获取第一个car的name
*/

let isFirstInStock = fp.flowRight(fp.prop('name'), fp.first)
let r2 = isFirstInStock(cars);
console.log(r2)//Ferrari FF



/*
练习3:
使用帮助函数_average 重构averageDollarValue, 使用函数组合的方式实现
let _average = function (xs) {
    return fp.reduce(fp.add, 0，xs) / xs.length
}// <-无须改动

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    },cars)
    return _average(dollar_values)
}
console.log(averageDollarValue(cars))//790700
*/
let _average = function (xs) {
    return fp.reduce(fp.add,0,xs) / xs.length
}

let averageDollarValueNew = fp.flowRight(_average, fp.map(m => m.dollar_value));
let r3 = averageDollarValueNew(cars)
console.log(r3)



/*
练习4:
使用flowRight写 一个sanitizeNames()函数，返回一个下划线连接的小写字符串，
把数组中的name转换为这种形式: 例如: sanitizeNames(["Hello World"]) => ["hello_world"]

let_ underscore = fp.replace(/ \s+/g, '_') //< --无须改动，并在sanitizeNames中使用它
*/
let _underscore = fp.replace(/\s+/g, '_')
let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower))
let r4 = sanitizeNames(["Hello World"])
console.log(r4)//[ 'hello_world' ]