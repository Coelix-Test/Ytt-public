<template>
  <div>

    <div class="u-container u-ml-auto u-mr-auto u-pt-15">
      <div class="u-row">
        <div class="u-col-7">
          <div class="u-flex is-align-center">
            <div class="u-text-h1 u-mr-6">Lessons</div>

          </div>
        </div>
        <div class="u-col-5">
          <!-- search -->
        </div>
        <div class="u-col-12">
          <u-card class="table-card u-mt-10 u-mb-20">
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
                  <UBtn
                    class="u-mr-2"
                    :to="{ name: 'teacher-lessons-view', params: { id: item.id }}"
                  >
                    View lesson
                  </UBtn>
                  <UBtn
                    id="select_student_modal_open"
                    @click="openSelectStudentModal(item)"
                  >
                    Add to student
                  </UBtn>
                </td>
              </tr>
              </tbody>
            </table>
          </u-card>
        </div>
      </div>
    </div>

    <SelectStudent
        v-model="selectedStudents"
        @save="shareLessonToStudent"
        multiple
    ></SelectStudent>
  </div>
</template>

<script>
import { LessonsApi } from '@/api';
import { mapActions, mapMutations } from 'vuex';
import UCard from '@/components/common/UCard';

import SelectStudent from '@/components/modals/SelectStudent';


export default {
  components: {
    UCard,
    SelectStudent,
  },
  data: () => ({
    items: [],
    selectedStudents: [],
    selectedLesson: null,
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
    ...mapActions('Lessons', ['addAccessForStudents']),
    ...mapMutations('Lessons', ['RESET_LESSONS_LIST']),
    getItems(){
      LessonsApi.getPage({}, 'teacher').then(response => {
        this.items = response.data;
      });
    },
    shareLessonToStudent(){
      this.addAccessForStudents({
        lessonId: this.selectedLesson.id,
        students: this.selectedStudents.map(e => e.id),
      }).then(() => {
        this.$notify({
          title: 'Lesson saved',
          type: 'success'
        });
      }).catch(({ message }) => {
        this.$notify({
          title: 'Error',
          text: message,
          type: 'error'
        });
      })

    },
    openSelectStudentModal(lesson){

      this.selectedLesson = lesson;
      this.selectedStudents = [ ...lesson.students ];
      this.$modal.show('select-student');
    },
  },
  mounted(){
    this.getItems();
  },
  beforeDestroy() {
    this.RESET_LESSONS_LIST();
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