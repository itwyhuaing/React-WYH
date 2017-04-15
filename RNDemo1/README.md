# Demo1

## Demo 运行
* 终端打开工程目录。命令行：cd 工程目录
* 安装必要的依赖库。命令行：npm install
* run 工程。命令行：npm start

## 新建工程 ： 从0到1
* 环境配置，[安装Node.js和npm(Mac OS X 10.11.6)](http://www.jianshu.com/p/d35e1b495dd8) , [React开发环境搭建(Window)](https://github.com/lostlz/first-react-project)；在全局中安装 webpack：npm install webpack -g

* 新建目录 RNDemo1 ，然后终端中cd到该目录下 ,在该目录下生成 package.json 文件 ；如下图，
  ![image](https://github.com/itwyhuaing/YHReactDemo/blob/master/RNDemo1/images/d1_1.png)

  会出现一系列配置信息填写，这里也可以暂且不填；回车键之后最终会出现如图所示提示：
  ![image](https://github.com/itwyhuaing/YHReactDemo/blob/master/RNDemo1/images/d2_2.png)

  此处回车之后，我们的目录如下：
  ![image](https://github.com/itwyhuaing/YHReactDemo/blob/master/RNDemo1/images/d3_3.png)

* 在 RNDemo1 目录下先创建基本工程所需文件，如下：
  ![image](https://github.com/itwyhuaing/YHReactDemo/blob/master/RNDemo1/images/d4_4.png)

## 补充
* 配置文件 package.json 及 webpack.config.js 的简单介绍如下图：
 ![image](https://github.com/itwyhuaing/YHReactDemo/blob/master/RNDemo1/images/pz_1.png)

 ![image](https://github.com/itwyhuaing/YHReactDemo/blob/master/RNDemo1/images/pz_2.png)

* package.json 文件配置
  * Babel 是什么？Babel 是一个 JavaScript 编译器。使用它可以将ES6的语法转换为ES5的语法，以便在现在有的环境执行。

* 工程运行前需要先打包编译，该操作依赖于 webpack 库 ； webpack.config.js 文件也是为该操作的一些配置。
  * entry 指定 webpack 打包编译的入口文件
    1. 单个文件打包为单个输出文件，直接写该文件的名字，例如：entry:"index.js"
    2. 多个文件打包为单个输出文件，将文件名放进一个数组，例如：entry:['index.js',’xx.js’]
    3. 多个文件打包为多个输出文件，将文件名放入一个键字对，例如：entry:{a:'index.js',b:’xx.js’}
  * output 是定 打包结果文件名及位置
    1. path为定义输出文件夹，filename为打包结果文件的名称。
    2. 如果有多个输出文件就是上面第三种情况 ，filename里面需写成 [name].文件名.js ，[name] 为entry中的 键 数组。
  * loaders 项里面表示用来加载这种类型的资源的loader 。里面是字典元素，可能含有的字段及其意义：
    1. test，是一段正则，表示进行匹配的资源类型。
    2. exclude ，指定应该被忽略的文件。
    3. query ， 2种写法

### 参考资料
* [NPM常用命令](http://www.cnblogs.com/PeunZhang/p/5553574.html)
* [webpack基础+webpack配置文件常用配置项介绍+webpack-dev-server](http://www.cnblogs.com/QxQstar/p/5961387.html)
* [npm package.json属性详解](http://www.cnblogs.com/tzyy/p/5193811.html#_h1_20)
* [WebPack介绍](http://www.68kejian.com/app/detail.html?id=76&&c=442&&name=WebPack介绍)
##### 系列文章
* [react+redux框架配置从无到有直到正常运行全流程（上）](http://blog.csdn.net/lx376693576/article/details/54591142) 、[ react+redux框架配置从无到有直到正常运行全流程（下）](http://blog.csdn.net/lx376693576/article/details/54602957)

* [深入浅出React（一）：React的设计哲学 - 简单之美](http://www.infoq.com/cn/articles/react-art-of-simplity)、[深入浅出React（二）：React开发神器Webpack](http://www.infoq.com/cn/articles/react-and-webpack)、[深入浅出React（三）：理解JSX和组件
](http://www.infoq.com/cn/articles/react-jsx-and-component/)
