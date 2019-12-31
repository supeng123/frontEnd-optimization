## Vue Instance
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

## Vue Life Circle
### vue hooks
~~~
import Vue from 'vue'

new Vue({
    el: 'root',
    template: '<div>{{text}}</div>'
    data: {
        text: 'data'
    },
    beforeCreate() {
        console.log(this. 'beforeCreate')
    },
    created() {
        console.log(this. 'created')
    },
    beforeMount() {
        console.log(this. 'beforeMount')
    },
    render(h) {
        //execute when vue instance has template
        console.log(this. 'render')
    },
    mounted() {
        console.log(this. 'mounted')
    },
    beforeUpdate() {
        console.log(this. 'beforeUpdate')
    },
    updated() {
        console.log(this. 'updated')
    },
    activated() {
        console.log(this. 'activated')
    },
    deactivated() {
        console.log(this. 'deactivated')
    },
    beforeDestroy() {
        console.log(this. 'beforeDestroy')
    },
    destroyed() {
        console.log(this. 'destroyed')
    },
    errorCaptured() {

    }
})
~~~

## Vue Data Binding
### event & html & attribute
~~~
import Vue from 'vue'

new Vue({
    el: 'root',
    template: `<div v-bind:id="aaa" @click="handleClick">
                {{text}}
                <div v-html="html"><div>

                </div>`
    data: {
        text: 'data'
        html: '<span>123<span>'
        aaa: 'active'
    },
    methods: {
        handleClick() {
            alert('clicked')
        }
    }
})
~~~
### v-cloak && v-text
~~~
//solve the problem of insert value expression being shown
<style>
[v-cloak] {
    display: none;
}

<p v-cloak>++++{{msg}}----</p>
<p v-text="msg"></p>
</style>
~~~
### v-bind
~~~
//solve the problem of dynamic attribute
new Vue({
    el: '#root',
    template: `<div v-bind:title="myTitle"
                </div>`
    data: {
        myTitle: 'this is a diy title'
    }
})
~~~
### stop && prevent && capture && self && once
~~~
new Vue({
    el: '#root',
    template: `<div v-bind:title="myTitle">
                <a href="123.com" v-on:click.stop.prevent="onclickEvent">
                <input type='text' class="form-control" @keyup.enter="onclickEvent">
                </div>`
    data: {
        myTitle: 'this is a diy title'
    },
    methods: {
        onclickEvent() {

        }
    }
})

~~~

