if (import.meta.env.PROD) {
  import('./assets/style.css')
} else {
  import('./assets/output.css')
}

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import apiSessionClient from './services/apiSession'
import { appHelper } from '@/utils/appHelper.js'
import echo from './echo';

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.config.globalProperties.$storage = (path) => appHelper.url.storage(path)


apiSessionClient
  .get('/sanctum/csrf-cookie')
  .then(() => {
    console.info('✅ CSRF cookie loaded successfully.')
  })
  .catch((error) => {
    console.warn('⚠️ Could not get CSRF cookie, app will still mount:', error.message)
  })
  .finally(() => {
    app.mount('#app')
  })
