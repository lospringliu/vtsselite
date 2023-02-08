<script setup lang="ts">
import { globalState } from "../stores/globalState"
import { useUser, currentRoom, useBackground, useColor } from '../gun-vue/composables/src';
const { t } = useI18n()
onMounted(() => {
  // const { x, y, top, right, bottom, left, width, height } = useElementBounding(language)
  // globalState.language = { x, y, top, right, bottom, left, width, height }
})

const routes = {
  "/space/": "Space",
  "/topics/": "Topics",
  "/posts/": "Posts",
  "/users/": "Users",
  "/rooms/": "Rooms",
  "/projects/": "Projects",
  '/gifts/': "Gifts",
  '/dict/': "Dictionary",
  "/upload/": "VUpload",
};

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))
const color = useColor('light')
// flex justify-around sm-px-8 md-px-16 lg-px-32 items-center text-center bg-cyan-300 text-xl py-1 mx-auto"
</script>

<template lang="pug">
.flex.justify-around.sm-px-8.md-px-16.lg-px-32.items-center.text-center.bg-cyan-300.text-xl.py-1.mx-auto
  router-link.link(to="/space/")
    .i-ph-hands-clapping
    .hidden.md-block {{ t('pages.space') }}
  router-link.link(to="/topics/")
    .i-la-broadcast-tower
    .hidden.md-block {{ t('pages.topics') }}
  router-link.link(to="/posts/")
    .i-ph-newspaper
    .hidden.md-block {{ t('pages.posts') }}
  router-link.link(to="/users/")
    .i-ph-users
    .hidden.md-block {{ t('pages.users') }}
  router-link.link(to="/projects/")
    .i-la-toolbox
    .hidden.md-block {{ t('pages.projects') }}
  router-link.link(to="/dict/")
    .i-ph-books
    .hidden.md-block {{ t('pages.dicts') }}
  router-link.link(to="/gifts/")
    .i-la-gift
    .hidden.md-block {{ t('pages.gifts') }}
  router-link.link(to="/rooms/")
    .i-simple-icons-qzone 
    .hidden.md-block {{ t('pages.rooms') }}
  room-button.hidden.lg-block(@room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)" @browse="$router.push(`/${$event}/`)")
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>

