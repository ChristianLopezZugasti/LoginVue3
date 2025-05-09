import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/modules/auth/views/loginView.vue'
import HomeView from '@/modules/auth/views/HomeView.vue'
import DashboardRoute from '@/modules/Dashboard/router/index.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',

      component:HomeView,
      redirect:{ name:'auth'},
      children:[
        {
          path: '/auth',
          name: 'auth',
          component: LoginView,
          
        },
        {
          path:'auth/register',
          name: 'register',
          component: ()=> import('@/modules/auth/views/registerView.vue'),
        }
       
       ]
    },
    DashboardRoute
    

  ],
})

export default router
