<template>
  <app-container class="l-auth">
    <nav-header></nav-header>
    <app-main class="u-flex is-flex-column is-align-center">
      <div class="l-auth__nav u-flex is-justify-center is-align-center">
<!--        <router-link class="l-auth__nav-item"-->
<!--          :class="{ 'is-active' : !loginActive}"-->
<!--          :to="{ name: 'auth-register' }"-->
<!--        >-->
<!--          Sign up-->
<!--        </router-link>-->
<!--        <div class="l-auth__nav-divider"></div>-->
        <router-link class="l-auth__nav-item"
          :class="{ 'is-active' : loginActive}"
          :to="{ name: 'auth-login' }"
        >
          Log in
        </router-link>
      </div>
      <transition name="fade" mode="out-in">
        <router-view class="l-auth__view-content"/>
      </transition>
    </app-main>
  </app-container>
</template>

<script>
import NavHeader from '@/components/common/App/NavHeader.vue';
import AppContainer from '@/components/common/App/AppContainer.vue';
import AppMain from '@/components/common/App/AppMain.vue';

export default {
  components: {
    NavHeader,
    AppContainer,
    AppMain,
  },
  computed: {
    loginActive(){
      return this.$route.name === 'auth-login';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.l-auth{
  background: url('~@/assets/auth-bg.jpg') no-repeat center;
  background-size: cover;
  &__nav{
    font-size: 64px;
    margin-top: 60px;
    margin-bottom: 25px;
  }
  &__nav-divider{
    background-color: #fff;
    height: 110px;
    width: 1px;
    margin: 0 45px;
  }
  &__nav-item{
    font-weight: 300;
    opacity: 0.2;
    color: #fff;
    text-decoration: none;

    width: 258px;
    text-align: center;
    &.is-active{
      opacity: 1;
      font-weight: bold;
    }
  }
  &__view-content{
    margin-bottom: 100px;
  }
}
</style>
