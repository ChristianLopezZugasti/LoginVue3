import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/components/auth/views/loginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: LoginView,
      children:[
        {
          path:'/auth/dashboard',
          name: 'dashboard',
          component: ()=> import('@/components/Dashboard/views/DashboardView.vue'),
        }
       ]
    },
    
    
     
  ],
})

export default router
