<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    //selected tab
    value: {
      type: Number,
    }
  },
}
</script>

<style>

</style>