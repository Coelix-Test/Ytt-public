<!--used to display list of teachers on Lesson creation page -->
<template>
  <div>
    <div 
      class="u-flex u-px-5 u-py-2"
      v-for="item in value"
      :key="item.id"
    >
      {{ item.name }}
    </div>
    <button
      @click="showModal"
      id="lesson_open_modal_select_teacher"
    >
      Add teacher
    </button>
    <select-teacher 
      :value="value" 
      @input="onSelectTeachers"
      multiple
    ></select-teacher>
  </div>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UAutocomplete from '@/components/common/UAutocomplete/UAutocomplete.vue';

import SelectTeacher from '@/components/modals/SelectTeacher';

import { UsersApi } from '@/api/users.api';

export default {
  data: () => ({
    items: [],
  }),
  props: {
    value: {
      type: Array,
      required: true,
    }
  },
  components: {
    UCard,
    UAutocomplete,
    SelectTeacher,
  },
  methods: {
    showModal(){
      this.$modal.show('select-teacher');
    },
    hideModal(){
      this.$modal.hide('select-teacher');
    },
    onSelectTeachers(teachers){
      this.$emit('input', teachers);
    },
  }
}
</script>

<style lang="scss">
// .modal-card{
//   width: 750px;
// }
</style>