<template>
  <div class="teacher-students-list">
    <StudentsListItem
      v-for="item in students"
      :key="item.id"
      v-bind="item"
    ></StudentsListItem>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { TEACHER } from "@/constants/roles";

import StudentsListItem from "@/components/teacher/students/StudentsListItem";

export default {
  components: {
    StudentsListItem,
  },
  methods: {
    ...mapActions('Students', {
      fetchStudents : 'fetchStudentsList',
    })
  },
  computed: {
    ...mapGetters('Students', {
      students: 'studentsList'
    })
  },
  mounted(){
    this.fetchStudents(TEACHER);
  }
}
</script>

<style lang="scss">
.teacher-students-list{
  .teacher-students-list-item{
    padding-top: 26px;
    padding-bottom: 23px;
    border-bottom: 1px solid rgba(0,0,0,.2);
  }
}

</style>