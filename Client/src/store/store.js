import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    users: [],
    schicht:[],
    teams:[],
    skills:[],
    Kärcher:[],
    Heller:[],
    mhp:[],
    benz:[],
    userskills:[]
    
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
    
    getskills :state => {
      return state.skills
    },
    getkärcher :state => {
      return state.Kärcher
    },
    getheller :state => {
      return state.Heller
    },
    getmhp :state => {
      return state.MHP
    },
    getbenz :state => {
      return state.Benz
    },
    getuserskills: state =>{
      return state.userskills
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

    addkärcher:(state,plan)=>{
        state.Kärcher = plan.body },

    addmhp:(state,plan)=>{
        state.MHP = plan.body },

    addheller:(state,plan)=>{
        state.Heller = plan.body },

    addbenz:(state,plan)=>{
        state.Benz = plan.body },
      
      
      addteams:(state,data)=>{
        state.teams = data.body}
      ,
      addskills:(state,skill)=>{
        state.skills = skill.body}
      ,
      updatekärcher:(state,data)=>{
       state.Kärcher=data
       
          },
      updateheller:(state,data)=>{
        state.Heller=data
        
      },
      canceldragg:(state,data)=>{
        
        var oldteam = data[0].element.team.teamname
        var newteam = data[1].element.team.teamname
       
        state[newteam].splice(data[0].futureIndex,1)
        state[oldteam].splice(data[0].index,0,data[0].element)
        
      },
      adduserskills:(state,data)=>{
        state.userskills = data.body
      }
      
      
      }  
 
  
  

})
