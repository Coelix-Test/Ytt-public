<template>
  <div>
  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
// import { CemeteriesApi } from '@/api';

export default {
  
  methods: {
    updateSingle(){
      const postData = this.collectPostData();
      // CemeteriesApi.update(this.$route.params.id, postData);
    },
    getSingle(){
      // CemeteriesApi.get(this.$route.params.id).then(response => {
        

      // });
    },
  },
  mounted(){
    // this.getSingle();
  }
}
</script>

<style lang="scss" scoped>

</style>