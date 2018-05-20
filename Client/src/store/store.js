import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        user:{}
    },
    getters:{
        getuserfn: state => {
            return state.user.firstname
        },
        getuserid: state => {
            return state.user.userid
        },
        getuser: state => {
            return state.user
        }

        
    },
    mutations:{
       setuser:(state,userdata) =>{
           state.user= userdata
       } 
    }

})

