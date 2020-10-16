<template>
  <div class="u-card">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.u-card{
  background: #fff;
  border-radius: 50px;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
}
</style>