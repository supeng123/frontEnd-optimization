import createStore from '../store/store'
import React from 'react'
const isServer = typeof window === 'undefined'
const _NEXT_REDUX_STORE_ ='_NEXT_REDUX_STORE_'

function getOrCreateStore(initialState) {
    if (isServer) return createStore(initialState)

    if (!window[_NEXT_REDUX_STORE_]) {
        window[_NEXT_REDUX_STORE_] = createStore(initialState)
    }
    return  window[_NEXT_REDUX_STORE_]
}



export default Com => {
class WithReduxApp extends React.Component {
    constructor(props) {
        super(props)
        this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render () {
        const {Component, pageProps, ...rest} = this.props
        if (pageProps) pageProps.test = '123'

        return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore = {this.reduxStore}></Comp>
    }
}
    

WithReduxApp.getInitialProps = async (ctx) => {
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx)
    }

    const reduxStore = getOrCreateStore()
    return {
        ...appProps,
        initialReduxState: reduxStore.getState()
    }
}
    
return WithReduxApp
}


// import {createStore} from 'redux-thunk'
// function initializsStore (state) {
//     const store = createStore(
//         allReduces,
//         Object.assign({},state)
//     ),
//     composeWithDevTools(applyMiddleware(ReduxThunk))
//     return store
// }