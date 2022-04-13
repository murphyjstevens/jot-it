import { createRouter, createWebHistory } from 'vue-router'

import NoteItem from './components/NoteItem.vue'
import NoteList from './components/NoteList.vue'

const routes = [
  { path: '/', name: 'NoteList', component: NoteList },
  { path: '/Notes/:id', name: 'NoteItem', component: NoteItem },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  //https://router.vuejs.org/guide/advanced/scroll-behavior.html
  if (to.hash) {
    return { el: to.hash, behavior: 'smooth' }
  } else if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})
