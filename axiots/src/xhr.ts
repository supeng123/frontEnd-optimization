import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types/index'
import {parseHeaders} from './helpers/headers'
import {createError} from './helpers/error'

export default function xhr(config: AxiosRequestConfig):AxiosPromise {
    return new Promise((resolve, reject) => {
        const {data = null, url, method = 'get', headers, responseType, timeout} = config;
        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType
        }

        request.open(method.toUpperCase(), url, true);

        if (timeout) {
            request.timeout = timeout
        }

        request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
        }

        request.ontimeout = function handleTimeout() {
            reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
        }

        request.onreadystatechange =  function handleChange() {
            if (request.readyState !== 4) {
                return 
            }

            if (request.status === 0) {
                return
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== 'text' ? request.response : request.responseText
            const response:AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data);

        function handleResponse(response: AxiosResponse):void {
            if (response.status >= 200 && response.status <= 300 ) {
                resolve(response)
            } else {
                reject(createError(`request failed with ${response.status}`, config, null, request, response))
            }
        }
    })
}

