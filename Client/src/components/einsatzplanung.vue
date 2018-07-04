<template>
<div>
    <my-toolbar></my-toolbar>
    <v-btn @click="dialog2=true">test</v-btn>
 <v-layout row >
     <v-flex xs12 sm6 offset-sm3>
         <v-card class="kärcher">
             <v-toolbar><v-avatar tile><img src="../assets/kärcher.png" alt=""></v-avatar><v-toolbar-title>Team Kärcher</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable v-model="Kärcher" :element="'v-layout'" row wrap  :options="{group:'team', handle:'.my-handle'}" :move="onMoveCallback">
                   
                <v-flex v-for="k in Kärcher" :key="k.einsatzplanid">
                    <div class="header">{{k.user.firstname +' '+k.user.lastname}}</div>
                    <img :src="k.user.userimg" height="150px" width="150px" class="my-handle" >
                    <v-flex  >{{k.status}} <br> {{dateToGer(k.von)}} - {{dateToGer(k.bis)}} </v-flex>
                </v-flex>
                <v-flex v-if="Kärcher.length<1">
                    <div class="header">Platzhalter </div>
                     <img src="../assets/PlatzhalterMann.jpg" height="150px" width="150px" class="my-handle" >
                </v-flex>
                
                 </draggable>
             </v-container>
         </v-card>
         <br>
         <v-card class="heller">
             <v-toolbar><v-avatar tile><img src="../assets/heller.png" alt=""></v-avatar><v-toolbar-title>Team Heller</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable  :move="onMoveCallback" class="transition-group" row wrap  :element="'v-layout'" v-model="Heller"  :options="{group:'team',handle:'.my-handle' }" >
                
                <v-flex class="heller"  v-for="h in Heller" :key="h.einsatzplanid">
                    <div class="header">{{h.user.firstname + ' ' +h.user.lastname}}</div>
                    <img :src="h.user.userimg" height="150px" width="150px" class="my-handle">
                    <v-flex >{{h.status}} <br> {{dateToGer(h.von)}} - {{dateToGer(h.bis)}}</v-flex>                   
                </v-flex>                           
                 </draggable>                
             </v-container>
         </v-card>
           </v-flex>
 </v-layout>
         <br>
         <v-flex xs12 sm6 offset-sm10>
         <v-toolbar><v-avatar tile><img src="../assets/bechtle.png" alt=""></v-avatar><v-toolbar-title>Krank/Urlaub</v-toolbar-title></v-toolbar>
         <v-card>
             <v-container>
                 <draggable :element="'v-layout'" :options="{group:'team',handle:'.my-handle'}">
                     <v-flex v-for="k in krank" :key="k.einsatzplanid">
                        <div class="header">{{k.user.firstname + ' ' +k.user.lastname}}</div>
                        <img :src="k.user.userimg" height="150px" width="150px" class="my-handle">
                        <v-flex >{{k.status}} <br> {{dateToGer(k.von)}} - {{dateToGer(k.bis)}}</v-flex> 
                     </v-flex>
                 </draggable>
             </v-container>
         </v-card>
         </v-flex>
   
 <!-- dialog 1-->
 
 <v-dialog v-model="dialog" width="400px" persistent>
     <v-card>
         <v-toolbar color="teal lighten-4"> <v-avatar tile><img src="../assets/bechtle.png" ></v-avatar><v-toolbar-title >Zusätzliche Informationen</v-toolbar-title></v-toolbar>
         <v-container grid-list-xl>
         <v-flex sm8 >
             <v-radio-group v-model="sub[0].status" row prepend-icon="touch_app">
                 
                 <v-radio label="Stamm" value="Stamm" ></v-radio>
                 <v-radio label="Temporär" value="Temporär" ></v-radio>
             </v-radio-group>
        </v-flex >
        
        <v-flex sm6 >
            <v-text-field prepend-icon="event" v-mask="'##.##.####'" label="von" v-model="valuevon"   ></v-text-field>
            <v-text-field prepend-icon="event" v-mask="'##.##.####'" label="bis" v-model="valuebis" ></v-text-field>
         </v-flex>
        <br>
         <v-checkbox label="Ersatz einplanen?" v-model="ersatz" value="true"></v-checkbox>
         <v-btn color="success" @click="save">Ok</v-btn>
         <v-btn color="info" @click="cancel">Cancel</v-btn>
     </v-container>    
     </v-card>    
 </v-dialog>
  <!-- dialog 1-->
    <!-- dialog 2-->
    <v-dialog v-model="dialog2" width="600px">
        <v-card>
            <v-toolbar color="teal lighten-4"> <v-avatar tile><img src="../assets/bechtle.png" ></v-avatar><v-toolbar-title >Ersatz bestimmen</v-toolbar-title></v-toolbar>
            <v-container grid-list-md>
                <v-layout row align-center>
                    <v-flex sm6>
                        <v-list>
                            
                        <v-list-tile  class="primary" v-ripple @click="filterforuser(skill)" v-for="(skill, index) in skills" :key="index">
                                    {{skill.skillname}}
                        </v-list-tile>
                           
                        </v-list>
                    </v-flex>
                    <v-flex >
                        <v-icon>code</v-icon>
                    </v-flex>
                    <v-flex sm6>
                        <v-list>
                            <v-list-tile class="yellow" @click="pickuser(user)" v-ripple  v-for="user in users" :key="user.userid">
                                {{user.firstname}} {{user.lastname}}
                                
                            </v-list-tile>
                            <br>
                        </v-list>
                    </v-flex>
                    </v-layout>
                    <v-alert type="error" :value="alert">Choose User first</v-alert>
                    <v-btn @click="confirmuser">Ok</v-btn>
                    <v-btn>Cancel</v-btn>
                    
                
            </v-container>
        </v-card>
    </v-dialog>
     <!-- dialog 2-->


