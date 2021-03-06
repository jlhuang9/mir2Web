import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import queen from '@/components/queen'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', component: index},
    {path: '/index', name: 'index', component: index},
    {path: '/queen', name: 'queen', component: queen},
  ]
})
