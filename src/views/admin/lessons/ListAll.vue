<template>
  <div>

     <div class="u-container u-ml-auto u-mr-auto u-pt-9">
      <div class="u-row">
        <div class="u-col-7">
          <div class="u-flex is-align-center">
            <div class="u-text-h1 u-mr-6">Lessons</div>
            <router-link
              tag="button"
              :to="{ name: 'admin-lessons-create' }"
              class="u-btn is-x-large is-bg-primary is-dark"
            >
              Add lesson
            </router-link>
          </div>
        </div>
        <div class="u-col-5">
          <!-- search -->
        </div>
        <div class="u-col-12">
          <u-card class="table-card u-mt-10">
            <table class="u-data-table is-striped">
              <colgroup>
                <col v-for="column in columns" :key="column.value">
              </colgroup>
              <thead>
                <tr>
                  <template v-for="(column, index) in columns">
                    <th 
                      v-if="index == 1"
                      :key="index"
                      class="u-text-center" 
                    >{{column.text}}</th>
                    <th 
                      v-else
                      :key="index"
                    >{{column.text}}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td class="u-pl-13 u-font-weight-light">
                    <svg
                      v-svg
                      symbol="icon-file"
                      size="0 0 22 22"
                      role="presentation"
                    ></svg>
                    {{item.title}}
                  </td>
                  <td class="u-font-weight-light u-text-center pages-col">{{item.words_count}} pages</td>
                  <td class="u-text-right u-pr-25">
                    <button class="u-btn is-medium is-bg-primary is-dark u-mr-9 u-font-weight-regular">Edit lesson</button>
                    <button 
                      class="u-btn is-medium is-bg-primary is-dark u-font-weight-regular"
                      @click="openSelectTeacherModal(item)"
                    >
                      Add to teacher
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </u-card>
        </div>
      </div>
    </div>

    <select-teacher 
      v-model="selectedTeachers"
      @save="shareLessonToTeacher"
      multiple
    ></select-teacher>
  </div>
</template>

<script>
import { LessonsApi } from '@/api';
import UCard from '@/components/common/UCard';

import SelectTeacher from '@/components/modals/SelectTeacher';


export default {
  components: {
    UCard,
    SelectTeacher,
  },
  data: () => ({
    items: [],
    selectedTeachers: [],
    selectedLessonId: null,
    columns: [
      {
        text: 'Name',
        value: 'name',
        breakpoint: false,
      },
      {
        text: 'Lessons',
        value: 'pages',
        breakpoint: false,
      },
      {
        text: '',
        value: 'actions',
        breakpoint: false,
      },
    ],
  }),
  computed: {
    
  },
  methods: {
    getItems(){
      LessonsApi.getPage({}).then(response => {
        this.items = response.data;
      });
    },
    shareLessonToTeacher(){

      LessonsApi.addAccessToTeacher(this.selectedLesson.id, {
        teachers: this.selectedTeachers.map(item => item.id),
      }).then(response => {

        this.selectedLesson.teachers = response.data.teachers;

      });

    },
    openSelectTeacherModal(lesson){
      this.selectedLesson = lesson;
      this.selectedTeachers = [ ...lesson.teachers ];
      this.$modal.show('select-teacher');
    },
  },
  mounted(){
    this.getItems();
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

tr:hover .pages-col{
  color: #fff;
}
.pages-col{
  color: $clr-grey;
}
</style>