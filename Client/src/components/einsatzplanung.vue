<template>
<div>
    <my-toolbar></my-toolbar>
 <v-layout row >
     <v-flex xs12 sm6 offset-sm3>
         <v-card class="kärcher">
             <v-toolbar><v-avatar><img src="../assets/kärcher.png" alt=""></v-avatar><v-toolbar-title>Team Kärcher</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable v-model="kärcher" :element="'v-layout'" row wrap  :options="{group:'team'}">
                <v-flex class="kärcher" v-for="k in kärcher" :key="k.name">
                    <div class="header">{{k.name}}</div>
                    <img :src="k.img" height="150px" width="150px">
                    <v-flex xs1 >{{k.Information}}  {{k.Dauer}}</v-flex>
                </v-flex>
                 </draggable>
             </v-container>
         </v-card>
         <br>
         <v-card class="heller">
             <v-toolbar><v-avatar><img src="../assets/heller.png" alt=""></v-avatar><v-toolbar-title>Team Heller</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable v-model="heller" :element="'v-layout'" row wrap :options="{group:'team'}">
                <v-flex class="heller" v-for="h in heller" :key="h.name">
                    <div class="header">{{h.name}}</div>
                    <img :src="h.img" height="150px" width="150px">
                    <v-flex xs3>{{h.Information}}  {{h.Dauer}}</v-flex>
                    
                </v-flex>
                 </draggable>
             </v-container>
         </v-card>
     </v-flex>
 </v-layout>



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
                {name:'Frank Valdez',Team:'Kärcher',Information:'Temporär',Dauer:'12.6.2018-20.06.2018',img:'http://source.unsplash.com/random/150x150'},
                {name:'Sandra Lorey',Team:'Kärcher',Information:'Temporär',Dauer:'12.6.2018-20.06.2018',img:'http://source.unsplash.com/random/150x150'},
            ],
            heller:[
                {name:'Marco Grossberger',Team:'Kärcher',Information:'Stamm',Dauer:'',img:'http://source.unsplash.com/random/130x130'},
                
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
<style scoped>
.card.kärcher{
    background-color:yellow;
    min-height:200px   
}
.card.heller{
    background-color: #BBDEFB;
        min-height:200px  
}
.flex.kärcher{
    cursor:grab;
}
.flex.heller{
    cursor:grab;
}
#kärchercss{
       
    display:inline-block;
    height:160px;
    width:160px;
    cursor:grab;
    
    }
.kärcherblock{
   background-color:antiquewhite;
   border:3px;
   height:500px;
   width:800px;
   border-style:dashed 
}    

   
#hellercss{
    background-color:aquamarine
}


</style>


