import { defineStore } from 'pinia'

import type { Note } from '@/models'

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: new Array<Note>(),
    currentNote: { markdownText: '' } as Note,
    editNote: { markdownText: '' } as Note,
  }),
  actions: {
    load(): void {
      const json = localStorage.getItem('notes')
      if (!json) {
        this.notes = []
        return
      }

      let noteList = JSON.parse(json) as Array<Note>
      noteList = noteList.map(
        (note) =>
          ({
            ...note,
            updatedDate: note.updatedDate ? new Date(note.updatedDate) : null,
          } as Note)
      )

      this.notes = noteList
    },
    setEditNote(): void {
      this.editNote = { ...this.currentNote }
    },
    saveNote(noteParameter: Note | undefined = undefined): void {
      const noteToSave = noteParameter ?? this.editNote
      if (!this.notes.some((n) => n.id === noteToSave.id)) {
        const currentIds: Array<number> = this.notes.map((n) => n.id ?? 0)
        const maxNoteId = currentIds.length
          ? currentIds.reduce((a: number, b: number) => (a > b ? a : b))
          : 0
        noteToSave.id = maxNoteId + 1
      }
      
      noteToSave.updatedDate = new Date()
      this.notes = [
        ...this.notes.filter((n) => n.id !== noteToSave.id),
        noteToSave,
      ]

      if (
        this.currentNote === null ||
        this.currentNote.id === noteToSave.id
      ) {
        this.currentNote = { ...noteToSave }
      }
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },

    reorderNotes(oldIndex: number, newIndex: number): void {
      const movedNote: Note = { ...this.notes[oldIndex] }
      const reorderedNotes = this.notes.filter((_, index) => index !== oldIndex)
      reorderedNotes.splice(newIndex, 0, movedNote)
      this.notes = reorderedNotes
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
  },
})
