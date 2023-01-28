<script setup async lang="ts">
import Gun from '../components/gun.vue'
useHead({
  title: 'gun',
  meta: [
    { name: 'description', content: 'gun tests' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <Gun />
</template>
