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
  methods: {
    setActiveTab(uuid){

      let selectedIndex;
      
      this.$slots.default.forEach((vnode, index) => {
        if(vnode.componentInstance.uuid === uuid){
          vnode.componentInstance.active = true;
          selectedIndex = index;
        }
        else{
          vnode.componentInstance.active = false;
        }
      });

      this.$emit('input', selectedIndex);
      console.log('input emmited' , selectedIndex);


    },
  },
  watch: {
    value(value){
      console.log('watcher triggered');
    }
  },
  // render: function(createElement){
  //   return createElement('div', this.$slots.default);
  // },
}
</script>

<style>

</style>