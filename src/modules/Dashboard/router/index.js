


export default {
    path:'/auth/dashboard',
    component: () => import('@/modules/Dashboard/layouts/DashboardLayout.vue'),
    beforeEnter:(to,from,next) => {
      const isAuthenticated = localStorage.getItem('token')
      if(isAuthenticated){
        next()
      }else{
        next({name:'home'})
      }
    },
    children: [
      {
        path: '', // <- ruta por defecto al entrar a dashboard
        name: 'dashboard',
        component: () => import('@/modules/Dashboard/views/DashboardView.vue')
      }
    ]
  }
  