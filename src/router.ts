import Vue from 'vue';
import Router from 'vue-router';
import Member from '@/views/Member.vue';
import Event from '@/views/Event.vue';
import Preview from '@/views/Preview.vue';
import Login from '@/views/Login.vue';
import PageContainer from '@/views/PageContainer.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: PageContainer,
      children: [
        {
          path: '/',
          redirect: '/member',
        },
        {
          path: '/member',
          name: 'member',
          component: Member,
        },
        {
          path: '/event',
          name: 'event',
          component: Event,
        },
        {
          path: '/preview',
          name: 'preview',
          component: Preview,
        }
      ],
    },
  ],
});
