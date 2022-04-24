<script setup lang="ts">
import { useNoteStore } from '@/stores/note.store'
import { useSidebarStore } from '@/stores/sidebar.store'
import { type Ref, computed } from 'vue'

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

const canSave: Ref<boolean> = computed(() => !!noteStore.currentNote?.title)

const canNotSaveReason: Ref<string> = computed(() =>
  !noteStore.currentNote?.title ? 'The title is required' : ''
)

function save() {
  if (canSave.value) {
    // noteStore.saveNote(note.value)
  }
}

function showSidebar() {
  sidebarStore.show = true
}
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
    <button
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
