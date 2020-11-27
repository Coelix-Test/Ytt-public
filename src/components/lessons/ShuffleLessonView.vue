<template>
  <ContentContainer class="shuffle-lesson-view">
    <div class="shuffle-lesson-view__header">
      <BackBtn class="shuffle-lesson-view__back-btn"></BackBtn>
      <div class="u-text-h2">Lesson</div>

      <WordsViewModeController
        class="teacher-check-lesson__words-view-mode-controller"
        v-model="sliderMode"
      ></WordsViewModeController>
    </div>

    <ShuffleWordsView
      class="shuffle-lesson-view__words-view"
      :slider-mode="sliderMode"
      :display-known="true"
      :display-words-controls="true"
      :active-tab="activeTab"
      :display-tabs="displayTabs"
      @tab-change="onTabChange"
    ></ShuffleWordsView>

    <div class="shuffle-lesson-view__shuffle-btn-wrap" v-if="!sliderMode">
      <UBtn
        class="shuffle-lesson-view__shuffle-btn"
        size="x-large"
        width="352"
        @click="handleShuffle"
        :disabled="shuffleBottomEdge === null || shuffleTopEdge === null"
      >
        Shuffle
      </UBtn>
    </div>

    <div class="shuffle-lesson-view__submit-row" v-if="displayVoiceRecord">
      <VoiceRecordSubmit
        @after-submit="onAfterSubmit"
      ></VoiceRecordSubmit>
    </div>


  </ContentContainer>
</template>

<script>
import ContentContainer from "@/components/common/ContentContainer";
import WordsViewModeController from "@/components/lessons/WordsViewModeController";
import BackBtn from "@/components/common/BackBtn";
import ShuffleWordsView from "@/components/lessons/ShuffleWordsView";
import VoiceRecordSubmit from "@/components/partials/PassLesson/VoiceRecordSubmit";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {STUDENT} from "@/constants/roles";

export default {
  components: {
    BackBtn,
    ContentContainer,
    WordsViewModeController,
    ShuffleWordsView,
    VoiceRecordSubmit,
  },
  props: {
    displayVoiceRecord: {
      type: Boolean,
      default: true,
    },
    displayTabs: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    sliderMode: false,
    activeTab: 0,
  }),
  computed: {
    ...mapGetters('Words', ['shuffleBottomEdge', 'shuffleTopEdge']),
    ...mapGetters('Auth', ['userRole']),
  },
  methods: {
    ...mapActions('Lessons', ['sendRecord', 'fetchLesson']),
    ...mapMutations('Words', {
      SHUFFLE: 'SHUFFLE',
      RESET_WORDS: 'RESET',
    }),
    handleShuffle(){
      this.SHUFFLE();
      if(this.displayTabs){
        this.activeTab = 2;
      }
      this.sliderMode = true;
    },
    onAfterSubmit(){
      this.$router.push({ name: 'student-lessons-all' });
    },
    onTabChange(tabId){
      this.activeTab = tabId;
    }
  },
  mounted(){
    this.fetchLesson({
      role: this.userRole,
      id: this.$route.params.id,
    })
      .catch(({ message }) => {
        this.$notify({
          title: 'Lesson load error',
          text: message,
          type: 'error'
        });
      });
  },
  beforeDestroy() {
    this.RESET_WORDS();
  }
}
</script>

<style lang="scss" scoped>
.shuffle-lesson-view{
  &__header{
    display: flex;
  }
  &__back-btn{
    margin-right: 20px;
  }
  &__words-view{
    margin-top: 30px;
    margin-bottom: 30px;
  }

  &__shuffle-btn-wrap{
    display: flex;
    justify-content: center;

    margin-bottom: 30px;
  }
}
</style>