<template>
  <div class="u-container u-mr-auto u-ml-auto">
    <div class="u-row">
      <div class="u-col-12">
        <div class="u-h1">Add new lesson</div>
        <input type="text" placeholder="Name of lesson">
        <input type="text" placeholder="Description">
        <file-upload 
          class="u-my-10"
          :api-func="getPdfUploadFunc()"
          @input="onPdfUpload"
          :value="pdf"
          accept="application/pdf"
        >
        </file-upload>

        <div class="u-my-10">
          To teachers:
          <teacher-list 
            @input="onSelectTeachers" 
            :value="teachers"
          >
          </teacher-list>
        </div>


        
        <button class="u-btn is-x-large is-bg-primary is-dark u-mr-auto u-ml-auto" @click="validate">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { LessonsApi, UsersApi } from '@/api';

import FileUpload from '@/components/common/FileUpload/FileUpload.vue';
import TeacherList from '@/components/teacher/TeacherList.vue';

export default {
  data: () => ({
    name: '',
    description: '',
    teachers: [],
    pdf: null,
  }),
  components: {
    FileUpload,
    TeacherList,
  },
  methods: {
    validate(){
      this.createSingle();
    },
    collectPostData(){

    },
    createSingle(){

      // let postData = this.collectPostData();
      // CemeteriesApi.create(postData).then(response => {
      //   if(response.data.private_id){
      //     this.$router.push({name: 'cemeteries-edit', params: { id: response.data.private_id} } );
      //   }
      // });
      
    },
    getPdfUploadFunc(){
      return LessonsApi.pdf;
    },
    onPdfUpload(file){
      this.file = file;
    },
    onSelectTeachers(value){
      this.teachers = value;
    }
  },
  mounted(){

    // UsersApi.getPage({ role: 'teacher'})
  }
}
</script>

<style lang="scss" scoped>

</style>