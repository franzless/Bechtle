import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'
import profil from '@/components/profil'
import urlaubsplan from '@/components/Urlaubsplan'
import schichtplan from '@/components/Schichtplan'
import register from '@/components/register'
import addschicht from '@/components/addschicht'

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
      path: '/Schichtplan',
      name: 'addschicht',
      component: addschicht
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ],
  mode: 'history'
})
