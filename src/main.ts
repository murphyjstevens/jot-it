import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp({
  render: () => h(App),
})

app.use(router)

app.use(createPinia())

app.mount('#app')
