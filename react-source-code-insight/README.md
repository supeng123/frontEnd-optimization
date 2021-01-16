- [how jsx transfer to js](#how-jsx-transfer-to-js)
- [react.Component](#reactcomponent)
- [createRef & ref](#createref--ref)
- [react.Context](#reactcontext)
- [react Suspense](#react-suspense)
- [react.children.map && react.children.forEach](#reactchildrenmap--reactchildrenforeach)
- [ReactDom.render || hydrate](#reactdomrender--hydrate)
- [FiberRoot](#fiberroot)
- [Fiber](#fiber)
- [Update](#update)
- [expiration time](#expiration-time)
- [setState & forceUpdate](#setstate--forceupdate)
- [road-map](#road-map)
- [Scheduler](#scheduler)
- [ReactFiberBeginWork](#reactfiberbeginwork)
- [completeUniteOfWork](#completeuniteofwork)
- [React Hooks In Detail](#react-hooks-in-detail)
  - [useState for primitive value && object && array](#usestate-for-primitive-value--object--array)
  - [useEffect](#useeffect)
  - [useReducer](#usereducer)
  - [useReducer with useEffect](#usereducer-with-useeffect)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [custom hook](#custom-hook)
### how jsx transfer to js
~~~
// when we write plain html'
<div id="first", key="key">
    <span class="second">
    1
    </span>
</div>

//react transformation
React.createElement(
    "div",
    {id: "first", key: "key"},
    React.createElement("span", {class: "second"}, "1")
)

React.createElement(element, config: Object, chilren: array[])
**element could be native html element or DIY component, component first letter needs to be capital,

RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
} in ReactElement.js will not be used

~~~

### react.Component
~~~
options = {
    props
    contexts
    updater
}

Component.protoytp.setState(partialState, callback)
// enquenSetState is a method from react-dom
updater ---->enquenSetState(this, partialState, callback)
~~~

### createRef & ref
~~~
//get the instance of child

constructor() {
    super()
    this.objRef = React.createRef()
    //{current: null}
}

ComponentDidMount() {
    setTimeout(() => {
        this.refs.stringRef.textContent = 'string ref got'
        this.methodRef.textContent = 'method ref got'
        this.objRef.current.textContent = 'object ref got'
    })
}

render() {
    return (
        <div>
            <p ref="stringRef">span1</p>
            <p ref={ele => (this.methodRef = ele)}>span2</p>
            <p ref={this.objRef}>span3</p>
        </div>
    )
}
~~~

### react.Context
~~~
//the communication across multiple level components
const {Provider, Consumer } = React.createContext('default')
//declare it in the upper component
<Provider value={this.state.newContext}><this.props.children></Provider>
//use it in the children component
<Consumer>{value => <p>newContext:{value}</p>}</Consumer>

~~~

### react Suspense
~~~
<Suspense fallback="!loading data">
    <SuspenseComp />
</Suspense>

function SuspenseComp(){
    const data = requestData()
    return <p>{data}</p>
}

function requestData(){
    if !data {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                data = "data resolved";
                resolve()
            },2000)
        })
    }
}

import { lazy } from 'react'

const lazyComp = lazy(() => import('.lazy.js'))

in lazy.js return
export default () => {
    return <p>lazy component</p>
}
~~~

### react.children.map && react.children.forEach
~~~
react/src/ReactChildren.js
map and forEach using almost the same logic only one has return value
mapChildren function return the expanded array [a, b, c, d...]
using 'mapIntoWithKeyPrefixInternal' and 'mapSingleChildIntoContext' to iterate the Array only when the element is an renderable object

~~~

~~~
hooks, useEffect, useCreate
//return dispatcher.useEffect(create, inputs);
memo like the pure Component
fragment <></> use as <React.Fragment></React.Fragment>
~~~

### ReactDom.render || hydrate
~~~
create ReactRoot
create FiberRoot and RootFiber
create update

ReactDom.render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) 

return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
)
// delete all the redundant elements in root container
**root = container._reactRootContainer =legacyCreateRootFromDOMContainer(
  container: DOMContainer,
  forceHydrate: boolean,
)
**fiberRoot = root._internalRoot

ReactSyncRoot(
  container: DOMContainer,
  tag: RootTag,
  hydrate: boolean,
)

createContainer---->

//children is </app>, firberRoot is root._internalRoot, parentCoponent is null
then invoke upateContainer(children, fiberRoot, parentComponent, callback)

in ReactFiberReconciler.js

updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
)

scheduleWork(current, expirationTime);

~~~

### FiberRoot
~~~
the start point of the whole app
recode the whole process
createContainer() --->
FiberRootNode(containerInfo, tag, hydrate)
//persistent updates.
pendingChildren 
// tree structure, the top point of the tree
current: Fiber
earliestSuspendedTime
lastestSuspendedTime
latestPingedTime

finishedWork
//mark the suspense promise
timeoutHandle

nextExpirationTimeToWorkon: ExpirationTime
expirationTime

~~~

### Fiber
~~~
every reactElement has a Fiber object to record the node status, build the relation the congrate the whole tree

tag:
type: functional or class component
stateNode: the instance of the node

//new state
pendingProps
//old state
memorizedProps
//computerlize
updateQueue

//pointer to its parent node
return: Fiber | null,
// Singly Linked List Tree Structure.
child: Fiber | null,
sibling: Fiber | null,
index: number,
~~~

### Update
~~~
recode the changes of components status, saved in updateQueue

updateContainer---->updateContainerAtExpirationTime---->
scheduleRootUpdate(
    current,
    element,
    expirationTime,
    suspenseConfig,
    callback,
  )

then in ReactUpdateQueue.js 
createUpdate(
  expirationTime: ExpirationTime,
  suspenseConfig: null | SuspenseConfig,
):Update
the return update object with properties
tag = {
    UpdateState = 0;
    ReplaceState = 1;
    ForceUpdate = 2;
    CaptureUpdate = 3;
}
payload = {ReactNodeList}<App>element

then execute enqueueUpdate----->createUpdateQueue
export function createUpdateQueue<State>(baseState: State): UpdateQueue<State> {
  const queue: UpdateQueue<State> = {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  };
  return queue;
}
~~~

### expiration time
~~~
// to enhance the effiency when setState in short period time
currentTime = first execution time now() - js init time now()
current = Fiber

in ReactFiberWorkLoop.js
computerExpirationForFiber(currentTime, current)
~~~

### setState & forceUpdate
~~~
update the node fiber, the type of updating is different
~~~

### road-map
~~~
scheduleWork---->
addRootToScheduler---->
if expirationTime Sync 
performSyncWork()

or
scheduelCallbackWithExpirationTiem() //then start the async schedule work
scheduleDefferredCallback----> add to callbackList
----> requestWork ----> animation Tick
---->performAsyncWork

performWork() for async and sync
---->perfromRootWork


scheduleCallbackForRoot()
scheduleSyncCallback()
scheduleCallback()

batchedUpdates
export function batchedUpdates<A, R>(fn: A => R, a: A): R {
  const prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      flushSyncCallbackQueue();
    }
  }
}
return fn(a) represents the page element event callback is invoking such as onclick = callback;
when run multiple setStates, the isBatchingUpdates is true and returned without updating states
after all the setState were invoked, if the fn(a) was wrapped by setTimeout(fn(a),0), it will 
invoke each the setState one by one.

setState is sync, but it doesn't represent each state will update immediately, it depends on the context of
the function, if it's in the batch means you have multiple setState, it will update when the last setState invoked

~~~

### Scheduler
~~~
ReactFiberWorkLoop.js
scheduleSyncCallback() ----> Scheduler_scheduleCallback()
Scheduler.js
unstable_scheduleCallback()---->

In ScheduleHostConfig.default.js
requestHostCallback()
//then react will render the content to dom within 33 milliseconds if there is time available or idle

flushwork()

then back to ReactFiberWorkLoop.js

renderRoot(root, Sync, true)
~~~

### ReactFiberBeginWork
~~~
beginWork() ---->

updateFunctionComponent(
    current,
    workInProgress,
    Component,
    resolvedProps,
    renderExpirationTime,
)

renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    context,
    renderExpirationTime,
);

reconcileChildren(
    current,
    workInProgress,
    nextChildren,
    renderExpirationTime,
  );
//generate fiber children tree based on props.children
//check Fiber object can be reused

reconcileChildFibers()


//class component update
updateClassInstance()
instance = new ctor(props, context)
instance.state
adoptClassInstance(woringProgress instance)
intance.updater = classComponentUpdater
woringProgress.stateNode = instance

mountClassInstance()
setState using processUpdateQueue

finishClassComponent()
~~~

### completeUniteOfWork
~~~
to check if it's interrupted to invoke different function
to check if it has sibiling node to invoke diffent operation
give value to effect chain after the completion of node

//when the node has no error
beginwork()
lasteffect node needs change it will propogate to the root node
firsteffct node needs change it will propogate to the root node

diffProperties(
  domElement: Element,
  tag: string,
  lastRawProps: Object,
  nextRawProps: Object,
  rootContainerElement: Element | Document,
)

compare the oldProps and newProps and put all new updates to the updatePayload

unwindwork()
~~~
### React Hooks In Detail
~~~
reason 1 don't have to use this keyword
reason 2 allow reuse stateful logic
~~~
#### useState for primitive value && object && array
~~~
import React, {useState} from 'react'

funciton HookCount(){
  const initialCount = 0
  const [count, setCount] = useState(initialCount)
  const [name, setName] = useState({firstName:'', lastName:''})
  const [name, setItems] = useState([])

  const incrementTen = () => {
    for (let i = 0; i < 10; i++) {
      setCount(prevCount => prevCount + 1)
    }
  }

  const addItem = () => {
    setItems([...items, {
      id: items.length,
      value: Math.floor(Math.random()*10) + 1
    }])
  }

  return (
    Count: {count}
    <button onClick={() => setCount(initialCount)}>Reset</button>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <button onClick={() => setCount(count - 1)}>Decrement</button>
    <button onClick={() => setCount(prevCount => prevCount + 5)}>Jump to 5</button>
    <button onClick={incrementTen}>Jump to 10</button>

    <form>
      <input type='text' value={name.firstName} onChange={e => setName({...name, firstName: e.target.value})}>
      <input type='text' value={name.firstName} onChange={e => setName({...name, lastName: e.target.value})}>
      <h2>Your first name {name.firstName}</h2>
      <h2>Your last name {name.lastName}</h2>
    </form>

    <div>
      <button onClick={addItem}> addItem</button>
      <ul>
        {items.map(item) => (
          <li key={item.id}>{item.value}</li>
        )}
      </ul>
    </div>
  )
}

export default HookCount
~~~
#### useEffect
~~~
use to replace componentWillMount, componentWillUpdate, componentWillUnmount

function DataFetching() {
  const [posts, setPosts] = useState([])
  const [id, setId] = useState(1)

  useEffect(() => {
    axio.get(`http://geurhgeurgher${id}`)
    .then(res => {
      setPosts(res.data)
    })
    .catch(err => {
      console.log
    })

    return () => {
      // use for replace componentWillUnmount hook
    }
  }, []) // use for replace componentWillUpdate hook

  return (
    <div>
      <input type='text' value={id} onChange={e => setId(e.target.value)} />
      {posts.map(post => <li key=>{post.id}>{post.title}<li>)}
    </div>
  )
}
~~~
#### useReducer
~~~
App.js

import {useReducer} from 'react'

export const store = React.createContext()

const reducer = (state = 0, action) {
  switch(state) {
    case 'increment':
      return state + 1
    case 'increment':
      return state - 1
    case 'reset':
      return 0
    default:
      return state
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <Store.Provider value={{countState: count, countDispatch: dispatch}}>
      <div className='App'>
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </div>
    </Store.Provider>
  )
}

ComponentA.js

import {useContext} from 'react'
import {Store} from '.App'

function ComponentA() {
  const countStore= useContext(Store)

  return (
    <button onClick={() => countStore.dispatch('increment')}>Increment</button>
    <button onClick={() => countStore.dispatch('decrement')}>Decrement</button>
    <button onClick={() => countStore.dispatch('reset')}>Reset</button>
  )
}
~~~
#### useReducer with useEffect
~~~
const initialState = {}
const reducer = (state = initialState, action) {
  switch(action.type) {
    case 'Success':
      return {...state, post: action.payload}
    case 'Error':
      return {...state, error: action.payload}
    default:
      return state
  }
}

function DataFetching() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axio
      .get('httpreqeuest')
      .then(response => {
        dispatch({type: 'Success', payload: response.data})
      })
      .catch(error => {
        dispatch({type: 'Error'})
      })
  }, [])
}
~~~
#### useCallback
~~~
userCallback is a hook that will return a memorized version of callback function that only changes if
one of the dependencies has changed
It is useful when passing callbacks to optimized child components that rely on the reference equility to 
prevent unnecessary renders

function callbackExample() {
  const [age, setAge] = useState(25)
  const [salary, setSalary] = useState(2500)

  const incrementAge = useCallback(() => {
    setAge(age + 1)
  }, [age])

  const incrementSalary = useCallback(() => {
    setSalary(salary + 1000)
  }, [salary])

  return (
    <div> 
      <Title>
      <Count text='Age' count = {age} />
      <Count text='Salary' count = {salary} />
      <ChildButton handleClick = {incrementAge}/>
      <ChildButton handleClick = {incrementSalary}/>
    /div>
  )
}
~~~
#### useMemo
~~~
Invokes the provided function & caches the result

function Counter() {
  const [countOne, setCountOne] = useState(0)
  const [countTwo, setCountTwo] = useState(0)

  const incrementOne = () => {
    setCountOne(countOne + 1)
  }
  const incrementTwo = () => {
    setCountOne(countTwo + 1)
  }

  const isEven = useMemo(() => {
    let i = 0
    while (i < 20000000000) i++
    return countOne % 2 === 0
  },[countOne])

  return (
    <div> 
      <button onClick={incrementOne}>{countOne}</button>
      <span>{isEven ? 'Even' : 'Odd'}
      <button onClick={incrementTwo}>{countTwo}</button>
    </div>
  )
}
~~~
#### useRef
~~~
use ref to get the dom constructure or save reference

function HookTimer() {
  const [time, setTime] = useState(0)
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(pre => pre + 1)
    },1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div>
      Hook Timer - {timer}
      <button onClick={() => clearInterval(intervalRef.current)}>clear interval</button>
    </div>
  )
}
~~~
#### custom hook
~~~
import { useState } from 'react'

funtion useInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  const rest = () => {
    setValue(initialValue)
  }

  const bind = {
    value,
    onChange: e => {
      setValue(e.target.value)
    }
  }

  return [value, bind, reset]
}
export default useInput

function UserForm() {
  const [firstName, bindFirstName, restFirstName] = useInput('')
  const [lastName, bindLastName, restLastName] = useInput('')

  const submitHandler = e => {
    e.preventDefault()
    resetFirstName()
    resetLastName()
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>First Name</label>
          <input {...bindFirstName} type='text' />
        </div>
        <div>
          <label>Lastt Name</label>
          <input {...bindLastName} type='text' />
        </div>
      </form>
    </div>
  )
}

~~~