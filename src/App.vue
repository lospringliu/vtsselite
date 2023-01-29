<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, watch, watchEffect } from 'vue'
import { currentRoom, rootRoom, useBackground } from './gun-vue/composables'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log('on app mount')
  const languages = usePreferredLanguages()
  const { locale } = useI18n()
  const language = languages.value[0]
  if (language.startsWith('zh')) {
    locale.value = 'zh-CN'
  }
  else if (language.startsWith('ru')) {
  }
  else {}
  console.log('app mounted')
})
watchEffect(() => {
  if (route.query?.room)
    currentRoom.pub = route.query.room
})

watch(() => currentRoom.pub, (pub) => {
  if (pub == rootRoom.pub)
    router.push({ path: route.path, query: {} })

  else
    router.push({ path: route.path, query: { room: pub } })
})

//  nav-bar
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

// .flex.flex-col.items-end.fixed.bottom-2.left-2.z-10000
//   util-tools
//  overscroll-behavior-y: contain;
//  overscroll-behavior-y: contain;
// .flex.flex-col.items-end.fixed.top-2.left-2.z-10000
//   util-tools
</script>

<template lang="pug">
.p-0.flex.flex-col.h-100vh(style="flex: 1000 1 100%" )
  router-view(v-slot="{ Component }")
    transition(
      name="fade"
      mode="out-in")
      keep-alive
        component.flex-auto.overflow-y-scroll(:is="Component")
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
}
body {
  @apply bg-light-600 dark-bg-dark-200;
  touch-action: pan-x pan-y;
}
#app {
  @apply h-full w-full flex;
}

.app-container {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: fit-content(20%) auto auto;
  grid-template-rows: 0.1fr auto auto;
  gap: 0px 0px;
  grid-template-areas:
    "Side Top Top"
    "Side Main Main"
    "Side Footer Footer";
}

.Main {
  grid-area: Main;
}

.Footer {
  grid-area: Footer;
}

.Side {
  grid-area: Side;
}

.Top {
  grid-area: Top;
}
</style>
