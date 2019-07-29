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