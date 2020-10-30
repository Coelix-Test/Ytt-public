<template>
  <div>
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
                <img src="https://via.placeholder.com/40x40" alt="">
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
              @click="openAddLessonPopup(item)"
            >
              Add lesson
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
    </u-card>

    <select-lesson
        v-model="selectedLessons"
        @save="addTeacherToLesson"
        multiple
    >

    </select-lesson>
  </div>
</template>

<script>
import UCard from '@/components/common/UCard';
import SelectLesson from "@/components/modals/SelectLesson";

import { UsersApi } from '@/api';

export default {
  data: () => ({
    selectedTeacher: null,
    selectedLessons: null,
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
    SelectLesson,
  },
  methods: {
    getAll(){
      UsersApi.getPage({ role: 2 }).then(response => {this.items = response.data});
    },
    openAddLessonPopup(item){
      this.selectedTeacher = item;
      this.selectedLessons = [ ...item.lessons ];
      this.$modal.show('select-lesson');
    },
    addTeacherToLesson(){

      UsersApi.addAccessToLesson(this.selectedTeacher.id, {
        lessons: this.selectedLessons.map(item => item.id),
      }).then(response => {

        this.selectedTeacher.lessons = response.data.lessons;

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