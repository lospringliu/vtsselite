<script setup>
import { ref } from 'vue'
const generate = ref(false)
const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col.p-4
  button.text-xl.flex.justify-center.bg-light-900.hover-bg-light-50.p-4.rounded-2xl.shadow-lg.hover-shadow-xl.transition.duration-200.ease-out.font-bold(
    v-if="!generate" 
    @click="generate = true"
    ) {{ t('gunvue.create_account') }}
  .flex.justify-center.mt-4(v-if="!generate") {{ t('gunvue.or') }}
  user-auth(v-if="!generate")
  user-create(v-else)
</template>