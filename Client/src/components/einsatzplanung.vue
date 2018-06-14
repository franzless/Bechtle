<template>
<div>
    <my-toolbar></my-toolbar>
    <v-data-table 
        :headers="headers"
        

    >
    <template slot="items" slot-scope="props">
        
    </template>    
    </v-data-table>
</div>
    

</template>
<script>
export default {
    data(){
        return{
           headers:[
               {text:'Datum', value:'datum'},{text:'MHP', value:'mhp'},{text:'Merceds-Benz-Museum', value:'mbenz'},{text:'Heller', value:'heller'}

           ],
           data:[
               {name:'Albert Einstein', datum:'13.06.2018', team:'Kärcher', skill:'Rollout'}
           ] 
        }

    }
    
}
</script>

