<template>
<div>
    
<v-dialog v-model="dialog" width="1200">
   
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
            <v-layout align-center justify-center>
                <v-flex xs5>
            <v-card color="grey lighten-3" class="mb-5" height="200px" >
                <v-layout justify-center row wrap>
                    <v-flex xs6> 
                <v-card-title> <h2>Früh oder Spät?</h2>
                    
                </v-card-title>
                <v-card-actions>
                    <v-radio-group  row v-model="radiogroup">
                        <v-radio
                        label="früh"
                        value="früh"
                        color="amber accent-3"></v-radio>
                        <v-radio
                        label="spät"
                        value="spät"
                        color="blue"></v-radio>

                    </v-radio-group>
                     </v-card-actions>
                     </v-flex>
                     </v-layout>
                </v-card>
                </v-flex>
                </v-layout>
                <v-layout justify-center>
                    <v-btn class="secondary"  @click="main" flat>Cancel</v-btn>
                    <v-btn class="primary" @click.native="e1=2">Weiter</v-btn>
                    
              </v-layout>
           
        </v-stepper-content>
        <v-stepper-content step="2">
            <v-layout justify-center>
            <v-card color="grey lighten-3" class="mb-5" >
                <v-card-title> <h2>Zeitraum auswählen</h2>    </v-card-title>
                <v-card-actions>
                    <v-layout >
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
                    

                </v-card-actions>
            </v-card>
            </v-layout>
            <v-flex xs5 offset-xs3>
            <v-layout justify-center>
            
            <v-card color="blue-grey lighten-4">
              
                <v-btn class="secondary" @click.native="e1=1">Zurück</v-btn>
                <v-btn class="primary" @click.native="e1=3">Weiter</v-btn>
              
            </v-card>
            </v-layout>
            </v-flex>
            <v-alert :value="true" type="info">Samstage und Sonntage, welche in dem gewählten Zeitraum liegen, werden automatisch heraus gerechnet</v-alert>
         </v-stepper-content>
         <v-stepper-content step="3">
             
             <v-flex xs5 offset-xs3>
             <v-card>
                 <v-layout justify-center>    
                 <v-card-title> <h2>Mitarbeiter auswählen</h2>   </v-card-title>
                 </v-layout>  
                 <v-card-actions>
                     <v-select
                 :items="getusers"
                  required
                  label="Select User"
                  v-model="user"
                  item-text="email"
                  item-value="userid"></v-select>
                 </v-card-actions>
                 <v-layout just>
                 <v-btn @click.native="e1=2" class="secondary">Zurück</v-btn>
                 <v-btn @click="submit" class="primary">abschicken</v-btn>
                  </v-layout>
             </v-card>
             </v-flex>

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
    updated(){
        /* var datum = new Date (this.picker)
        console.log(datum)
        console.log(this.wochentag(datum.getDay())) */
    },
    computed:{
        getusers () {
            return this.$store.getters.getusers
        },
        fullname () {
            return this.$store.getters.fullname
        },
        
    },
        
        
    
   methods:{
       getschicht(){
      this.$http.get('http://localhost:8082/db/schicht')
    .then(res => {
      var data = res.body
      this.$store.commit('updateschicht', data)
    })
    .catch(err => {
      console.log(err)
    })},
       main(){
           router.push('main')
       },

         wochentag(i){
            var tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
            var tag = (typeof(i) == 'object') ? i.getDay() : i ;
                return tage[tag];
         },
         
    
        
    
       submit(){
           var valdate= []
           var datum =new Date(this.picker)
           let datum1 =new Date(this.picker2)
           let datum2= ''
           var difference = datum1.getDate() - datum.getDate();
           console.log(difference)
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
               object.userUserid=this.user
               object.schichtname=this.radiogroup
               object.datum=valdate[y]
               final.push(object)
           }
           this.$http.post('http://localhost:8082/db/addschicht',final)
           .then(res=>{
               
           })  
           
           router.push('main')
       }
   } 
}

</script>

