import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

import { NoteEdit, NoteItem } from '@/components/note'
import { HomeView, NewNoteView, NoteView, SettingsView } from '@/views'

const routes = [
  {
    path: '',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/new',
    name: 'NewNote',
    component: NewNoteView,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
  },
  {
    path: '/:id',
    name: 'Note',
    component: NoteView,
    children: [
      { path: '', name: 'NoteItem', component: NoteItem },
      { path: 'edit', name: 'NoteEdit', component: NoteEdit },
    ],
  },
] as Array<RouteRecordRaw>

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})
