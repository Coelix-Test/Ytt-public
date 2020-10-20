<template>
  <div class="u-container u-ml-auto u-mr-auto u-pt-9">
    <div class="u-row">
      <div class="u-col-7">
        <div class="u-flex is-align-center">
          <div class="u-text-h1 u-mr-6">Users</div>
        </div>
      </div>
      <div class="u-col-5">
        <!-- search -->
      </div>
      <div class="u-col-12">
        <u-tabs>
          <u-tab label="Teachers">Teachers Tab </u-tab>
          <u-tab label="Students">Students Tab </u-tab>
        </u-tabs>
      </div>

      {{currentTab}}
    </div>
  </div>
</template>

<script>
import { LessonsApi } from '@/api';
// import ResponsiveDataTable from '@/components/common/DataTable/ResponsiveDataTable.vue';
import UCard from '@/components/common/UCard';

import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';


export default {
  components: {
    UCard,
    UTabs,UTab,
  },
  data: () => ({
    data: [],
    currentTab: 0,
  }),
  computed: {
    
  },
  methods: {
    getItems(){
      LessonsApi.getPage(response => {
        console.log(response);
      });
    }
  },
  mounted(){
    
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.table-card{
  box-shadow: 0px 12px 66px rgba(0, 0, 0, 0.15);
  background: #fff;
}

.u-data-table{
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;

  &.is-striped{
    tr:nth-child(even){
      background-color: #F8F8F8;
    }
  }

  tbody>tr:hover,
  &.is-striped tbody>tr:hover{
    transition: all .15s ease-in-out;
    background-color: $clr-blue;
    color: #fff;
  }

  svg{
    fill: $clr-blue;
  }
  tr:hover svg{
    fill: #fff;
  }

  td{
    padding: 15px 0;
    // white-space: nowrap;
  }
  th{
    padding: 22px 0;
  }
}

tr:hover .pages-col{
  color: #fff;
}
.pages-col{
  color: $clr-grey;
}
</style>