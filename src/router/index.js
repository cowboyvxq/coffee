import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    // 二级路由
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: '/shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
      },
    ]
  },
  //重定向
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/detail/:pid',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/meorders',
    name: 'MeOrders',
    component: () => import('../views/MeOrders.vue'),
  },
  {
    path: '/aboutme',
    name: 'AboutMe',
    component: () => import('../views/AboutMe.vue'),
  },
  {
    path: '/mypocket',
    name: 'MyPocket',
    component: () => import('../views/MyPocket.vue'),
  },
  {
    path: '/myorder',
    name: 'MyOrder',
    component: () => import('../views/MyOrder.vue'),
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue'),
  },
  {
    path: '/securitycenter',
    name: 'SecurityCenter',
    component: () => import('../views/SecurityCenter.vue'),
  },
  {
    path: '/myaddress/:aid',
    name: 'MyAddress',
    component: () => import('../views/MyAddress.vue'),
  },
  {
    path: '/tallyorder/:sids',
    name: 'tallyOrder',
    component: () => import('../views/tallyOrder.vue'),
  },
  {
    path: '/search/:names',
    name: 'search',
    component: () => import('../views/search.vue'),
  },
  {
    path: '/forpassword',
    name: 'forPassword',
    component: () => import('../views/forPassword.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
