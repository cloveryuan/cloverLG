### 一、简答题
- 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})

答：1.点击按钮的时候动态给 data 增加的成员name不是响应式数据
2.响应式数据是在vue2.0+版本是在实例化的时候，利用object.defineproperty()对data数据进行劫持，每条数据加上get，set，对其进行监听，才能每次属性更新的时候及时的对订阅者发起通知。vue3.0版本是对利用proxy实现数据的双向绑定，Proxy可以直接监听对象而非属性，对数组的更改也都能监测到
3. Vue.set(target, key, value)   =》 this.$set(this.dog,'name','Trump')这样设置就是响应式的，
原理看vue.set的set方法，我们发现set函数接收三个参数分别为 target、key、val，其中target的值为数组或者对象，数组主要通过splice方法来让页面重新渲染，对象defineReactive(ob.value, key, val)给新加的属性添加依赖，也就是响应数据了

 

2、请简述 Diff 算法的执行过程
patch=init([])
Diff主要通过patch函数，比较新老虚拟dom的差异，把不同差异处渲染到真是的dom上

二、编程题
1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
 

2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
 

3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效