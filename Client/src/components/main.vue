<template>
  <div>
      

      <img  class="displayed" src="../assets/bechtle1.jpg">
       <br>
      <v-container grid-list-md text-xs-center>
      <v-layout row >
      <v-flex xs10>
    
     
      
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
                <v-text-field v-model="editedItem.datum" label="Datum"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.von" label="Arbeitsbeginn"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.bis" label="ArbeitsEnde"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.SL" label="ServiceLeistung"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.LS" label="Leistungsschein"></v-text-field>
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
     
      </v-flex>  
    </v-layout>
       </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,

    headers: [
      {
        text: 'Datum',
        align: 'left',

        value: 'datum'
      },
        { text: 'Arbeitsbeginn', value: 'von', sortable: false },
        { text: 'ArbeitsEnde', value: 'bis', sortable: false },
        { text: 'Serviceleistung', value: 'SL', sortable: false },
        { text: 'Leistungsschein', value: 'LS' },
        { text: 'Actions', value: 'name', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      datum: '',
      von: '',
      bis: '',
      SL: '',
      LS: ''
    },
    defaultItem: {
      datum: '',
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
      this.desserts = [

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
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
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


