import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

import { NoteEdit, NoteItem } from '@/components/note'
import { HomeView, SettingsView } from '@/views'

const routes = [
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
  },
  {
    path: '/:id?',
    name: 'Home',
    component: HomeView,
    children: [
      { path: '', name: 'NoteItem', component: NoteItem },
      { path: 'edit', name: 'NoteEdit', component: NoteEdit },
      { path: 'new', name: 'NoteNew', component: NoteEdit },
    ],
  },
] as Array<RouteRecordRaw>

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})
