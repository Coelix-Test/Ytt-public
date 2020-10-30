<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    centered: {
      type: Boolean,
      default: true,
    },
    offsetTop: {
      type: Boolean,
      default: true,
    },
    offsetBottom: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    classes(){
      return {
        'content-container' : true,
        'content-container_centered': this.centered,
        'content-container_offset-top': this.offsetTop,
        'content-container_offset-bottom': this.offsetBottom,
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.content-container{
  width: $content-width-xl;

  &_centered{
    margin-right: auto;
    margin-left: auto;
  }
  &_offset-top{
    margin-top: 40px;
  }
  &_offset-bottom{
    margin-bottom: 100px;
  }
}
</style>