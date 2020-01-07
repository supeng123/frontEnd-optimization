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