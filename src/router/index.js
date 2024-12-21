import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Twitch from '../views/Twitch.vue'
import Settings from '../views/Settings.vue'
//import FAQ from '../views/FAQ.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/twitch',
    name: 'Twitch',
    component: Twitch
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  /*
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  }
  */
]

const router = new VueRouter({
  routes
})

export default router
