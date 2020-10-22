<template>
  <modal name="select-teacher" width="1250px" height="auto" classes="u-modal" scrollable>
    <u-card class="u-modal-card u-px-24 u-pt-24 u-pb-15">
      <div class="u-text-h2 u-text-center">Choose Teacher</div>
      <u-autocomplete 
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

export default {
  components: {
    UCard,
    UAutocomplete,
  },
  props: {
    value: {
      type: Array,
      required: true,
    }
  },
  methods: {
    onSelectTeachers(teachers){
      this.$emit('input', teachers);
    },
    hideModal(){
      this.$modal.hide('select-teacher');
    },

  }
}
</script>

<style>

</style>