</div>
    

</template>
<script>
import Vue from 'vue'
import _ from 'lodash'
export default {
    data(){
        return{
            
            dialog:false,
            alert:false,
            dialog2:false,
            color:'yellow',
            valuevon:'',
            valuebis:'',
            oldteam:'',
            newteam:'',
            radio:'',
            ersatz:'',
            test:false,
            oldteamname:'',
            canceldragg:[],
            sub:[{von:'',bis:'',status:'',einsatzplanid:null,teamteamid:null,useruserid:null}],
            
        }
    },
    
    created(){
    this.fetchdata()
    
    },
   
    computed:{
        Kärcher:{
            get(){
                return this.$store.getters.getkärcher
            },
            set(sub){
               this.$store.commit('updatekärcher',sub)
            }
            
        },
        Heller:{
            get(){
                return this.$store.getters.getheller
            },
            set(sub){
               this.$store.commit('updateheller',sub)
               
            }
        },
        skills:{
            get(){
                return this.$store.getters.getskills
            }},
        users:{
            get(){return this.$store.getters.getusers}
        },
        
        MHP:{
            get(){
                return this.$store.getters.getmhp
            },
            set(sub){
               this.$store.commit('updatemhp',sub)
            }
        },
        Benz:{
            get(){
                return this.$store.getters.getbenz
            },
            set(sub){
               this.$store.commit('updatemhp',sub)
            }
        },
        userskills:{
            get(){
                return this.$store.getters.getuserskills
            }
        }

        
            
    },
    
    
    
    methods:{
        start(){
         return false   
        },
        filterforuser(skill){
            
        
        console.log(this.userskills)
            var filtered =  this.userskills.filter(x=>x.skillSkillid == skill.skillid)
        console.log(filtered)
      
        
        
        },
        
        pickuser(key){

            this.sub=[{von:'',bis:'',status:'',einsatzplanid:null,teamTeamid:null,userUserid:null}]
            this.alert=false
            this.sub[0].userUserid= key.userid
            var arrays = ['Kärcher','MHP','Heller','Benz']
            
            arrays.forEach(element=>{
                
                var index = this[element].findIndex(x=>x.userUserid == key.userid)
                
               if ( index === -1 ){
                   
               }else{
                
                this.sub[0].einsatzplanid = this[element][index].einsatzplanid   
               } 
            })
        },
        confirmuser(){
            if (this.sub[0].userUserid == null){
                this.alert=true
            }else{
            this.sub[0].teamTeamid = this.oldteam
            
            this.dialog2= false
            this.dialog=true
            
            }
        },
        
        save(){
           // var array = this.newteam
           // Vue.set(this[array],this.index,this.sub[0])
             this.dateToIntvon()
             this.dateToIntbis()
            
             this.updatedb()
             this.dialog=false;
            if (this.ersatz == 'true'){
                this.dialog2=true;
             
            }else{ }
            },
        
       
        updatedb(){
            
           this.$http.post('http://localhost:8082/db/einsatzlanung/update', this.sub[0])
           .then(response=>{
            this.fetchdata() 
              })
              },
        dateToIntvon(){
         if (this.valuevon != null){ 
         var newDate = this.valuevon.split(".")
         var res = newDate[2]+'-'+newDate[1]+'-'+newDate[0]
         this.sub[0].von = res 
         } 
        },
        dateToIntbis(){
         if (this.valuebis != null)  { 
         var newDate = this.valuebis.split(".")
         var res = newDate[2]+'-'+newDate[1]+'-'+newDate[0]
         this.sub[0].bis = res }
          
        },
        dateToGer(datum){
            if (datum != null){
         var newDate = datum.split("-")
         var res = newDate[2]+'.'+newDate[1]+'.'+newDate[0]
         return res  }   
        },
        cancel(){
            this.dialog=false
            this.$store.commit('canceldragg',this.canceldragg)
            
                       
        },
        onMoveCallback(evt, originalEvent){
             
            this.dialog= true
            console.log(evt.draggedContext)
            console.log(evt.relatedContext)
            
            
            Vue.set(this.sub,0,{
            einsatzplanid:evt.draggedContext.element.einsatzplanid,
            teamTeamid:evt.relatedContext.element.teamTeamid,
            userUserid:evt.draggedContext.element.userUserid
            
            })
            this.canceldragg[0]=evt.draggedContext
            this.canceldragg[1]=evt.relatedContext
            this.oldteam = evt.draggedContext.element.teamTeamid
            this.oldteamname = evt.draggedContext.element.team.teamname
            this.index = evt.draggedContext.Index
            this.newteam = evt.relatedContext.element.teamTeamid

        },
        fetchdata(){
    this.$http.get('http://localhost:8082/db/einsatzlanung/getkaercher')
    .then(res =>{
      this.$store.commit('addkärcher', res)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getmhp')
    .then(res =>{
      this.$store.commit('addmhp', res)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getheller')
    .then(res =>{
      this.$store.commit('addheller', res)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getbenz')
    .then(res =>{
      this.$store.commit('addbenz', res)
    }),

    this.$http.get('http://localhost:8082/db/einsatzlanung/getteams')
    .then(response =>{
      this.$store.commit('addteams', response)
    }),

    this.$http.get('http://localhost:8082/db/einsatzlanung/getskills')
    .then(r =>{
      this.$store.commit('addskills', r)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getuserskills')
    .then(res =>{
      this.$store.commit('adduserskills', res)
    })
    }
        
     
}}
</script>
<style scoped>
.card.kärcher{
    background-color:yellow;
    min-height:200px   
}
.card.heller{
    background-color: #BBDEFB;
        min-height:200px  
}
.my-handle{
    cursor:grab;
    
}
.transition-group{
    min-height:200px;
   display:block
}







</style>


