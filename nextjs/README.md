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