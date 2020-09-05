### Next link
~~~
import Link from 'next/link'
import { Button } from 'antd'

//only wrap one child
export default () => (
    <Link href="/a" title="AAA">
        <div>
            <Button>Index</Button>
        </div>
    </Link>
)
~~~
### Use router
~~~
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default () => {
    function gotoTest() {
        Router.push('/a/b')
    }

    return (
    <div>
        <Button onClick={gotoTest}>Index</Button>
    </div>)   
}
~~~
### Dynamic router
~~~
//only support query
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default () => {
    function gotoTest() {
        Router.push({
            pathname: 'test/a',
            query: {
                id: 2
            }
        })
    }

    return (
    <div>
        <Link href="/a?id=1" title="AAA">
        <div>
            <Button>Index</Button>
        </div>
        </Link>
        <Button onClick={gotoTest}>Index</Button>
    </div>)   
}


//get the router query
import {WithRouter} from 'next/router'

const A = ({router}) =>(<div>this is component a{router.query.id}</div>)
export default withRouter(A)
~~~
### URL masking
~~~
<Link href="/a?id=1" title="AAA" as="/a/1">
    <div>
        <Button>Index</Button>
    </div>
</Link>

function gotoTest() {
        Router.push({
            pathname: '/a',
            query: {
                id: 2
            }
        }, '/a/1')
    }

//in the server gets the id
const router = new Router()
router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx,res, {
        pathname: '/a',
        query: { id }
    })
    ctx.respond = false;
})

server.use(router.routes())
~~~
### Router hooks
~~~
const events = [
    'routeChangeStart',
    'beforeHistoryChange',
    'routeChangeComplete',
    'routeChangeError',
    'hashChangeStart',
    'hashChangeComplete'
]

function makeEvent(type) {
    return (...args) => {
        console.log(type, ...args)
    }
}

events.forEach(event => {
    Router.events.on(event, makeEvent(event))
})
~~~
### GetInitialProps
~~~
import App from 'next/app'

class MyApp extends App {
    static async getInitialProps({Component}) {
        let pageProps
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps()
        }
        return {
            pageProps
        }
    }

    render() {
        const {Component, pageProps} = this.props

        return (
            <Container>
                <Component {...pageProps}></Component>
            </Container>
        )
    }
}

export default myApp
~~~
### Document
~~~
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx)

        return {
            ...props
        }
    }

    render () {
        return <Html>
            <Head>
            <style>{`.test {color: red}`}</style>
            </Head>
            <Main />
            <NextScript />
        </Html> 
    }
}

export default MyDocument
~~~
### Css in js (styled-compoent)
~~~
//npm intall -D styled-component babel-plugin-styled-component
import Document, {Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-component'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage()
        const sheet = new ServerStyleSheet()

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />),
            });
            const props = await Document.getInitialProps(ctx)
            return {
                ...props,
                styles: <>{props.styles}{sheet.getStyleElement()}</>
            }
        } finally {
            sheet.seal()
        }
    }

    render () {
        return <Html>
            <Head>
            <style>{`.test {color: red}`}</style>
            </Head>
            <Main />
            <NextScript />
        </Html> 
    }
}

export default MyDocument
~~~
### Lazy load
~~~
A.getInitialProps = async ctx => {
    const moment = await import('moment')
    const time = moment.default(Date.now() - 60 * 60).fromNow()
}

//load component asyncronously
import dynamic from 'next/dynamic'
const Comp = dynamic(import('../components/comp'))
~~~
### Configurations of next.config.js
~~~
const withCss = require('@zeit/next-css')

const configs = {
    //directory of output of compiled files
    distDir: 'dest',
    //add etag, can set to false when using nginx
    generateEtags: true,
    //cache configuration
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
    pageExtensions: ['js', 'jxs'],
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }

        return null
    },
    webpack(config, options) {
        return config
    },
    webpackDevMiddleware: config => {
        return config,
    },
    //like process.env
    env: {
        customKey: 'value'
    },
    //configuration only exist during server rendering
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    publicRuntimeConfig: {
        staticFolder: '/static'
    }
}

module.exports = withCss({})
~~~

### Nuxt
#### 1.定义局部样式
~~~
<style scoped lang = "less">

</style>
~~~
#### 2.定义store
~~~
store文件下的所有文件都是一个单独的store实例

user.js
export const state = () => ({
    userInfo: {
        token: ""
        user: {

        }
    }
})

export const mutation = {
    setUserInfo(state, data) {
        state.userInfo = data
    }
}

export const actions = {
    login(store, data) {
        await res = this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        })
        return store.commit("setUserInfo", res.data)
    }
}