### v-for
~~~
//iterate object and array
new Vue({
    el: '#root',
    template: `<div>
                <p v-for="(user, i) in list" key="user.id">Id:{{user.id}}----{{user.name}}</p>
                </div>`
    data: {
        list: [
            {id:1, name: 'zs1'},
            {id:2, name: 'zs2'},
            {id:3, name: 'zs3'}
        ]
    },
    methods: {
        onclickEvent() {

        }
    }
}
~~~
### class & style
~~~
import Vue from 'vue'

new Vue({
    el: 'root',
    template: `<div :class="{active: !isActive}"
                </div>`
    data: {
        isActive: true
    },
    methods: {
    }
})

alternative way

new Vue({
    el: 'root',
    template: `<div :class="[isActive ? 'active' : '']"
                </div>`
    data: {
        isActive: true
    },
})

new Vue({
    el: 'root',
    template: `<div :class="[{'acitve': isActive}]"
                :style="styles" //:style="[styles, styleTwo]"
    
                >
                <p>{{getJoinedArr(list)}}</p>
                </div>`
    data: {
        isActive: true,
        list: [1, 2, 3]
        styles: {
            color: 'red'
        }

    },
    //computed will cache data, so the dom will not be rending if data is not changed
    computed: {
        classNames () {

        },
        getJoinedArr (arr) {
            return arr.join('-')
        },
        'fullName': function() {
            return this.firstName + this.middleName
        }
    },
    watch: {
        style: {
            handler() {
                console.log('style color changed')
            },
            //invoke when the element first mounted
            immediate: true,
            deep: true
        },
        'list': function(newVal, oldVal) {
            console.log(newVal + oldVal)
        }
    }
})
~~~

### vue filter
~~~
<div >{{text | msgFormat}}</div>

Vue.filter('msgFormat', function(msg, arg) {
    return msg.replace(/simole/g, arg)
})
~~~

### vue directives
~~~
<div v-once>{{text}}</div>

<div v-if="text === 0">v-if</div>
<div v-else-if="text === 1">v-else-if</div>
<div v-else>v-else</div>
// two way binds
<input text="text" v-model="text">

Vue.directive('focus', {
    bind: function(el) {

    },
    inserted: function(el) {
        el.focus()
    },
    updated: function(el) {

    }
})
~~~

### vue animation
~~~
<style>
.slogan-enter,
.slogan-leave-to {
    opacity: 0,
    transform: translateX(90px);
}

.slogan-enter-active,
.slogan-leave-active {
    transition: all 0.8s ease;
}
</style>

<transition name="slogan">
    <h3 v-if="flag">this is an animation example<h3>
</transition>

//another example
<transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    >
    <h3 v-if="flag">this is an animation example<h3>
</transition>
<transition-group appear tag="ul">
    <li v-for="item in list" :key="item.id">{{item.name}}</li>
</transition-group>

var vm = new Vue({
    el: '#app',
    methods: {
        beforeEnter(el) {
            el.style.transform = "translate(0,0)"
        },
        enter(el, done) {
            el.offsetWidth
            el.style.transform = "translate(150px, 450px)"
            el.style.transition = "all 1s ease"

            done()
        },
        afterEnter(el) {

        }
    }
})
~~~

## Vue Component
### define global component
~~~
import Vue from 'vue'

const component = {
    template: `<div> this is a global component</div>`
}

Vue.component('CompOne', component)

new Vue({
    el: '#root',
    template: `<div>
            <comp-one></comp-one>
            123</div>`
})
~~~

### define local component
~~~
// component's data needs to be a function returns an object, but instance'data should be an object.
import Vue from 'vue'

const component = {
    props: {
        active: Boolean,
        propOne: String,
        onChange: Function
    }
    template: `<div v-show="active">{{propOne + text}}
                <span @click="handleChangeInside">click me</span>
                </div>`,
    data() {
        return {
            text: 123
        }
    },
    methods: {
        handleChangeInside() {
            this.onChange()
        }
    }
}

new Vue({
    el: '#root',
    components: {
        CompOne: component
    },
    data: {
        first: 'slogan'
    }
    template: `<div>
            <comp-one :active="true" :prop-one="first" :on-change="handleChange"></comp-one>
            <comp-one :active="false"></comp-one>
            123</div>`,
    methods: {
        handleChange() {
            this.first = 'sunminjuan'
        }
    }
})
~~~

### switch component is example
~~~
<div id="app">
    <a href="" @click.prevent="comName='login'">login</a>
    <a href="" @click.prevent="comName='rigister'">rigister</a>
    <component :is="comName"></component>
</div>

Vue.component('login', {
    template: '<h2>login component</h2>'
})

Vue.component('register', {
    template: '<h2>login component</h2>'
})

var vm = new Vue({
    el: '#app',
    data: {
        comName: ''
    }
})
~~~

### emit data from child to parent
~~~
import Vue from 'vue'

const component = {
    props: {
        active: {
            type: Boolean,
            <!-- default: false, -->
            required: true
            },
        propOne: String, 
        options: {
            default() {
                return {
                    "slogan": "su"
                }
            },
            validator (value) {
                return typeof value === 'boolean'
            }
        }
    }
    template: `<div v-show="active">{{propOne + text}}
                <span @click="handleChangeInside">click me</span>
                </div>`,
    data() {
        return {
            text: 123
        }
    },
    methods: {
        handleChangeInside() {
            this.emit('change', 'sunminjuan')
        }
    }
}

new Vue({
    el: '#root',
    components: {
        CompOne: component
    },
    data: {
        first: 'slogan'
    },
    mounted() {
        console.log(this.$ref.comp1)
    }
    template: `<div>
            <comp-one ref="comp1" :active="true" :prop-one="first" @change="handleChange"></comp-one>
            <comp-one :active="false"></comp-one>
            123</div>`,
    methods: {
        handleChange() {
            this.first = 'sunminjuan'
        }
    }
})
~~~

### extend componemt
~~~
import Vue from 'vue'

const component = {
    props: {
        active: {
            type: Boolean,
            required: true
            },
        propOne: String, 
    }
    template: `<div v-show="active">{{propOne + text}}
                <span @click="handleChangeInside">click me</span>
                </div>`,
    data() {
        return {
            text: 123
        }
    },
    methods: {
        handleChangeInside() {
            this.emit('change', 'sunminjuan')
        }
    }
}

const CompVue = Vue.extend(component)

new CompVue({
    el: '#root',
    propsData: {
        propOne: 'replace prop one text'
    },
    data: {
        text: 'replace text'
    }
})
~~~
### v-model in component
~~~
import Vue from 'vue'

const component = {
    props: {
        value: {
            type: String,
            required: true
            },
    }
    template: `<div>
                <input type="text" @input="handleInput" :value="value">
                </div>`,
    
    methods: {
        handleInput(e) {
            this.emit('input', e.target.value)
        }
    }
}

new Vue({
    el: '#root',
    components: {
        compOne: component
    }
    data() {
        return {
            value: 123
        }
    },
    template: `
            <comp-one :value="value" @input="value = arguments[0]"><comp-one>
            //or 
            <comp-one v-model="value"><comp-one>
        `
})

//alternative way

const component = {
    model: {
        prop: 'value1',
        event: 'change'
    }
    props: {
        value1: {
            type: String,
            required: true
        },
    }
    template: `<div>
                <input type="text" @input="handleInput" :value="value1">
                </div>`,
    
    methods: {
        handleInput(e) {
            this.emit('change', e.target.value)
        }
    }
}

new Vue({
    el: '#root',
    components: {
        compOne: component
    }
    data() {
        return {
            value: 123
        }
    },
    template: `
            <comp-one v-model="value"><comp-one>
        `
})
~~~
### slots
~~~
const component = {
    template: `<div :style="style">
                    <div class="header">
                        <slot name="header"><slot>
                    </div>
                    <div class="footer">
                        <slot name="footer"><slot>
                    </div>
                </div>`,
    
    data() {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        }
    }
}

