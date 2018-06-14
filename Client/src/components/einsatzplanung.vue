<template>
<div>
    <my-toolbar></my-toolbar>
    <h1>Kärcher</h1>
    <v-card height="400px" width="1000" >
       <draggable v-model="kärcher">
               <v-container grid-list-xs >
                   <v-layout wrap>
                  
               <v-card width="150px" v-for="k in kärcher" :key="k.name" color="blue darken-1">
                   <v-card-title>
                        {{k.name}}
                    </v-card-title>
                   <v-card-media :src="k.img" height="100px"></v-card-media>
                    <v-card-text>
                        {{k.Information}} {{k.Dauer}}
                    </v-card-text>
               </v-card>
               </v-layout>
               </v-container> 
       </draggable>             





    </v-card>
</div>
    

</template>
<script>
export default {
    data(){
        return{
            kärcher:[
                {name:'Marcel Brodbeck',Team:'Kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/150x150'},
                {name:'Michele Grasso',Team:'Kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/150x150'},
                {name:'Michael Gollhofer',Team:'Kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/150x150'},
                {name:'Wolfgang Reichle',Team:'Kärcher',Information:'Temporär',Dauer:'12.6.2018-20.06.2018',img:'http://source.unsplash.com/random/150x150'},
            ]
          
        }
    },
    computed:{
        users: {
            get(){
                return this.$store.state.users
            },
            
            
        }
    }
    
}
</script>

