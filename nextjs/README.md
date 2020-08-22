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