new Vue({
    el: '#root',
    components: {
        compOne: component
    }
    data() {
        return {
            value: 123
        }
    },
    template: `
            <comp-one v-model="value">
                <span slot="header">this is header</span>
                <span slot="footer">this is footer</span>
            <comp-one>
        `
})

//slot-scope="props" can get the inside properties
~~~

### provider
~~~
import Vue from 'vue'

const childComponent = {
    inject: ['grandparent', 'data'],
    mounted() {
        console.log(grandparent)
    }
    template: `<div>
            child component
            {{data.value}}
            </div>
        `
}

const component = {
    components: {
        childComponent
    },
    template: `<div>
            <child-component/>
            </div>
        `,
    data() {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        }
    }
}

new Vue({
    components: {
        CompOne: component
    },
    provide() {
        const data = {}
        // value can be passed to children
        Object.defineProperty(data, 'value', {
            get: () => this.value,
            enumerable: true
        })
        return {
            grandparent: this
            data
        }      
    }
    el: '#root',
    data() {
        return {
            value: 123
        }
    }
})
~~~

### component render
~~~
render (createElement) {
    return createElement('comp-one', {
        ref:'father'
    }, [createElement('span', {
        ref: 'chilren'
    }, this.value)])
}
~~~

## Vue Route
### define Routers
~~~
import Todo from '../../todo/todo.vue'
import Login from '../../login/login.vue'

