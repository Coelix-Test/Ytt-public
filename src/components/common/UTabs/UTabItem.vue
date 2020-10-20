<template>
  <div v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
  }),
  methods: {
  }
}
</script>

<style>

</style>