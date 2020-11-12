<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <div class="create-lesson u-container u-mr-auto u-ml-auto u-mt-17">
      <div class="u-row">
        <div class="u-col-12">
          <div class="u-text-h2 u-mb-6">Add new lesson</div>
        </div>


        <div class="u-col-6">
          <ValidationProvider rules="required" name="Name" v-slot="{ errors }">
            <UTextField
              label="Name"
              v-model="name"
              class="u-mb-12"
              :error="errors[0]"
            ></UTextField>
          </ValidationProvider>
          <ValidationProvider rules="required" name="Description" v-slot="{ errors }">
            <UTextField
              label="Description"
              v-model="description"
              class="u-mb-12"
              :error="errors[0]"
            ></UTextField>
          </ValidationProvider>

          <ValidationProvider rules="required" name="Pdf" v-slot="{ errors }">
            <FileUpload
              class="u-mb-7"
              accept="application/pdf"
              v-model="file"
              :error="errors[0]"
            >
            </FileUpload>
          </ValidationProvider>
        </div>
        <div class="u-col-6">
          <div class="create-lesson__teacher-list-label">To teachers</div>
          <TeacherList
            @input="onSelectTeachers"
            :value="teachers"
          >
          </TeacherList>
        </div>

        <div class="u-col-12 u-flex is-justify-center">
          <UBtn
            size="x-large"
            color="primary"
            @click="handleSubmit(createSingle)"
            id="lesson_create_submit"
            :loading="loading"
            width="300"
          >
            Save
          </UBtn>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { LessonsApi, UsersApi } from "@/api";
import {mapActions, mapGetters} from 'vuex';


import FileUpload from "@/components/common/FileUpload/FileUpload.vue";
import TeacherList from "@/components/teacher/TeacherList.vue";
import UTextField from "@/components/common/UTextField";

export default {
  data: () => ({
    name: "",
    description: "",
    teachers: [],
    file: null,
  }),
  components: {
    FileUpload,
    TeacherList,
    UTextField,
  },
  computed: {
    ...mapGetters('Lessons', ['loading'])
  },
  methods: {
    ...mapActions('Lessons', {
      create : 'createLesson'
    }),
    collectPostData() {

      let postData = {
        title: this.name,
        description: this.description,
        teachers: this.teachers.map((item) => item.id),
        pdf: this.file,
      };

      return postData;
    },
    createSingle() {

      this.$notify({
        title: 'Please wait',
        text: 'Lesson is uploading. This might take several minutes.',
        type: 'warn'
      });
      let postData = this.collectPostData();
      this.create(postData)
      .then(() => {
        this.$router.push({ name: 'admin-lessons-all' });
        this.$notify({
          title: 'Lesson successfully created!',
          type: 'success'
        });
      })
      .catch(({ message }) => {
        this.$notify({
          title: 'Lesson creation error',
          text: message,
          type: 'error'
        });
      });
    },
    onSelectTeachers(value) {
      this.teachers = value;
    },
  },
};
</script>

<style lang="scss">
.create-lesson{
  &__teacher-list-label{
    font-weight: 300;
    font-size: 30px;
    line-height: 45px;
    margin-bottom: 17px;
  }
}
</style>