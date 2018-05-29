<template>
<div>
    
<v-dialog v-model="dialog">
    <v-toolbar class="primary">
        <v-toolbar-title>
            Neue Schicht erstellen
        </v-toolbar-title>
    </v-toolbar>
<v-stepper v-model="e1">
    <v-stepper-header>
        <v-stepper-step :complete="e1>1" step="1">Welche Schicht soll erstellt werden?</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1>2" step="2">Für welchen Zeitraum soll die Schicht angelegt werden?</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Welcher User soll die Schicht ausführen?</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
        <v-stepper-content step="1">
            <v-card class="mb-5">
                <v-card-title>
                    Früh oder Spät?
                </v-card-title>
                <v-card-actions>
                    <v-radio-group v-model="radiogroup">
                        <v-radio
                        label="früh"
                        value="früh"
                        color="yellow"></v-radio>
                        <v-radio
                        label="spät"
                        value="spät"
                        color="blue"></v-radio>

                    </v-radio-group>
                    <v-btn class="primary" @click.native="e1=2">Weiter</v-btn>
                </v-card-actions>
            </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
            <v-card>
                <v-card-title>Zeitraum auswählen</v-card-title>
                <v-card-actions>
                    <v-layout justify-space-between wrap>
                    <v-flex xs12 sm6 class="my3">	
                     <div class="subheading">Von</div>
                        <v-date-picker
                        v-model="picker"
                        locale="de"
                        ></v-date-picker>
                    </v-flex>
                    </v-layout>
                    <v-layout justify-space-between wrap>
                    <v-flex xs12 sm6 class="my3">	
                     <div class="subheading">Bis</div>
                        <v-date-picker
                        v-model="picker2"
                        locale="de"
                        ></v-date-picker>
                    </v-flex>
                    </v-layout>
                    <v-btn class="primary" @click.native="e1=3">Weiter</v-btn>

                </v-card-actions>
            </v-card>
         </v-stepper-content>
         <v-stepper-content step="3">
             <v-card>
                 <v-card-title>Mitarbeiter auswählen</v-card-title>
                 <v-card-actions>
                     <v-select
                 :items="fullname"
                  required
                  label="Select User"
                  v-model="user"
                  item-text="firstname"
                  item-value="userid"></v-select>
                 </v-card-actions>
                 <v-btn @click="submit" class="primary">abschicken</v-btn>
             </v-card>

         </v-stepper-content>
    </v-stepper-items>
    
    </v-stepper>    

</v-dialog>

</div>
</template>
<script>
import router from '../router'
export default {
    data(){
        return{
            dialog:true,
            e1:0,
            radiogroup:"früh",
            picker:null,
            picker2:null,
            user:''
        }
    },
    computed:{
        getusers () {
             return this.$store.getters.getusers
        },
        fullname () {
            return this.$store.getters.fullname
        }
    },
   methods:{
       submit(){
           var data=[]
           router.push('main')
       }
   } 
    
}
</script>

