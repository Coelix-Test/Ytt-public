<template>
  <UCard class="lesson-words-list">
    <WordsListItem 
      class="lesson-words-list__words-list-item"
      v-for="(item, index) in words"
      :key="item.id"
      :index="index"
      :image="item.image"
      :disabled="item.disabled"
      :has-controls="displayWordsControls"
    ></WordsListItem>
  </UCard>
</template>

<script>
import UCard from "@/components/common/UCard";
import WordsListItem from "@/components/lessons/WordsListItem";

export default {
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
  components: {
    UCard,
    WordsListItem,
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.lesson-words-list{
  padding: 35px 87px 15px 75px;
  //padding: 35px 104px 35px 92px;
  display: flex;
  flex-wrap: wrap;
  &__words-list-item{
    width: calc(25% - 34px);
    margin-right: 17px;
    margin-left: 17px;
    margin-bottom: 20px;
  }
}
</style>