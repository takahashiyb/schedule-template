import HomePage from '@/pages/HomePage.vue'
import TemplatePage from '@/pages/TemplatePage.vue'
import FujikuraUruka from '@/templates/FujikuraUruka.vue'
import MariMariEn from '@/templates/MariMariEn.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    {
      path: '/template',
      name: 'template',
      component: TemplatePage,
      children: [
        { path: '/template/fujikura-uruka', name: 'fujikura-uruka', component: FujikuraUruka },
        { path: '/template/marimari-en', name: 'marimari-en', component: MariMariEn },
      ],
    },
  ],
})

export default router