const routes = [
    {
        path: '/',
        redirect: '/app'
    }
    {
        path: '/app',
        component: Todo,
        name: 'appPage',
        meta: {
            title： ’this is app‘,
            keyWords: 'the page keywors',
            descripiton: 'this page description'
        },
        children: [
            {
                path: 'test',
                component: 
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/loginexact/:id',
        component: Exact,
        name: 'loginexactPage',
        props: true,
    },
    {
        path: '/multiple/view',
        component: {
            default: Multiple,
            a: Login
        },
        name: 'multipleView'，
        beforeEnter(to, from, next) {
           console.log('app route before enter') 
           next()
        }
    }
]

import Router from 'vue-router'
export default () => {
    return new Router({
        routes，
        mode: 'history',
        //will add/base/ after host
        base: '/base',
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link'，
        scrollBehavior (to, from. savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return {x : 0, y : 0}
            }
        },
        parseQuery (query) {

        },
        stringifyQuery(obj) {

        },
        fallback: true
    })
}


<router-link  to="login"> Login </router-link>
<router-link  :to="{name: 'appPage'}"> app </router-link>
<router-link  :to="{name: 'loginexactPage'}"> loginexactPage </router-link>

<transition name='fade'>
    <router-view />
</transition>

 <router-view name='a' />

//get route parameters this.$route or use props:['id'] in component
~~~
### named view
~~~
<router-view></router-view>
<div class="container">
    <router-view name="left"></router-view>
    <router-view name="main"></router-view>
</div>

{
    path: '/',
    components:{
        'defualt': headerComponent,
        'left': leftBoxComponent,
        'main':mainboxComponent,
    }
}
~~~
### router guard
~~~
import createRouter from './config/router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = createRouter()
router.beforeEach((to, from ,next) => {
    if (to.fullPath === 'app') {
         next('/login')
    }
})

router.beforeResolve((to, from ,next) => {
    next()
})

router.afterResolve((to, from) => {

})
~~~
##  Vuex
### define vuex
~~~
store.js
import Vuex from 'vuex'

export default () => {
    return new Vuex.Store({
                state: {
                    count: 0
                },
                mutations: {
                    updateCount (state, num) {
                        state.count = num
                    }
                }
})

//put store in the root component
import Vuex from 'vuex'
import Vue from 'vue'
import createStore from './store/store.js'
import createRouter from './store/router.js'

Vue.use(Vuex)
const store = createStore()
const router = createRouter()

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#root')


app.js

mounted() {
    console.log(this.$store)
    let i = 1
    setInterval(() => {
        this.state.commit('updateCount', i++)
    })
}
computed: {
    count() {
        return this.$store.state.count
    }
}
~~~
### vuex getter and setter
~~~
getters are equal to computed
export default {
    fullName (state) {
        return `${state.firstName} ${state.lastName}`
    }
}

computed: {
    fullName () {
        return this.$store.getters.fullName
    }
}

import {mapState, mapGetters} from 'vuex'

computed: {
    ...mapState(['count'])
}
or 
computed: {
    ...mapState({
        count: (state) => state.count
    }),
    ...mapGetters(['fullname'])
}
//the use {{count}} in template
~~~
### mutation and action
~~~
//action for async , use dispatch
//mutation for sync, use commit
export default {
    updateCountSync(store, data) {
        setTimeout(() => {
            store.commit('updateCount', data.num)
        }, data.time)
    }
}

this.$store.dispatch('updateCountSync', {
    num: 5,
    time: 2000
})
or
this.updateCountSync({num: 5, time: 2000})

methods: {
    ...mapActions(['updateCountSync']),
    ...mapMutations(['updateCount'])
}
~~~
### vuex modules
~~~
export default () => {
    return new Vuex.Store({
        strict: idDev,
        state: defaultState,
        mutations,
        getters,
        actions,
        modules: {
            aModule: {
                numespaced: true,
                state: {
                    text: 1
                },
                mutations: {
                    updateText(state, text){
                        state.text = text
                    }
                },
                getters: {
                    textPlus(state, getters, rootState) {
                        return state.text + 1
                    }
                },
                actions: {
                    add ({state, commit, rootState}) {
                        commit('updateText', rootState.count, {root: true})
                    }
                }
            },
            bModule: {
                state: {
                    count: 0
                }
            }
        }
    })
}

computed: {
    textA() {
        return this.$store,state.aModule.text
    }
}
or 
computed: {
    ...mapState({
        text: (state) => state.aModule.text
    }),
    ...mapGetters({
        'fullname': 'fullname',
        textPlus: 'aModule/textPlus'
    })
},
methods: {
    ...mapActions(['aModule/add'])
    ...mapMutations(['aModule/updateText']),
    
}


this.['aModule/updateText']('123')
this.['aModule/add']('123')
~~~
### hot update
~~~
if (module.hot) {
    module.hot.accept([
        './state/state',
        './mutations/mutations',
        './actions/actions'
        './getters/getters',
    ], () => {
        const newState = require('./state/state').default
        const newMutations = require('./mutations/mutations').default
        const newActions = require('./actions/actions').default
        const newGetters = require('./getters/getters').default

        store.hotUpdate({
            state: newState,
            mutations: newMutations,
            newActions: newActions,
            newGetters: newGetters,
        })
    })

    return store
}
~~~
### vuex other api
~~~
store.registerModule('cModule', {
    state: {
        text: 3
    }
})
store.unRegisterModule('cModule')

store.watch((state) => {
    return state.count + 1
}, (newCounter) => {
    console.log(newCounter)
})

store.subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(mutation.payload)
})

