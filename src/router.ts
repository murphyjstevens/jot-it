import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'

import NoteItem from './components/NoteItem.vue'
import NoteList from './components/NoteList.vue'

const routes = [
  { path: '/', name: 'NoteList', component: NoteList },
  { path: '/notes/new', name: 'NewNoteItem', component: NoteItem },
  { path: '/notes/:id?', name: 'NoteItem', component: NoteItem },
]

const scrollBehavior = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  savedPosition: any | null
) => {
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
