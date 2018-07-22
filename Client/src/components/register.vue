<template>
<div >
    <section v-if="!alert" :value="alert"> 
    <v-layout justify-center>
        <v-flex xs4>
            <v-card  raised>
                <v-card-title class="headline primary" >Registration</v-card-title>
                <v-divider></v-divider>
                <br>               
              
            
          
       
    <v-form  ref="form" v-model="valid" lazy-validation>
      <v-container grid-list-md>
        <v-layout row wrap>
      <v-flex md8>
      <v-text-field
        prepend-icon="contact_mail"
        v-model="newuser.email"
        label="E-Mail"
        required
        :rules="emailrules"
      ></v-text-field>
      </v-flex>
      <v-flex xs7>
      <v-text-field
        prepend-icon="accessibility"
        v-model="newuser.firstname"
        label="First Name"
        required
        :rules="name"
      ></v-text-field>
      </v-flex>
      <v-flex xs7>
      <v-text-field
        prepend-icon="accessibility"
        v-model="newuser.lastname"
        label="Last Name"
        required
        :rules="name"
      ></v-text-field>
      </v-flex >
      <v-flex xs7>
      <v-text-field
        prepend-icon="lock"
        v-model="newuser.password"
        type="password"
        label="password"
        required
        :rules="passwordrules"
      ></v-text-field>
      </v-flex>
      <v-flex xs7>
       <v-text-field
       prepend-icon="lock"
        v-model="newuser.password2"
        type="password"
        label="repeat password"
        required
        :rules="passwordrules"
      ></v-text-field>
      </v-flex>
      <v-flex xs6>


      <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition" >
       <v-text-field
       class="blubb"
       prepend-icon="invert_colors"
       slot="activator"
        v-model="newuser.usercolor"
        label="Farbe"
        required
        :rules="name"
      ></v-text-field>
      <v-card>
      
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
                    <v-icon :color="colors">highlight_off</v-icon>
            </v-card-action>
            
    </v-card>   
            <br>
              </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs4>
                <v-text-field  clearable v-model="newuser.usercolor" label="Namen der Farbe eintragen"></v-text-field>
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

    
      </v-card>
      </v-dialog>
      </v-flex> 
      <v-flex xs10>
      <v-btn @click="submit" color="success">Submit</v-btn>
      </v-flex> 
      </v-layout>
    </v-container>  
    </v-form>
    </v-card>
    
    </v-flex>
    </v-layout>  
    </section>
   
        
      <v-alert v-if="alert"  v-model="alert" type="success">
                  Registration succesfull. You can now Login !<br>
                            Go to <a :href="login">Login</a> to log in
        
    </v-alert>
  
    
</div>  
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      farbeok: false,
      newuser: {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        password2: '',
        usercolor: ''
      },

      valid: true,
      alert: false,
      login: 'http://localhost:8080/',

      emailrules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      name: [v => !!v || 'Name is required'],

      passwordrules: [v => !!v || 'password is required'
      ]
    }
  },
  updated () {
    console.log(this.newuser)
  },

  computed: {
    getusercolor () {
      return this.$store.getters.getusercolor
    },
    getnewcolor () {
      return this.$store.getters.getnewcolor
    },
    getnewuser () {
      return this.$store.getters.getnewuser
    }
  },
  methods: {
    submit () {
      if (this.newuser.password !== this.newuser.password2) {
        alert('passwords have to be the same. Please check')
      } else if ((this.$refs.form.validate())) {
        this.$http.post('http://localhost:8082/register', this.newuser)
        console.log(this.newuser)
        this.alert = true
        this.newuser = ''
      } else {
        alert('Please check your entries')
      }
    },
    abschuss () {
      if (this.newuser.usercolor !== '') {
        this.dialog = false
      } else {
        this.farbeok = true
      }
    }
  }

}
</script>
<style scoped>
.append-icon{
  color:yellow!important
}
.icon{
    font-size:40px
}


.card__title{
    margin:2px;
}

.input-group{
margin:2px;
 padding-right:5px;
 padding-left:5px
}
.alert{
    text-align:center
}
</style>

