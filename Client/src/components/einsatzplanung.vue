<template>
<div>
    <my-toolbar></my-toolbar>
    <v-card height="400x" width="150">
       <draggable v-model="users">
          
               <v-card v-for="user in users" :key="user.userid">
                   <v-card-media src="http://source.unsplash.com/random/150x150" height="150px"></v-card-media>
                    <v-card-title>
                        {{user.firstname}} {{user.lastname}}
                    </v-card-title>
               </v-card>
       </draggable>             





    </v-card>
</div>
    

</template>
<script>
export default {
    data(){
        return{
          
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

