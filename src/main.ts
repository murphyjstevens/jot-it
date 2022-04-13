import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import { router } from './router'
import App from './App.vue'

const app = createApp({
  render: () => h(App),
})

app.use(router)

app.use(createPinia())

app.mount('#app')
