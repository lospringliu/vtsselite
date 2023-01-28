import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition

    else
      return { top: 0, behavior: 'smooth' }
  },
})
app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app, router, routes }))

router.isReady().then(async () => {
  app.mount('#app')
})

// app.mount('#app')
// router.beforeEach((to, from, next) => {
//   if (!currentRoom.isRoot && !to.query?.room) {
//     next({ ...to, query: { room: currentRoom.pub } });
//   } else {
//     next();
//   }
// })
