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