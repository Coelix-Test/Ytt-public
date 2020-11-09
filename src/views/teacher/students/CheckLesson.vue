<template>
  <ContentContainer>
    <div class="teacher-check-lesson">

      <div class="teacher-check-lesson__header">
        <BackBtn class="teacher-check-lesson__back-btn" label="Back"></BackBtn>
        <div class="u-text-h2">Edit lesson</div>
      </div>

      <UTabs
        class="teacher-check-lesson__tabs"
        :disabled="false"
        v-model="activeTab"
      >
        <UTab label="Known words">
          <WordsView
            :slider-mode="false"
            :display-known="true"
            :display-words-controls="true"
          ></WordsView>
        </UTab>
        <UTab label="Unknown words">
          <WordsView
            :slider-mode="false"
            :display-known="false"
            :display-words-controls="true"
          ></WordsView>
        </UTab>
      </UTabs>

      <UAudioPlayer
        class="teacher-check-lesson__audio-player"
        :value="recordUrl">
      </UAudioPlayer>

      <div class="teacher-check-lesson__controls">
        <UBtn
          class="teacher-check-lesson__control-btn"
          color="success"
          size="x-large"
          width="245"
          :loading="completeBtnLoading"
          :disabled="saveBtnLoading || completeBtnLoading"
          @click="callAction('complete')"
        >
          Complete
        </UBtn>
        <UBtn
          class="teacher-check-lesson__control-btn"
          color="error"
          size="x-large"
          width="245"
          :loading="saveBtnLoading"
          :disabled="saveBtnLoading || completeBtnLoading"
          @click="callAction('save')"
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
import UAudioPlayer from "@/components/common/UAudioPlayer";
import BackBtn from "@/components/common/BackBtn";

export default {
  data: () => ({
    activeTab: 0,
  }),
  components: {
    ContentContainer,
    WordsView,
    UTabs,
    UTab,
    BackBtn,
    UAudioPlayer,
  },
  computed: {
    ...mapGetters('Lessons', {
      lesson: 'lesson',
      completeBtnLoading : 'loading',
    }),
    ...mapGetters('Words', {
      saveBtnLoading : 'loading',
    }),
    recordUrl(){
      let recordUrl = null;
      if(this.lesson !== null && this.lesson.records.length){
        recordUrl = this.lesson.records[0].url;
      }
      return recordUrl;
    }
  },
  methods: {
    ...mapActions('Lessons', [
      'fetchStudentsLesson',
      'completeLesson',
    ]),
    ...mapActions('Words', [
      'updateStudentsWords'
    ]),
    callAction(action){
      let actionFunc;
      if(action ==='save'){
        actionFunc = this.updateStudentsWords;
      }
      else{
        actionFunc = this.completeLesson;
      }

      actionFunc({
        studentId: this.$route.params.studentId,
        lessonId: this.$route.params.lessonId,
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
.teacher-check-lesson{
  &__header{
    display: flex;
    margin-bottom: 20px;
  }
  &__back-btn{
    margin-right: 50px;
  }
  &__tabs{
    margin-bottom: 38px;
    .u-tabs__header{
      margin-bottom: 20px;
    }
  }

  &__audio-player{
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
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