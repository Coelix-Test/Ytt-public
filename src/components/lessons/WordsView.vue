<template>
  <div class="words-view">
    <WordsSlider
      v-if="sliderMode"
      :display-words-controls="displayWordsControls"
      :words="displayWords"
    ></WordsSlider>
    <LessonWordsList
      :words="filteredWords"
      :display-words-controls="displayWordsControls"
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
    },
    displayWordsControls: {
      type: Boolean,
      default: false,
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
          image_url: item.image_url,
          cropped_image_url: item.cropped_image_url,
          disabled: item.isKnown !== this.displayKnown
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>