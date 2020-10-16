<template>
  <div>
    
  </div>
</template>

<script>
// import { CemeteriesApi } from '@/api';
// import ResponsiveDataTable from '@/components/common/DataTable/ResponsiveDataTable.vue';


export default {
  components: {
    
  },
  data: () => ({
    data: [],
    loading: false,
    page: 1,
    maxPages: 1,
    search: '',
    columns: [
      {
        value: 'name',
        text: 'Name',
        breakpoint: false,
        align: 'start',
      },
      {
        value: 'address',
        text: 'Address',
        breakpoint: 768
      },
      {
        value: 'owner',
        text: 'owner',
        breakpoint: 768
      },
      {
        value: 'actions',
        text: '',
        breakpoint: false,
        width: '1%',
        align: 'end',
      },
      {
        value: 'classifications',
        text: 'Classifications',
        breakpoint: 10000,
      },
    ],
  }),
  computed: {
    
  },
  methods: {
    
  },
  mounted(){
    
  },
}
</script>

<style lang="scss" scoped>

</style>