在其他的vue模块中
this.$store.commit("user/setUserInfo") user为命名空间必须带上
this.$store.dispatch("user/login", this.form).then((res) =》 console.log(res)) user为命名空间必须带上
~~~
### 3.客户端持久化
~~~
yarn add vuex-persistedstate

在根目录plugins下创建localStorage.js
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store"
        })(store)
    })
}

在nuxt.config.js下添加plugins
plugins: [
    '@/plugins/element-ui',
    src: '@/plugins/localStorage', ssr:false
]

~~~
### 4.组件传值
~~~
用props对象
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    }
}

~~~
### 5.URL变化监听
~~~
components: {
    FlightListHead,
    FlightsItem,
    FlightFilters,
    FlightAside
},
watch: {
    $route:() {
        this.$route.query
    }
}

~~~
### 6.二维码生成
~~~
npm install --save qrcode

import QRCode from 'qrcode'

~~~
### 7.组件递归
~~~
组件外部调用改组件，
组件内部也可以调用本组件，但是要指定组件名字

<template>
    <div>
        <div class="item" v-for = "(item, index)" in data :key="index">
            {{item.type}}
            <digui :data="item.children" v-if="item.children">
    </div>
</template>

export default {
    name: 'digui',
    props: ["data"]
}
~~~
### 8.动态创建组件
~~~
import Vue from 'vue'

export default function create(Component, props) {
    //create instance of Vue
    const vm = new Vue({
        render(h) {
            return h(Component, {props})
        }
    }).$mount()

    document.body.appendChild(vm.$el)

    const comp = vm.$children[0]
    comp.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp
}

const notice = create(Notice, {
    title: "",
    message: "",
    duration:1000
})
notice.methodName()
~~~
### 9.面包屑导航
~~~
watch: {
    $route: {
        this.crumb = this.$route.matched(m => m.name || m.redirect)
    },
    immediate: true
}
~~~
### 10.Vue构造函数
~~~
class DVue {
    constructor(options) {
        this.options = options
        this.$data = options.data
        this.observe(this.$data)

       // new Watcher(this, 'foo')
       // this.foo // 读一次触发依赖收集
        new Watcher(this, 'foo.bar')
        this.foo.bar // 读一次触发依赖收集

        new Compile(options.el, this)
        if (options.created) {
            options.created.call(this)
        }
    }

    observe(value) {
        if (!value || typeof value !== 'object') return

        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key])
        })
    }

    defineReactive(obj, key, val) {
        const dep = new Dep() //mapping the key
        Object.defineProperty(obj, key, {
            get() {
                //依赖收集
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set (newValue) {
                if (newValue != val) val = newValue
                console.log(key + ’attrs changed‘)
                dep.notify()
            }
        })
    }
}
~~~
### 11.管理所有Watcher
~~~
class Dep{
    constructor() {
        this.deps = []
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor(vmInstance, key, cb) {
        this.vm = vmInstance;
        this.key = key
        this.cb = cb

        Dep.target = this;
        this.vm[this.key]
        Dep.target = null
    }

    update() {
        this.cb.call(this.vm, this.vm[this.key])
        console.log(this.key + 'updated')
    }
}
~~~
### 12.compile dom
~~~
class Comiple {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        this.$fragment = this.node2Fragment(this.$el)
        this.compile(this.$fragment)
        this.$el.append(this.$fragment)
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }

    compile(el) {
       const childNodes = el.childNodes;
       Array.from(childNodes).forEach(node => {
           if (node.nodeType == 1) {
               //元素
               console.log("编译元素" + node.nodeName)
           }  else if (this.isInter(node)) {
               console.log("编译插值文本" + node.nodeName)
           }
       })
    }

    isInter(node) {
        return node.nodeType == 3 && /\{\{(.*)}\}/.test(node.textContent)
    }

    compileText(node) {
        const exp = RegExp.$1
        this.update(node, exp, 'text')
    }

    update(node, exp, dir) {
        const updator = this[dir+'Updator']
        updator && updator(node, this.$vm[exp])
        //创建watcher实例，依赖搜集完成
        new Watcher(this.$vm, exp, function(val) {
            updator && updator(node, val)
        })
    }

    textUpdator(node, value) {
        node.textConent = value;
    }
}
~~~
### 13.浏览器环境调试
~~~
在build.js中找到umd的web-full-dev版本的入口文件

npm run dev
加上--sourcemap
修改samples的min.js to js
~~~
### 14.event loop
~~~
console.log('promise1')

const aaa = new Promise((resolve, reject) => {
    console.log('promise2')
    resolve()
    console.log('promise x')
})

aaa.then(() => {
    console.log('promise3')
})

