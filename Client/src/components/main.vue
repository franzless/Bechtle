<template>
  <div>
      <my-toolbar></my-toolbar>
      <v-dialog v-model="dialog" max-width="750px">
      <v-btn @click="saves=!saves" slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
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
          v-model="editedItem.datum"
          label="Datum"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="editedItem.datum" scrollable>
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

    <v-layout justify-center>
      <v-flex xs20 sm10 md8>

      <v-data-table
      :headers="headers"
      :items="list"
      hide-actions
      class="elevation-1"
    > 
     
      <template slot="items" slot-scope="props">
        <td> {{ props.item.datum }}</td>
        <td> {{ props.item.arbeitsbeginn }}</td>
        <td> {{ props.item.arbeitsende }}</td>
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
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
        </v-flex>
       </v-layout>   
  </div>
</template>
<script>
import Vue from 'vue';
import schichtplan from './Schichtplan.vue'
export default {
  data() { return{
    dialog: false,
    modal:false,
    menu: false,
    menu1: false,
    menu2:false,
    menu3:false,
    updates:false,
    saves:false,
    
    headers: [
        { text: 'Datum', align: 'left', value: 'datum'},
        { text: 'Arbeitsbeginn', value: 'von', sortable: false },
        { text: 'ArbeitsEnde', value: 'bis', sortable: false },
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
      datum:null,
      arbeitsbeginn:null,
      arbeitsEnde:null,
      serviceleistung:'',
      leistungsschein:'',
      arbeitsOrt:''
      
          
      
    },
    defaultItem: {
      datum: null,
      von: null,
      bis: null,
      SL: '',
      LS: '',
      Ort:'',
      
    }
  }},

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    }
  },
  created(){
      this.initialize()
      
 
  },

 

  methods: {
    initialize () {
        
         this.$http.post('http://localhost:8082/db/main', this.getuser)
        .then(response => {
          var newdata = response.body
          var x= newdata.length
          for (var i= 0; i<x ;i++){
          this.list.push(newdata[i])
          }
          //Array.prototype.push.apply(this.list,newdata)
          
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

      var conf= confirm('Are you sure you want to delete this item?') 
      if (conf== true) {
         this.$http.post('http://localhost:8082/db/zeitstempel/del',spliced[0])
         .then(res=>{
           this.list=[]
           this.initialize()
      })}         
          },

    update(){
       this.$http.post('http://localhost:8082/db/zeitstempel/update', this.editedItem)
      .then(res => {
        this.list=[]
        this.initialize()
        this.close()
        
      })

    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.updates=false
        this.saves=false
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem)
      } else {
        this.$http.post('http://localhost:8082/db/zeitstempel',{userUserid:this.getuserid,datum:this.editedItem.datum,arbeitsbeginn:this.editedItem.arbeitsbeginn,arbeitsende:this.editedItem.arbeitsende,leistungsschein:this.editedItem.leistungsschein,serviceleistung:this.editedItem.serviceleistung,arbeitsort:this.editedItem.arbeitsort})
        .then(res =>{
          this.list = []
      this.initialize()
      this.close()
        })
      }
           
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


