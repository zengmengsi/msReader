// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueTouch from 'vue-touch'
import {createRouter} from './router'
import {createStore} from './store'
import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
import vuescroll from 'vue-scroll'

Vue.use(vuescroll)
VueTouch.config.swipe = {
    direction: 'horizontal'
}

Vue.use(VueTouch, {
    name: 'v-touch'
})

Vue.use(MintUI)
Vue.config.productionTip = false
// Vue.use(Ajax, {
//   baseURL: 'http://65.49.197.99:3000/'
// })

/* eslint-disable no-new */
export function createApp() {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        // el: '#app',
        router,
        store,
        render: h => h(App)
        // template: '<App/>',
        // components: {
        //   App
        // }
    })

    return {app, router, store}
}

// Disable context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    event.stopPropagation()
})

Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
})
