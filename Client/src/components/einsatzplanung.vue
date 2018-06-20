<template>
<div>
    <my-toolbar></my-toolbar>
 <v-layout row >
     <v-flex xs12 sm6 offset-sm3>
         <v-card class="kärcher">
             <v-toolbar><v-avatar tile><img src="../assets/kärcher.png" alt=""></v-avatar><v-toolbar-title>Team Kärcher</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable v-model="kärcher" :element="'v-layout'" row wrap  :options="{group:'team', handle:'.my-handle'}" :move="onMoveCallback">
                <v-flex class="kärcher" v-for="k in kärcher" :key="k.name">
                    <div class="header">{{k.name}}</div>
                    <img :src="k.img" height="150px" width="150px" class="my-handle" >
                    <v-flex xs1 >{{k.Information}}  {{k.Dauer}} </v-flex>
                </v-flex>
                 </draggable>
             </v-container>
         </v-card>
         <br>
         <v-card class="heller">
             <v-toolbar><v-avatar tile><img src="../assets/heller.png" alt=""></v-avatar><v-toolbar-title>Team Heller</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable :move="onMoveCallback"   v-model="heller" :element="'v-layout'" row wrap :options="{group:'team', ghostClass: '.heller', handle:'.my-handle' }" >
                <v-flex class="heller" v-for="h in heller" :key="h.name">
                    <div class="header">{{h.name}}</div>
                    <img :src="h.img" height="150px" width="150px" class="my-handle">
                    <v-flex xs3>{{h.Information}}  {{h.Dauer}}</v-flex>
                    
                </v-flex>
                 </draggable>
             </v-container>
         </v-card>
     </v-flex>
 </v-layout>
 <!-- dialog 1-->
 
 <v-dialog v-model="dialog" width="400px" persistent>
     <v-card>
         <v-toolbar color="teal lighten-4"> <v-avatar tile><img src="../assets/bechtle.png" ></v-avatar><v-toolbar-title >Zusätzliche Informationen</v-toolbar-title></v-toolbar>
         <v-container grid-list-xl>
         <v-flex sm8 >
             <v-radio-group v-model="sub.Information" row prepend-icon="touch_app">
                 
                 <v-radio label="Stamm" value="Stamm" ></v-radio>
                 <v-radio label="Temporär" value="Temporär" ></v-radio>
             </v-radio-group>
        </v-flex >
        
        <v-flex sm6 v-if="test">
            <v-text-field prepend-icon="event" v-mask="'##.##.####'" label="von" v-model="sub.von"></v-text-field>
            <v-text-field prepend-icon="event" v-mask="'##.##.####'" label="bis" v-model="sub.bis"></v-text-field>
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
            <v-container grid-list-sm>
                <v-layout row wrap>
                    <v-flex sm6>
                        <v-list>
                            
                                <v-list-tile v-ripple @click="" v-for="(skill, index) in skills" :key="index">
                                    {{skill}}
                                </v-list-tile>
                            
                        </v-list>
                    </v-flex>
                    <v-flex sm6>
                        <v-list>
                            <v-list-tile>

                            </v-list-tile>
                        </v-list>
                    </v-flex>
                    <v-btn>Ok</v-btn>
                    <v-btn>Cancel</v-btn>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
     <!-- dialog 2-->


</div>
    

</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            dialog:false,
            dialog2:false,
            test:false,
            radio:'',
            ersatz:'',
            sub:[],
            kärcher:[
                {name:'Marcel Brodbeck',Team:'kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/150x150'},
                {name:'Michele Grasso',Team:'kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/150x150'},
                {name:'Michael Gollhofer',Team:'kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/150x150'},
                {name:'Wolfgang Reichle',Team:'kärcher',Information:'Temporär',Dauer:'12.6.2018-20.06.2018',img:'http://source.unsplash.com/random/150x150'},
                {name:'Frank Valdez',Team:'kärcher',Information:'Temporär',Dauer:'12.6.2018-20.06.2018',img:'http://source.unsplash.com/random/150x150'},
                {name:'Sandra Lorey',Team:'kärcher',Information:'Temporär',Dauer:'12.6.2018-20.06.2018',img:'http://source.unsplash.com/random/150x150'},
            ],
            heller:[
                {name:'Marco Grossberger',Team:'heller',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/130x130'},
                    ],
            skills:['Rollout','Tickets','Beschaffung']
          
        }
    },
    created(){
        
    this.$http.get('http://localhost:8082/db/einsatzlanung/getall')
    .then(res =>{
      this.$store.commit('addeinsatzplan', res)
    }),

    this.$http.get('http://localhost:8082/db/einsatzlanung/getteams')
    .then(response =>{
      this.$store.commit('addteams', response)
    })
    },
    updated(){
        console.log(this.test)
    },
    
    methods:{
        save(){
            var array = this.sub.dragto
            Vue.set(this[array],this.sub.index,{
                    Team:this.sub.dragto,
                    Dauer:this.sub.von +' - '+ this.sub.bis,
                    Information:this.sub.Information,
                    name:this.sub.name,
                    img:this.sub.img
                })
            
           
            if (this.ersatz == 'true'){
                    this.dialog=false;
                    this.dialog2=true;
                    this.sub.dragorigin=this.sub.dragto

            }else{

                }
                

            },
        
       
        updateh(){
           
            
            //this.heller.map((heller)=>{
            //    heller.Team = 'heller'
           // })
          
        },
        update(){
            //this.kärcher.map((kärcher)=>{
            //    kärcher.Team = 'Kärcher'
            //})
          
        },
        cancel(){
            this.dialog=false
            
        },
        onMoveCallback(evt, originalEvent){
            console.log(evt.draggedContext)
            console.log(evt.relatedContext)
            this.dialog= true
            this.sub.dragto = evt.relatedContext.element.Team
            this.sub.dragorigin =evt.draggedContext.element.Team
            this.sub.index = evt.draggedContext.futureIndex
            this.sub.name = evt.draggedContext.element.name
            this.sub.img = evt.draggedContext.element.img

        },
        
     
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




</style>


