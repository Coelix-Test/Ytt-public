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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { STUDENT } from '@/constants/roles';

import WordsView from "@/components/lessons/WordsView";

import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';


export default {
  components: {
    WordsView,
    UTabs,
    UTab,
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
