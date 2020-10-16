<template>
  <app-container>
    <nav-header></nav-header>
    <nav-sidebar></nav-sidebar>
    <app-main>
      <router-view></router-view>
    </app-main>
  </app-container>
</template>

<script>
import NavHeader from '@/components/common/App/NavHeader.vue';
import AppContainer from '@/components/common/App/AppContainer.vue';
import NavSidebar from '@/components/common/App/NavSidebar.vue';
import AppMain from '@/components/common/App/AppMain.vue';

export default {
  components: {
    NavHeader,
    NavSidebar,
    AppContainer,
    AppMain,
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins';
</style>