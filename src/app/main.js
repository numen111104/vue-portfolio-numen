// Import Tailwind CSS - style.css is the minified production version
// For development, run `npm run watch` to regenerate from input.css
import '@/assets/styles/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import apiSessionClient from '@/lib/axios/apiSession'
import { appHelper } from '@/utils/appHelper.js'

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
