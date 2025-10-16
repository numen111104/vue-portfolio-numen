// Import styles conditionally based on the environment using dynamic imports
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

const app = createApp(App)
app.use(createPinia())
app.use(router)

apiSessionClient
  .get('/sanctum/csrf-cookie')
  .then(() => {
    app.mount('#app')
  })
  .catch((error) => {
    console.error('Could not get CSRF cookie. App will not mount.', error)
  })
