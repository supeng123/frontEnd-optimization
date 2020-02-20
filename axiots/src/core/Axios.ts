import {AxiosPromise, AxiosRequestConfig, Method} from '../types/index'
import dispatchRequest from './dispatchRequest'

export default class Axios {
    defaults : AxiosRequestConfig

    constructor(initConfig:AxiosRequestConfig) {
        this.defaults = initConfig
    }

    request(url: any, config?: any): AxiosPromise {
        if(typeof url === 'string') {
            if(!config) config = {}
            config.url = url
        } else {
            config = url;
        }
        config = mergeConfig(this.defaults, config)
        return dispatchRequest(config)
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config!)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config!)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config!)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config!)
    }


    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config!)
    }

    _requestMethodWithoutData(method: Method, url: string, config: AxiosRequestConfig):AxiosPromise {
        return this.request(Object.assign(config, {}, {method, url}))
    }

    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig):AxiosPromise {
        return this.request(Object.assign(config, {}, {method, url, data}))
    }
}

function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig):AxiosRequestConfig {
    if (!config2) {
        config2 = {}
    }

    const config = Object.create(null)
    const starts = Object.create(null)
    const startKeysFromVal2 = ['url', 'params', 'data']

    startKeysFromVal2.forEach(key => {
        starts[key] = fromVal2Start
    })

    for (let key in config2) {
        mergeField(key)
    }

    for (let key in config1) {
        if(!config2[key]) {
            mergeField(key)
        }
    }

    function mergeField(key:string):void {
        const start = starts[key] || defaultStart
        config[key] = start(config1[key], config2![key])
    }

    return config

    function defaultStart(val1: any, val2: any):any {
        return typeof val2 !=='undefined' ? val2 : val1
    }

    function fromVal2Start(val1: any, val2: any):any {
        if (typeof val2 !=='undefined') return val2
    }
}

