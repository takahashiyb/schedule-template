import GraphicsDisplay from '@/components/GraphicsDisplay.vue'
import ChannelSearchPage from '@/pages/ChannelSearchPage.vue'
import GraphicPage from '@/pages/GraphicPage.vue'
import HomePage from '@/pages/HomePage.vue'
import TemplatePage from '@/pages/TemplatePage.vue'
import FujikuraUruka from '@/pages/schedules/FujikuraUruka.vue'
import GenericView from '@/pages/schedules/GenericView.vue'
import MariMariEn from '@/pages/schedules/MariMariEn.vue'
import PipkinPippa from '@/pages/schedules/PipkinPippa.vue'
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
        { path: '/template/pipking-pippa', name: 'pipkin-pippa', component: PipkinPippa },
        { path: '/template/unstyled', name: 'unstyled', component: UnstyledView },
      ],
    },
    {
      path: '/graphics',
      name: 'graphics',
      component: GraphicPage,
      children: [
        {
          path: '/graphics/inconspicuous/fujikura-uruka',
          name: 'inconspicuous-fujikura-uruka',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'fujikura-uruka' },
        },
        {
          path: '/graphics/inconspicuous/rinkou-ashelia',
          name: 'inconspicuous-rinkou-ashelia',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'rinkou-ashelia' },
        },
        {
          path: '/graphics/inconspicuous/pipkin-pippa',
          name: 'inconspicuous-pipkin-pippa',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'pipkin-pippa' },
        },
        {
          path: '/graphics/inconspicuous/utatane-nasa',
          name: 'inconspicuous-utatane-nasa',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'utatane-nasa' },
        },
        {
          path: '/graphics/inconspicuous/maemi-tenma',
          name: 'inconspicuous-maemi-tenma',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'maemi-tenma' },
        },
        {
          path: '/graphics/inconspicuous/shisui-michiru',
          name: 'inconspicuous-shisui-michiru',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'shisui-michiru' },
        },
        {
          path: '/graphics/inconspicuous/hakushika-iori',
          name: 'inconspicuous-hakushika-iori',
          component: GraphicsDisplay,
          props: { group: 'inconspicuous', talent: 'hakushika-iori' },
        },
      ],
      props: true,
    },
    { path: '/channel-search', name: 'channel-search', component: ChannelSearchPage },
  ],
})

export default router
