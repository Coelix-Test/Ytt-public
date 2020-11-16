<template>
  <ContentContainer>
    <div class="teacher-edit-lesson">

      <div class="teacher-edit-lesson__header">
        <BackBtn class="teacher-edit-lesson__back-btn" label="Back"></BackBtn>
        <div class="u-text-h2">Edit lesson</div>

        <WordsViewModeController
          class="teacher-edit-lesson__words-view-mode-controller"
          v-model="sliderMode"
        ></WordsViewModeController>
      </div>

      <UTabs
        class="teacher-edit-lesson__tabs"
        :disabled="false"
        v-model="activeTab"
      >
        <UTab label="Known words">
          <WordsView
            :slider-mode="sliderMode"
            :display-known="true"
            :display-words-controls="true"
          ></WordsView>
        </UTab>
        <UTab label="Unknown words">
          <WordsView
            :slider-mode="sliderMode"
            :display-known="false"
            :display-words-controls="true"
          ></WordsView>
        </UTab>
      </UTabs>

      <div class="teacher-edit-lesson__controls">
        <UBtn
          class="teacher-edit-lesson__control-btn"
          color="primary"
          size="x-large"
          width="245"
          :loading="saveBtnLoading"
          :disabled="saveBtnLoading || completeBtnLoading"
          @click="callAction()"
        >
          Save
        </UBtn>
      </div>

    </div>
  </ContentContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { STUDENT, TEACHER } from '@/constants/roles';

import WordsView from "@/components/lessons/WordsView";
import ContentContainer from "@/components/common/ContentContainer";

import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';
import BackBtn from "@/components/common/BackBtn";
import WordsViewModeController from "@/components/lessons/WordsViewModeController";

export default {
  data: () => ({
    activeTab: 0,
    sliderMode: false,
  }),
  components: {
    ContentContainer,
    WordsView,
    UTabs,
    UTab,
    BackBtn,
    WordsViewModeController,
  },
  computed: {
    ...mapGetters('Lessons', {
      lesson: 'lesson',
      completeBtnLoading : 'loading',
    }),
    ...mapGetters('Words', {
      saveBtnLoading : 'loading',
    }),
  },
  methods: {
    ...mapActions('Lessons', [
      'fetchStudentsLesson',
      'completeLesson',
    ]),
    ...mapActions('Words', [
      'updateStudentsWords'
    ]),
    callAction(){

      this.updateStudentsWords({
        studentId: this.$route.params.studentId,
        lessonId: this.$route.params.lessonId,
        isLessonCheck: false,
      })
        .then(() => {
          this.$notify({
            title: 'Lesson saved.',
            type: 'success'
          });
        })
        .catch(({ message }) => {
          this.$notify({
            title: 'Lesson save error',
            text: message,
            type: 'error'
          });
        })
        .then();
    },
    redirect(){
      this.$router.push({
        name: 'teacher-students-lesson-list',
        params: { id: this.$route.params.studentId }
      })
    }
  },
  mounted(){
    this.fetchStudentsLesson({
      studentId: this.$route.params.studentId,
      lessonId: this.$route.params.lessonId,
    });
  }

}
</script>

<style lang="scss">
.teacher-edit-lesson{
  &__header{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &__back-btn{
    margin-right: 50px;
  }
  &__words-view-mode-controller{
    margin-left: auto;
  }
  &__tabs{
    margin-bottom: 38px;
    .u-tabs__header{
      margin-bottom: 20px;
    }
  }

  &__controls{
    display: flex;
    justify-content: center;
  }
  &__control-btn{
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>