import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { initializeStore, injectionKey } from '@/plugins/store'

declare global {
  interface Window {
    rocks: any
  }
}

window.rocks = createApp(App)
  .use(router)
  .use(vuetify)
  .use(initializeStore(), injectionKey)
  .mount('#app')
