<template>
  <div>
     
        <v-layout row >
          <v-flex xs12 sm6 class="my-2 px-1">
            <h1>Frühschicht</h1>
             <v-date-picker
                ref="picker"
                locale="de"
                v-model="datumzeitf"
                :picker-date.sync="pickerdatumf"
                full-width
              ></v-date-picker>
           </v-flex>
           <v-flex xs12 sm6 class="my-2 px-1">
             <h1>Und wieder dabei:</h1>
              <v-list>
                <v-list-tile v-for="item in items" :key="item.title" avatar>
                  <v-list-tile-action>
                    <v-icon :color="item.color">radio_button_checked</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                      <v-list-tile-title v-text="item.firstname +' '+ item.lastname"></v-list-tile-title>
                    </v-list-tile-content>
                   <v-list-tile-avatar>
                       <img :src="item.avatar">
                   </v-list-tile-avatar>
                  </v-list-tile>
               </v-list>
           </v-flex>
            <v-flex xs12 sm6 class="my-2 px-1">
              <h1>Spätschicht</h1>
             <v-date-picker
                ref="picker"
                locale="de"
                v-model="datumzeits"
                :picker-date.sync="pickerdatums"
                full-width
              ></v-date-picker>
           </v-flex>

          </v-layout>
   </div>
</template>
<script>
export default {
  data(){
    return {
      datumzeitf:null,
      datumzeits:null,
      pickerdatumf:null,
      pickerdatums:null,
      items:[]
    }
  },
  created(){
    this.items=this.getusers
  },
  computed:{
    getusers(){
      return this.$store.getters.getusers
    }
  }

}
</script>

