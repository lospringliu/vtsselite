<script setup lang="ts">
import { globalState } from "../stores/globalState"
import { currentRoom, useBackground, useColor } from '../gun-vue/composables';
const { t } = useI18n()
onMounted(() => {
  // const { x, y, top, right, bottom, left, width, height } = useElementBounding(language)
  // globalState.language = { x, y, top, right, bottom, left, width, height }
})

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')

</script>

<template lang="pug">
.min-h-4vh.justify-around.flex.flex-wrap.items-center.bg-light-900.shadow-lg.z-30.text-xl.w-full
  router-link.link(to="/")
    .bg-transparent.font-bold.py-2.text-4xl.text-left.write-vertical-right.text-green-700.text-opacity-10.text-stroke-sm.text-stroke-blue-700 M
  button.button.text-2xl(:title="t('button.social')" @click="globalState.show_social=!globalState.show_social")
    .i-la-times(v-if="globalState.show_social")
    .i-ph-users(v-else)
  router-link.text-2xl.link(to="/videos/")
    .i-ph-video-camera
    .hidden.md-block {{ t('pages.videos') }}
  button.text-2xl(:title="t('button.tools')" @click="globalState.show_tools=!globalState.show_tools")
    .i-la-times(v-if="globalState.show_tools")
    .i-ph-gear(v-else)
  user-icon(
    :size="32"
    :showName="false"
    @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
    @post="$router.push(`/posts/${$event}`)"
    @chat="$router.push(`/my/chat/${$event}`)"
    )
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>

