<template>
  <div class="words-list-item "
     :class="classes"
  >
    <div class="words-list-item__img-wrap">
      <img
        class="words-list-item__img"
        :src="image" alt=""
      >

      <div class="words-list-item__controls" v-if="hasControls">
        <button
          class="words-list-item__button words-list-item__button_eye"
          :class="eyeBtnClasses"
          @click="toggleWord(id)"
        ></button>
        <button
          class="words-list-item__button words-list-item__button_check"
          :class="checkBtnClasses"
        ></button>
      </div>
    </div>

    <div class="words-list-item__index">{{index}}</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  props: {
    index: {
      type: Number,
      default: 1,
    },
    id: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/240x120'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLastWord: {
      type: Boolean,
      default: false,
    },
    hasControls: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    classes(){
      return {
        'words-list-item_disabled' : this.disabled,
      };
    },
    eyeBtnClasses(){
      return {
        'words-list-item__button_active' : !this.disabled,
      };
    },
    checkBtnClasses(){
      return {
        'words-list-item__button_active' : this.isLastWord,
      };
    }
  },
  methods: {
    ...mapMutations('Words', {
      toggleWord: 'TOGGLE_WORD',
    })
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.words-list-item{
  &__img-wrap{
    background-color: #FAFAFA;
    border: 1px solid #E4E4E4;
    width: 100%;
    position: relative;
  }
  &__img{
    display: block;
    width: 100%;
  }
  &__controls{
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    transform: translateY(50%);

  }
  &__button{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $clr-primary;
    border: 0;
    margin: 0 4px;
    cursor: pointer;
    outline: none;
    &_eye{
      background: url('~@/assets/svg/eye.svg') no-repeat center;
      background-color: $clr-grey3;
      background-size: 17px 12px;
    }
    &_check{
      background: url('~@/assets/svg/check.svg') no-repeat center;
      background-color: $clr-grey3;
      background-size: 17px 12px;
    }
    &_active{
      background-color: $clr-primary;
    }
  }
  &__index{
    text-align: center;
    margin-top: 25px;
    font-size: 18px;
    line-height: 22px;
    color: rgba(#000000, .4);
  }

  &_disabled{
    opacity: .3;
  }
}
</style>