<template>
<div>
<v-navigation-drawer temporary absolute  v-model="sidenav">
    <v-list class="pt-0" dense>
      <v-list-tile 
       v-for="menu in menuitems" :key="menu.title" router :to="menu.link"
      >
        <v-list-tile-action>
          <v-icon right>{{menu.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{menu.title}}
          </v-list-tile-content>
        
      </v-list-tile>
    </v-list>
    
</v-navigation-drawer>
    <v-toolbar  class="primary">
          <v-toolbar-side-icon @click.native.stop="sidenav=!sidenav"
          class="hidden-sm-and-up"></v-toolbar-side-icon>
          <v-toolbar-title >
              <router-link to="/main" tag="span" style="cursor:pointer">
              
              Willkommen <v-icon>{{userimage}}</v-icon> {{user.firstname}}</router-link>
              
          </v-toolbar-title>
          
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only">
            
          
          <v-btn router :to="menu.link" v-for="menu in menuitems" :key="menu.title"  flat color="black">
          <v-icon left>{{menu.icon}}</v-icon>      
            {{menu.title}}
          </v-btn>
          </v-toolbar-items>  
      </v-toolbar>
</div>
</template>
<script>
import {bus} from '../main'
export default {
  data () {
    return {
      user:{             
      },
      userimage:'face',

      sidenav: false,
      menuitems: [
             {icon: this.usericon, title: 'Profil', link: '/profil'},
             {icon: 'flight', title: 'Urlaubsplan', link: '/Urlaubsplan'},
             {icon: 'assignment', title: 'Schichtplan', link: '/Schichtplan'},
             {icon: 'exit_to_app', title: 'Logout', link: '/'}
      ]
    }
    

  },
  created(){
    bus.$on('userloaded', (data)=>{
      this.user = data
      this.userimage=data.userimage
    })
    console.log(this.user)
  }

}
</script>
<style scoped>

</style>


