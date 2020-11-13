<template>
  <div>
    <Loader :show="loading"/>
    <Notification/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Notification from '@/components/Notification';
import Loader from '@/components/Loader';

export default {
  mounted(){
    console.log('APP: mounted');
    this.fetchUser()
      .then(this.navigateToStartPage)
      .catch(console.error);

  },
  computed: {
    ...mapGetters(['loading'])
  },
  components: {
    Notification,
    Loader
  },
  methods: {
    ...mapActions('Auth', ['fetchUser', 'navigateToStartPage'])
  }
}
</script>
