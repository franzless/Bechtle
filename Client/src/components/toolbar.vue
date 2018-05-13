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
    <v-toolbar  class="green accent-4">
          <v-toolbar-side-icon @click.native.stop="sidenav=!sidenav"
          class="hidden-sm-and-up"></v-toolbar-side-icon>
          <v-toolbar-title >
              <router-link to="/main" tag="span" style="cursor:pointer">Willkommen</router-link>   </v-toolbar-title>
          
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
export default {
  data () {
    return {

      sidenav: false,
      menuitems: [
             {icon: 'supervisor_account', title: 'Profil', link: '/profil'},
             {icon: 'flight', title: 'Urlaubsplan', link: '/Urlaubsplan'},
             {icon: 'assignment', title: 'Schichtplan', link: '/Schichtplan'},
             {icon: 'exit_to_app', title: 'Logout', link: '/'}
      ]
    }
  }

}
</script>