const tt = setTimeout(()=> {
    console.log('promise4')
})

Promise.resolve().then(function() {
    console.log('promise5')
}).then(function() {
    console.log('promise6')
})

console.log('promise7')

1 2 x 7 3 5 6 4
~~~
### 15.vue.config.js
~~~
const port = 9090
const title = 'config'
module.exports = {
    publicPath: '/bestPricatice',
    devServer: {
        port
    }
    configureWebpack: {
        name:title
    },
    chainWebpack(config) {
        config.module.rule('svg')
        .exclude.add('src/icons')
    }
}
~~~
### 16.configure cookie
~~~
//client
axio.defaults.withCredentials = true

//server
res.setHeader('Access-Control-Allow-Credentials', 'true')
~~~
### 17.webpack and express proxy
~~~
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()

app.use('/api', proxy({
    target: 'http://localhost:4000',
    changeOrigin: false
}))

module.exports = app
~~~
### 18.鉴权 session
~~~
const session = {}

const sessionKey = 'sid'
const cookie = req.headers.cookie
if (cookie && cookie.indexOf(sessionKey)) {
    res.end('Come back')
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('session', sid)
} else {
    const sid =(Math.random()* 99996).toFixed()
    res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
    session[sid] = {name: 'laowang'}
    res.end('hi laowang')
}


// koa 实现
const koa = require('koa')
const app = new koa()
const session = require('koa-session')

app.key = ['some secret']
const SESSION_CONFIG = {
    key: 'kkb:sess',
    maxAge: '345346254',
    httpOnly: true,
    signed: false
}

app.use(session(SESSION_CONFIG, app))
app.use(ctx => {
    if (ctx,path == '/favicon.icon') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = '第'+ n + '次访问'
})

app.listen(3000)

//redis 实现
const redis = require('redis')
const redisStore = require('koa-redis')
const clientRedis = redis.createClient(6379, 'localhost')
const wraper = require('co-redis')
const client = wrap(clientRedis)

const SESSION_CONFIG = {
    key: 'kkb:sess',
    maxAge: '345346254',
    httpOnly: true,
    signed: true,
    store: redisStore({
        client
    })
}

app.use(async (ctx,next) =>m{
    const keys = await client.keys('*')
    keys.forEach(async key => {
        console.log(await client.get(key))
    })
})

app.use(session(SESSION_CONFIG, app))
app.use(ctx => {
    if (ctx,path == '/favicon.icon') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = '第'+ n + '次访问'
})

//鉴权中间件
app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next()
    } else {
        if (!ctx.session.userInfo) {
            ctx.body = {
                message: 'login failed'
            }
        } else {
            next()
        }
    }
})

router.post('/users/login', async ctx => {
    const { body } = ctx.request
    ctx.session.userinfo = body.username
    ctx.body = {
        message: 'login succeeded'
    }
})

router.post('/users/logout', async ctx => {
    delete ctx.session.userinfo
    ctx.body = {
        message: 'login out'
    }
})

router.get('/users/getUser', async ctx => {
    ctx.body = {
        message: 'get userinfo succeeded',
        userinfo: ctx.session.userinfo
    }
})

app.use(router.routes())
~~~
### 19.鉴权 token
~~~
cookie不能跨域，不需要存在服务器
JWT(JSON WEB TOKEN)
token由令牌头，payload，哈希三部分组成

第三方认证
从本网站访问第三方的网站，服务器得到请求会转发请求到第三方开放的接口，
把第三方的请求得到的token拿回到服务器然后再发送token到第三方网站得到用户信息
~~~
### 20.cluster
~~~
可以同时占用同一个端口，适用于程序奔溃又有新的进程顶上，故障恢复，多核利用
~~~

## 2. React
### 1.react setState
~~~
异步
this.setState({
    mean: this.state.mean + 1
})
同步
this.setState(nextState => {
    return {
        mean: nextState + 1
    }
})
~~~
### 2.react function component with state
~~~
hooks
import {userState, useEffect} React from 'react'

export default function User() {
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const timer = setInterval(()=> {
            setDate({
                data: new Date
            })
        },1000)

        return () =>  clearInvterval(timer)
    })

    return (
        <div>
        {date.tolocaleTimeString()}
        </div>
    )
}
~~~
### 3.react Context
~~~
import React from 'react'
import Home from './pages/Home'

const Context = React.createContext()
const Provider = Context.Provider
const Consumer = Context.Consumer

const store = {
    home: {},
    user: {
        name: 'supel'
    }
}

function App() {
    return (
        <div className="app">
            <Provider value ={store}>
                <Consumer>
                    {ctx => <Home {...ctx}/>}
                </Consumer>
            </Provider>
        <div>
    )
}

