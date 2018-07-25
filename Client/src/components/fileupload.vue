<template>
<div>
    <v-btn color="primary" raised @click="onPickFile">Upload Image</v-btn>
    <input style="display:none" type="file" @change="onFileSelected" ref="fileInput" accept="image/*">
    <v-btn @click="onUpload">Upload</v-btn>
    <img :src="imageUrl" alt="" height="150">
</div>
    
</template>
<script>
export default {
    data(){
        return{
            selectedFile:null,
            imageUrl:''
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
            var imgname= this.user.firstname+_+this.user.lastname+_+this.user.userid
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
