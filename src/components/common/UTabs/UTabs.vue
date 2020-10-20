<template>
  <div>
    <div class='u-tabs__header'>
      <div
        v-for="(tab, index) in tabs"
        :key="tab.label"
        class="u-tabs__tab"
        @click="selectTab(index)"
      >
        {{ tab.label }} 
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedIndex: 0,
    tabs: [],
  }),
  props: {
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i;
      
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i);
      })
    }
  },
  watch: {
  },
  mounted () {
    this.selectTab(0)
  },
  created(){
    this.tabs = this.$children;
  }
  // render: function(createElement){
  //   return createElement('div', this.$slots.default);
  // },
}
</script>

<style>

</style>