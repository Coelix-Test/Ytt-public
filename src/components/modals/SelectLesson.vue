<template>
  <modal name="select-teacher" width="1250px" height="auto" classes="u-modal" scrollable>
    <u-card class="u-modal-card u-px-24 u-pt-24 u-pb-15">
      <div class="u-text-h2 u-text-center">Give lesson to {{username}}</div>
      <u-autocomplete 
        :items="items"
        :value="value"
        @input="onSelectTeachers"
      >
      </u-autocomplete>
      <div class="u-flex u-mt-2">
        <button class="u-btn is-dark is-bg-primary is-x-large u-ml-auto u-mr-auto" @click="hideModal">Save</button>
      </div>
    </u-card>
  </modal>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UAutocomplete from '@/components/common/UAutocomplete/UAutocomplete.vue';

import { LessonsApi } from '@/api';

export default {
  data: {
    items: [],
  },
  components: {
    UCard,
    UAutocomplete,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    username: {
      type: String,
      default: 'Teacher name',
    }
  },
  methods: {
    onSelectTeachers(teachers){
      this.$emit('input', teachers);
    },
    hideModal(){
      this.$modal.hide('select-teacher');
    },
    getLessonsItems(){
      LessonsApi.getPage({}).then(res => {
        this.items = res.data;
      })
    }
  }
}
</script>

<style>

</style>