import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'
import profil from '@/components/profil'
import urlaubsplan from '@/components/Urlaubsplan'
import schichtplan from '@/components/Schichtplan'
import register from '@/components/register'
import addschicht from '@/components/addschicht'
import farbpalette from '@/components/farbpalette'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/Main',
      name: 'Main',
      component: main
    },
    {
      path: '/Profil',
      name: 'Profil',
      component: profil
    },
    {
      path: '/Urlaubsplan',
      name: 'ZUrlaubsplan',
      component: urlaubsplan
    },
    {
      path: '/NeueSchicht',
      name: 'addschicht',
      component: addschicht
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/Schichtplan',
      name: 'schichtplan',
      component: schichtplan
    },
    {
      path: '/farbpalette',
      name: 'farbpalette',
      component: farbpalette
    }
  ],
  mode: 'history'
})
