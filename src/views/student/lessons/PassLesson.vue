<template>
  <div class="student-pass-lesson">

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

          <UTabs class="student-pass-lesson__tabs" :disabled="false">
            <UTab label="Known words">
              <WordsView
                :slider-mode="true"
                :display-known="true"
              ></WordsView>
            </UTab>
            <UTab label="Unknown words">
              <WordsView
                :slider-mode="true"
                :display-known="false"
              ></WordsView>
            </UTab>
          </UTabs>

        </div>
        <div class="u-col-12">
          <UAudioRecorder/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { STUDENT } from '@/constants/roles';

import WordsView from "@/components/lessons/WordsView";

import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';
import UAudioRecorder from '@/components/common/UAudioRecorder';


export default {
  components: {
    WordsView,
    UTabs,
    UTab,
    UAudioRecorder
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

.student-pass-lesson{
  &__tabs::v-deep{
    .u-tabs__header{
      margin-bottom: 30px;
    }
  }
}
</style>
