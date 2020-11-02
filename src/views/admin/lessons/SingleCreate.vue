<template>
  <div class="u-container u-mr-auto u-ml-auto u-mt-17">
    <div class="u-row">
      <div class="u-col-12">
        <div class="u-text-h2 u-mb-6">Add new lesson</div>
      </div>


      <div class="u-col-6">
        <u-text-field 
          label="Name"
          v-model="name"
          class="u-mb-7"
        ></u-text-field>
        <u-text-field 
          label="Description"
          v-model="description"
          class="u-mb-7"
        ></u-text-field>

        <file-upload 
          class="u-mb-7"
          :api-func="getPdfUploadFunc()"
          @input="onPdfUpload"
          accept="application/pdf"
          autoupload
        >
        </file-upload>
      </div>
      <div class="u-col-6">
        <div class="u-my-10">
          To teachers:
          <teacher-list 
            @input="onSelectTeachers" 
            :value="teachers"
          >
          </teacher-list>
        </div>
      </div> 

      <div class="u-col-12 u-flex is-justify-center">
        <UBtn
          size="x-large"
          color="primary"
          @click="validate"
          id="lesson_create_submit"
        >
          Save
        </UBtn>
      </div>
    </div>
  </div>
</template>

<script>
import { LessonsApi, UsersApi } from "@/api";

import FileUpload from "@/components/common/FileUpload/FileUpload.vue";
import TeacherList from "@/components/teacher/TeacherList.vue";
import UTextField from "@/components/common/UTextField";

export default {
  data: () => ({
    name: "",
    description: "",
    teachers: [],
    pdfPath: '',
    words: [],
  }),
  components: {
    FileUpload,
    TeacherList,
    UTextField,
  },
  methods: {
    validate() {
      this.createSingle();
    },
    collectPostData() {
      let postData = {
        title: this.name,
        description: this.description,
        teachers: this.teachers.map((item) => item.id),
        path: this.pdfPath,
        words: this.words,
      };

      return postData;
    },
    createSingle() {
      let postData = this.collectPostData();
      LessonsApi.create(postData, "admin").then((response) => {
        console.log(response.data);
        // if(response.data.private_id){
        //   this.$router.push({name: 'admin-lessons-edit', params: { id: response.data.id} } );
        // }
      });
    },
    getPdfUploadFunc() {
      return LessonsApi.pdf;
    },
    onPdfUpload(file) {
      console.log(file);
      if(file.success){

        this.pdfPath = file.response.data.path;
        this.words = file.response.data.words;
      }
    },
    onSelectTeachers(value) {
      this.teachers = value;
    },
  },
  mounted() {
    // UsersApi.getPage({ role: 'teacher'})
  },
};
</script>

<style lang="scss" scoped>
</style>