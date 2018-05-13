<template>
  <div>
    
      <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                  <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="editedItem.datum"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="editedItem.datum"
          label="Datum auswählen"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker locale="de" v-model="editedItem.datum" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(editedItem.datum)">OK</v-btn>
        </v-date-picker>
      </v-menu>

              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.von" label="Arbeitsbeginn"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.bis" label="ArbeitsEnde"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="Serviceleistung" v-model="editedItem.SL" label="ServiceLeistung"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="Leistungsschein" v-model="editedItem.SL" label="Leistungsschein"></v-select>
                <v-select :items="Arbeitsort" v-model="editedItem.SL" label="Arbeitsort"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.datum }}</td>
        <td class="text-xs-right">{{ props.item.von }}</td>
        <td class="text-xs-right">{{ props.item.bis }}</td>
        <td class="text-xs-right">{{ props.item.SL }}</td>
        <td class="text-xs-right">{{ props.item.LS }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
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
          
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    menu: false,

    headers: [
        { text: 'Datum',align: 'left',value: 'datum'},
        { text: 'Arbeitsbeginn', value: 'von', sortable: false },
        { text: 'ArbeitsEnde', value: 'bis', sortable: false },
        { text: 'Serviceleistung', value: 'SL', sortable: false },
        { text: 'Leistungsschein', value: 'LS' },
        { text: 'ArbeitsOrt', value:'Ort'},
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
    Serviceleistung:[
'Service Techniker',
'Service Techniker ""B""',
'System Engineer',
'Repräsentant / Projektleiter',
'Senior Engineer / Consultant',
'Auszubildende',
'Praktikant',
'DB Entwicklung'],
    Arbeitsort:['Kärcher','Heller','MHP','Mercedes-Benz-Museum'],
    list: [],
    editedIndex: -1,
    editedItem: {
      datum: null,
      von: '',
      bis: '',
      SL: '',
      LS: ''
    },
    defaultItem: {
      datum: null,
      von: '',
      bis: '',
      SL: '',
      LS: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.list = [

        {
          datum: '10.05.2018',
          von: '07:30',
          bis: '16:00',
          SL: 'ServiceTechniker',
          LS: 'Rollout'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.list.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem)
      } else {
        this.list.push(this.editedItem)
      }
      this.close()
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


