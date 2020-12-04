<template>
  <UCard class="lesson-words-list">
    <vue-scroll
      ref="scroll"
    >
      <div class="lesson-words-list__inner">
        <WordsListItem
          class="lesson-words-list__words-list-item"
          :class="{ 'lesson-words-list__words-list-item_shuffle' : isInShuffleRange(item.index)}"
          v-for="(item, index) in words"
          :key="item.id"
          :index="index+1"
          :id="item.id"
          :image="item.image_url"
          :disabled="item.disabled"
          :has-controls="item.index === shuffleTopEdge || item.index === shuffleBottomEdge"
          :is-last-word="false"
          @click.native="handleWordsItemClick(item)"
        >
          <template v-slot:word-controls>
            <slot name="word-controls" >
              <button
                class="shuffle-edge-button"
              ></button>
            </slot>
          </template>
        </WordsListItem>
      </div>
    </vue-scroll>
  </UCard>
</template>

<script>
// import vueCustomScrollbar from 'vue-custom-scrollbar/src/main'
import UCard from "@/components/common/UCard";
import WordsListItem from "@/components/lessons/WordsListItem";
import {mapGetters, mapMutations} from "vuex";

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
  },
  computed: {
    ...mapGetters('Words', ['shuffleBottomEdge', 'shuffleTopEdge']),
  },
  methods: {
    ...mapMutations('Words', ['SET_SHUFFLE_TOP_EDGE' ,'SET_SHUFFLE_BOTTOM_EDGE']),
    isInShuffleRange(index){

      let result = false;
      if(this.shuffleBottomEdge !== null && this.shuffleTopEdge !== null){
        if(index >= this.shuffleBottomEdge && index <= this.shuffleTopEdge){
          result = true;
        }
      }
      return result;
    },
    handleWordsItemClick(item){

      if(this.shuffleBottomEdge === item.index){
        this.SET_SHUFFLE_BOTTOM_EDGE(null);
      }
      else if(this.shuffleTopEdge === item.index){
        this.SET_SHUFFLE_TOP_EDGE(null);
      }
      else if(this.shuffleBottomEdge === null && this.shuffleTopEdge === null){
        this.SET_SHUFFLE_BOTTOM_EDGE(item.index);
      }
      else if(this.shuffleBottomEdge === null){
        if(this.shuffleTopEdge > item.index){
          this.SET_SHUFFLE_BOTTOM_EDGE(item.index);
        }
        else{
          this.SET_SHUFFLE_BOTTOM_EDGE(this.shuffleTopEdge);
          this.SET_SHUFFLE_TOP_EDGE(item.index);
        }
      }
      else if(this.shuffleTopEdge === null){
        if(this.shuffleBottomEdge < item.index){
          this.SET_SHUFFLE_TOP_EDGE(item.index);
        }
        else{
          this.SET_SHUFFLE_TOP_EDGE(this.shuffleBottomEdge);
          this.SET_SHUFFLE_BOTTOM_EDGE(item.index);
        }
      }
      else{
        //calc the nearest shuffle edge
        let bottomDistance = Math.abs(this.shuffleBottomEdge - item.index);
        let topDistance = Math.abs(this.shuffleTopEdge - item.index);
        if(bottomDistance === topDistance){
          this.SET_SHUFFLE_BOTTOM_EDGE(item.index);
        }
        else if(bottomDistance < topDistance){
          this.SET_SHUFFLE_BOTTOM_EDGE(item.index);
        }
        else{
          this.SET_SHUFFLE_TOP_EDGE(item.index);
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.shuffle-edge-button{
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  background: url('~@/assets/svg/check.svg') no-repeat center;
  background-color: $clr-primary;
  background-size: 17px 12px;

}
.lesson-words-list__words-list-item{
  &_shuffle{
    .words-list-item__img-wrap{
      border: 1px solid $clr-blue;
    }
  }
}
</style>