<template>
  <main class="px-4 py-10 text-center text-gray-800 dark:text-gray-600">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-95">
      <TheFooter />
      <ReloadPrompt />
    </div>
    <RouterView />
  </main>
</template>
