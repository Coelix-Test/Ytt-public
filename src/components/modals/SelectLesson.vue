<template>
  <modal name="select-lesson" width="1250px" height="auto" classes="u-modal" scrollable>
    <u-card class="u-modal-card u-px-24 u-pt-24 u-pb-15">

      <slot name="title">
        <div class="u-text-h2 u-text-center">Give lesson</div>
      </slot>

      <u-autocomplete
        :items="items"
        :value="value"
        label="Choose lessons"
        item-text="title"
        @input="onSelectItems"
        :multiple="multiple"
      >
      </u-autocomplete>
      <div class="u-flex u-mt-2 is-justify-center">
        <UBtn
          color="primary"
          size="x-large"
          @click="save"
        >
          Save
        </UBtn>
      </div>
    </u-card>
  </modal>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UAutocomplete from '@/components/common/UAutocomplete/UAutocomplete.vue';

import { LessonsApi } from '@/api';

export default {
  data: () => ({
    items: [],
  }),
  components: {
    UCard,
    UAutocomplete,
  },
  props: {
    value: {
      type: [Object, Array],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSelectItems(items){
      this.$emit('input', items);
    },
    hideModal(){
      this.$modal.hide('select-lesson');
    },
    getLessonsItems(){
      LessonsApi.getPage({}).then(res => {
        this.items = res.data;
      })
    },
    save(){
      this.$emit('save');
      this.hideModal();
    },
  },
  mounted(){
    this.getLessonsItems();
  }
}
</script>

<style>

</style>
