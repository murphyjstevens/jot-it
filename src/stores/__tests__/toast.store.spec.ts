import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { ToastType } from '@/models/toast-type.enum'
import type { Toast } from '@/models/toast.model'
import { useToastStore } from '../toast.store'

describe('ToastStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should update state when adding error', () => {
    const store = useToastStore()
    const error: Error = {
      message: 'Test',
    } as Error

    store.addError(error)

    expect(store.toasts.length).toBe(1)
    expect(store.toasts[0].message).toBe(error.message)
  })

  it('should add to start of array when adding error', () => {
    const store = useToastStore()

    const existingToast: Toast = {
      id: 1,
      type: ToastType.Success,
      title: 'Test',
      message: 'Success!',
    } as Toast

    store.toasts = [existingToast]

    const error: Error = {
      message: 'Test',
    } as Error

    store.addError(error)

    expect(store.toasts.length).toBe(2)
    expect(store.toasts[0].id).toBe(2)
    expect(store.toasts[0].message).toBe(error.message)
  })

  it('should remove toast messages', () => {
    const store = useToastStore()
    const toast1 = {
      id: 1,
      type: ToastType.Success,
      title: 'Test',
      message: 'Success 101',
    } as Toast
    const toast2 = {
      id: 2,
      type: ToastType.Error,
      title: 'New test',
      message: 'Error 101',
    } as Toast

    store.toasts = [toast1, toast2]

    store.remove(toast1)

    expect(store.toasts.length).toBe(1)
    expect(store.toasts[0].id).toBe(toast2.id)
  })
})