export default App

//可以用useContext拿到全局对象的数据
~~~
### 4.HOC(Higher-Order Components)
~~~
高阶组件是⼀一个⼯工⼚厂函数，它接收⼀一个组件并返回另⼀一个组件

const foo = Cmp => props => {
    return <Cmp {...props}>
}

HOC的作用和装饰器很像，所以用装饰器也可以达到同样的效果
@withLog
@withContent
class Lesson extend React.Component {
    render() {
        return (
            <div>
                {this.props.stage}
            </div>
        )
    }
}
~~~
### 5.pureCompoent && Memo
~~~
避免重复渲染dom的优化，但只是浅比较
shouldComponentUpdate
~~~
### 6.createElement
~~~
function createElement(type, props, ...children) {
    let vtype
    props.children = children
    if (typeOf type === 'string') vtype = 1
    if (typeOf type === 'function') {
        vtype = type.isReactComponent ? 2 : 3
    }

    return {
        type,
        props,
        vtype
    }
}

class Component {
    static isReactComponent = {

    }
    constructor(props) {
        this.props = props
    }
}

function render(vnode, container) {
    //vnode --> node
    //container.append(node)
    mount(vnode, container)
}

function mount(vnode, container) {
    const {vtype} = vnode
    if (!vtype) {
        mountTextNode(vnode, contianer)
    } else if (vtype == 1) {
        mountHtmlNode(vnode, container)
    } else if (vtype == 2) {
        mountClassNode(vnode, container)
    } else {
        mountFunction(vnode, container)
    }
}

function mountTextNode(vnode, container) {
    const node = document.createTextNode(vnode)
    container.appendChild(node)
}

function mountTextNode(vnode, container) {
    const {type, props} = vnode
    const node = document.createElement(type)
    const {children, ...rest} = props
    children.map(child => {
        if (Array.isArray(child)) {
            child.map(c => mount(c, node))
        }
        mount(child, node)
    })
    Object.keys(rest).map(item => {
        if (item === 'className') {
            node.setAttribute('class', rest[item])
        }
        if (item.slice(0,2) == 'on') {
            node.addEventListener("click", rest[item])
        }
    })
    container.appendChild(node)
}

function mountFunction(vnode, container) {
    const {type, props} = vnode
    const node = type()
    mount(node, container)
}

function mountClass(vnode, container) {
    const {type, props} = vnode
    const node = new type(props).render()
    mount(node, container)
}
~~~
### 7.fiber
~~~
class Update() {
    constructor(payload, nextStatus) {
        this.payload = payload
        this.nextStatus = nextStatus
    }
}

class UpdateQueue {
    constructor() {
        this.baseState = null
        this.firstUpdate = null
        this.lastUpdate = null
    }

    enqueueUpdate(status) {
        if (!this.firstUpdate) {
            this.firstUpdate = this.lastUpdate = status
        } else {
            this.lastUpdate.nextStatus = status
            this.lastUpdate = status
        }
    }
    
    forceUpdate() {
        let currentState = this.baseState || {}
        let currentUpdate = this.firstUpdate
        while (currentUpdate) {
            let next = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentState.payload
            currentState = {...currentState, ...next}
            currentUpdate = currentUpdate.nextStatus
        }
        this.firstUpdate = this.lastUpdate = null
        this.baseState = currentState
        return currentState
    }
}

let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({name: 'slogan'}))
queue.enqueueUpdate(new Update({age: 11}))
queue.enqueueUpdate(new Update((state) => ({number: state.age + 1}))
queue.enqueueUpdate(new Update((state) => ({number: state.age + 1}))
queue.forceUpdate()
~~~
### 8.requestIdleCallback
~~~
//请求每帧的空余时间给用户执行callback，没有空闲时间就继续浏览器的执行，timeout是超过指定时间
浏览器就算没有空余时间也要强制执行用户的callback
requestIdleCallback(workLoop, {timeout: 1000})

function workLoop(deadline) {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length > 0) {
        performUnitOfWork()
    }
    if (works.length > 0) {
        window.requestIdleCallback(workLoop, {timeout: 1000})
    }
}

function performUnitOfWork() {
    works.shift()()
}

works = [
    (): => {
       console.log('firstTask start') 
       sleep(20)
       console.log('firstTask finish') 
    },
    (): => {
       console.log('secondTask start') 
       sleep(20)
       console.log('secondTask finish') 
    },
    (): => {
       console.log('thirdTask start') 
       sleep(20)
       console.log('thirdTask finish') 
    }
]

function sleep(delay) {
    let lastDate = new Date()
    while (new Date() - lastDate < delay) {
    }
}
~~~
