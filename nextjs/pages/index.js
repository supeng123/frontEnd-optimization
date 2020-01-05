import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default () => {
    function gotoTest() {
        Router.push({
            pathname: '/a',
            query: {
                id: 2
            }
        }, 'test/b/1')
    }

    return (
    <div>
        <Link href="/a?id=1" title="AAA" as="/a/1">
        <div>
            <Button>Index</Button>
        </div>
        </Link>
        <Button onClick={gotoTest}>Index</Button>
    </div>)   
}

const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
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