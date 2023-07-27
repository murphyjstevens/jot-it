<script setup lang="ts">
import { saveAs } from 'file-saver'
import JsZip from 'jszip'

import { AppButton } from '@/components/library'
import type { Note } from '@/models'
import { useNoteStore, useSidebarStore } from '@/stores'

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

async function exportData() {
  const zip = new JsZip()
  noteStore.notes.forEach((note: Note) => {
    zip.file(`${note.title}.md`, note.markdownText)
  })

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'export.zip')
}

function showSidebar() {
  sidebarStore.show = true
}
</script>

<template>
  <main class="flex flex-col flex-1">
    <div class="my-2 px-2 flex flex-row items-center">
      <AppButton
        class="me-2 lg:hidden"
        variant="text"
        color="primary"
        @click="showSidebar()"
      >
        <i class="bi-list"></i>
      </AppButton>

      <h1 class="text-3xl">Settings</h1>
    </div>

    <h2 class="m-2 text-2xl">Data</h2>

    <div class="ms-7 my-3 flex flex-row items-center">
      <AppButton
        variant="default"
        color="primary"
        class="me-2"
        @click="exportData()"
        >Export</AppButton
      >

      <span class="text-lg">Export all of the markdown data</span>
    </div>

    <div class="ms-7 my-3 flex flex-row items-center">
      <AppButton variant="default" color="primary" class="me-2" disabled="true"
        >Import</AppButton
      >
      <span class="text-lg">Import one or more markdown documents</span>
    </div>
  </main>
</template>
