import { createApp, ComponentPublicInstance } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { initializeStore, injectionKey } from '@/plugins/store'
import { godModeListener } from '@/lib'

declare global {
  interface Window {
    keybuffer: ReturnType<typeof Array>
    rocks: ComponentPublicInstance
  }
}

window.rocks = createApp(App)
  .use(router)
  .use(vuetify)
  .use(initializeStore(), injectionKey).mount('#app')

window.keybuffer = []

window.addEventListener('keydown', godModeListener(window.rocks.$store))
