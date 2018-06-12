import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    users: [],
    schicht:[],
    
  },
  getters: {
    getuserfn: state => {
      return state.user.firstname
    },
    getusercolor: state => {
      const farbe=[]
      var l= state.users.length
        for(var i=0;i<l;i++){
          var data= state.users[i].usercolor
          farbe.push(data)}
      return farbe
    },
    getuserid: state => {
      return state.user.userid
    },
    getuser: state => {
       return state.user
    },
    fullname: state => {
      const fullname=[]
      var l= state.users.length
        for(var i=0;i<l;i++){
          var data= state.users[i].firstname + ' ' + state.users[i].lastname
          fullname.push(data)}
      return fullname
    },
    getusers: state => {
      
      return state.users
    },
    getfrüh: state => {
        return state.schicht.filter(x=>x.schichtname == 'früh')
    },
    getspät: state => {
        return state.schicht.filter(x=>x.schichtname == 'spät')
      },

    getbyfirst: (state,first) => {
      return state.users.filter(x=>x.firstname == first)
    },
    getnewcolor:state=>{
      return state.neuefarbe
    },
    getnewuser:state=>{
      return state.newuser
    }
    
    
    

  },
  mutations: {
    setuser: (state, userdata) => {
      state.user = userdata
    },
    addusers: (state, users) => {
      state.users = users
    },
    updateschicht:(state,schicht)=>{
        state.schicht=[]
        var l= schicht.length
        for(var i= 0; i<l ; i++){
            state.schicht.push(schicht[i])}
     },
     addschicht:(state,schicht)=>{
      var l= schicht.length
      for(var i= 0; i<l ; i++){
          state.schicht.push(schicht[i])}},
   
 
  },
  actions:{

  }

})
