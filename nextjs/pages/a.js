import {withRouter} from 'next/router'
import { promises } from 'dns';

const A = ({router}) =>(<div>this is component a{router.query.id}</div>)

A.getInitialProps = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(
                {
                    name: 'slogan'
                }
            )
        }, 2000)
    })
    return await promises
}

export default withRouter(A)