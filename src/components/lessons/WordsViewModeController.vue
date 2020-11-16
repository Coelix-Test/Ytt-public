<template>
  <div class="words-view-mode-controller">
    <div class="words-view-mode-controller__button-wrap">
      <div
        class="words-view-mode-controller__button words-view-mode-controller__button-slider"
        :class="{'words-view-mode-controller__button-slider_active' : this.value }"
        @click="toggle"
      >
      </div>
    </div>
    <div class="words-view-mode-controller__button-wrap">
      <div
        class="words-view-mode-controller__button words-view-mode-controller__button-grid"
        :class="{'words-view-mode-controller__button-grid_active' : !this.value }"
        @click="toggle"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordsViewModeController",
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    toggle(){
      this.$emit('input', !this.value);
    }
  },
}
</script>

<style lang="scss" scoped>
.words-view-mode-controller{
  display: flex;
  &__button{
    width: 33px;
    height: 33px;
    cursor: pointer;
    &-grid{
      margin-left: 18px;
      background: url('~@/assets/svg/grid.svg') no-repeat center;
      background-size: cover;
      &_active{
        background: url('~@/assets/svg/grid-blue.svg') no-repeat center;
        background-size: cover;
      }
    }
    &-slider{
      background: url('~@/assets/svg/slider.svg') no-repeat center;
      background-size: cover;
      &_active{
        background: url('~@/assets/svg/slider-blue.svg') no-repeat center;
        background-size: cover;
      }
    }
  }
}
</style>