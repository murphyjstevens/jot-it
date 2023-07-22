import './assets/base.css'
import 'normalize.css/normalize.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'highlight.js/styles/dark.css'

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
