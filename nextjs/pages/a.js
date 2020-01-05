import {withRouter} from 'next/router'

const A = ({router}) =>(<div>this is component a{router.query.id}</div>)

A.getInitialProps = () => {

}

export default withRouter(A)