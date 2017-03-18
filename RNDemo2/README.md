# Demo2

## Demo 运行
* 终端打开工程目录。命令行：cd 工程目录
* 安装必要的依赖库。命令行：npm install
* run 工程。命令行：npm start

## Redux 基本概念 和 API
###### Store
* Store 就是保存数据的地方，类似于数据库。整个应用只能有一个 Store。Redux 提供createStore这个函数，用来生成 Store。

```
import { createStore } from 'redux';
const store = createStore(fn);
注释：createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。通常是 处理函数 reducer 。
```
###### State
* Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。当前时刻的 State，可以通过store.getState()拿到。

```
import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();
注释：Redux 规定， 一个 State 与 一个 View是一一对应的关系。
```

###### Action
* 交互过程中，用户只能通过 View 来改变 State ,而action就是 View 发出的通知，及时修改Store中存放的相应 State 。
* Action 是一个对象。其中的type属性是必须的，表示 Action 的名称，其他属性可以自由设置 。
* View 要发送多少种消息，就会有多少种Action。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

action对象 示例：
```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
Action Creator示例：

```
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text：text
  }
}

const action = addTodo('Learn Redux');
```
###### store.dispatch()
* store.dispatch()是 View 发出 Action 的唯一方法。

```
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch(
    {
        type: 'ADD_TODO',
        payload: 'Learn Redux'
    }
);

或

function addTodo(text) {
  return {
    type: ADD_TODO,
    text：text
  }
}
store.dispatch(addTodo('Learn Redux'));
```

###### Reducer
* Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
* Reducer 其本质是一个纯函数，主要工作是逻辑处理，它接受 Action 和当前 State 作为参数，返回一个新的 State。
* 实际应用中，Reducer 函数可以通过设置让其自动调用。具体方法：store.dispatch方法原本就可以触发 Reducer 的自动执行；但在此之前，Store 需要知道 Reducer 函数；所以做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```
import { createStore } from 'redux';
const store = createStore(reducer);
注释：createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
```

* 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象
```
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

###### store.subscribe()
* Store 允许使用store.subscribe(fn)方法,来监听函数fn，一旦 State 发生变化，就自动执行这个 fn 函数。

```
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
注释：显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）listener，就会实现 View 的自动渲染。
```
* store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

```
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```
###### 小结
* 1> Redux 提供  createStore(fn) 方法。

```
const store = createStore(reducer);
注释：store 接收 该 reducer 函数，所以在此后 store 接受到 action 之后会自动处理并更新 相应的 state 。
```
* 2> Store 提供了dispatch() 方法。

```
store.dispatch(addTodo('Learn Redux'));
注释：View 产生交互之后，发送 通知给 store 。
```

* 3> Store 提供了subscribe() 方法。

```
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
注释：Store 在交互处理之后获取到 新的 State ，及时更新 View。
```

* 4> Store 提供了getState() 方法 ： 获取当前时刻的 State。

### 参考资料
* [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
* [Redux 文档及案例](http://cn.redux.js.org/docs/basics/Store.html)
