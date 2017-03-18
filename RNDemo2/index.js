import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import Counter from './component/Counter';
import counter from './reducer/reducer'

const store = createStore(counter);

const render = () => ReactDOM.render
(
  <div>
    First React_Redux Project !
    <br />
    <Counter
    value = {store.getState()}
    onIncrement={() => store.dispatch({type:'INCREMENT'})}
    onDecrement={() => store.dispatch({type:'DECREMENT'})}
    />
  </div>,
  document.getElementById('root')
)
render()
store.subscribe(render)
