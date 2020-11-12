<template>
  <ContentContainer class="view-lesson">
    <div class="view-lesson__title-line">
      <BackBtn class="view-lesson__back-button"></BackBtn>
      <div class="u-text-h1">Lesson Name</div>
    </div>

    <LessonWordsList
      class="view-lesson__lesson-words-list"
      :words="words"
    ></LessonWordsList>

    <div class="view-lesson__download">
      <UBtn
        tag="a"
        :href="pdfUrl"
        download
        size="x-large"
        color="grey"
        width="352"
        outlined
      >
        <svg
          class="view-lesson__download-icon"
          v-svg
          symbol="download"
        ></svg>
        <span class="view-lesson__download-text">Download</span>
      </UBtn>
    </div>
  </ContentContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BackBtn from "@/components/common/BackBtn";
import ContentContainer from "@/components/common/ContentContainer";
import LessonWordsList from "@/components/lessons/LessonWordsList";

export default {
  components: {
    ContentContainer,
    BackBtn,
    LessonWordsList,
  },
  computed: {
    ...mapGetters('Auth', ['userRole']),
    ...mapGetters('Words', ['words']),
    ...mapGetters('Lessons', ['lesson']),
    pdfUrl(){
      let pdfUrl = null;
      if(this.lesson){
        pdfUrl = this.lesson.url;
      }
      return pdfUrl;
    }
  },
  methods: {
    ...mapActions('Lessons', ['fetchLesson']),
  },
  mounted() {
    this.fetchLesson({
      role: this.userRole,
      id: this.$route.params.id,
    });
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.view-lesson{
  &__title-line{
    display: flex;
    margin-bottom: 58px;
  }
  &__back-button{
    margin-right: 60px;
  }
  &__lesson-words-list{
    margin-bottom: 40px;
  }
  &__download{
    display: flex;
    justify-content: center;
  }
  &__download-text{
    font-size: 24px;
    font-weight: 500;
  }
  &__download-icon{
    fill: none;
    stroke: $clr-grey2;
    width: 25px;
    height: 27px;
    margin-right: 15px;
  }
}
</style>