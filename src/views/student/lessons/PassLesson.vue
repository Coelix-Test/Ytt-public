<template>
  <div class="student-pass-lesson">

    <div class="u-container u-ml-auto u-mr-auto u-py-9">
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

          <UTabs
            class="student-pass-lesson__tabs"
            :disabled="disabledTabs"
            v-model="activeTab"
          >
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

        <div class="u-col-12 u-flex is-justify-center u-mt-10">
          <VoiceRecordSubmit
            :known-words="!activeTab"
            @record-status-change="onRecordStatusChange"
            @after-submit="onAfterSubmit"
          ></VoiceRecordSubmit>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import { STUDENT } from '@/constants/roles';

import WordsView from "@/components/lessons/WordsView";

import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';
import VoiceRecordSubmit from "@/components/partials/PassLesson/VoiceRecordSubmit";


export default {
  components: {
    WordsView,
    UTabs,
    UTab,
    VoiceRecordSubmit,
  },
  data: () => ({
    activeTab: 0,
    disabledTabs: false,
  }),
  methods: {
    ...mapActions('Lessons', ['fetchLesson']),
    ...mapMutations('Words', {
      RESET_WORDS: 'RESET',
    }),
    onRecordStatusChange(status){
      this.disabledTabs = true;
    },
    onAfterSubmit(){
      this.$router.push({ name: 'student-lessons-all' });
    },
  },
  mounted(){
    this.fetchLesson({
      role: STUDENT,
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
@import '@/styles/vars';

.student-pass-lesson{
  &__tabs::v-deep{
    .u-tabs__header{
      margin-bottom: 30px;
    }
  }

}
</style>
