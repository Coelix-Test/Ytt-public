<template>
  <modal name="select-student" width="1250px" height="auto" classes="u-modal" scrollable>
    <u-card class="u-modal-card u-px-24 u-pt-24 u-pb-15">

      <slot name="title">
        <div class="u-text-h2 u-text-center">Choose Student</div>
      </slot>

      <u-autocomplete
        :value="value"
        :items="studentsList"
        @input="onSelectItems"
        :multiple="multiple"
      >
      </u-autocomplete>
      <div class="u-flex is-justify-center u-mt-2">
        <UBtn
          @click="save"
          color="primary"
          size="x-large"
          id="select_student_modal_submit"
        >
          Save
        </UBtn>
      </div>
    </u-card>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import UCard from '@/components/common/UCard.vue';
import UAutocomplete from '@/components/common/UAutocomplete/UAutocomplete.vue';

export default {
  components: {
    UCard,
    UAutocomplete,
  },
  data: () => ({
    items: [],
  }),
  props: {
    value: {
      type: [Object, Array],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters('Students', ['studentsList']),
    ...mapGetters('Auth', ['userRole']),
  },
  methods: {
    ...mapActions('Students', {
      getItems : 'fetchStudentsList',
    }),
    onSelectItems(items){
      this.$emit('input', items);
    },
    hideModal(){
      this.$modal.hide('select-student');
    },
    save(){
      this.$emit('save');
      this.hideModal();
    },
  },
  mounted(){
    this.getItems(this.userRole);
  }
}
</script>

<style>

</style>