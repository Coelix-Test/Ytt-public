<template>
  <u-card>
    <table class="u-data-table is-striped">
      <colgroup>
        <col v-for="column in columns" :key="column.value">
      </colgroup>
      <thead>
        <tr>
          <template v-for="(column, index) in columns">
            <th
              class="u-pl-13 u-text-left"
              v-if="index == 0"
              :key="index"
            >{{column.text}}</th>
            <th
              v-else
              class="u-text-left"
              :key="index"
            >{{column.text}}</th>
          </template>
        </tr>
      </thead>
      <tbody v-if="items.length">
        <tr
          v-for="item in items"
          :key="item.id"
        >
          <td class="u-pl-13">
            <div class="u-flex is-align-center">
              <div class="avatar-wrap u-mr-6">
                <img :src="item.avatar" alt="">
              </div>
              {{item.name}}
            </div>
          </td>
          <td class="grey-col">{{item.email}}</td>
          <td class="grey-col">{{item.phone}}</td>
          <td class="u-pr-25 u-text-right">

            <UBtn
              color="primary"
              size="small"
              @click="openSelectTeacherModal(item)"
              v-if="!item.teacher_id"
            >
              Add teacher
            </UBtn>
            <UBtn
              color="primary"
              size="small"
              @click="openSelectTeacherModal(item)"
              v-else
            >
              Change teacher
            </UBtn>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="u-text-center" colspan="4">
            No data available
          </td>
        </tr>
      </tbody>
    </table>
    <select-teacher
      v-model="currentSelectedTeacher"
      @save="assignTeacher"
    ></select-teacher>
   </u-card>
</template>

<script>
import UCard from '@/components/common/UCard';
import SelectTeacher from '@/components/modals/SelectTeacher';

import { UsersApi, StudentsApi } from '@/api';

export default {
  data: () => ({
    currentSelectedTeacher: null,
    currentSelectedStudent: null,
    items: [],
    columns: [
      {
        text: 'Name',
        value: 'name',
        breakpoint: false,
      },
      {
        text: 'Email',
        value: 'email',
        breakpoint: false,
      },
      {
        text: 'Phone',
        value: 'phone',
        breakpoint: false,
      },
      {
        text: '',
        value: 'actions',
        breakpoint: false,
      },
    ],
  }),
  components: {
    UCard,
    SelectTeacher,
  },
  methods: {
    getAll(){
      UsersApi.getPage({ role: 3 }).then(response => {this.items = response.data});
    },
    onSelectTeachers(teacher){
      console.log('selected teacher: ', teacher);
      this.currentSelectedTeacher = teacher;
    },
    openSelectTeacherModal(currentStudent){
      this.currentSelectedStudent = currentStudent;

      if(currentStudent.teacher_id){
        this.currentSelectedTeacher = {id : currentStudent.teacher_id};
      }
      else{
        this.currentSelectedTeacher = null;
      }

      this.$modal.show('select-teacher');
    },
    assignTeacher(){
      let teacherId = null;
      if(this.currentSelectedTeacher){
        teacherId = this.currentSelectedTeacher.id;
      }
      StudentsApi.assignTeacher(this.currentSelectedStudent.id, teacherId).then(response => {

        this.currentSelectedStudent.teacher_id = response.data.teacher_id;

      });

    },
  },
  mounted(){
    this.getAll();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.avatar-wrap{
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

tr:hover .grey-col{
  color: #fff;
}
.grey-col{
  color: $clr-grey;
}
</style>
