import { createRouter, createWebHashHistory } from 'vue-router'

import NoteItem from './components/NoteItem.vue'
import NoteList from './components/NoteList.vue'

const routes = [
  { path: '/', name: 'NoteList', component: NoteList },
  { path: '/Notes/:id', name: 'NoteItem', component: NoteItem },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
