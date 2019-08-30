## Vue instance
### instance without and with el
~~~
new Vue({
    el: '#root',
    template: '<div>{{text}}</div>',
    data: {
        text: 0
    }
})

const app = new Vue({
    template: '<div>{{text}}</div>',
    data: {
        text: 0
    }
})
app.$mount('#root')

~~~
### properties of vue instance
~~~
app.$props
app.$data
app.$el
app.$options.data

//render method will change the view when the data changed
app.$options.render = (h) => {
    return h('div', {}, 'new render function')
}

app.$root === app
app.$children
app.$slots
app.$copedSlots
app.$refs

//for serve render
app.$isServer

app.$watch
app.$on
app.$emit
app.$once

app.$forceUpdate
app.$set(app.obj, 'a', i)

app.$delete

//for aysnc invoke
app.$nextTick
~~~

## Vue life circle
### vue hooks
~~~

~~~