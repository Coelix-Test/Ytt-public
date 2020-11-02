<template>
  <div>

    <div class="u-container u-ml-auto u-mr-auto u-pt-9">
      <div class="u-row">
        <div class="u-col-7">
          <div class="u-flex is-align-center">
            <div class="u-text-h1 u-mr-6">Lesson</div>

          </div>
        </div>
        <div class="u-col-5">
          <!-- search -->
        </div>
        <div class="u-col-12">
          <u-card class="table-card u-mt-10">

          </u-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { STUDENT } from '@/constants/roles';
import UCard from '@/components/common/UCard';


export default {
  components: {
    UCard,
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
    passLesson(lesson){

    },
  },
  mounted(){
    // this.getItems();
    this.fetchLessonList(STUDENT);
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
