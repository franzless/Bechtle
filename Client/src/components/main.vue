<template>
  <div>
      <my-toolbar></my-toolbar>
      <br>
      
      <v-layout justify-center >
         <v-flex xs20 sm10 md8>
        <v-card>
          <v-toolbar  dense dark color="primary"><v-toolbar-title>Mein Zeitnachweiß</v-toolbar-title></v-toolbar>
         <v-expansion-panel color="primary" dark class="mb-2">
         <v-expansion-panel-content>
            <div slot="header">Filter</div>
              <v-card>
              <v-card-actions>
                <v-menu
                v-model="menüfilter"
                >
                <v-text-field v-model="filterdatum1" prepend-icon="access_time" readonly label="Erstes Datum" slot="activator"></v-text-field>
                <v-date-picker locale="de" v-model="filterdatum1"></v-date-picker>
                </v-menu>
                <v-menu
                v-model="menüfilter2"
                >
                <v-text-field v-model="filterdatum2" prepend-icon="access_time" readonly label="Zweites Datum" slot="activator"></v-text-field>
                <v-date-picker locale="de" v-model="filterdatum2"></v-date-picker>
                </v-menu>
                   
                <v-btn @click="filter" round color="primary">filtern</v-btn>
                <v-btn @click="filterlöschen()" round color="red">Filter löschen</v-btn>
               </v-card-actions>
               </v-card>
        </v-expansion-panel-content>
         </v-expansion-panel>



    <v-btn @click="saves=!saves,dialog=!dialog"  color="primary" dark class="mb-2">Neuer Eintrag</v-btn>
    <v-btn @click="dialogkrank=!dialogkrank"  color="primary" dark class="mb-2">Krankheitstage eintragen</v-btn>
    
      <v-dialog v-model="dialog" max-width="850px">
           
      <v-dialog v-model="dialogkrank" max-width="450px">
      
      <v-toolbar color="primary"><v-toolbar-title>Krankheitstage eintragen</v-toolbar-title></v-toolbar>
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12 sm6 md4>
            <v-menu :close-on-content-click="false" persistent v-model="menukrank"  >
            <v-text-field prepend-icon="event" label="von" slot="activator" v-model="krank"></v-text-field>
            <v-date-picker :first-day-of-week="1" locale="de" v-model="krank"></v-date-picker>
             </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
            <v-menu :close-on-content-click="false" persistent v-model="menukrank2" prepend-icon="access_time" >
            <v-text-field prepend-icon="event" label="bis" slot="activator" v-model="krank2"></v-text-field>
            <v-date-picker :first-day-of-week="1" locale="de-DE" v-model="krank2"></v-date-picker>
             </v-menu>
            </v-flex>
            <v-btn @click="funckrank" color="primary">add</v-btn>
           <v-alert value="true" type="info">Samstage und Sonntage werden automatisch heraus gerechnet, Feiertage müssen selbst gelöscht werden</v-alert>
          </v-container>
        </v-card-text>
      </v-card>
      </v-dialog>
      <v-card>
        <v-toolbar color="primary"> 
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        
        
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                 <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="editedItem.datum"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="this.editedItem.datum"
          label="Datum"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker :first-day-of-week="1" locale="de" v-model="editedItem.datum" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(editedItem.datum)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

              </v-flex>
              <v-flex xs12 sm6 md4>

                 <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="editedItem.arbeitsbeginn"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="editedItem.arbeitsbeginn"
          label="Arbeitsbeginn"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="editedItem.arbeitsbeginn" @change="$refs.menu.save(editedItem.arbeitsbeginn)">
        <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu2.save(editedItem.arbeitsbeginn)">OK</v-btn>
          </v-time-picker>
        </v-menu>
                
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu3"
        :nudge-right="40"
        :return-value.sync="editedItem.arbeitsende"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="editedItem.arbeitsende"
          label="ArbeitsEnde"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="editedItem.arbeitsende" @change="$refs.menu3.save(editedItem.arbeitsende)">
        <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(editedItem.arbeitsende)">OK</v-btn>
          </v-time-picker>
          
        </v-menu>
         </v-flex>
         <v-flex xs12 sm6 md4>
        <v-text-field  mask="##" prepend-icon="access_time" label="Pausendauer in min" v-model="editedItem.pause"></v-text-field>
        </v-flex>
             
               <v-flex xs12 sm6 md4>
                 
                <v-select prepend-icon="portrait" :items="Serviceleistung" v-model="editedItem.serviceleistung" label="ServiceLeistung"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select prepend-icon="book" :items="Leistungsschein" v-model="editedItem.leistungsschein" label="Leistungsschein"></v-select>
               </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select prepend-icon="trip_origin" :items="Arbeitsort" v-model="editedItem.arbeitsort" label="Arbeitsort"></v-select>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1"  flat @click.native="close">Cancel</v-btn>
          <v-btn v-if="saves" color="blue darken-1" flat @click.native="save">Save</v-btn>
          <v-btn v-if="updates" color="blue darken-1" flat @click.native="update">update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card>
    </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs20 sm10 md8>

      <v-data-table
      id="tablemain"
      :headers="headers"
      :items="list"
      class="elevation-1"
      
    > 
     <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td> {{ props.item.datum }}</td>
        <td> {{ props.item.arbeitsbeginn }}</td>
        <td> {{ props.item.arbeitsende }}</td>
        <td> {{ props.item.pause }}</td>
        <td> {{ props.item.serviceleistung }}</td>
        <td >{{ props.item.leistungsschein }}</td>
        <td >{{ props.item.arbeitsort }}</td>
        <td>
          <v-btn icon class="mx-0" @click="(editItem(props.item), updates=!updates)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
          
        
       
      </template>
      <template slot="no-data">
        <v-alert type="warning" value="true">Es sind keine Daten vorhanden! Um neue Datensätze zu erstellen gehen zu "Neuer Eintrag"</v-alert>
      </template>
    </v-data-table>
        </v-flex>
       </v-layout>   
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      dialog: false,
      dialogkrank:false,
      menukrank:false,
      menukrank2:false,
      modal: false,
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menüfilter:false,
      menüfilter2:false,
      updates: false,
      saves: false,
      filterdatum1:'',
      filterdatum2:'',
      krank:'',
      krank2:'',
      datum:null,
      headers: [
        { text: 'Datum', align: 'left', value: 'datum'},
        { text: 'Arbeitsbeginn', value: 'von', sortable: false },
        { text: 'ArbeitsEnde', value: 'bis', sortable: false },
        { text: 'Pause(min)', value: 'pause', sortable: false },
        { text: 'Serviceleistung', value: 'SL', sortable: false },
        { text: 'Leistungsschein', value: 'LS' },
        { text: 'ArbeitsOrt', value: 'Ort'},
        { text: 'Actions', value: 'name', sortable: false }
        
      ],
      Leistungsschein: [
        'LS01-AK-Beschaffung',
        'LS02-AK-Lager & Logistik, Installation',
        'LS03-AK Rollout',
        'LS04-AK-Incident & VPN Token',
        'LS05-AK MAC OS X',
        'LS06-AK-Mobile Devices & Asset MGMT.',
        'LS07-AK-Produktion',
        'LS08-AK-Ersatzteile & Reperaturen',
        'LS09-AK-Sonderaufträge',
        'LS10-AK-Produktion & Testing'],
      Serviceleistung: [
        'Service Techniker',
        'Service Techniker ""B""',
        'System Engineer',
        'Repräsentant / Projektleiter',
        'Senior Engineer / Consultant',
        'Auszubildende',
        'Praktikant',
        'DB Entwicklung'],
      Arbeitsort: ['Kärcher', 'Heller', 'MHP', 'Mercedes-Benz-Museum'],
      list: [],
      editedIndex: -1,
      editedItem: {
        datum: null,
        arbeitsbeginn: null,
        arbeitsEnde: null,
        serviceleistung: '',
        leistungsschein: '',
        arbeitsOrt: ''

      },
      defaultItem: {
        datum: null,
        von: null,
        bis: null,
        SL: '',
        LS: '',
        Ort: ''

      }
    }
  },

 
  

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Neuer Eintrag' : 'Eintrag editieren'
    },
    getuser () {
      return this.$store.getters.getuser
    },
    getuserid () {
      return this.$store.getters.getuserid
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    datum:function(val, oldVal) {
			this.editedItem.datum = this.gettanggal(val);
	}
  },
  created () {
    this.initialize()
  },
  updated(){
    console.log(this.editedItem.datum)
  },

  methods: {
    initialize () {
      this.$http.post('http://localhost:8082/db/main', this.getuser)
        .then(response => {
          var newdata = response.body
          var x = newdata.length
          for (var i = 0; i < x; i++) {
            this.list.push(newdata[i])
          }
          // Array.prototype.push.apply(this.list,newdata)
        }
      , error => {
        this.error = error
      })
    },
    editItem (item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem, this.list)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.list.indexOf(item)
      const spliced = this.list.splice(index, 1)
      console.log(spliced[0])

      var conf = confirm('Are you sure you want to delete this item?')
      if (conf == true) {
        this.$http.post('http://localhost:8082/db/zeitstempel/del', spliced[0])
         .then(res => {
           this.list = []
           this.initialize()
         })
      }
    },

    update () {
      this.$http.post('http://localhost:8082/db/zeitstempel/update', this.editedItem)
      .then(res => {
        this.list = []
        this.initialize()
        this.close()
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.updates = false
        this.saves = false
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem)
      } else {
        this.$http.post('http://localhost:8082/db/zeitstempel', {userUserid: this.getuserid, datum: this.editedItem.datum, arbeitsbeginn: this.editedItem.arbeitsbeginn, arbeitsende: this.editedItem.arbeitsende, leistungsschein: this.editedItem.leistungsschein, serviceleistung: this.editedItem.serviceleistung, arbeitsort: this.editedItem.arbeitsort})
        
        .then(res => {
          this.list = []
          this.initialize()
          this.close()
        })
      }
    },
    filter(){
      var daten = new Object()
               daten.userid=this.getuser.userid
               daten.datum1=this.filterdatum1
               daten.datum2=this.filterdatum2
      this.$http.post('http://localhost:8082/db/filter', daten)
                  .then(filter =>{
                    
                    this.list = []
                    var newdata = filter.body
                    var x = newdata.length
                    for (var i = 0; i < x; i++) {
                     this.list.push(newdata[i])
                  }})               
    },
    filterlöschen (){
      
       this.list = []
        this.initialize()
    },
    wochentag(i){
            var tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
            var tag = (typeof(i) == 'object') ? i.getDay() : i ;
                return tage[tag];
         },
    funckrank(){
      var valdate= []
           var datum =new Date(this.krank)
           let datum1 =new Date(this.krank2)
           let datum2= ''
           var difference = datum1.getDate() - datum.getDate();
           
            //Samstage und Sonntage rausfiltern
           for (var i= 0; i<difference ; i++){
               datum2 =datum                           
               var x = this.wochentag(datum2.getDay().toString())
               if(x === 'Samstag' || x === 'Sonntag'){                   
                   datum2= datum2.setDate(datum2.getDate() + 1)   
               }else{           
                  valdate.push(datum2.toISOString().split("T",1)[0])                   
                   datum2= datum2.setDate(datum2.getDate() + 1)
               }
           }
           //Neues Array basteln
            var l= valdate.length
            var final = []
           for(var y=0; y<l;y++){               
               var object = new Object()
               object.userUserid=this.getuserid
               object.leistungsschein='krank'
               object.serviceleistung ='krank'
               object.datum=valdate[y]
               final.push(object)
           }
           this.$http.post('http://localhost:8082/zeitstempel/krank',final)
           .then(res=>{
             this.list = []
            this.initialize()
            })  
    },
  gettanggal(str) {
	if (str != null) {
		return str.substring(8, 10)+'-'+str.substring(5, 7)+'-'+str.substring(0, 4);
	}
	return '';
}
  }
}
</script>
<style>
img.displayed{
  display: block;
    margin-left: auto;
    margin-right: auto;
    width:80%;
    height:auto
}
</style>


