import {
  createRouter,
  createWebHashHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

import { NoteEdit, NoteItem } from '@/components/note'
import { HomeView } from '@/views'

const routes = [
  {
    path: '/:id?',
    name: 'Home',
    component: HomeView,
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
