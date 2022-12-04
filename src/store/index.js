import { createStore } from 'vuex'
import app from '@/store/modules/app'
import info from '@/store/modules/info'
export default createStore({
  modules: {
    app,
    info
  }
})
