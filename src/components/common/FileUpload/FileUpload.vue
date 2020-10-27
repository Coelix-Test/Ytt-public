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
    status: 'none',
    percent: 0,
  }),
  props: {
    apiFunc: {
      type: Function,
    },
    value: {
      type: [Object, Array],
      default: () => null,
    },
    accept: {
      type: String,
      default: '',
    },
    autoupload: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
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
      
      if(this.autoupload){
        this.status = 'loading';
        let apiFunc;
        if(this.apiFunc !== undefined){
          apiFunc = this.apiFunc;
        }
        else{
          apiFunc = FilesApi.upload;
        }
        let file = event.target.files[0];
        apiFunc(file, this.handleProgress).then(
          response => {
            console.log('File Upload');
            this.$emit('input', {
              file: file,
              response: response,
              success: true,
            });
          },
          error => {
            this.$emit('input', {
              file: file,
              response: error,
              success: false,
            });
            console.log('An error on File Upload occured', error);
          }
        );
      }
      else{
        if(this.multiple){
          //
        }
        else{
          this.$emit('input', {
            file: event.target.files[0],
            response: null,
            success: false,
          });
        }
      }
    },
    handleProgress(progressEvent){
      // console.log(progressEvent);
      this.percent = Math.ceil(progressEvent.loaded / progressEvent.total * 100);
    },
  },

}
</script>

<style>

</style>