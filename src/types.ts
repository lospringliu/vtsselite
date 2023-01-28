import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface IUser {
  name: string
  index?: number
  [key: string]: any
}
