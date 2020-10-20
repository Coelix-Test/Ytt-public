<template>
  <div @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import UUID from '@/mixins/uuid.mixin';

export default {
  mixins: [ UUID ],
  data: () => ({
    active: false,
  }),
  methods: {
    onClick(){
      // console.log('On click tab item.');
      
      //is not active - toggle
      this.$parent.setActiveTab(this.uuid);
    },
    toggle(){
      this.active = !this.active;
    },
  },
  mounted(){
  }
}
</script>

<style>

</style>