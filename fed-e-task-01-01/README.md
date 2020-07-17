# fed-e-task-01-01
作业第一阶段
简答题

l、请说出下列最终的执行结果，并解释为什么

var a = [];

for(var i=0;i<10;i++){
  a[i] = function(){
    console.log (i);
  }
}
a[6]();
答案：打印出10，由于for循环并不是一个函数体，作用域为for循环所在的函数体，这里就是全局，所以i是个全局变量，在循环结束后已经是10了，循环结束后，a里面是10个函数f，循环结束去调用此时i已经是10；

2、请说出下列最终的执行结果，并解释为什么

var tmp =123;

if (true) {
  console.log(tmp);
  let tmp;
}

答案：报错，ES6明确规定，如果区块中存在let命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域，暂时性死区，未声明就引用，所以报错，let不存在变量提升

3、结合ES6新语法、用最简单的方式找出数组中的最小值?

var arr=[12,34,32,89,41];
答案：Math.min(...arr);

4、请详细说明var，let， const三种声明变量的方式

之间的具体差别
答案：一.var是全局作用域和函数作用域，应以在函数体内的话，就是函数体内作用域，子级函数可以访问，没有定义直接用的就是全局变量，是个undefined，var也可以先定义不赋值，var还存在变量提升的问题
二.let是块级作用域，if语句和for语句里面的{ }也属于块级作用域。变量声明之前就访问变量的会报错，而且let不允许在相同作用域内，重复声明同一个变量
三.const 和 let 的作用域是一致的，不同的是 const 变量一旦被赋值，就不能再次赋值了，而且const 声明的变量必须经过初始化。但是定义复合类型数据，因为数组对象是指向一个指针，所以只能保证指针地址是固定的，里面数据还是能够改变

5、请说出下列代码最终输出的结果，并解释为什

var a=10;
var obj = {
  a:20,
  fn(){
    setTimeout(() =>{ 
      console.log(this.a)
    })
  }
}
obj.fn();
答案：20 先运行fn，把setTimeout放进宏任务，fn运行结束，开始运行setTimeout，此时this指向的是obj，在非箭头函数下， this 指向调用其所在函数的对象

6、简述 symbol类型的用途
答案：
类似于一种标识唯一性的ID
iterator迭代器；
定义私有属性，实例上访问不到symbol属性



7、说说什么是浅拷贝，什么是深拷贝
答案：拷贝一个对象的时候，只对是基本数据类型的对象属性进行了拷贝，而对是引用数据类型的对象属性，只是进行了引用的传递，而没有真实的创建一个新的对象，则认为是浅拷贝，而对引用数据类型的对象属性进行拷贝的时候，创建了一个新的对象，并且复制其内的成员变量，则认为是深拷贝

8、谈谈你是如何理解jS异步编程的， Event Loop是
做什么的、什么是宏任务，什么是徴任务?
答案：由于javascript是单线程的，只能在JS引擎的主线程上运行的，所以js代码只能一行一行的执行，但是有时候计算时间过长会造成堵塞，影响后面的执行，造成用户的等待时间过长，所以利用js的循环机制Event Loop来实现异步操作，当js执行引擎的时候，会把同步任推到执行栈按照顺序执行这些任务，异步任务会被放到任务队列里面等待js引擎执行，当执行栈中所有同步任务执行完毕，js引擎就会去任务队列里面看看是否有任务存在，并把存在的任务推到执行栈中执行，执行完毕再去任务队列里面看看是否有任务存在，并把存在的任务推到执行栈中执行，这种循环检查机制就叫事件循环机制Event Loop

Event Loop的执行顺序是：
首先执行执行栈里的任务。
执行栈清空后，检查微任务（microtask）队列，将可执行的微任务全部执行。
取宏任务（macrotask）队列中的第一项执行。
回到第二步。
注意： 微任务队列每次全执行，宏任务队列每次只取一项执行。


宏任务：script(整体代码) setTimeout setInterval 交互事件等
微任务：promise.then Object.observe MutationObserver process.nextTick(Node.js环境)

9、将下面异步代码使用 Promise改进
setTimeout(function () {
  var a ='hello';
  setTimeout(function () {
    var b='lagou';
    setTimeout(function (){
      var c = "I ❤ U";
      console.log(a + b +c)
    },10);
  },10);
},10);

答案：
Promise.resolve('hello')
  .then(res=>{
    return new Promise(resolve=>{
      var b=res + 'lagou';
      resolve(b);
    })
  }).then(res=>{
    var c = res + "I ❤ U";
    console.log(c);
  }).catch(error=>{
    console.log('error:',error)
  })

//等10
new Promise(resolve=>{
  setTimeout(()=>{
    resolve('hello');
  },10)
}).then(res=>{
  return new Promise(resolve=>{
    var b=res + 'lagou';
    setTimeout(()=>{
      resolve(b);
    },10)
  })
}).then(res=>{
  var c = res + "I ❤ U";
  setTimeout(()=>{
    console.log(c);
  },10)
}).catch(error=>{
  console.log('error:',error)
})

10.请简述 Typescript与 javascript之间的关系
Typescript是javascript一种超级，它可以编译成纯 JavaScript，typeScript增加了静态类型、类、模块、接口和类型注解，并且对Es6支持

11、请谈淡你所认为的 Typescript优缺点
Typescript优点:增加了可读性可维护性，静态类型化，也易于重构，更安全，在编码时候就会体现出很多错误，不用等到编译的时候，节省时间
Typescript缺点:不够灵活，必须定义类型，和一些第三方库结合的还不是很完美，需要自己写declare，开发成本增加