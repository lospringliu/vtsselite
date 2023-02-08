import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { pinia } from './stores'
import App from './App.vue'
import { GunVuePlugin } from '#components'
import { currentRoom } from '#composables'

import '@unocss/reset/tailwind.css'
// import './styles/main.css'
import 'uno.css'
import '#components/styles/index.css'
// import './styles/styles.scss'

// const routes = setupLayouts(generatedRoutes)
import routes from "~pages"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition

    else
      return { top: 0, behavior: 'smooth' }
  },
})
const app = createApp(App)
app.use(GunVuePlugin)
app.use(pinia)
app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.({ app, router, routes }))

router.isReady().then(async () => {
  app.mount('#app')
})

// app.mount('#app')
router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room)
    next({ ...to, query: { room: currentRoom.pub } })
  else
    next()
})
