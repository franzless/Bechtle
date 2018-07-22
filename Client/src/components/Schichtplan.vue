<template>
  <div>
    <my-toolbar></my-toolbar>
      <v-container grid-list-md>
        <v-layout  justify-center row wrap  >
          
          <v-dialog v-model="dialog" persistent width="400px" >
            
            <v-card>
              
              <v-toolbar color="primary"><v-toolbar-title>{{formTitle}}</v-toolbar-title></v-toolbar>
              
                
             
              <v-card-text>
                <v-text-field v-if="datumzeitf!=null" disabled v-model="datumzeitf">{{datumzeitf}}</v-text-field>
                <v-text-field  v-if="datumzeits!=null" disabled v-model="datumzeits">{{datumzeits}}</v-text-field>
                <v-select
                 :items="items"
                  required
                  label="Select"
                  v-model="updatef"
                  item-text="email"
                  item-value="userid"
                  ></v-select>
                  <v-card-actions>
                    <v-text-field class="error" v-if="error !== '' " v-model="error">{{error}}</v-text-field>
                    
                    <v-btn class="primary" @click="updateschicht"> update</v-btn>
                    <v-btn class="primary" @click="cancel" >Cancel</v-btn>
                    
                  </v-card-actions>
                </v-card-text> 
            </v-card>
            
            </v-dialog>
            
          <v-flex xs12 sm6 class="my-2 px-1">
            <h1>Frühschicht</h1>
             <v-date-picker
                @click.native="dialog=true"
                ref="dialog"
                :events="nurdatumf"
                :event-color="eventcolorf"
                locale="de"
                v-model="datumzeitf"
                :return-value.sync="pickerdatumf"
                full-width
                
              ></v-date-picker>
           </v-flex>
           
             <v-flex xs10 sm4>
             <v-card >
               <v-layout column >
           <v-flex xs10 sm4 >
               <v-card-title class="primary"> 
             <h2>Liste der Mitarbeiter:</h2>
             </v-card-title>
             <hr>
              <v-list>
                <v-list-tile v-for="item in items" :key="item.title" avatar>
                  <v-list-tile-action>
                    <v-icon :color="item.usercolor">fiber_manual_record</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                      <v-list-tile-title v-text="item.firstname +' '+ item.lastname"></v-list-tile-title>
                    </v-list-tile-content>
                   <v-list-tile-avatar>
                       <img src="@/assets/Download.jpg">
                   </v-list-tile-avatar>
                  </v-list-tile>
               </v-list>
               </v-flex>
           </v-layout>
               </v-card>
               </v-flex>
           
           
            <v-flex xs12 sm6 class="my-2 px-1">
              <h1>Spätschicht</h1>
             <v-date-picker
               @click.native="dialog=true"
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
          </v-container>
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
      updatef: '',
      items: [],
      dialog: false,
      nurdatumf: [],
      nurdatums: [],
      eventspät: [],
      eventfrüh: [],
      error: '',
      userimg: '@assets/Download.jpg'
    }
  },

  mounted () {
    console.log('mounted')
    this.getschicht()
    this.start()
  },

  computed: {
    formTitle () {
      return this.datumzeitf !== null ? 'früh' : 'spät'
    },

    getusers () {
      return this.$store.getters.getusers
    },
    getfrüh () {
      return this.$store.getters.getfrüh
    },
    getspät () {
      return this.$store.getters.getspät
    }

  },
  methods: {
    getschicht () {
      this.$http.get('http://localhost:8082/db/schicht')
    .then(res => {
      var data = res.body
      this.$store.commit('updateschicht', data)
    })
    .catch(err => {
      console.log(err)
    })
    },
    start () {
      this.items = this.getusers
      this.eventfrüh = this.getfrüh
      this.eventspät = this.getspät

      var x = this.eventfrüh.length
      var y = this.eventspät.length
      for (var i = 0; i < x; i++) {
        this.nurdatumf.push(this.eventfrüh[i].datum)
      }
      for (var z = 0; z < y; z++) {
        this.nurdatums.push(this.eventspät[z].datum)
      }
    },
    cancel () {
      this.dialog = false
      this.datumzeitf = null
      this.datumzeits = null
    },

    eventcolorf (date) {
      var index = this.nurdatumf.indexOf(date)
      if (index === -1) {} else {
        return this.eventfrüh[index].user.usercolor
      }
    },
    eventcolors (date) {
      var index = this.nurdatums.indexOf(date)
      if (index === -1) {} else {
        return this.eventspät[index].user.usercolor
      }
    },
    updateschicht () {
      var data = {datum: this.datumzeitf, userid: this.updatef, schichtname: this.formTitle}

      this.$http.post('http://localhost:8082/db/updateschichtf', data)
      .then(res => {
        var data = res.body
        this.$store.commit('updateschicht', data)
        this.eventfrüh = []
        this.eventspät = []
        this.nurdatumf = []
        this.nurdatums = []
        this.getschicht()
        this.start()
        this.cancel()
      })
      .catch(err => {
        console.log(err)
        this.error = 'Irgendwas ist schief gegangen'
      })
    }

  }

}
</script>
<style scoped>
.error{
  color:red
}
.list{
  font-size: 5px;
  
}
</style>


