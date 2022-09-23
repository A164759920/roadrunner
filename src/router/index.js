import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cars from '../views/Cars'
import Rat from '../views/Rat'
import Album from '../views/Album'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,

    
    children: [
    //重定向子路由的默认页
      {
        path: '/',
        redirect: '/car'
      },
      {
        path: 'car',
        component:Cars
      },
      {
        path: 'rat',
        component:Rat
      }, 
      {
        path: 'album',
        component:Album
      }
    ]
    
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
