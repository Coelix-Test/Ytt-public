<template>
  <div>
    <u-card elevation="3">
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
        <tbody v-if="items && items.length">
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
            <div class="actions-col">
              <UBtn
                class="u-mx-1"
                color="primary"
                size="small"
                @click="openAddLessonPopup(item)"
              >
                Add lesson
              </UBtn>

              <UIconBtn
                class="u-mx-1"
                :to="{ name: 'admin-user-edit', params: { id: item.id }}"
                icon="icon-pencil"
                icon-color="grey"
                icon-hover-color="blue"
                bg-hover-color="white"
                hoverable
              >
              </UIconBtn>

              <UIconBtn
                class="u-mx-1"
                icon="icon-trash"
                icon-color="grey"
                icon-hover-color="blue"
                bg-hover-color="white"
                hoverable
                @click.native="deleteUserAlert(item)"
              >
              </UIconBtn>
            </div>
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
import UIconBtn from "@/components/common/UIconBtn";
import SelectLesson from "@/components/modals/SelectLesson";

import { UsersApi } from '@/api';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {ADMIN} from "@/constants/roles";

import DeleteUserMixin from '@/mixins/delete-user.mixin'

export default {
  components: {
    UCard,
    SelectLesson,
    UIconBtn,
  },
  mixins: [DeleteUserMixin],
  data: () => ({
    selectedTeacher: null,
    selectedLessons: null,
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
  computed: {
    ...mapGetters('Teachers', {
      items: 'teachersList'
    }),
  },
  methods: {
    ...mapActions('Users', ['deleteUser']),
    ...mapActions('Teachers', [ 'fetchTeachersList' ]),
    ...mapMutations('Teachers', ['RESET_TEACHERS_LIST']),
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
    this.fetchTeachersList(ADMIN);
  },
  beforeDestroy() {
    this.RESET_TEACHERS_LIST();
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

.edit-user-btn{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  svg{
    width: 18px;
    height: 18px;
  }
  &:hover{
    background-color: #fff;
    svg{
      fill: $clr-blue;
    }
  }
}
.actions-col{
  display: flex;
  justify-content: flex-end;
}
</style>
