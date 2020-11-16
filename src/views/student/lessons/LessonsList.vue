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
              <tr
                v-for="item in lessonsList"
                :key="item.id"
                @click="viewLesson(item.id)"
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
                  <UBtn
                      v-if="['in_progress', 'new'].includes(item.status)"
                      color="blue"
                      width="180"
                      @click="goToPassLesson(item.id, $event)"
                  >
                    Pass
                  </UBtn>
                  <UBtn
                      width="180"
                      color="success"
                      outlined
                      @click="goToPassLesson(item.id, $event)"
                      v-if="item.status === 'completed'"
                  >
                    Passed
                  </UBtn>
                  <UBtn
                    v-if="item.status === 'in_review'"
                    color="warning"
                    outlined
                    width="180"
                    @click="viewLesson(item.id)"
                  >
                    In review
                  </UBtn>
                </td>
              </tr>
              </tbody>
            </table>
          </u-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { STUDENT } from '@/constants/roles';
import UCard from '@/components/common/UCard';



export default {
  components: {
    UCard
  },
  data: () => ({
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
    ...mapGetters('Lessons', ['lessonsList'])
  },
  methods: {
    ...mapActions('Lessons', ['fetchLessonList']),
    ...mapMutations('Lessons', ['RESET_LESSONS_LIST']),
    viewLesson(lessonId){
      this.$router.push({name: 'student-view-lesson', params: {id: lessonId}});
    },
    goToPassLesson(lessonId, event){
      event.stopPropagation();
      event.stopImmediatePropagation();
      this.$router.push({ name: 'student-pass-lesson', params: { id: lessonId } });
    },

  },
  mounted(){
    this.fetchLessonList(STUDENT);
  },
  beforeDestroy() {
    this.RESET_LESSONS_LIST();
  }
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

table{
  tbody{
    tr{
      cursor: pointer;
      td{
        &:hover{
          button.u-btn_color_blue{
            border: 1px solid white;
          }
        }
      }
    }
  }
}
</style>
