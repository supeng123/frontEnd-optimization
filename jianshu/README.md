
## Notes for latest Script

### basic jsx
~~~
** Need to import React to comiple jsx syntax
import React from 'react'
import ReactDOM from 'react-dom'

ReactDom.render(<app />, document.getElementById('root'))
~~~

### dangerouslySetInnerHTML
~~~
avoid cross site script attack

return (<li 
    key={index} 
    onClick={this.handleItemDelete.bind(this, index)}
    dangerouslySetInnerHTML={{__html: item}}
    ></li>)
virtual dom compare the same level node by the key value
~~~

### use htmlFor to replace for
~~~
<label htmlFor="insertArea"></label>
          <input 
          id = "insertArea"
          value={this.state.inputValue} 
          onChange={this.handleInputChange.bind(this)}
          className="input"
          />
~~~

### setState input can be function
~~~
const {value} = e.target
this.setState((prevState) => ({
    list: [...prevState.list, prevState.inputValue]
    inputValue: value
    })
~~~

### propTypes & defaultProps
~~~
TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    deleteItem: PropTypes.func,
    content: PropTypes.string.isRequired,
    index: PropTypes.number
}

//when parent component does not pass the value to children use defaultProps as default value
TodoItem.defaultProps = {
    test: 'helloworld'
}
~~~

### render fucntion
~~~
render function will be invoked whenever state or prop changes
when the parent render function invokes, the children render function will also be invoking
~~~

### ref
~~~
use ref to replace e.target
<input
    onChange = {this.handleInputChange.bind(this)}
    ref = {(input) => {this.input = input}}
/>

handleInputChange() {
    const value = this.input.value
    this.setState((prevState) => ({
        list: [...prevState.list, prevState.inputValue]
        inputValue: value
    }, () => {
        console.log(this.input.value)
    })
}
~~~

### hooks period
~~~
component will be invoking automatically during a certain period of time

the sequence of the hooks

Mounting period
componentWillMount => render => componentDidMount

Updating period
shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate

use shouldCompoentUpdate to avoid redundant update
shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
        return true
    }
    return false
}
~~~

### React hooks
~~~
import React, {useState, useEffect, useReducer, useRef} from 'react'

function counterReducer(state, action) {
    switch(action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}

function MyCountFunc() {
    const [count, setCount] = useState(0);

    const [countReduce, dispatchCount] = useReducer(counterReducer, 0)

    const inputRef = useRef()

    useEffect(() => {
        console.log('using effect')
        console.log(inputRef)
        const interval = setInterval(()=> {
            setCount(c => c+1)
            dispatchCount({type: 'add'})
        },1000)
        return () => clearInterval(interval)
    },[])

    return (<div ref>
        <span>{count}{countReduce}</span>
        <input ref={inputRef} value={name}/>
        </div>)
}

export default MyCountFunc


//second example about memo
import React, {useMemo, memo, useCallback} from 'react'
funciton MyCountFuncTwo() {
    const [count, dispatchCount] = useReducer(counterReducer, 0)
    const [name, setName] = useState('jok')

    const config = useMemo(() => ({
        text: `count is ${count}`,
        color: count > 3 ? 'red' : 'green'
    }),[count])

    const handleButtonClick = useCallback(() => dispatchCount(type: 'add'), [])

    return (
        <div>
            <input value = {name} onChange={e => setName(e.target.value)}  />
            <Child config={config} onButtonClick={handleButtonClick}>
        </div>
    )

    const Child = memo(function Child({onButtonClick, config}) {
        return(
            <button onClick={onButtonClick} style={{color: config.color}}>{config.text}</button>
        )
    })
}
~~~

### react-transition-group
~~~
import { CSSTransition } from 'react-transition-group'

<CSSTransition
    in = {this.state.show}
    timeout = {300}
    unmountOnExit
    onEntered={(el) = {el.style.color=blue}}
    appear={true}
>
    <div>hello</div>
</CSSTransition>

in css file
.fade-enter {

}
.fade-enter-active {

}
.fade-enter-done {

}
.fade-exit {

}
.fade-exit-active {

}
.fade-exit-done {

}
~~~

### stateless component
~~~
when the component has and only has render function, it can be changed to the stateless component
to imporve the performance
~~~

### redux-thunk
~~~
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers = compose

const enhancer = composeEnhancers(
    //if it has multiple augments, it should be [...thunk] 
    applyMiddleware(thunk),
)

const store = createStore(reducer, enhancer)
export default store

//action can be function
export const getTodoList = () => {
    return (dispatch) => {
        axios.get('list.json')
        .then((res) => {
            const data = res.data
            dispatch(action)
        })
    }
}

store.dispatch(getTodoList())

~~~

### redux-saga
~~~
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import mySagas from './sagas.js'

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(
    //if it has multiple augments, it should be [...sagaMiddleware] 
    applyMiddleware(sagaMiddleware),
)
const store = createStore(reducer, enhancer)

sagaMiddleware.run(mySagas)
export default store

//create sagas.js the same directory of store

import {takeEvery, put} from 'redux-saga/effects'
import {GET_INIT_LIST} from './actionTypes'
import {initListAction} from './actionCreaters'

function* getInitList() {
    const res = yield axios.get('list.json')
    const action= initListAction(data)
    yield put(action)
}

function * mySagas() {
    yield takeEvery(GET_INIT_LIST, getInitList)
}

export default mySagas

~~~
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

