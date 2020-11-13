<template>
  <UCard class="lesson-words-list">
    <vue-scroll
      ref="scroll"
    >
      <div class="lesson-words-list__inner">
        <WordsListItem
          class="lesson-words-list__words-list-item"
          v-for="(item, index) in words"
          :key="item.id"
          :index="index+1"
          :id="item.id"
          :image="item.image_url"
          :disabled="item.disabled"
          :has-controls="displayWordsControls"
          :is-last-word="item.id === lastWord"
        ></WordsListItem>
      </div>
    </vue-scroll>
  </UCard>
</template>

<script>
// import vueCustomScrollbar from 'vue-custom-scrollbar/src/main'
import UCard from "@/components/common/UCard";
import WordsListItem from "@/components/lessons/WordsListItem";
import {mapGetters} from "vuex";

export default {
  components: {
    UCard,
    WordsListItem,
    // vueCustomScrollbar,
  },
  data: () => ({

  }),
  props: {
    words: {
      type: Array,
      default: () => [],
    },
    displayWordsControls: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters('Words', ['lastWord']),
  },
}
</script>

<style lang="scss">
@import "@/styles/vars";

.lesson-words-list{
  padding: 35px 69px 15px 75px;
  height: 577px;
  //overflow-y: scroll;
  &__words-list-item{
    width: calc(25% - 34px);
    margin-right: 17px;
    margin-left: 17px;
    margin-bottom: 20px;
  }
  &__inner{
    display: flex;
    flex-wrap: wrap;
    //max-height: 577px;
    padding-right: 17px;
    &::-webkit-scrollbar {
      width: 12px;
      background-color: green;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: red;
    }
  }
}
</style>