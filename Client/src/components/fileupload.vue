<template>
<div>
    <v-btn color="primary" @click="dialog=true">Upload Image</v-btn>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-toolbar color="pdark"> <v-icon>face</v-icon><v-toolbar-title>Upload your Image</v-toolbar-title></v-toolbar>
            <v-container grid-list-sm>
            <v-layout justify-center align-center column>
              
    <v-btn  color="plight" raised @click="onPickFile">Choose Image</v-btn>
    <input style="display:none" type="file" @change="onFileSelected" ref="fileInput" accept="image/*">
    <v-btn color="red" @click="onUpload">Upload</v-btn>
    <v-subheader>Preview</v-subheader>
    <img :src="imageUrl" alt="" height="250" width="250">
 
    </v-layout>
    </v-container>
    </v-card>
    </v-dialog>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            selectedFile:null,
            imageUrl:'',
            dialog:false
        }
    },
    computed:{
        user:{
    get()
    {return this.$store.getters.getuser
    }
  }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile= event.target.files[0]
            const files = event.target.files
            //let filename= this.user.firstname + this.user.lastname+this.user.userid
            const fileReader = new FileReader()
            fileReader.addEventListener('load',()=>{
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])

        },
        onPickFile(){
            this.$refs.fileInput.click()
        },
        onUpload(){
            var imgname= this.user.firstname+this.user.lastname+this.user.userid
            const formData = new FormData()
            formData.append('userimg',this.selectedFile,imgname)
            
            this.$http.post('http://localhost:8082/db/profil/uploadimage', formData)
            .then(res=>{
                this.$store.commit('setuser', res.body)
            })         
        }
    }
    
}
</script>
