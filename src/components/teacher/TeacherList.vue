<template>
  <div>
    <button @click="showModal">Add teacher</button>
    <modal name="select-teacher" width="1250px" height="auto" classes="u-modal">
      <u-card class="u-modal-card u-px-24 u-pt-24 u-pb-15">
        <div class="u-text-h2 u-text-center">Choose Teacher</div>

        <div class="u-flex">
          <button class="u-btn is-dark is-bg-primary is-x-large u-ml-auto u-mr-auto">Save</button>
        </div>
      </u-card>
    </modal>
  </div>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UAutocomplete from '@/components/common/UAutocomplete/UAutocomplete.vue';

import { UsersApi } from '@/api/users.api';

export default {
  data: () => ({
    items: [],
  }),
  components: {
    UCard,
    UAutocomplete,
  },
  methods: {
    showModal(){
      this.$modal.show('select-teacher');
    },
    hideModal(){
      this.$modal.hide('select-teacher');
    },
  }
}
</script>

<style lang="scss">
// .modal-card{
//   width: 750px;
// }
</style>