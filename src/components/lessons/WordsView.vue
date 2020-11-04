<template>
  <div class="words-view">
    <WordsSlider
      v-if="sliderMode"
      :words="displayWords"
    ></WordsSlider>
    <LessonWordsList
      :words="filteredWords"
      :display-words-controls="false"
      v-else
    ></LessonWordsList>
  </div>
</template>

<script>
import WordsSlider from "@/components/lessons/WordsSlider";
import LessonWordsList from "@/components/lessons/LessonWordsList";

import { mapGetters } from 'vuex';

export default {
  components: {
    WordsSlider,
    LessonWordsList,
  },
  props: {
    sliderMode: {
      type: Boolean,
      default: true,
    },
    displayKnown: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    ...mapGetters('Words', [
      'words', 'knownWords', 'unknownWords'
    ]),
    displayWords(){
      if(this.displayKnown){
        return this.knownWords;
      }
      else{
        return this.unknownWords;
      }
    },
    filteredWords(){
      //gets list of all words
      //with 'disabled' property dependent on displayKnown prop

      return this.words.map(item => {
        return {
          id: item.id,
          image: item.image,
          disabled: item.known !== this.displayKnown
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>