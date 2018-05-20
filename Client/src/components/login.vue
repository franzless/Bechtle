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
                  <p>{{error}}</p>
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
import router from '../router'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      user: {
        email: '',
        password: '',
        },
      error: ''
    }
  },
  
  methods: {
    submit () {
      this.$http.post('http://localhost:8082/login', this.user)
        .then(response => {
          var userdata= response.body.user
          this.$store.commit('setuser', userdata)
          //bus.$emit('userloaded',response.body.user)
          router.push('main')
          
        }
      , error => {
        this.error = error.body
      })
    }}
}
</script>
<style scoped>
p{
  color:red!important
}
</style>
