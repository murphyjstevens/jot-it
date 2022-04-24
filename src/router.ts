import {
  createRouter,
  createWebHashHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

import NoteEdit from './components/NoteEdit.vue'
import NoteItem from './components/NoteItem.vue'
import TheHome from './components/TheHome.vue'

const routes = [
  {
    path: '/:id?',
    name: 'Home',
    component: TheHome,
    children: [
      { path: '', component: NoteItem },
      { path: 'edit', component: NoteEdit },
      { path: 'new', component: NoteEdit },
    ],
  },
] as Array<RouteRecordRaw>

export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})
