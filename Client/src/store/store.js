import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        user:{},
        users:[]
        


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
        },
        fullname:state=>{
            const fullname =state.users.firstname +'  '+ state.users.lastname
            return fullname
        },
        getusers: state =>{
            return state.users
        }

        
    },
    mutations:{
       setuser:(state,userdata) =>{
           state.user= userdata
       },
       addusers:(state,users) =>{
           state.users = users
       } 
    }

})

