<script setup>
import { useUser, downloadFile, usePass } from '#composables'
import { ref, computed } from 'vue'
import { useClipboard, useShare } from '@vueuse/core'

const emit = defineEmits(['close'])

const current = ref('pass')

const { user } = useUser()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

const { pass } = usePass()


const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

const safePair = ref(true)

const encPair = computed(() => {
  return safePair.value ? pass?.safe?.enc : JSON.stringify(user.pair())
});

const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col.items-stretch.pb-4.border-1.border-dark-100.border-opacity-10.max-w-120.mx-auto(v-if="user.is && !user.safe?.saved")
  slot
    .mt-4.mx-6 {{ t('gunvue.save_keys') }}
  user-pass
  .flex.p-4.items-center.bg-dark-100.bg-opacity-20.mt-2.shadow-inset(v-if="encPair")
    .flex.flex-col.w-34.items-center(:style="{ color: safePair ? 'green' : 'red' }")
      button.m-2.button.text-2xl(@click="safePair = !safePair")
        .i-la-lock(v-if="safePair")
        .i-la-unlock(v-else)
      .text-sm {{ safePair ? t('gunvue.encrypted') : t('gunvue.plaintext') }}
      .text-m {{ t('gunvue.cred_keypair') }}
    .flex.flex-wrap
      button.m-2.button.items-center(
        v-if="canShare" 
        :class="{ active: current == 'pass' }" 
        @click="share({ title: 'Your key pair', text: encPair })"
        )
        .i-la-share
        .px-1 {{ t('gunvue.cred_share') }}
      button.m-2.button.items-center(
        v-if="canCopy" 
        @click="copy(encPair)"
        )
        .i-la-copy
        transition(name="fade")
          .px-2(v-if="copied") {{ t('gunvue.util_copied') }}!
          .px-2(v-else) {{ t('gunvue.util_copy') }}
      a.m-2.button.items-center(
        :href="safePair ? pass.links.pass : pass.links.pair" 
        target="_blank" 
        @click="show('links')" 
        )
        .i-la-link
        .px-2 {{ t('gunvue.cred_link') }}
      button.m-2.button.items-center(@click="show('qr')")
        .i-la-qrcode
        .px-2 {{ t('gunvue.cred_qr') }}
      button.m-2.button.items-center(@click="show('key')")
        .i-la-envelope-open-text
        .px-2 {{ t('gunvue.cred_text') }}
      button.m-2.button.items-center(@click="downloadFile(encPair, 'text/json', (user.name || 'account') + '.json', false); current = null")
        .i-la-file-code
        .px-2 {{ t('gunvue.cred_json') }}
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      textarea.p-4.text-sm.flex-1.rounded-xl(
        v-if="current == 'key'",
        key="text",
        rows="9",
        :value="encPair"
      )
      qr-show.max-w-600px(
        v-if="current == 'qr'" 
        key="qr" 
        :data="safePair ? pass.links.pass : pass.links.pair"
        )
  button.button.mx-8.justify-center(@click="$emit('close')")
    .i-la-check
    .ml-2 {{ t('gunvue.cred_saved') }}
</template>

<style scoped>

</style>