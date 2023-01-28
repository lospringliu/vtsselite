<script setup async lang="ts">
const { peer, useGun } = await import('../gun-vue/composables')
peer.value = 'https://relay.129.153.59.37.nip.io/gun'
globalThis.gun = useGun()

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
  Hello how are you
</template>
