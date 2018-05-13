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
      <v-text-field
        v-model="newuser.email"
        label="E-Mail"
        required
        :rules="emailrules"
      ></v-text-field>
      <v-text-field
        v-model="newuser.firstname"
        label="First Name"
        required
        :rules="name"
      ></v-text-field>
      <v-text-field
        v-model="newuser.lastname"
        label="Last Name"
        required
        :rules="name"
      ></v-text-field>
      <v-text-field
        v-model="newuser.password"
        type="password"
        label="password"
        required
        :rules="passwordrules"
      ></v-text-field>
       <v-text-field
        v-model="password2"
        type="password"
        label="repeat password"
        required
        :rules="passwordrules"
      ></v-text-field>
      <v-btn @click="submit" color="success">Submit</v-btn>
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
      newuser: {
        email: '',
        firstname: '',
        lastname: '',
        password: ''
      },
      password2: '',
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
  methods: {
    submit () {
      if (this.newuser.password != this.password2) {
        alert('passwords have to be the same. Please check')
      } else if ((this.$refs.form.validate())) {
        this.$http.post('http://localhost:8081/register', this.newuser)
        this.alert = true
        this.newuser = ''
        this.password2 = ''
      } else {
        alert('Please check your entries')
      }
    }
  }
}
</script>
<style scoped>
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

