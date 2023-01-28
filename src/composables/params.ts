import type { Ref } from 'vue'
import { ref } from 'vue'
import { useNow, watchArray } from '@vueuse/core'
import type { IUser } from '../types'

export const PEER = ref('http://relay.gun.com:8080/gun')
export const additional_weeks_shown = ref(10)
export const NOW = useNow()
export const YEAR = ref(new Date().getFullYear())
export const USERS_LIST: IUser[] = [
  { name: 'Xinchun Liu' },
  { name: 'Kevin Carr' },
  { name: 'Vasanth Alle' },
  { name: 'Kyle Murley' },
  { name: 'Stephen Cocks' },
]
export const USERS: Ref<IUser[]> = ref([])
// export const USERS = ref([...USERS_LIST])
