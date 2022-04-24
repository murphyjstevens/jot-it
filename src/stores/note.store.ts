import { defineStore } from 'pinia'

import type { Note } from '../models/note.model'

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: new Array<Note>(),
    currentNote: { markdownText: '' } as Note,
  }),
  actions: {
    load(): void {
      const json = localStorage.getItem('notes')
      if (!json) {
        this.notes = []
        return
      }

      let noteList = JSON.parse(json) as Array<Note>
      noteList = noteList
        .map(
          (note) =>
            ({
              ...note,
              updatedDate: note.updatedDate ? new Date(note.updatedDate) : null,
            } as Note)
        )
        .sort((a, b) => a?.title?.localeCompare(b.title) ?? -1)

      this.notes = noteList
    },
    saveNote(updatedNote: Note): void {
      if (!this.notes.some((n) => n.id === updatedNote.id)) {
        const currentIds: Array<number> = this.notes.map((n) => n.id ?? 0)
        const maxNoteId = currentIds.length
          ? currentIds.reduce((a: number, b: number) => (a > b ? a : b))
          : 0
        updatedNote.id = maxNoteId + 1
      }
      updatedNote.updatedDate = new Date()
      this.notes = [
        ...this.notes.filter((n) => n.id !== updatedNote.id),
        updatedNote,
      ].sort((a, b) => a?.title?.localeCompare(b.title) ?? -1)

      if (this.currentNote === null || this.currentNote.id === updatedNote.id) {
        this.currentNote = updatedNote
      }
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
  },
})