store.subscribeAction((action, state) => {
    console.log(action.type)
    console.log(action.payload)
})
~~~
## DIY Component
~~~
<template>
    <transition name="fade">
        <div class="notification"
        :style = "style"
        :v-show= "visible"
        >
            <span class="content">{{content}}</span>
            <a class="btn" @click="handleClose">{{btn || close}}</a>
        <div>
    </transition>
</template>

export default {
    name: 'Notification',
    props: {
        content: {
            type:String,
            required: true
        }
        btn: {
            type: String,
            default: 'close'
        },
    },
    data() {
            return {
                visible: true
            }
    },
    methods: {
        handleClose (e) {
            e.preventDefault(),
            this.$emit('close')
        }
    },
    computed: {
        style() {

        }
    }
}

//extend notification

import Notification from './notification.vue'
export default {
    extends: Notification,
    computed: {
        style() {
            return {
                position: 'fixed';
                right: '20px'
                bottom: `{this.verticalOffset}px`
            }
        }
    },
    data() {
        return {
            verticalOffset: 0,
            autoClose: 3000
        }
    },
    mounted(){
        this.createTimer()
    },
    beforeDestory() {
        this.clearTimer()
    }
    methods: {
        createTimer() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer() {
            if (this.timer) clearTimeout(this.timer)
        }
    }
} 

import Vue from 'vue'
import Component from './func-notification'
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
    if (!instance) return 
    const = instances.length
    const index = instance.findIndex(inst => instance.id === inst.id)
    instances.splice(index, 1)
}

const notify = (options) => {
    const {autoClose, ...rest} = options
    const instance = new NotificationConstructor({
        propsData: {...rest},
        data: {
            autoClose: autoClose === undefined ? 3000 : autoClose
        }
    })
    const id = `notification_${seed++}`
    instance.id = id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)

    let veticalOffset = 0
    instance.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })
    verticalOffset += 16
    intance.verticalOffset = verticalOffset
    instances.push(instance)
    instance.vm.$on('closed', () => {
        removeInstance(instance)
        document.body.removeChild(intance.vm.$el)
        instance.vm.$destroy()
    })
    instance.vm.$on('close', () => {
        instance.vm.visible = false
    })
    return instance.vm
}

export default notify
~~~

let p = new Promise((resolve, reject) => {
  console.log('A new promise was created1')
  console.log('A new promise was created2')
  console.log('A new promise was created3')
  setTimeout(() => {
    console.log('log setTimeout')
  }, 0)
  resolve('success')
})

console.log('log outside')
p.then((response) => {console.log(response)})