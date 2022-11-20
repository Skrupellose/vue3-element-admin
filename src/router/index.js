import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: 'login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true
    },
    component: () => import('@/views/account/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '首页'
    },
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: '/console',
        name: 'Console',
        meta: {
          title: '控制台',
          icon: 'console'
        },
        component: () => import('@/views/console/index.vue')
      }
    ]
  },
  {
    path: '/info',
    name: 'Info',
    meta: {
      title: '信息管理',
      icon: 'info'
    },
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: '/infoIndex',
        name: 'InfoIndex',
        meta: {
          title: '信息列表',
          icon: 'info-list'
        },
        component: () => import('@/views/info/infoIndex/index.vue')
      },
      {
        path: '/infoCategory',
        name: 'InfoCategory',
        meta: {
          title: '信息分类',
          icon: 'info-category'
        },
        component: () => import('@/views/info/infoCategory/index.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    component: () => import('@/Layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
