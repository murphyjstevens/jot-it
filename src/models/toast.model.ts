import type { ToastType } from './toast-type.enum'

export interface Toast {
  id: number
  type: ToastType
  title: string
  message: string
}
