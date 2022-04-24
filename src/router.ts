import {
  createRouter,
  createWebHashHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

import NoteItem from './components/NoteItem.vue'
import TheHome from './components/TheHome.vue'

const routes = [
  {
    path: '/:id?',
    name: 'Home',
    component: TheHome,
    children: [
      { path: '', component: NoteItem },
      { path: 'edit', component: NoteItem },
    ],
  },
] as Array<RouteRecordRaw>

export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})