<script setup lang="ts">
import { prefers } from "../stores"
// import VuePlyr from 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'
// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <div>
    <div v-if="prefers.youtubeAccess" px="0 md:12 lg:24 xl:48" bg-black min-w-xs>
      <YoutubePlayer />
    </div>
    <div v-else bg-black min-w-xs px="0 md:12 lg:24 xl:48">
      <IpfsPlayer />
    </div>
    <div bg="white dark:gray-800" text="center gray-700 dark:gray-200" grid="~ col cols-1 md:cols-2 lg:cols-3 xl:cols-4" gap="2 sm:4 md:6 lg:8" px="0 sm:2 md:4" min-w-xs place-content-center>
      <YoutubeVideos />
    </div>
    <div text="center blue-500 dark:gray-300">Built {{ timeAgo }}</div>
  </div>
</template>
