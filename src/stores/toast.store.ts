import { defineStore } from 'pinia'

import { type Toast, ToastType } from '@/models'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: new Array<Toast>(),
  }),
  actions: {
    addError(error: Error) {
      const currentIds: Array<number> = this.toasts.map((t) => t.id)
      const maxNoteId = currentIds.length
        ? currentIds.reduce((a: number, b: number) => (a > b ? a : b))
        : 0
      const newId: number = maxNoteId + 1

      const toast = {
        id: newId,
        type: ToastType.Error,
        title: 'Error',
        message: error.message,
      } as Toast

      this.toasts = [toast, ...this.toasts]
      this.startRemovalTimeout(toast)
    },
    remove(toast: Toast) {
      this.toasts = [...this.toasts.filter((t) => t.id !== toast.id)]
    },
    startRemovalTimeout(toast: Toast) {
      setTimeout(() => {
        this.remove(toast)
      }, 5000)
    },
  },
})
