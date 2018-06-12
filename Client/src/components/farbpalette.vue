<template>
<div>
    <v-layout justify-center>
        <v-flex xs6>
            <v-alert type="info" value="true"> Bitte wählen Sie eine Farbe für sich aus, welche ihnen gefällt. Diese wird später im Kalender verwendet.
                  Bitte wählen Sie die Farbe so, dass man Sie von den anderen Farben, welche bereits vergeben sind unterscheiden kann.</v-alert>
            <v-alert value="true" type="info">
                 Bitte eine Farbe aussuchen und den Namen genau so wie er da steht in das Feld eintragen
            </v-alert>
    <v-card height="100px">
        <v-card-title >
            Bereits vergebe Farben:
        </v-card-title>
        
            <v-card-action v-for="colors in this.getusercolor" :key="colors">
                    <v-icon  :color="colors">highlight_off</v-icon>
            </v-card-action>
            
    </v-card>   
            <br>
              </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs4>
                <v-text-field  clearable v-model="farbe" label="Namen der Farbe eintragen"></v-text-field>
                <v-btn @click="abschuss" color="primary">Ok</v-btn>

                <v-alert type="error" :value="farbeok">Bitte suchen Sie sich zuerst eine Farbe aus und tragen Sie diese in das dafür vorgesehene Feld ein</v-alert>
    
            </v-flex>
        </v-layout>
        <hr>
    
    
      
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.rot.png" alt="">
            </v-flex>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.blau.png" alt="">
            </v-flex>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.grün.png" alt="">
            </v-flex>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.grün2.png" alt="">
            </v-flex>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.gelb.png" alt="">
            </v-flex>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.rest.png" alt="">
            </v-flex>
            <v-flex xs10 md6 sm4>
                <img src="@/assets/Farbpalette/farbpalette.grau.png" alt="">
            </v-flex>
        </v-layout>
    </v-container>

</div>    
</template>
<script>
import router from '../router'
export default {
    
    data(){
        return{
            farbeok:false,
            farbe:''
        }
    },
    computed:{
    getusercolor () {
      return this.$store.getters.getusercolor
    },
  },
    
    methods:{
        abschuss(){
            if(this.farbe != ''){
                dialog=false
                this.$store.commit('neuefarbe', this.farbe)
                router.push('register')
            }else{
                this.farbeok=true            }
        }
    }
}
</script>
<style scoped>
.div{
    background-color: black
}
.icon{
    font-size:40px
}
</style>

