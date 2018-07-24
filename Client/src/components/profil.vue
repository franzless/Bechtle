<template>
<div>
<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
<v-card>
  <v-toolbar color="primary">
     <v-btn icon dark router to="/main">
            <v-icon>close</v-icon>
          </v-btn>
    <v-toolbar-title>Profil</v-toolbar-title>
    <v-toolbar-items>
      <v-btn router to="/main" @click="save">Save</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-layout row>
    <v-flex sm3>
      <div class="headline">{{user.firstname}} {{user.lastname}}</div>
      <img :src="user.userimg" height="250px" width="250px">
    </v-flex>
    <v-flex>
      <div class="headline">Persönliche Informationen</div>
      <v-list >
        <v-list-tile> Vorname: {{user.firstname}} </v-list-tile>
        <v-list-tile> Nachname: {{user.lastname}} </v-list-tile>
        <v-list-tile> Passwort verändern :{{user.password}}</v-list-tile>
      </v-list>
    </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <div class="headline">Skills</div>
    <v-switch color="primary" v-for="skill in skills" :key="skill.skillid" :label="skill.skillname" v-model="skiller" :value="skill.skillid">
    </v-switch>
    <p>{{skiller}}</p>
    
  </v-card>  
</v-dialog>  
  
  </div>
</template>
<script>
export default {
  data(){
    return{
      dialog:true,
      skiller:[]
    }
  },
  created(){
    this.$http.post('http://localhost:8082/db/profil/userskill',this.user.userid)
  },

computed:{
  user:{
    get()
    {return this.$store.getters.getuser
    }
  },
  skills:{
    get()
    {return this.$store.getters.getskills}
  }
},
methods:{
  save(){

  }
}}


</script>
