<template>
<div>
    <my-toolbar></my-toolbar>
    <v-btn @click="dialog2=true">test</v-btn>
<v-content>
      <v-container fluid grid-list-sm>
        <v-layout align-start justify-center row wrap>
          <v-flex xs3 class="elevation-1 pa-3 ma-2 ">
            <v-list two-line >
              <v-avatar class="ma-1" tile size="70"><img src="../assets/kärcher.png" ></v-avatar>
             
              <v-divider></v-divider>
              <draggable id="kärcher" v-model="Kärcher" :options="{group:'people'}" style="min-height: 10px">
                <template v-for="(k,index) in Kärcher"  >
              <v-list-tile :key="k.einsatzplanid" avatar >
                <v-list-tile-avatar :style="{ cursor: 'grab'}">
                  <img src="@/assets/PlatzhalterMann.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="k.user.firstname +' '+ k.user.lastname" :style="{ cursor: 'grab'}"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="k.status"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
              <v-icon :style="{ cursor: 'pointer'}"
                  @click="toggle(index)"
                  v-if="k.value == false"
                  color="grey lighten-1"
                >
                  lock
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                  @click="toggle(index)"
                >
                  lock
                </v-icon>
              </v-list-tile-action>
              </v-list-tile>
              
            </template>
              </draggable>
            </v-list>
          </v-flex>
          <v-flex xs4 class="elevation-1 pa-3 ma-2">
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  













 <v-layout row >
     <v-flex xs12 sm6 offset-sm3>
         <v-card class="kärcher">
             <v-toolbar><v-avatar tile><img src="../assets/kärcher.png" alt=""></v-avatar><v-toolbar-title>Team Kärcher</v-toolbar-title></v-toolbar>
           <v-container fluid grid-list-md> 
            
                <draggable v-model="Kärcher" :element="'v-layout'" row wrap  :options="{group:'team', handle:'.my-handle'}" :move="onMoveCallback">
                   
                <v-flex v-for="k in Kärcher" :key="k.einsatzplanid" >
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
            <v-text-field v-if="sub[0].status='Temporär'" prepend-icon="event" v-mask="'##.##.####'" label="von" v-model="valuevon"   ></v-text-field>
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
                        <v-list >
                           <v-list-tile v-focus
                            @click="filterforuser(skill)" 
                            class="colortest" 
                            v-for="(skill, index) in skills" :key="index">
                              {{skill.skillname}}
                        </v-list-tile>
                           
                        </v-list>
                    </v-flex>
                    <v-flex >
                        <v-icon>code</v-icon>
                    </v-flex>
                    <v-flex sm6>
                        <v-list>
                            <v-list-tile class="yellow" @click="pickuser(user)"  v-for="user in users" :key="user.userid">
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

