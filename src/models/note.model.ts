export interface Note {
  id: number | undefined
  title: string
  markdownText: string
  creatorId: number
  updatedDate: Date | undefined
}
