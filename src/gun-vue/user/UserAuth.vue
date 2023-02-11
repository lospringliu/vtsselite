<script setup lang="ts">
import { useUser, safeJSONParse, uploadText, SEA, parseLink } from '../composables'
import { ref, watch } from 'vue'
import { ISEAPair } from 'gun';

const current = ref('pass')
const pair = ref()
const passphrase = ref(null)

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

watch(pair, (p) => {
// console.log(p)
  if (p && typeof p == 'string' && p.substring(0, 3) == 'SEA') {
    passphrase.value = ''
  }
  if (typeof p == 'string' && p.includes('#/auth/')) {
    p = parseLink(p)
  }
  let obj = safeJSONParse(p) as ISEAPair
  if (obj?.pub && obj?.priv) {
    auth(obj)
    pair.value = ''
  } else {
    console.log('No valid pair')
  }
})

const { auth } = useUser()

async function decode() {
  pair.value = await SEA.decrypt(pair.value, passphrase.value);
}

function uploadFile(event) {
  uploadText(event.target?.files, (file: ISEAPair) => pair.value = file)
}

const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col.my-4.flex-1.items-center.bg-light-700.rounded-3xl.p-4.shadow-lg
  .font-bold.text-xl {{ t('gunvue.already_account') }}
  .text-md {{ t('gunvue.login_saved_key') }}
  .flex
    button.button.m-2.cursor-pointer.flex.items-center(@click="show('key')")
      .i-la-key.text-xl
      .p-1.ml-1.font-bold {{ t('gunvue.login_paste') }}
    label.button.m-2.cursor-pointer.flex.items-center(for="qr-input")
      .i-la-qrcode.text-xl
      .p-1.ml-1.font-bold {{ t('gunvue.login_qr') }}
    label.button.m-2.cursor-pointer.flex.items-center(for="json-input")
      .i-la-file-code.text-xl
      .p-1.ml-1.font-bold {{ t('gunvue.login_json') }}
  form.flex(v-if="passphrase !== null")
    input.py-1.px-4.m-1.rounded-xl(
      v-model="passphrase" 
      autofocus 
      type="text" 
      :placeholder="t('gunvue.enter_password')"
      )
    button.button.text-2xl(
      type="submit" 
      @click="decode()"
      )
      .i-la-sign-in-alt
  .hidden
    qr-load(@loaded="pair = $event")
    input#json-input(
      ref="file" 
      tabindex="-1" 
      type="file" 
      accept="application/json" 
      @change="uploadFile($event)"
      )
  .flex.flex-wrap
    transition(name="fade")
      textarea.p-2.text-sm.flex-1.w-full(
        v-if="current == 'key'" 
        key="text" 
        v-model="pair" 
        rows="6" 
        cols="40" 
        :placeholder="t('gunvue.paste_keys')"
        )
</template> 