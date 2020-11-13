<template>
  <div class="c-nav-header u-flex is-align-center" ref="navHeader">
    <div class="c-nav-header__logo">
      <img src="@/assets/logo.svg" alt="">
    </div>
    <div class="c-nav-header__nav-outer u-flex">
      <div class="c-nav-header__nav-wrap u-flex is-align-center">
        <div class="c-nav-header__menu d-flex">
          <router-link class="c-nav-header__menu__item"
            v-for="item in navItems"
            :key="item.id"
            :to="item.to"
          >
            <span class="u-font-weight-light">{{item.text}}</span>
          </router-link>
        </div>
        <div class="c-nav-header__append u-ml-auto">
          <div class="u-flex is-align-center is-justify-center">
            <UBtn
              color="primary"
              size="medium"
            >
              Back to site
            </UBtn>
            <span class="random-hebrew u-ml-6">B”h</span>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  components: {
  },
  data: () => ({
    navItems: [
      {
        id: 1,
        text: 'Contacts',
        to: { name: 'admin' },
      },
      {
        id: 2,
        text: 'Aboout us',
        to: { name: 'admin' },
      },
      {
        id: 3,
        text: 'FAQ',
        to: { name: 'admin' },
      }
    ]
  }),
  methods: {
    ...mapMutations({
      setAppTop: 'Application/setTop',
    }),
  },
  mounted(){
    this.setAppTop(this.$refs.navHeader.offsetHeight);
  },
  beforeDestroy(){
    this.setAppTop(0);
  }
}
</script>

<style lang="scss" scoped>
.c-nav-header{
  position: fixed;
  contain: layout;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  flex: 1 1 auto;
  max-width: 100%;

  height: 110px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 4px 4px rgba(0,0,0,.25);
  &__logo{
    padding-left: 80px;
    width: 390px;
  }
  &__menu{
    &__item{
      color: #2C2C2C;
      text-decoration: none;
      margin-right: 50px;
    }
  }

  &__nav-outer{
    flex-grow: 1;
  }
  &__nav-wrap{
    flex: 0 0 91.666666%;
    max-width: 91.666666%;
  }
}
.random-hebrew{
  color: #A3A3A3;
  font-size: 17px;
}
</style>
