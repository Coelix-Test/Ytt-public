<template>
  <div class="c-nav-sidebar u-flex is-flex-column" ref="sidebar">

    <div class="c-nav-sidebar__user u-flex is-align-center is-flex-column is-justify-center u-mt-13">
      <div class="c-nav-sidebar__user__avatar u-mb-2">
        <img src="@/assets/avatar.png" alt="">
      </div>
      <div class="c-nav-sidebar__user__name u-font-weight-light">John Smith</div>
    </div>

    <div class="c-nav-sidebar__nav-list">
      <router-link 
        v-for="item in navItems"
        :key="item.id"
        class="c-nav-sidebar__nav-item u-flex is-align-center"
        :class="{ 'is-active': item.active }"
        :to="item.to"
      >
        <svg
          v-svg
          :symbol="item.icon"
          size="0 0 32 32"
          role="presentation"
          class="u-mr-5"
        ></svg>
        {{item.text}}
      </router-link>
    </div>

    <div class="c-nav-sidebar__logout">
      <svg
        v-svg
        symbol="icon-logout"
        class="u-mr-3"
        size="0 0 14 21"
      >
      </svg>
      Log out
    </div>


  </div>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        id: 1,
        text: 'Lessons',
        to: {name: 'admin-lessons-create'},
        icon: 'icon-file',
        active: true,
      },
      {
        id: 2,
        text: 'My students',
        to: {name: 'admin'},
        icon: 'icon-user-group',
        active: false,
      },
      {
        id: 3,
        text: 'Settings',
        to: {name: 'admin'},
        icon: 'icon-settings',
        active: false,
      },
    ]
  }),
  mounted(){
    this.$store.commit('Application/setLeft', this.$refs.sidebar.offsetWidth);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.c-nav-sidebar{
  background: url('~@/assets/sidebar-bg.png') no-repeat center;
  /* background-image: url('@/assets/sidebar-bg.png') no-repeat center; */
  background-size: cover;
  width: 390px;
  position: fixed;
  top: 0px;
  height: 100vh;
  padding-top: 110px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0, .25);
  &__user{
    &__avatar{
      border: 3px solid $clr-primary;
      border-radius: 50%;
      width: 78px;
      height: 78px;
      &>img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__name{
      color: #fff;
      font-size: 36px;
    }
  }

  &__nav-list{
    margin-top: auto;
    margin-bottom: auto;
  }
  &__nav-item{
    height: 98px;
    padding-left: 80px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    svg{
      fill: #fff;
    }
    &.is-active{
      background: #fff;
      color: #000;
      svg{
        fill: $clr-blue;
      }
    }
  }
  &__logout{
    color: #fff;
    margin-top: auto;
    margin-bottom: 50px;
    margin-left: 60px;
    cursor: pointer;
    svg{
      fill: none;
    }
  }
}
</style>