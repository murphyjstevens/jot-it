import type { Note } from '@/models/note.model'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { useNoteStore } from '../note.store'

describe('NoteStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should load notes from localStorage', () => {
    const store = useNoteStore()

    const note1 = {
      id: 1,
      title: 'Test',
      markdownText: '## test',
      updatedDate: new Date(),
    } as Note

    const note2 = {
      id: 2,
      title: 'Test2',
      markdownText: '## test2',
      updatedDate: new Date('2020-01-01'),
    } as Note

    const localStorageGetItemSpy = vi
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue(JSON.stringify([note1, note2]))

    store.load()

    expect(localStorageGetItemSpy).toHaveBeenCalled()
    expect(store.notes.length).toBe(2)
    expect(store.notes[0].id).toBe(note1.id)
  })
})
