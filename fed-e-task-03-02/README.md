### Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化
■ 1.请简述 Vue 首次渲染的过程。
 - 首先进行Vue的初始化，初始化Vue的实例成员以及静态成员。
 - 当初始化结束之后，开始调用构造函数，在构造函数中调用this._init()，这个方法相当于我们整个Vue的入口。
- 在_init()中调用this.\$mount()，共有两个this.$mount()。
    
   ①第一个this.\$mount()是entry-runtime-with-compiler.js入口文件，这个$mount()的核心作用是帮我们把模板编译成render函数，但它首先会判断一下当前是否传入了render选项，如果没有传入的话，它会去获取我们的template选项，如果template选项也没有的话，他会把el中的内容作为我们的模板，然后把模板编译成render函数，它是通过compileToFunctions()函数，帮我们把模板编译成render函数的,当把render函数编译好之后，它会把render函数存在我们的options.render中。
 => src\platforms\web\entry-runtime-with-compiler.js
=> 如果没有传递render，把模版编译成render函数
=> compileToFunction()生成render()渲染函数
=> options.render=render
  
   ②第二个this.\$mount()是runtime/index.js中的this.\$mount()方法，这个方法首先会重新获取el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
=> src\platforms\web\runtime\index.js
=> mountComponent()
- 接下来调用mountComponent(),mountComponent()是在src/core/instance/lifecycle.js中定义的，在mountComponent()中，首先会判断render选项，如果没有render，但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器。接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。
- 然后定义了updateComponent()，在这个方法中，定义了_render和_update，_render的作用是生成虚拟DOM，_update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上来。
- 再接下来就是创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，这个函数最终是在Watcher内部调用的。在Watcher创建完之后还调用了get方法，在get方法中，会调用updateComponent()。
- 然后触发了生命周期的钩子函数mounted,挂载结束，最终返回Vue实例。
![vue首次渲染](https://upload-images.jianshu.io/upload_images/7522654-e22462fea1aba3c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


■ 2、请简述 Vue 响应式原理。
　Vue2.0+版本 的响应式原理核心是通过 ES5 的保护对象的 Object.defindeProperty 中的访问器属性中的 get 和 set 方法，data 中声明的属性都被添加了访问器属性，当读取 data 中的数据时自动调用 get 方法，当修改 data 中的数据时，自动调用 set 方法，检测到数据的变化，会触发dep的notify通知观察者 Wacher，观察者 Wacher调用update方法自动触发重新render 当前组件（子组件不会重新渲染）,生成新的虚拟 DOM 树，Vue 框架会遍历并对比新旧虚拟 DOM 树中每个节点的差别，并记录下来，最后把不同点渲染到真实 DOM 树上。因为用的Object.defindeProperty只能对属性进行监听， 所以要深度遍历每个对象，对象的新增删除也检测不到，所以vue
3.0采用了proxy，可以对整个对象进行劫持
![响应式原理](https://upload-images.jianshu.io/upload_images/7522654-e35257db481bb6f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


■ 3、请简述虚拟 DOM 中 Key 的作用和好处。
v-for遍历的时候，能够追踪每个节点的身份，在进行新旧虚拟DOM节点比较的时候，会基于key的变化重新排列元素的顺序，从而重用和重新排序现有的元素，并且移除key不存在的元素，方便在diff过程中找到对应的节点，然后复用，从而减少dom的操作。


■ 4、请简述 Vue 中模板编译的过程。
 
```
 /** 通用的 Vue 文件格式*/
<template>
<!-- 模版-->
</template>

<script>
// 生命周期函数 一些事件逻辑处理
</script>

<style lang="scss" scoped rel="stylesheet/scss">
<!-- css 样式或者 scss / less 等样式预处理语言-->
</style>
```
编译时主要是对 template 里面的内容进行编译。script 可以直接使用，style 也是可以直接抽离出来使用或者进行样式预处理。

#### 整体编译过程：
模板编译的入库是compileToFunctions,先从缓存中加载编译好的render函数，如果没有就去调用compile函数合并选项，然后调用baseCompile(参数：合并好的选项)编译模板。之后通过调用createFunction函数，把baseCompile中生成的字符串形式JS代码转化为函数形式。当render和staticRenderFns初始化完毕，挂载到Vue实例的options对应的属性上
##### baseCompile函数
第一步将 ```模板字符串 转换成 element ASTs（parser 解析器）```
```
<div>
  <p>{{name}}</p>
</div>
```
把上面转为ASTs
```
{
  tag: "div"
  type: 1,
  // staticRoot: false,
  // static: false,
  plain: true,
  parent: undefined,
  attrsList: [],
  attrsMap: {},
  children: [
      {
      tag: "p"
      type: 1,
      staticRoot: false,
      // static: false,
      plain: true,
      parent: {tag: "div", ...},
      attrsList: [],
      attrsMap: {},
      children: [{
          type: 2,
          text: "{{name}}",
          // static: false,
          expression: "_s(name)"
      }]
    }
  ]
}
```
第二步```是对 AST 进行静态根节点，静态节点标记，主要用来做虚拟 DOM 的渲染优化（optimizer 优化器）```
主要是循环把上面的代码的 staticRoot 及 static 设为 true / false，patch过程中会跳过静态根节点
（只包含纯文本的静态节点不是静态根节点，因为此时的优化成本大于收益）
```
{
  tag: "div"
  type: 1,
  staticRoot: false,
  static: false,
  plain: true,
  parent: undefined,
  attrsList: [],
  attrsMap: {},
  children: [
      {
      tag: "p"
      type: 1,
      staticRoot: false,
      static: false,
      plain: true,
      parent: {tag: "div", ...},
      attrsList: [],
      attrsMap: {},
      children: [{
          type: 2,
          text: "{{name}}",
          static: false,
          expression: "_s(name)"
      }]
    }
  ]
}
```
第三步```是 使用 element ASTs 生成 render 函数代码字符串（generate代码生成器）```
主要是把上面的 element ASTs 转成下面的 render 函数代码串, _c 是 createElement，执行后也是创建 vnode 节点
```
with(this){
  return _c(
    'div',
    [
      _c(
        'p',
        [
          _v(_s(name))
        ]
      )
    ]
  )
}
```
![模板编译](https://upload-images.jianshu.io/upload_images/7522654-105a1eeb6f1a0d76.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







 
