<script setup>
import { useUser, SEA, useColor, updateProfile } from '#composables'
import { useRefHistory } from '@vueuse/core'
import { ref, nextTick } from 'vue'

const colorDeep = useColor('deep')
const colorLight = useColor('light')

const { user, auth, create } = useUser()

const name = ref('')

const newPair = ref(null)
const { history, undo, redo } = useRefHistory(newPair)

async function generatePair() {
  newPair.value = await SEA.pair()
}

generatePair()

function createUser() {
  auth(newPair.value, () => nextTick(() => {
    updateProfile('name', name.value)
  }))
}

const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col.items-center.flex-1.p-2.bg-light-700.rounded-3xl.shadow-lg.text-center.p-4.transition.duration-300ms.ease-in(
  v-if="!user.is" 
  :style="{ backgroundColor: colorDeep.hex(newPair?.pub || '') }"
  )
  .text-xl.font-bold {{ t('gunvue.create_account') }}
  .mb-4.mt-2 {{ t('gunvue.refresh_keys') }}
  account-avatar.cursor-pointer.rounded-full.shadow-xl.border-8(
    v-if="newPair" 
    :pub="newPair.pub" 
    :size="200" 
    :style="{ borderColor: colorDeep.hex(newPair.pub) }" 
    @click="generatePair()"
    )
  .flex.flex-col
    .flex.justify-center.my-4
      button.m-2.button.items-center(
        v-if="history.length > 2" 
        @click="undo()"
        )
        .i-la-undo.text-2xl
      button.m-2.button.items-center(@click="generatePair()")
        .i-fad-random-1dice.text-3xl
    input.p-4.rounded-2xl.my-2(
      v-model="name" 
      :placeholder="t('gunvue.enter_alias')"
      )
    button.button.w-full.flex.justify-center.items-center(
      v-if="newPair && !user.is && name" 
      :style="{ backgroundColor: colorLight.hex(newPair.pub) }" 
      @click="createUser()"
      )
      | {{ t('gunvue.authenticate') }}
</template> 