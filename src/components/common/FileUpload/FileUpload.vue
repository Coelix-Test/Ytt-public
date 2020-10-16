<template>
  <div>
    <div class="messages">{{message}}</div>
    <input 
      type="file"
      :accept="accept"
      @change="onSelectFile"
    >
  </div>
</template>

<script>
import { FilesApi }from '@/api';

export default {
  data: () => ({
    file: null,
    accept: 'application/pdf',
    status: 'none',
    percent: 0,
  }),
  props: {
    apiFunc: {
      type: Function,
    }
  },
  computed: {
    message(){
      let msg = '';
      switch(this.status){
        case 'none':
          msg = 'File is not selected.';
          break;
        case 'loading':
          msg = `File is loading, ${this.percent}% complete`;
          break;
        case 'ok':
          msg = 'Completely uploaded file';
          break;
      }
      return msg;
    }
  },
  methods: {
    onSelectFile(event){
      this.status = 'loading';
      let apiFunc;
      if(this.apiFunc !== undefined){
        apiFunc = this.apiFunc;
      }
      else{
        apiFunc = FilesApi.upload;
      }
      apiFunc(event.target.files[0], this.handleProgress).then(
        response => {
          console.log('response got');
        },
        error => {
          console.log('error got');
        }
      );
    },
    handleProgress(progressEvent){
      console.log(progressEvent);
      this.percent = Math.ceil(progressEvent.loaded / progressEvent.total * 100);
    },
  },

}
</script>

<style>

</style>