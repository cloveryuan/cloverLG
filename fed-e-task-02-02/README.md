### 一、简答题
- 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
  Webpack初始化，生成compiler对象，compiler的run方法执行就开始编译和构建，构建从入口文件开始entry，识别源码中模块化导入语句，递归生成依赖树（Module），然后把不同的资源给不同的loader加载器进行处理，在所有模块及其依赖模块 build 完成后，webpack 会监听 seal 事件调用各插件对构建后的结果进行封装，要逐次对每个 module 和 chunk 进行整理，生成编译后的源码，合并，拆分，生成 hash最后输出到输出文件

- 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
    Loader用于对模块文件进行编译转换和加载处理，在module.rules数组中进行配置
    编写 Loader 时要遵循单一原则， 每个loader都要返回一个函数。 拿到的入参是源文件内容（source），可以通过返回值的方式将处理后的内容输出，返回javascript一段代码


    plugin是各种插件，用于扩展Webpack功能，实现原理是在构建流程里注入钩子函数，在plugins数组中进行配置。
    plugin实际是一个类(构造函数),通过在plugins配置中实例化进行调用，开发步骤class创建一个构造函数，写入apply方法，参数为compiler表示这次打包的上下文，指定挂载的webpack事件钩子compiler.hooks，事件第一个参数传入插件名字，第二个函数，入参为compilation，写入插件逻辑，最后要重写compilation.assets。


### 二、编程题
- 1、使用 Webpack 实现 Vue 项目打包任务
具体任务及说明：

先下载任务的基础代码：https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip

这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构

有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）

这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

尽可能的使用上所有你了解到的功能和特性

作业要求
本次作业的中的编程题要求大家完成相应代码过后，录制一个小视频简单介绍一下实现思路，演示一下相应功能。最终将录制的视频和代码统一提交至作业仓库。