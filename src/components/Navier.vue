<script setup lang="ts">
import { isDark, toggleDark, preferredDark } from '../composables/dark'
import { prefers, playlist } from "../stores"
import { useRoute } from 'vue-router'
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
  if (value.settings && !old_value.settings) {
    prefers.save()
  } else {
    console.log(`not settings`)
  }
})
//    <button :title="t('button.info')" @click="show.info = !show.info">
//      <ph-info />
//    </button>
//  <UiLayer :open="show.info" @close="show.info=false">
//    <ShowInfo />
//  </UiLayer>
</script>

<template>
  <nav class="flex justify-around sm-px-8 md-px-16 lg-px-32 items-center text-center bg-cyan-300 text-xl py-1 mx-auto">
    <button class="i-ph-sun dark:i-ph-moon" :title="t('button.toggle_dark')" @click="() => toggleDark()">
    </button>
    <button ref="language" class="i-ph-translate" :title="t('button.toggle_langs')" @click="toggleLocales">
    </button>
    <button class="i-ph-gear" :title="t('button.settings')" @click="show.settings = !show.settings">
    </button>
    <button class="i-ph-playlist" v-if="route_videos" :title="t('button.playlist')" @click="() => togglePlayList()">
    </button>
    <button class="i-mdi-graph-outline" v-if="/localhost|127.0.0.1/.test(location_origin)" :title="t('button.graph')" @click="show.graph = !show.graph">
    </button>
    <button v-if="/localhost|127.0.0.1/.test(location_origin)" :title="t('button.relays')">
      <UtilRelay />
    </button>
    <router-link to="/upload/" class="i-simple-icons-ipfs">
    </router-link>
    <router-link to="/wallets/" class="i-ph-wallet">
    </router-link>
    <router-link to="/nfts/">
      NFT
    </router-link>
  </nav>
  <UiLayer :open="show.graph" @close="show.graph=false">
    <UtilGraph />
  </UiLayer>
  <UiLayer :open="show.settings" @close="show.settings=false">
    <Settings />
  </UiLayer>
  <div class="grid grid-col place-content-center" v-if="flag_playlist">
    <div class="mt-8 max-w-lg">
      <div class="grid grid-cols-1 gap-6 text-gray-700 dark-text-gray-500">
        <ol class="list-decimal">
          <li v-for="video of playlist.playlist" :key="video.videoId">
            {{ video.videoId }} {{ video?.channel?.name }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply rounded-xl cursor-pointer flex items-center;
}
</style>
