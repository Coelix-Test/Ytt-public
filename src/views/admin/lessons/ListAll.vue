<template>
  <div>
     <div class="u-container u-ml-auto u-mr-auto u-pt-15">
      <div class="u-row">
        <div class="u-col-7">
          <div class="u-flex is-align-center">
            <div class="u-text-h1 u-mr-6">Lessons</div>
            <UBtn
              :to="{ name: 'admin-lessons-create' }"
              id="create_lesson_link"
              size="x-large"
              color="blue"
              width="251"
            >
              Add lesson
            </UBtn>
          </div>
        </div>
        <div class="u-col-5">
          <!-- search -->
        </div>
        <div class="u-col-12">
          <u-card class="table-card u-mt-10 u-mb-25">
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
                <tr
                  v-for="item in items"
                  :key="item.id"
                  :class="{ 'lesson-item_hidden' : !!item.hidden }"
                >
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
                    <div class="u-flex is-justify-end">
                      <UBtn
                        class="u-mr-7"
                        size="small"
                        color="primary"
                        :to="{name: 'admin-lessons-view', params: {id: item.id }}"
                      >
                        <span class="u-font-weight-regular">Edit lesson</span>
                      </UBtn>
                      <UBtn
                        class="u-mx-1 qa-admin-add-teacher-to-lesson"
                        size="small"
                        color="primary"
                        @click="openSelectTeacherModal(item)"
                      >
                        <span class="u-font-weight-regular">Add to teacher</span>
                      </UBtn>

                      <UIconBtn
                        class="u-mx-1 qa-hide-lesson-btn"
                        icon="icon-eye2"
                        icon-color="grey"
                        icon-hover-color="blue"
                        bg-hover-color="white"
                        hoverable
                        @click.native="hideLessonToggleAlert(item)"
                      >
                      </UIconBtn>
                      <UIconBtn
                        class="u-mx-1 qa-delete-lesson-btn"
                        icon="icon-trash"
                        icon-color="grey"
                        icon-hover-color="blue"
                        bg-hover-color="white"
                        hoverable
                        @click.native="deleteLessonAlert(item)"
                      >
                      </UIconBtn>
                    </div>
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
import { mapActions, mapGetters } from 'vuex';
import { ADMIN } from "@/constants/roles";
import UCard from '@/components/common/UCard';
import UIconBtn from "@/components/common/UIconBtn";

import SelectTeacher from '@/components/modals/SelectTeacher';


export default {
  components: {
    UCard,
    SelectTeacher,
    UIconBtn,
  },
  data: () => ({
    selectedTeachers: [],
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
    ...mapGetters('Lessons', {
      items: 'lessonsList'
    })
  },
  methods: {
    ...mapActions('Lessons', [ 'deleteLesson', 'hideLesson', 'fetchLessonList' ]),
    shareLessonToTeacher(){

      LessonsApi.addAccessToTeacher(this.selectedLesson.id, {
        users: this.selectedTeachers.map(item => item.id),
      }).then(response => {

        this.selectedLesson.teachers = response.data.teachers;

      });

    },
    openSelectTeacherModal(lesson){
      this.selectedLesson = lesson;
      this.selectedTeachers = [ ...lesson.teachers ];
      this.$modal.show('select-teacher');
    },
    hideLessonToggleAlert(lesson){
      this.selectedLesson = { ...lesson };
      let title = this.selectedLesson.hidden ?
        'Are you sure you want to unhide lesson?' :
        'Are you sure you want to hide lesson?';
      this.$alert({
        title: title,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        onConfirm: this.onConfirmHideLessonToggle,
      });
    },
    onConfirmHideLessonToggle(){
      console.log(this.selectedLesson);
      this.hideLesson({
        lessonId: this.selectedLesson.id,
      })
        .then(() => {
          let message = this.selectedLesson.hidden ?
            'Lesson was successfully unhidden' :
            'Lesson was successfully hidden';
          this.$notify({
            text: message,
            type: 'success'
          });
          this.selectedLesson = null;
        })
        .catch(({ message }) => {
          this.$notify({
            title: "Error",
            text: message,
            type: 'error'
          });
        })
    },
    deleteLessonAlert(lesson){
      this.selectedLesson = lesson;
      this.$alert({
        title: 'Are you sure you want to delete lesson?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        onConfirm: this.onConfirmDeleteLesson,
      });
    },
    onConfirmDeleteLesson(){
      this.deleteLesson({
        lessonId: this.selectedLesson.id,
      })
      .then(() => {
        this.selectedLesson = null;
        this.$notify({
          title: 'Lesson successfully deleted',
          type: 'success'
        });
      })
      .catch(({ message }) => {
        this.$notify({
          title: "Error",
          text: message,
          type: 'error'
        });
      })
    }
  },
  mounted(){
    this.fetchLessonList(ADMIN);
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

.lesson-item{
  &_hidden{
    opacity: .3;
  }
}
</style>
