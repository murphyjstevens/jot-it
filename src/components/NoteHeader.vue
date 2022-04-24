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

const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

const canSave: Ref<boolean> = computed(() => !!noteStore.currentNote?.title)
const isEdit: Ref<boolean> = ref(false)

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
  if (route.params.id === '') {
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

function save() {
  if (canSave.value) {
    noteStore.saveNote()
    router.push(`/${noteStore.currentNote.id}`)
  }
}

function showSidebar() {
  sidebarStore.show = true
}

loadNote()

watch(
  () => route.path,
  () => {
    const pathArray = route.path.split('/')
    const lastPath = pathArray[pathArray.length - 1]
    isEdit.value = lastPath === 'edit' || lastPath === 'new'
  }
)

watch(
  () => route.params.id,
  () => {
    loadNote()
  }
)
</script>

<template>
  <div class="action-bar flex-row mt-2">
    <button class="hamburger-button" @click="showSidebar()">
      <i class="bi-list"></i>
    </button>
    <time
      class="mr-2"
      v-if="noteStore.currentNote?.updatedDate"
      title="Last Updated"
    >
      {{ noteStore.currentNote.updatedDate.toLocaleString() }}
    </time>
    <button v-if="!isEdit" class="btn-primary" @click="goToEdit()">Edit</button>
    <button
      v-if="isEdit"
      class="btn-primary"
      @click="save()"
      :disabled="!canSave"
      :title="canNotSaveReason"
    >
      Save
    </button>
  </div>
</template>

<style scoped lang="scss">
.action-bar {
  justify-content: flex-end;

  .hamburger-button {
    display: none;
  }
}

@media screen and (max-width: 1024px) {
  .action-bar {
    justify-content: space-between;

    .hamburger-button {
      display: flex;
    }

    time {
      display: none;
    }
  }
}
</style>
