<template>
  
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer> 
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="user.email" prepend-icon="person" name="login" label="E-Mail required " type="text"></v-text-field>
                  <v-text-field v-model="user.password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="green accent-4">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  
</template>

<script>
  export default {
    data(){
      return{
        user:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      submit(){
        
        this.$http.post('http://localhost:8081/login',this.user.email)
        .then(response =>
        {console.log(response);
        }
      , error =>{
        console.log(error);
      });
      }}
  }
</script>