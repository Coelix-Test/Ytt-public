<template>
  <div>
    <button @click="startRecord">Record</button>
    <button @click="stopRecord">Stop</button>
    <button @click="getRecord">Show</button>
  </div>
</template>

<script>
import AudioRecorder from '@/lib/AudioRecorder';
import axios from 'axios';

export default {
  name: 'UAudioRecorder',
  data: () => ({
    recorder: new AudioRecorder()
  }),
  methods: {
    startRecord(){
      this.recorder.start();
    },
    stopRecord(){
      this.recorder.stop();
    },
    getRecord(){
      console.log(this.recorder.record);

    }
  }
};
</script>

<style scoped>

</style>
