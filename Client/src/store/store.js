import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    users: [],
    schicht:[],
    einsatzplan:[],
    teams:[],
    skills:[]
    
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
    getkärcher :state => {
      return state.einsatzplan.filter(x=>x.team.teamname == 'Kärcher')
    },
    getheller :state => {
      return state.einsatzplan.filter(x=>x.team.teamname == 'Heller')
    },
    getmhp :state => {
      return state.einsatzplan.filter(x=>x.team.teamname == 'MHP')
    },
    getbenz :state => {
      return state.einsatzplan.filter(x=>x.team.teamname == 'Mercedes-Benz-Museum')
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

     addeinsatzplan:(state,plan)=>{
        state.einsatzplan = plan.body },
      
      addteams:(state,data)=>{
        state.teams = data.body}
      ,
      addskills:(state,skill)=>{
        state.skills = skill.body}
      ,
      updateplan(state,data){
        Vue.set(state.einsatzplan,data.einsatzplanid -1,data)
      }
      
      
      }  
 
  
  

})
