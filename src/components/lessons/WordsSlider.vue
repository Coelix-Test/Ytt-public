<template>
  <UCard class="words-slider" v-if="words.length">
    <div class="words-slider__inner">
      <div class="words-slider__list">
        <div
          class="words-slider__slide"
          :class="{ 'words-slider__slide_show': currentIndex === index }"
          v-for="(slide, index) in computedSlides"
          :key="index"
        >
          <img class="words-slider__image" :src="slide.image_url" alt="">
          <div class="words-slider__last-word-indicator" v-if="slide.isLastWord">Last word</div>
        </div>
      </div>

      <div class="words-slider__prev" @click="prevSlide"></div>
      <div class="words-slider__next" @click="nextSlide"></div>
      <div class="words-slider__test"></div>

      <div class="words-slider__progress">
        <div class="words-slider__progress-text">
          {{ (currentIndex - currentIndex % 2) / 2 + 1 }}/{{computedSlides.length/2}}
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
import {mapGetters} from "vuex";

export default {
  components: {
    UCard,
  },
  props: {
    words: {
      type: Array,
      default: () => [],
    }
  },
  data: () => ({
    currentIndex: 0,
  }),
  computed: {
    ...mapGetters('Words', ['lastWord']),
    progressBarStyle(){
      return {
        width: (this.currentIndex + 1)/this.computedSlides.length * 100 + '%'
      }
    },
    currentSlide(){
      return this.words.find((el, index) => index === this.currentIndex);
    },
    computedSlides(){

      //
      let slides = [];
      this.words.forEach((el) => {
        slides.push(
          {
            id: el.id * 2,
            image_url: el.cropped_image_url,
            isLastWord: el.id === this.lastWord,
          },
          {
            id: el.id * 2 + 1,
            image_url: el.image_url,
            isLastWord: el.id === this.lastWord,
          },
        );
      });

      // let slidesToPlaceInEnd = slides.slice(0, this.currentIndex);
      // let slidesToPlaceInStart = slides.slice(this.currentIndex);

      return slides;// slidesToPlaceInStart.concat(slidesToPlaceInEnd);
    },
  },
  methods: {
    prevSlide(){

      if(this.currentIndex !== 0)
        this.currentIndex--;

    },
    nextSlide(){

      if(this.currentIndex !== this.computedSlides.length - 1)
        this.currentIndex++;

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

  &__list{
    display: flex;
    justify-content: flex-start;
    //justify-content: center;
    overflow: hidden;
    width: 100%;
    min-height: 780px;
    position: relative;
  }
  &__slide{
    flex: 0 0 100%;
    min-height: 490px;
    position: absolute;

    transition: all 0.3s linear;
    transition-delay: 0.3s;
    opacity: 0;
    visibility: hidden;
    width: 100%;

    &_show{
      opacity: 1;
      visibility: visible;
      transition: all 0.3s linear;
    }
  }

  &__image{
    width: 100%;
    height: auto;
    display: block;
  }

  &__last-word-indicator{
    position: absolute;
    color: $clr-blue;
    top: 8%;
    right: 20px;
    font-size: 20px;
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