import { watchArray } from '@vueuse/core'
import Gun from 'gun/gun'
import 'gun/lib/then'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import 'gun/lib/webrtc'

import { PEER, USERS, USERS_LIST } from './params'
export const gun = Gun({ peers: [PEER.value] })
export const GUN_BASE = gun.get('ibm').get('bedrock').get('cicd')

const USERLIST = [...USERS_LIST]

// from gun to ref
export const gun_init = () => {
  GUN_BASE.get('users').map().on((d, k) => {
    if (k) {
      // console.log(`found existing users in gun ${k}`)
      const index = USERLIST.findIndex(user => user.name === k)
      if (index !== -1)
        USERLIST.splice(index, 1)
      const user = USERS.value.find(u => u.name === k)
      if (user) {
        user.index = d.index || 0
      }
      else {
        const { name, index = 0 } = d
        USERS.value.push({ name, index })
      }
      USERS.value.sort((x, y) => +x.index - +y.index)
    }
    // else {
    //   console.log(`no users found in gun yet`)
    // }
  })
}

export const users_init = () => {
  USERLIST.forEach((user) => {
    GUN_BASE.get('users').get(user.name).put({ name: user.name, index: USERS_LIST.findIndex(u => u.name === user.name) })
    console.dir(user)
  })
}

// from ref to gun
watchArray(USERS, (new_list, old_list, added, removed) => {
  // console.log(old_list)
  // console.log(new_list)
  // console.log(added)
  // console.log(removed)
  new_list.forEach((user, index) => {
    user.index = index
    GUN_BASE.get('users').get(user.name).put({ index })
  })
  USERS.value = new_list.sort((x, y) => +x.index - +y.index)
}, {
  deep: true,
})

gun_init()
// GUN_BASE.get("users").map().once((d,k) => {console.log(d); console.log(k)})
// setInterval(() => USERS.value.reverse(), 2000)
