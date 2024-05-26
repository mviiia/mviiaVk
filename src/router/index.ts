import HomeComponent from '@/components/homeComponent/homeComponent.vue';

export const routes =  [
    {
        path: '/:pathMatch(.*)*',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/',
        name: 'Home',
        component: HomeComponent
    },
  ]
