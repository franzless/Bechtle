<template>
  <div>
     
        <v-layout row >
          <v-flex xs12 sm6 class="my-2 px-1">
            <h1>Frühschicht</h1>
             <v-date-picker
                ref="picker"
                :events="nurdatumf"
                :event-color="eventcolorf"
                locale="de"
                v-model="datumzeitf"
                :picker-date.sync="pickerdatumf"
                full-width
              ></v-date-picker>
           </v-flex>
           <v-flex xs12 sm6 class="my-2 px-1">
             <h1>Liste der Mitarbeiter:</h1>
              <v-list>
                <v-list-tile v-for="item in items" :key="item.title" avatar>
                  <v-list-tile-action>
                    <v-icon :color="item.usercolor">fiber_manual_record</v-icon>
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
                :events="nurdatums"
                :event-color="eventcolors"
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
  data () {
    return {
      datumzeitf: null,
      datumzeits: null,
      pickerdatumf: null,
      pickerdatums: null,
      items: [],
           
      nurdatumf:[],
      nurdatums:[],
      eventspät:[],
      eventfrüh:[]
    }
  },
  created () {
    this.items = this.getusers
    this.eventfrüh = this.getfrüh
    this.eventspät = this.getspät
    
  },
  mounted () {
    
        var x = this.eventfrüh.length
        var y = this.eventspät.length
        for (var i= 0; i<x; i++){
        this.nurdatumf.push(this.eventfrüh[i].datum)}
        for (var i=0; i<y ;i++){
          this.nurdatums.push(this.eventspät[i].datum)}
        }
      

    
      

  ,
  computed: {
    getusers () {
      return this.$store.getters.getusers
    },
    getfrüh (){
      return this.$store.getters.getfrüh
    },
    getspät (){
      return this.$store.getters.getspät}
  },
  methods:{
    eventcolorf(date){
      var index = this.nurdatumf.indexOf(date)
      if (index == -1){}
      else{      
      return this.eventfrüh[index].user.usercolor  }    
    },
    eventcolors(date){
      var index = this.nurdatums.indexOf(date)
      if (index == -1){}
      else{      
      return this.eventspät[index].user.usercolor  }    
    }
    

    
  }

}
</script>

