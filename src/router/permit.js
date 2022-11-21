import router from './index'
import cookie from '@/utils/cookie'
router.beforeEach((to, from) => {
  console.log(to)
  if (!cookie.getToken()) {
    if (to.name !== 'Login') {
      return {
        name: 'Login'
      }
    }
  }
})

router.afterEach((to, from) => {
  console.log(from)
})
