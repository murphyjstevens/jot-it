import { defineStore } from 'pinia'

import type { Note } from '../models/note.model'

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: new Array<Note>(),
  }),
  actions: {
    load() {
      const json = localStorage.getItem('notes')
      if (!json) {
        this.notes = []
        return
      }

      let noteList = JSON.parse(json) as Array<Note>
      noteList = noteList.map((note) => {
        return {
          ...note,
          updatedDate: note.updatedDate ? new Date(note.updatedDate) : null,
        } as Note
      })

      this.notes = noteList
    },
    saveNote(updatedNote: Note) {
      this.notes = [
        ...this.notes.filter((n) => n.id !== updatedNote.id),
        updatedNote,
      ]
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
  },
})
