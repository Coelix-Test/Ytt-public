<template>
  <div class="shuffle-words-view">
    <UTabs
      v-if="sliderMode"
      class="shuffle-lesson-view__tabs"
      :disabled="disabledTabs"
      :value="activeTab"
      @input="onTabChange"
    >
      <UTab label="Known words"></UTab>
      <UTab label="Unknown words"></UTab>
      <UTab label="Shuffle" v-if="wordsShuffled.length"></UTab>
    </UTabs>
    <WordsSlider
      v-if="sliderMode"
      :display-words-controls="false"
      :words="sliderWords"
    ></WordsSlider>
    <ShuffleWordsList
      :words="filteredWords"
      v-else
    >
    </ShuffleWordsList>
  </div>
</template>

<script>
import WordsSlider from "@/components/lessons/WordsSlider";
import ShuffleWordsList from "@/components/lessons/ShuffleWordsList";
import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';

import { mapGetters } from 'vuex';

export default {
  components: {
    WordsSlider,
    ShuffleWordsList,
    UTabs,
    UTab,
  },
  data: () => ({
    disabledTabs: false,
  }),
  props: {
    sliderMode: {
      type: Boolean,
      default: true,
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('Words', [
      'words', 'knownWords', 'unknownWords',
      'wordsShuffled',
    ]),
    filteredWords(){
      //gets list of all words
      //with 'disabled' property dependent on displayKnown prop

      return this.words.map( (item, index) => {
        return {
          index: index,
          ...item,
        }
      })
    },
    sliderWords(){
      if(this.activeTab === 0){
        return this.knownWords;
      }
      else if(this.activeTab === 1){
        return this.unknownWords;
      }
      else{
        return this.wordsShuffled;
      }
    },
  },
  methods: {
    onTabChange(tabId){
      this.$emit('tab-change', tabId);
    }
  }
}
</script>

<style lang="scss">
.shuffle-lesson-view{
  &__tabs{
    margin-bottom: 30px;
  }
}
</style>