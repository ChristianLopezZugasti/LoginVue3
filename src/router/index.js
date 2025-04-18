import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/modules/auth/views/loginView.vue'
import HomeView from '@/modules/auth/views/HomeView.vue'

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
          path:'auth/dashboard',
          name: 'dashboard',
          component: ()=> import('@/modules/Dashboard/views/DashboardView.vue'),
        },
       
       ]
    },
    
    
    
     
  ],
})

export default router
