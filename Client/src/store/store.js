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
    kärcher:[],
    heller:[],
    mhp:[],
    benz:[]
    
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
      return state.kärcher
    },
    getheller :state => {
      return state.heller
    },
    getmhp :state => {
      return state.mhp
    },
    getbenz :state => {
      return state.benz
    },

  
    
    
    

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
        state.kärcher = plan.body },

    addmhp:(state,plan)=>{
        state.mph = plan.body },

    addheller:(state,plan)=>{
        state.heller = plan.body },

    addbenz:(state,plan)=>{
        state.benz = plan.body },
      
      
      addteams:(state,data)=>{
        state.teams = data.body}
      ,
      addskills:(state,skill)=>{
        state.skills = skill.body}
      ,
      updatekärcher:(state,data)=>{
       state.kärcher=data
       console.log(data)
          },
      updateheller:(state,data)=>{
        state.heller=data
        
      }
      
      
      }  
 
  
  

})