export default {
  data () {
    return {
      filteredskills: [1,2],
      dialog: false,
      alert: false,
      dialog2: false,
      color: 'yellow',
      valuevon: '',
      valuebis: '',
      oldteam: '',
      newteam: '',
      radio: '',
      ersatz: '',
      test: false,
      oldteamname: '',
      canceldragg: [],
      sub: [{von: '', bis: '', status: '', einsatzplanid: null, teamteamid: null, useruserid: null}]

    }
  },
  directives: {
  focus: {
    // directive definition
    inserted: function (el) {
      el.focus()
    }
  }
},

  created () {
    this.fetchdata()
  },

  computed: {
    Kärcher: {
      get () {
        return this.$store.getters.getkärcher
      },
      set (sub) {
        this.$store.commit('updatekärcher', sub)
      }

    },
    Heller: {
      get () {
        return this.$store.getters.getheller
      },
      set (sub) {
        this.$store.commit('updateheller', sub)
      }
    },
    skills: {
      get () {
        return this.$store.getters.getskills
      }},
    users: {
      get () { return this.$store.getters.getusers }
    },

    MHP: {
      get () {
        return this.$store.getters.getmhp
      },
      set (sub) {
        this.$store.commit('updatemhp', sub)
      }
    },
    Benz: {
      get () {
        return this.$store.getters.getbenz
      },
      set (sub) {
        this.$store.commit('updatemhp', sub)
      }
    },
    userskills: {
      get () {
        return this.$store.getters.getuserskills
      }
    }

  },

  methods: {

    start () {
      return false
    },
    filterforuser (skill) {
      
      var double = this.filteredskills.filter(x => x === skill.skillid)
        
          
    if (double.length < 1) {
        this.filteredskills.push(skill.skillid)
        this.$http.post('http://localhost:8082/db/einsatzplanung/queryusers', this.filteredskills)
         .then(response => {
           this.$store.commit('filterusers', response.body)
         })
    }else{
        var index= this.filteredskills.indexOf(skill.skillid)
        this.filteredskills.splice(index, 1)
      if(this.filteredskills.length<1){
          this.getusers()
      }    
      }
    },

    pickuser (key) {
      this.sub = [{von: '', bis: '', status: '', einsatzplanid: null, teamTeamid: null, userUserid: null}]
      this.alert = false
      this.sub[0].userUserid = key.userid
      var arrays = ['Kärcher', 'MHP', 'Heller', 'Benz']

      arrays.forEach(element => {
        var index = this[element].findIndex(x => x.userUserid === key.userid)

        if (index === -1) {

        } else {
          this.sub[0].einsatzplanid = this[element][index].einsatzplanid
        }
      })
    },
    confirmuser () {
      if (this.sub[0].userUserid == null) {
        this.alert = true
      } else {
        this.sub[0].teamTeamid = this.oldteam

        this.dialog2 = false
        this.dialog = true
      }
    },

    save () {
           // var array = this.newteam
           // Vue.set(this[array],this.index,this.sub[0])
      this.dateToIntvon()
      this.dateToIntbis()

      this.updatedb()
      this.dialog = false
      if (this.ersatz === 'true') {
        this.dialog2 = true
      } else { }
    },

    updatedb () {
      this.$http.post('http://localhost:8082/db/einsatzlanung/update', this.sub[0])
           .then(response => {
             this.fetchdata()
           })
    },
    dateToIntvon () {
      if (this.valuevon != null) {
        var newDate = this.valuevon.split('.')
        var res = newDate[2] + '-' + newDate[1] + '-' + newDate[0]
        this.sub[0].von = res
      }
    },
    dateToIntbis () {
      if (this.valuebis != null) {
        var newDate = this.valuebis.split('.')
        var res = newDate[2] + '-' + newDate[1] + '-' + newDate[0]
        this.sub[0].bis = res
      }
    },
    dateToGer (datum) {
      if (datum != null) {
        var newDate = datum.split('-')
        var res = newDate[2] + '.' + newDate[1] + '.' + newDate[0]
        return res
      }
    },
    cancel () {
      this.dialog = false
      this.$store.commit('canceldragg', this.canceldragg)
    },
    onMoveCallback (evt, originalEvent) {
      this.dialog = true
      console.log(evt.draggedContext)
      console.log(evt.relatedContext)

      Vue.set(this.sub, 0, {
        einsatzplanid: evt.draggedContext.element.einsatzplanid,
        teamTeamid: evt.relatedContext.element.teamTeamid,
        userUserid: evt.draggedContext.element.userUserid

      })
      this.canceldragg[0] = evt.draggedContext
      this.canceldragg[1] = evt.relatedContext
      this.oldteam = evt.draggedContext.element.teamTeamid
      this.oldteamname = evt.draggedContext.element.team.teamname
      this.index = evt.draggedContext.Index
      this.newteam = evt.relatedContext.element.teamTeamid
    },
    getusers () {
      this.$http.get('http://localhost:8082/users')
    .then(res => {
      var data = res.body
      this.$store.commit('addusers', data)
    })
    },
    fetchdata () {
      this.$http.get('http://localhost:8082/db/einsatzlanung/getkaercher')
    .then(res => {
      this.$store.commit('addkärcher', res)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getmhp')
    .then(res => {
      this.$store.commit('addmhp', res)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getheller')
    .then(res => {
      this.$store.commit('addheller', res)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getbenz')
    .then(res => {
      this.$store.commit('addbenz', res)
    }),

    this.$http.get('http://localhost:8082/db/einsatzlanung/getteams')
    .then(response => {
      this.$store.commit('addteams', response)
    }),

    this.$http.get('http://localhost:8082/db/einsatzlanung/getskills')
    .then(r => {
      this.$store.commit('addskills', r)
    }),
    this.$http.get('http://localhost:8082/db/einsatzlanung/getuserskills')
    .then(res => {
      this.$store.commit('adduserskills', res)
    }),
       this.$http.get('http://localhost:8082/users')
    .then(res => {
      var data = res.body
      this.$store.commit('addusers', data)
    })
    }

  }}
</script>
<style scoped>
.v-card.kärcher{
    background-color:yellow;
    min-height:200px   
}
.v-card.heller{
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

.colortest{
    background-color:#4dbe85
}

.colortest:focus{
    background-color:#005e2e
}
.a.v-list__tile:focus{
    background-color:#005e2e;
    color:white
}








</style>


