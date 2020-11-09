<template>
  <u-card class="table-card u-mt-10">
    <table class="u-data-table is-striped">
      <colgroup>
        <col
          v-for="column in columns"
          :key="column.value"
          :width="column.width"
        >
      </colgroup>
      <thead>
      <tr>
        <template v-for="(column, index) in columns">
          <th
            :key="index"
            class="u-text-center"
          >
            {{column.text}}
          </th>
        </template>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in lessons" :key="item.id">
        <td class="u-pl-13 u-font-weight-light">
          <svg
            v-svg
            symbol="icon-file"
            size="0 0 22 22"
            role="presentation"
          ></svg>
          {{item.title}}
        </td>
        <td class="u-font-weight-light u-text-center">{{item.words_count}} pages</td>
        <td class="u-font-weight-light u-text-center edit-col">
          <router-link
            tag="div"
            :to="{ name: 'teacher-students-lesson-edit', params: {studentId: $route.params.id, lessonId: item.id } }"
            class="edit-col__inner"
          >
            Edit lesson
            <svg
              v-svg
              symbol="icon-pencil"
              size="0 0 18 18"
              role="presentation"
              class="pencil"
            ></svg>
          </router-link>
        </td>
        <td class="">
          <div class="u-pr-25 u-text-right">
            <UBtn
              width="180"
              size="small"
              color="blue"
              v-if="item.status === 'in_review'"
              :to="{
                name: 'teacher-students-lesson-check',
                params: {
                  studentId : $route.params.id,
                  lessonId: item.id
                }
              }"
            >
              New answer
            </UBtn>
            <UBtn
              width="180"
              size="small"
              color="success"
              outlined
              v-if="item.status === 'completed'"
            >
              Passed
            </UBtn>
            <UBtn
              width="180"
              size="small"
              color="warning"
              outlined
              v-if="item.status === 'new' || item.status === 'in_progress'"
            >
              In progress
            </UBtn>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </u-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {TEACHER} from "@/constants/roles";
import UCard from "@/components/common/UCard";

export default {
  components: {
    UCard,
  },
  data: () => ({
    status: 3,
    columns: [
      {
        text: 'Name',
        value: 'title',
        breakpoint: false,
        width: '33%',
      },
      {
        text: 'Pages',
        value: 'pages',
        breakpoint: false,
      },
      {
        text: '',
        value: 'editLesson',
        breakpoint: false,
      },
      {
        text: 'Status',
        value: 'status',
        breakpoint: false,
      },
    ],
  }),
  computed: {
    ...mapGetters('Lessons', {
      lessons: 'lessonsList'
    })
  },
  methods: {
    // ...mapActions('Lessons', {
    //   fetchLessonList : 'fetchStudentsLessonsByTeacher',
    // }),
  },
  mounted(){
    // this.fetchLessonList(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/vars";

//except first and last child
tr:hover td:nth-child(1n+2):not(:last-child){
  color: #fff;
}
td:nth-child(1n+2):not(:last-child){
  color: $clr-grey;
}

.edit-col{
  cursor: pointer;
  &__inner{
    color: $clr-grey;
  }
}

tr:hover .edit-col{
  &__inner{
    color: #fff;
  }
}

.pencil{
  fill: $clr-blue;
}
</style>