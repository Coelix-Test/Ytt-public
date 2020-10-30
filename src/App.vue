<template>
  <div>
    <notifications group="foo" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted(){
    console.log('APP: mounted');
    this.fetchUser()
      .then(this.navigateToStartPage)
      .catch(console.error);
  },
  methods: {
    ...mapActions('Auth', ['fetchUser', 'navigateToStartPage']),
  }
}
</script>
