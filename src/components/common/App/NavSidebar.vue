<template>
  <div class="c-nav-sidebar u-flex is-flex-column" ref="sidebar">

    <div class="c-nav-sidebar__user u-flex is-align-center is-flex-column is-justify-center u-mt-13">
      <div class="c-nav-sidebar__user__avatar u-mb-2">
        <img :src="user.avatar" alt="">
      </div>
      <div class="c-nav-sidebar__user__name u-font-weight-light">{{user.name}}</div>
    </div>

    <div class="c-nav-sidebar__nav-list">
      <router-link
        v-for="item in navItems[user.role]"
        :key="item.id"
        class="c-nav-sidebar__nav-item u-flex is-align-center"
        active-class="is-active"
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

    <div class="c-nav-sidebar__logout" @click="logout">
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ADMIN, TEACHER, STUDENT } from '@/constants/roles';

export default {
  data: () => ({
    navItems: {
      [ADMIN]: [
        {
          id: 1,
          text: 'Lessons',
          to: {name: 'admin-lessons-all'},
          icon: 'icon-file',
          active: true,
        },
        {
          id: 2,
          text: 'Users',
          to: {name: 'admin-users-all'},
          icon: 'icon-user-group',
          active: false,
        },
        {
          id: 3,
          text: 'Settings',
          to: {name: 'admin-settings'},
          icon: 'icon-settings',
          active: false,
        },
      ],
      [TEACHER]: [
        {
          id: 1,
          text: 'Lessons',
          to: {name: 'teacher-lessons-all'},
          icon: 'icon-file',
          active: true,
        },
        {
          id: 2,
          text: 'Students',
          to: {name: 'teacher-students-all'},
          icon: 'icon-user-group',
          active: false,
        },
        {
          id: 3,
          text: 'Settings',
          to: {name: 'teacher-settings'},
          icon: 'icon-settings',
          active: false,
        },
      ],
      [STUDENT]: [
        {
          id: 1,
          text: 'Lessons',
          to: {name: 'student-lessons-all'},
          icon: 'icon-file',
          active: true,
        },
        {
          id: 2,
          text: 'Settings',
          to: {name: 'student-settings'},
          icon: 'icon-settings',
          active: false,
        },
      ]
    }
  }),
  computed: {
    ...mapGetters('Auth', ['user'])
  },
  methods: {
    ...mapActions('Auth', ['logout']),
    ...mapMutations('Application', {
      setAppLeft : 'setLeft'
    }),
  },
  mounted(){
    // this.$store.commit('Application/setLeft', this.$refs.sidebar.offsetWidth);
    this.setAppLeft(this.$refs.sidebar.offsetWidth);
  },
  beforeDestroy() {
    this.setAppLeft(0);
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
      overflow: hidden;
      &>img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__name{
      color: #fff;
      font-size: 36px;
      text-align: center;
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
    display: flex;
    align-items: center;
    svg{
      fill: none;
    }
  }
}
</style>
