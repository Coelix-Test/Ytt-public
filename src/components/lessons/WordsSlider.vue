<template>
  <UCard class="words-slider">
    <div class="words-slider__inner">
      <div class="words-slider__list">
        <transition
          tag="div"
          name="slide-fade"
          mode="out-in"
        >
          <div
            class="words-slider__slide"

            :key="currentSlide.id"
          >
            <img :src="currentSlide.image" alt="">
          </div>
        </transition>
      </div>

      <div class="words-slider__prev" @click="prevSlide"></div>
      <div class="words-slider__next" @click="nextSlide"></div>
      <div class="words-slider__test"></div>

      <div class="words-slider__progress">
        <div class="words-slider__progress-text">
          {{currentIndex+1}}/{{words.length}}
          <svg
            v-svg
            symbol="icon-shuffle"
            class="words-slider__shuffle-icon"
          >
          </svg>
        </div>
        <div class="words-slider__progress-line">
          <div class="words-slider__progress-level" :style="progressBarStyle"></div>
        </div>
      </div>

    </div>
  </UCard>
</template>

<script>
import UCard from "@/components/common/UCard";

export default {
  components: {
    UCard,
  },
  data: () => ({
    words: [
      {id: 1, image: 'https://picsum.photos/id/1000/1040/490'},
      {id: 2, image: 'https://picsum.photos/id/1001/1040/490'},
      {id: 3, image: 'https://picsum.photos/id/1002/1040/490'},
      {id: 4, image: 'https://picsum.photos/id/1003/1040/490'},
      {id: 5, image: 'https://picsum.photos/id/1004/1040/490'},
      {id: 6, image: 'https://picsum.photos/id/1005/1040/490'},
    ],
    currentIndex: 1,
  }),
  computed: {
    progressBarStyle(){
      return {
        width: (this.currentIndex + 1)/this.words.length * 100 + '%'
      }
    },
    currentSlide(){
      return this.words.find((el, index) => index === this.currentIndex);
    },
  },
  methods: {
    prevSlide(){
      if(this.currentIndex !== 0){
        this.currentIndex--;
      }
    },
    nextSlide(){
      if(this.currentIndex !== this.words.length){
        this.currentIndex++;
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/vars';

.words-slider{
  padding: 25px 115px 65px;

  &__inner{
    position: relative;
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: opacity .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
  }

  &__prev,
  &__next{
    width: 29px;
    height: 48px;
    position: absolute;
    cursor: pointer;
    top: 50%;
    background-image: url('~@/assets/svg/words-slider-prev.svg');
    background-size: 29px 48px;
    //border: 1px solid green;
  }
  &__prev{
    left: -39px;
    transform: translate( -100%, -50%);
  }
  &__next{
    right: -39px;
    transform-origin: 50% 50%;
    transform: rotate(180deg) translate( -100%, 50%);
  }


  //&__test{
  //  position: absolute;
  //  height: 1px;
  //  right: -100px;
  //  left: -100px;
  //  width: calc(100% + 200px);
  //  top: 50%;
  //  background-color: red;
  //}


  &__progress{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    margin-top: 25px;
  }
  &__progress-text{
    font-size: 22px;
    font-weight: 300;
    margin-right: 43px;

    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  &__progress-line{
    height: 4px;
    position: relative;
    background-color: #F3F3F3;
    flex-grow: 1;
  }
  &__progress-level{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $clr-primary;
    transition: width .3s ease-in-out;
  }

  &__shuffle-icon{
    width: 25px;
    height: 19px;
    stroke: rgba(#585858, .23);
    margin-left: 12px;
  }
}
</style>