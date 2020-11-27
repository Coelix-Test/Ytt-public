<template>
  <div class="words-view">
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

import { mapGetters } from 'vuex';

export default {
  components: {
    WordsSlider,
    ShuffleWordsList,
  },
  props: {
    sliderMode: {
      type: Boolean,
      default: true,
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
      if(this.wordsShuffled.length){
        return this.wordsShuffled;
      }
      else{
        return this.filteredWords;
      }
    },
  }
}
</script>

<style lang="scss">

</style>