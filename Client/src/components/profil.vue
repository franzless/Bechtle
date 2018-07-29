<template>
<div>
<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
<v-card >
  <v-toolbar color="pdark">
     <v-btn icon dark router to="/main">
            <v-icon>close</v-icon>
          </v-btn>
    <v-toolbar-title>Profil</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn  @click="save">Save</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-layout row>
    <v-flex sm3>
      <div class="headline">{{user.firstname}} {{user.lastname}}</div>
      <img :src="user.userimg" height="250px" width="250px">
      <my-fileupload></my-fileupload>
    </v-flex>
    <v-flex>
      <div class="headline">Persönliche Informationen</div>
      <v-list >
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Vorname</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-list-tile><v-text-field  v-model="user.firstname" ></v-text-field> </v-list-tile>
          </v-flex>
        </v-layout>
         
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Nachname</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-list-tile><v-text-field  :value="user.lastname" ></v-text-field> </v-list-tile>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2>
            <v-subheader>E-Mail</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-list-tile><v-text-field  :value="user.email" ></v-text-field> </v-list-tile>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Passwort</v-subheader>
          </v-flex>
          <v-flex xs4>
            <v-list-tile><v-text-field :append-icon="show ? 'visibility_off' : 'visibility'" :type="show ? 'text' : 'password'" :value="user.password" @click:append="show = !show" ></v-text-field> </v-list-tile>
          </v-flex>
        </v-layout>
      </v-list>
    </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <div class="headline">Skills</div>
    <v-switch color="primary" v-for="skill in skills" :key="skill.skillid" :label="skill.skillname" v-model="skiller" :value="skill.skillid">
    </v-switch>
   
    
  </v-card>  
</v-dialog>  
  
  </div>
</template>
<script>
export default {
  data(){
    return{
      dialog:true,
      skiller:[],
      path:'../assets/bechtle1.jpg',
      show:false,
      userChanged:[]
    }
  },
  created(){
      this.$http.post('http://localhost:8082/db/profil/userskill',this.user)
    .then(r=>{
        this.skiller=r.body
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getskills')
    .then(r => {
      this.$store.commit('addskills', r)
    })
  },
  
computed:{
  user:{
    get(){
    return this.$store.getters.getuser
    },
    set(){
     
    }
  },
  skills:{
    get()
    {return this.$store.getters.getskills}
  },
    imagepath(){
      var path = this.user.firstname+this.user.lastname+this.user.userid
      console.log(path)
      return require('../assets/'+path)
    }  
    
  
  
  
},
methods:{
  save(){
    var user= this.user.userid
    var skills= this.skiller.map(function(m){
      var s = {skillSkillid:m,
              userUserid:user}
      return s
    }) 
   this.$http.post('http://localhost:8082/db/profil/updateuserskills', skills)
    .then(()=>{     
    })
    this.$http.post('http://localhost:8082/db/profil/updateuser', this.user)
    .then(r=>{
      console.log(r)
    })     

  }
  
}}


</script>
<style scoped>

</style>

