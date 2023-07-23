<script setup lang="ts">
import { type Ref, computed, watch, ref } from 'vue'
import {
  useRoute,
  useRouter,
  type RouteLocationNormalizedLoaded,
  type Router,
} from 'vue-router'
import { useNoteStore } from '@/stores/note.store'
import { useSidebarStore } from '@/stores/sidebar.store'
import type { Note } from '@/models/note.model'
import { AppButton } from './library'

const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

const canSave: Ref<boolean> = computed(() => !!noteStore.editNote?.title)
const isEdit: Ref<boolean> = ref(false)
const isNew: Ref<boolean> = ref(false)

loadNote()
setIsEdit()

const canNotSaveReason: Ref<string> = computed(() =>
  !noteStore.currentNote?.title ? 'The title is required' : ''
)

function goToEdit() {
  const noteId = noteStore.currentNote?.id
  if (noteId) {
    router.push(`/${noteId}/edit`)
  }
}

function loadNote() {
  if (route.params.id === '' || route.path === '/new') {
    noteStore.currentNote = { markdownText: '', icon: 'journal' } as Note
    return
  }

  const routeId = +route.params.id
  if (route.params.id !== '' && !routeId) {
    router.push('/')
    return
  }

  let foundNote: Note | undefined = undefined
  if (+routeId) {
    foundNote = noteStore.notes.find((n) => n.id === routeId)
  }

  if (!foundNote) {
    router.push('/')
    return
  }

  noteStore.currentNote = foundNote
}

function cancel() {
  router.push(`/${noteStore.currentNote.id}`)
}

function save() {
  if (canSave.value) {
    noteStore.saveNote()
    router.push(`/${noteStore.currentNote.id}`)
  }
}

function showSidebar() {
  sidebarStore.show = true
}

function setIsEdit() {
  const pathArray = route.path.split('/')
  const lastPath = pathArray[pathArray.length - 1]
  isEdit.value = lastPath === 'edit' || lastPath === 'new'
  isNew.value = lastPath === 'new'
}

watch(
  () => route.path,
  () => {
    setIsEdit()
    loadNote()
  }
)
</script>

<template>
  <div
    class="px-2 my-2 flex flex-row justify-between items-center lg:justify-end"
  >
    <AppButton
      class="lg:hidden"
      variant="text"
      color="primary"
      @click="showSidebar()"
    >
      <i class="bi-list"></i>
    </AppButton>

    <div class="flex flex-row items-center">
      <time
        v-if="noteStore.currentNote?.updatedDate && !isEdit"
        class="me-2 hidden lg:flex"
        title="Last Updated"
      >
        {{ noteStore.currentNote.updatedDate.toLocaleString() }}
      </time>

      <AppButton
        v-if="!isEdit"
        variant="default"
        color="primary"
        @click="goToEdit()"
        >Edit</AppButton
      >

      <AppButton
        v-if="isEdit && !isNew"
        variant="text"
        color="default"
        @click="cancel()"
        class="me-2"
      >
        Cancel
      </AppButton>
      <AppButton
        v-if="isEdit"
        variant="default"
        color="primary"
        @click="save()"
        :disabled="!canSave"
        :title="canNotSaveReason"
      >
        Save
      </AppButton>
    </div>
  </div>
</template>
