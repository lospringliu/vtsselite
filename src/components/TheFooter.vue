<script setup lang="ts">
import { useRoute } from 'vue-router'
import { isDark, preferredDark, toggleDark } from '../composables/dark'
import { playlist, prefers } from '../stores'
import { currentRoom } from '#composables'
const language = ref(null)
const route = useRoute()
const location_origin = ref(location.origin)
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const flag_playlist = ref(false)
const togglePlayList = useToggle(flag_playlist)
const route_videos = computed(() => /videos/.test(route.path))
const show = reactive({
  graph: false,
  log: false,
  share: false,
  info: false,
  settings: false,
})
watch(show, (value, old_value) => {
  if (value.settings && !old_value.settings)
    prefers.save()

  else
    console.log('not settings')
})
</script>

<template>
  <nav class="flex justify-around sm-px-8 md-px-16 lg-px-32 items-center text-center bg-cyan-400 dark:bg-cyan-700 dark:text-gray-100 text-xl py-0 mx-auto">
    <!--
    <RoomButton
      :key="currentRoom.pub" @room="$router.push(`/rooms/${$event}`)"
      @rooms="$router.push(`/rooms/`)"
      @browse="$router.push(`/${$event}/`)"
    />
    -->

    <RouterLink class="icon-btn" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <button class="icon-btn !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language />
    </a>

    <RouterLink class="icon-btn" to="/about" :title="t('button.about')">
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <button class="i-ph-gear" :title="t('button.settings')" @click="show.settings = !show.settings" />
    <button v-if="/localhost|127.0.0.1/.test(location_origin)" class="i-mdi-graph-outline" :title="t('button.graph')" @click="show.graph = !show.graph" />
    <button v-if="/localhost|127.0.0.1/.test(location_origin)" :title="t('button.relays')">
      <UtilRelay />
    </button>
    <router-link to="/upload/" class="i-simple-icons-ipfs" />
    <router-link to="/wallets/" class="i-ph-wallet" />
    <router-link to="/nfts/">
      NFT
    </router-link>
    <user-icon
      :size="24"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/my/chat/${$event}`)"
    />
  </nav>

  <UiLayer :open="show.graph" @close="show.graph = false">
    <UtilGraph />
  </UiLayer>
  <UiLayer :open="show.settings" @close="show.settings = false">
    <Settings />
  </UiLayer>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}
.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>
