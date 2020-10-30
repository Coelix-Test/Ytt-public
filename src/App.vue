<template>
  <div>
    <Notification/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Notification from '@/components/Notification';

export default {
  mounted(){
    console.log('APP: mounted');
    this.fetchUser()
      .then(this.navigateToStartPage)
      .catch(console.error);

  },
  components: {
    Notification
  },
  methods: {
    ...mapActions('Auth', ['fetchUser', 'navigateToStartPage'])
  }
}
</script>
