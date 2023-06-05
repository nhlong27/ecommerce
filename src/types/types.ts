import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
})

export const BookSchema = z.object({
  title: z.string(),
})

export const BooksSchema = z.array(BookSchema)

export type UserType = z.infer<typeof UserSchema>
export type BookType = z.infer<typeof BookSchema>
export type BooksType = z.infer<typeof BooksSchema>
