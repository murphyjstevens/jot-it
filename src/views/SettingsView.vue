<script setup lang="ts">
import { saveAs } from 'file-saver'
import JsZip from 'jszip'

import { AppButton, AppDropZone } from '@/components/library'
import type { Note } from '@/models'
import { useNoteStore, useSidebarStore } from '@/stores'
import { useTemplateRef } from 'vue'

const noteStore = useNoteStore()
const sidebarStore = useSidebarStore()

const filePickerRef = useTemplateRef('filePicker')

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

function fileChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (target?.files?.length) {
    importData([...target.files])

    if (filePickerRef.value) {
      filePickerRef.value.value = ''
    }
  }
}

async function importData(files: Array<File> | undefined) {
  if (!files) {
    return;
  }

  const allowedFileTypes: Array<string> = ['text/markdown', 'text/plain']

  files
    .filter(file => allowedFileTypes.includes(file.type))
    .forEach(async file => {
      const note: Note = {
        markdownText: await file.text(),
        title: removeExtension(file.name),
        icon: 'journal'
      } as Note

      noteStore.saveNote(note)
    })
}

function removeExtension(filename: string): string {
  const lastIndex = filename.lastIndexOf('.');
  if (lastIndex === -1) {
    return filename; // No extension found
  }
  return filename.slice(0, lastIndex);
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

    <AppDropZone
      @dropped="importData"
      class="ms-7 my-3 flex flex-row items-center"
    >
      <AppButton
        variant="default"
        color="primary"
        class="me-2"
        @click="filePickerRef?.click()"
      >Import</AppButton>

      <span class="text-lg">Import one or more markdown documents</span>

      <input
        type="file"
        ref="filePicker"
        @change="fileChange($event)"
        accept=".md,.txt"
        multiple
        class="hidden"
      />
    </AppDropZone>
  </main>
</template>
