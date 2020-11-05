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
          <UAudioRecorder
            v-model="record"
            class="student-pass-lesson__ytt-recorder"
            @status-change="onStatusChange"
          />
          <UBtn
            class="student-pass-lesson__submit"
            :disabled="disabledSubmit"
            width="352"
            size="x-large"
            color="primary"
            @click="onSubmit"
            :loading="loading"
          >
            Send
          </UBtn>
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

    record: null,
    activeTab: 0,
    disabledTabs: false,
    disabledSubmit: true,
  }),
  computed: {
    ...mapGetters('Lessons', ['loading'])
  },
  methods: {
    ...mapActions('Lessons', ['sendRecord', 'fetchLesson']),
    onStatusChange(status){
      this.disabledTabs = true;

      if(status === 'inactive' ){
        this.disabledSubmit = false;
      }
      if(status === 'recording'){
        this.disabledSubmit = true;
      }
    },
    onSubmit(){
      this.sendRecord({
        lessonId: this.$route.params.id,
        record: this.record,
        known_words : !this.activeTab,
      })
      .then(() => {
        this.$notify({
          title: 'Success',
          message: 'Your answer was successfully sent to teacher',
          type: 'success'
        });
        this.$router.push({ name: 'student-lessons-all' });
      })
      .catch(({ message }) => {
        this.$notify({
          title: 'Pass lesson error',
          text: message,
          type: 'error'
        });
      });
    }
  },
  mounted(){
    this.fetchLesson({
      role: STUDENT,
      id: this.$route.params.id,
    });
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

  &__ytt-recorder,
  &__submit{
    margin-right: 36px;
    margin-left: 36px;
  }

}
</style>
